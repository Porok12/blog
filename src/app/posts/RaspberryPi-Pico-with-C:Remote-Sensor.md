Please, check out my [previous article](/blog/articles/1553849) before continuing. As we will be relying on it.

## Introduction

In this article, we'll take on an interesting Raspberry Pi Pico project, aiming to turn it into an efficient temperature
measurement device. I'll guide you through the basics of sensor interfacing and data acquisition, with a special focus
on optimizing power usage. The unique aspect of this project involves periodically putting the Raspberry Pi Pico into a
sleep state to conserve power. When it wakes up, it will make several measurements and transmit data to a remote server,
repeating this cycle. Join me as we go step by step, emphasizing the importance of power efficiency in our endeavor.

## Raspberry Pico

To achieve our goals, we need a `Raspberry Pico W`. The "W" in Raspberry Pico products indicates the inclusion of
wireless features such as WiFi and Bluetooth.

Connect the DHT22 sensor to your Raspberry Pico. You can find the DHT22
datasheet [here](https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf). Ensure that you have the required
resistor.

![Schema](https://res.cloudinary.com/dhqoqqstc/image/upload/v1703532283/blog/blinking_led/x7kfwpczxohmyodzbrjr.jpg)

Note: It can be any sensor, I will use DHT22 for demonstration purposes.

## Project setup

### Development environment

Before you begin, make sure to set up the necessary environment variables:

- `PICO_BOARD`: `pico_w`
- `PICO_SDK_PATH`: `<your-path>`

Raspberry Pico will connect to a server via a TCP connection, so we need to set the following CMake options:

- `TCP_SERVER_IP`: Address of the server that will listen to Raspberry Pico eg. `192.168.1.XX`
- `TCP_PORT`: Port on the server that is open for communication eg. `8008`
- `WIFI_SSID`: Your WiFi network's SSID
- `WIFI_PASSWORD`: Your WiFi network's password

Note: Raspberry must connect to network where such host server exists.

![Settings](https://res.cloudinary.com/dhqoqqstc/image/upload/v1703509236/blog/blinking_led/kimuz623yyjpcfh1djnn.webp)

### Prepare project

Copying the files `lwipopts.h`, `lwipopts_examples_common.h` and `pico_extras_import.cmake`, `pico_sdk_import.cmake` is
essential for configuring and importing necessary settings and dependencies. Here's a
breakdown of each file:

1. `lwipopts.h` and `lwipopts_examples_common.h`:
   These files contain configuration options for the Lightweight IP (lwIP) stack, which is crucial for networking
   functionality.

2. `pico_extras_import.cmake` and `pico_sdk_import.cmake`:
    - These CMake scripts are necessary for importing the Pico SDK and associated extras into your project.
    - `pico_sdk_import.cmake` imports the core Pico SDK, while `pico_extras_import.cmake` imports additional extras for
      specific functionalities.

By copying these files, you set up the foundational configurations and dependencies needed for networking and general
development on the Raspberry Pico platform.

You can find them in the Pico SDK repository. Follow these steps:

1. `lwipopts.h` and `lwipopts_examples_common.h`:
    - Navigate to the [Pico Examples repository](https://github.com/raspberrypi/pico-examples/tree/master/pico_w/wifi).
    - Inside the repository, locate the `pico_w/wifi` directory.
    - Copy the `wifi/lwipopts.h` and `lwipopts_examples_common.h` files from this directory to your project.

2. `pico_sdk_import.cmake`:
    - In the [Pico SDK repository](https://github.com/raspberrypi/pico-sdk/tree/master/external), find
      the `external/pico_sdk_import.cmake` file
    - Copy this file into your project directory.
3. `pico_extras_import.cmake`:
    - In the [Pico Extras repository](https://github.com/raspberrypi/pico-extras/tree/master/external), find
      the `external/pico_extras_import.cmake` file
    - Copy this file into your project directory.

### Writing code

The code is available on
my [GitHub repository](https://github.com/Porok12/blog-examples/tree/master/raspberry-pico-c-remote-sensor)

#### Cmake

Let's dive into the code, starting with the essential CMake configuration:

```cmake
cmake_minimum_required(VERSION 3.13)
include(pico_sdk_import.cmake)
include(pico_extras_import.cmake)
project(raspberry_pico_c_remote_sensor C CXX ASM)

set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17)
set(WIFI_SSID ${WIFI_SSID} CACHE INTERNAL "WiFi SSID")
set(WIFI_PASSWORD ${WIFI_PASSWORD} CACHE INTERNAL "WiFi password")
set(TCP_SERVER_IP ${TCP_SERVER_IP} CACHE INTERNAL "TCP server ip")
set(TCP_PORT ${TCP_PORT} CACHE INTERNAL "TCP server port")

message("Raspberry Pi Pico SDK version ${PICO_SDK_VERSION_STRING}")

pico_sdk_init()

add_executable(raspberry_pico_c_remote_sensor main.c src/dht.c src/tcp_utils.c src/sleep_utils.c)
target_include_directories(raspberry_pico_c_remote_sensor PRIVATE ${CMAKE_CURRENT_LIST_DIR})
target_link_libraries(raspberry_pico_c_remote_sensor
        pico_cyw43_arch_lwip_poll # pico_cyw43_arch_lwip_threadsafe_background
        pico_stdlib
        hardware_gpio
        hardware_sleep
)
target_compile_definitions(raspberry_pico_c_remote_sensor PRIVATE
        WIFI_SSID=\"${WIFI_SSID}\"
        WIFI_PASSWORD=\"${WIFI_PASSWORD}\"
        TCP_SERVER_IP=\"${TCP_SERVER_IP}\"
        TCP_PORT=\"${TCP_PORT}\"
)

pico_enable_stdio_usb(raspberry_pico_c_remote_sensor 1)
pico_enable_stdio_uart(raspberry_pico_c_remote_sensor 0)

pico_add_extra_outputs(raspberry_pico_c_remote_sensor)
```

In a previous article, we provided a detailed description of a similar file. Here, you'll find a comparable one, with
added environment variables
and [Pico Extras](https://github.com/raspberrypi/pico-extras) that adds `pico_sleep` functionality.

#### Main

Now, let's move on to the main C file:

```c
#include <stdlib.h>

#include "pico/stdlib.h"
#include "pico/cyw43_arch.h"

#include "src/sleep_utils.h"
#include "src/tcp_utils.h"
#include "src/dht.h"

int main(void) {
    //...
}
```

Here we have included:

- `<stdlib.h>`: Standard C library for general utilities
- `"pico/stdlib.h"`: Pico SDK standard library header for Raspberry Pi Pico
- `"pico/cyw43_arch.h"`: Header for the Wi-Fi chip used with the Raspberry Pi Pico
- `"src/...""`: Our files, which we will implement in a moment

We will also need some utils methods:

```c
/**
 * Additional PIN for debugging
 */
#define LED_PIN 22

int init_led(void) {
    gpio_init(LED_PIN);
    gpio_set_dir(LED_PIN, GPIO_OUT);
    return 0;
}

int init_wifi(void) {
    if (cyw43_arch_init_with_country(CYW43_COUNTRY_POLAND)) {
        printf("Wi-Fi failed to initialise\n");
        return 1;
    }

    cyw43_arch_enable_sta_mode();

    printf("Connecting to Wi-Fi...\n");
    if (cyw43_arch_wifi_connect_timeout_ms(WIFI_SSID, WIFI_PASSWORD, CYW43_AUTH_WPA2_AES_PSK, 10000)) {
        printf("Failed to connect.\n");
        return 1;
    }

    printf("Connected.\n");
    return 0;
}
```

Here's a brief overview of the **Wi-Fi Initialization Function**:

- `int init_wifi(void) { /*...*/ }`: This function initializes the Wi-Fi module using the Cypress CYW4343X chip.
- `cyw43_arch_init_with_country(CYW43_COUNTRY_POLAND)`: Initializes the Wi-Fi module with the specified country
  code (Poland in this case).
- If initialization fails, an error message is printed, and the function returns 1.
- `cyw43_arch_enable_sta_mode()`: Enables the Wi-Fi station mode.
- The function attempts to connect to the Wi-Fi network using the provided SSID, password, and encryption type (
  WPA2 in this case) with a timeout of 10 seconds.
- If the connection fails, an error message is printed, and the function returns 1.
- If the connection is successful, a success message is printed, and the function returns 0.

```c
int comparator(const void *p, const void *q) {
    return (int)(((dht_reading*)p)->temp_celsius - ((dht_reading*)q)->temp_celsius);
}
```

The provided C function, named `comparator`, is designed for comparing two objects of type `dht_reading` based on their
temperature values in Celsius. This function will be used as a callback function for sorting an array of `dht_reading`
objects.

```c
static volatile bool awake;

static void sleep_callback(void) {
    awake = true;
}

int main(void) {
    /* Initialize */

    stdio_init_all();
    init_led();
    dht_init();

    /* Definitions */

    dht_reading measurements[5];

    uint scb_orig = scb_hw->scr;
    uint clock0_orig = clocks_hw->sleep_en0;
    uint clock1_orig = clocks_hw->sleep_en1;

    datetime_t t = {
            .year  = 2020,
            .month = 06,
            .day   = 05,
            .dotw  = 5, // 0 is Sunday, so 5 is Friday
            .hour  = 15,
            .min   = 00,
            .sec   = 00
    };

    rtc_init();

    /* Logic */

    sleep_ms(2000);
    measure_freqs();
    sleep_ms(1000);

    while (1) {
        awake = false;
        gpio_put(LED_PIN, 0);
        if (cyw43_is_initialized(&cyw43_state)) {
            cyw43_arch_deinit();
        }
        sleep_run_from_xosc(); // UART will be reconfigured by sleep_run_from_xosc
        rtc_set_datetime(&t);
        rtc_sleep(1, 0, sleep_callback);

        while (!awake) {
            printf("Should be sleeping\n");
        }

        gpio_put(LED_PIN, 1);
        recover_from_sleep(scb_orig, clock0_orig, clock1_orig);
        init_wifi();

        for (int c = 0; c < 5; ++c) {
            dht_reading data;
            read_from_dht(&data);
            printf("%f %f\n", data.temp_celsius, data.humidity);
            measurements[c] = data;
            sleep_ms(2000);
        }
        qsort((void*)measurements, 5, sizeof(dht_reading), comparator);

        send_measurements(&measurements[2]);
    }

    return 0;
}
```

The provided C code represents the main logic for the project involving sleep cycles, sensor measurements, and wireless
communication. Here's a breakdown of the code:

1. **Global Variables**:
    - `static volatile bool awake;`: Declares a global boolean variable to track the wake state of the system.

2. **Sleep Callback Function**:
    - `static void sleep_callback`: Defines a callback function triggered when the system wakes from sleep. It sets the
      global `awake` variable to `true`.

3. **Initialization**:
    - `stdio_init_all()`: Initializes standard I/O for printf.
    - `init_led()`: Initializes an LED PIN.
    - `dht_init()`: Initializes the DHT sensor.

4. **Definitions**:
    - Defines an array `dht_reading measurements[5]` for storing sensor readings.
    - Initializes variables for storing original values of certain hardware registers.

5. **Date and Time Configuration**:
    - Defines a `datetime_t` structure with a specific date and time.
    - Initializes the RTC (Real-Time Clock) with the provided date and time.

6. **Main Loop**:
    - Initiates a loop for continuous operation.
    - Sets `awake` to `false` and turns off the LED.
    - Checks if the Wi-Fi module is initialized and deinitializes it if necessary.
    - Initiates a sleep cycle using `rtc_sleep()` and waits for the sleep callback to set `awake` to `true`.
    - Prints a message during the sleep cycle.
    - Turns on the LED and recovers from sleep.
    - Initializes the Wi-Fi module.
    - Reads sensor data from the DHT sensor, sorts the measurements, and sends the data wirelessly.
    - Repeats the loop.

## Server

This Python server script serves as a TCP server for Raspberry Pi Pico. It listens for incoming connections, receives
temperature and humidity data in a specific format from the Pico device. The server runs indefinitely, continuously
accepting and processing incoming data.

```python
# imports

def main(config: argparse.Namespace) -> None:
    buffer_size = 8
    payload_size = 8  # Specific to what PICO sends

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server:
        server.bind((config.ip, config.port))
        server.listen(1)
        print('Listening for client...')

        try:
            while True:
                try:
                    conn, addr = server.accept()
                    print(f"Connected by {addr}")
                    while True:
                        data = conn.recv(buffer_size)
                        if len(data) == payload_size:
                            humidity, temperature = struct.unpack('ff', data)
                            print(f"Temp: {temperature}, Humidity: {humidity}")
                            if not data:
                                break
                        else:
                            conn.close()
                            break
                except KeyboardInterrupt:
                    print('Exiting...')
                    break
        finally:
            server.close()

# ...
```

Key functionalities include:

- **Database Storage**: The server can save the received temperature and humidity measurements to a local SQLite
  database if configured.
- **Continuous Operation**: The script runs continuously, maintaining an open connection for data reception.
- **Connection Handling**: The server handles incoming connections, receiving and processing data in the expected
  format.
- **Graceful Exit**: The script can be interrupted with a keyboard interrupt (Ctrl+C), allowing for a graceful exit.

### Usage

- `-p` or `--port`: Specifies the port on which the server listens (default is 8008).
- `--ip`: Specifies the IP address on which the server operates (default is an empty string, allowing connections from
  any IP).
- `--db`: Specifies the location of the SQLite database for storing temperature and humidity data.

To run the server, execute the script and provide any necessary configuration options.

## Testing

1. **Server Setup**:
    - Begin by launching the Python server script on the designated host machine. Ensure that the server is running and
      ready to accept connections.

2. **Raspberry Pico Flashing**:
    - Flash the Raspberry Pico with the programmed firmware using the appropriate development environment or tool.

3. **Observation**:
    - Observe the behavior and interactions between the Raspberry Pico and the server.
    - Verify that temperature and humidity data is successfully transmitted from the Pico to the server.
    - Confirm any expected actions or responses, such as database storage on the server.

4. **Enjoy the Results**:
    - Once the testing process is complete and the interactions are confirmed, you can consider the setup successful.

![Testing](https://res.cloudinary.com/dhqoqqstc/image/upload/v1703521376/blog/blinking_led/u1lx7uhl3c7rhlplvk0q.webp)

## Summary

In summary, this article provides a comprehensive guide for creating a temperature measurement system using the
Raspberry Pi Pico. Starting from the basics of sensor interfacing and data acquisition, we progress through the
essential steps of configuring the Pico to act as a robust temperature monitor. We extend our exploration to seamlessly
forward this valuable temperature data to a remote server, adding a layer of connectivity to our Pico project. At the
end, you have a smart temperature monitoring solution, offering practical insights for real-world applications.
