## Introduction

In this article, we'll take on an interesting Raspberry Pi Pico project, aiming to turn it into an efficient temperature
measurement device. I'll guide you through the basics of sensor interfacing and data acquisition, with a special focus
on optimizing power usage. The unique aspect of this project involves periodically putting the Raspberry Pi Pico into a
sleep state to conserve power. When it wakes up, it will transmit temperature data to a remote server, repeating this
cycle. Join me as we go step by step, emphasizing the importance of power efficiency in our endeavor.

Check out my [previous article](/blog/articles/1553849) before continuing.

## Raspberry Pico

To achieve our goals, we need a `Raspberry Pico W`. . The "W" in Raspberry Pico products indicates the inclusion of
wireless features such as Wi-Fi and Bluetooth.

Before you begin, make sure to set up the necessary environment variables:

- `PICO_BOARD`: `pico_w`
- `PICO_SDK_PATH`: `<your-path>`

And following CMake options:

- `TCP_SERVER_IP`: Address of the server that will listen to Raspberry Pico.
- `TCP_PORT`: Port on the server that is open for communication.
- `WIFI_SSID`: Your WiFi network's SSID.
- `WIFI_PASSWORD`: Your WiFi network's password.

![Settings](https://res.cloudinary.com/dhqoqqstc/image/upload/v1703509236/blog/blinking_led/kimuz623yyjpcfh1djnn.webp)

Connect the DHT22 sensor to your Raspberry Pico. You can find the DHT22 datasheet [here](https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf). Ensure that you have the required resistor.

![Schema](https://res.cloudinary.com/dhqoqqstc/image/upload/v1703532283/blog/blinking_led/x7kfwpczxohmyodzbrjr.jpg)

### Project setup

Copying the files `lwipopts.h`, `lwipopts_examples_common.h` and `pico_extras_import.cmake`, `pico_sdk_import.cmake` is
essential for configuring and importing necessary settings and dependencies. Here's a
breakdown of each file:

1. **lwipopts.h and lwipopts_examples_common.h:**
    - These files contain configuration options for the Lightweight IP (lwIP) stack, which is crucial for networking
      functionality.
    - `lwipopts.h` provides lwIP stack configuration options.
    - `lwipopts_examples_common.h` includes common lwIP configuration used in Pico examples.
    - Copying these files ensures that your project has the required lwIP configurations for networking operations.

2. **pico_extras_import.cmake and pico_sdk_import.cmake:**
    - These CMake scripts are necessary for importing the Pico SDK and associated extras into your project.
    - `pico_sdk_import.cmake` imports the core Pico SDK, while `pico_extras_import.cmake` imports additional extras for
      specific functionalities.
    - Copying these files enables your CMakeLists.txt file to include and configure the Pico SDK, facilitating
      development with the Raspberry Pico.

By copying these files, you set up the foundational configurations and dependencies needed for networking and general
development on the Raspberry Pico platform.

You can find them in the Pico SDK repository. Follow these steps:

1. **lwipopts.h and lwipopts_examples_common.h:**
   - Navigate to the Pico SDK repository on GitHub: [Raspberry Pi Pico SDK](https://github.com/raspberrypi/pico-sdk).
   - Inside the repository, locate the `src/rp2_common/pico_sdk_default_config` directory.
   - Copy the `lwipopts.h` and `lwipopts_examples_common.h` files from this directory to your project.

2. **pico_extras_import.cmake and pico_sdk_import.cmake:**
   - Still in the Pico SDK repository, find the `external/pico_sdk_import.cmake` and `external/pico_extras_import.cmake` files.
   - Copy these files into your project directory.


### Writing code

Let's dive into the key code file, starting with the essential CMake configuration:

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

Here is a breakdown of the code:

1. **CMake Version and Project Information:**
    - `include(pico_sdk_import.cmake)`: Imports the Raspberry Pi Pico SDK for building the project.
    - `include(pico_extras_import.cmake)`: Imports additional components from the Pico SDK.
    - `project(raspberry_pico_c_remote_sensor C CXX ASM)`: Defines the project name and languages (C, C++, and
      Assembly).

2. **Project Configuration:**
    - `set(CMAKE_C_STANDARD 11)`: Sets the C language standard to version 11.
    - `set(CMAKE_CXX_STANDARD 17)`: Sets the C++ language standard to version 17.
    - Defines variables for WiFi SSID, WiFi password, TCP server IP, and TCP server port.

3. **Initialization and Project Setup:**
    - `pico_sdk_init()`: Initializes the Pico SDK for the project.
    - `add_executable(raspberry_pico_c_remote_sensor main.c src/dht.c src/tcp_utils.c src/sleep_utils.c)`: Defines the
      executable and includes source files.

4. **Library Linking and Compilation Definitions:**
    - `target_include_directories()`: Specifies include directories for the project.
    - `target_link_libraries()`: Links necessary libraries, including Pico components, standard libraries, GPIO, and
      sleep utilities.
    - `target_compile_definitions()`: Sets compilation definitions, including WiFi SSID, WiFi password, TCP server IP,
      and TCP server port.

5. **Console Output Configuration:**
    - `pico_enable_stdio_usb()`: Enables USB-based standard I/O.
    - `pico_enable_stdio_uart()`: Disables UART-based standard I/O.

6. **Additional Outputs:**
    - `pico_add_extra_outputs(raspberry_pico_c_remote_sensor)`: Adds extra build outputs for the project, typically used
      for generating UF2 files for flashing onto the Raspberry Pi Pico.

Now, let's move on to the C code:

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

Here's a brief description:

1. **Header Files Inclusion:**
    - `<stdlib.h>`: Standard C library for general utilities.
    - `"pico/stdlib.h"`: Pico SDK standard library header for Raspberry Pi Pico.
    - `"pico/cyw43_arch.h"`: Header for the Cypress CYW4343X Wi-Fi chip used with the Raspberry Pi Pico.

2. **Main Function:**
    - `int main(void) { /*...*/ }`: The entry point of the program. This is where the main functionality of the project
      would be implemented.

3. **Project Structure:**
    - The code structure suggests a modular approach, with separate header files for various functionalities (sleep,
      TCP, DHT).
    - The inclusion of `"pico/cyw43_arch.h"` indicates the usage of Wi-Fi capabilities on the Raspberry Pi Pico through
      the Cypress CYW4343X chip.
    - Additional details about the project's functionality are not provided in the snippet, as they would be found
      within the implementation of the `main` function and the included custom header files.

Define utils methods:

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

Here's a brief overview:

1. **LED Initialization Function:**
    - The code defines a macro `LED_PIN` with a value of 22, designating an additional PIN for debugging purposes.
    - `int init_led(void) { /*...*/ }`: This function initializes the LED PIN for debugging.
        - `gpio_init(LED_PIN)`: Initializes the GPIO pin specified by `LED_PIN`.
        - `gpio_set_dir(LED_PIN, GPIO_OUT)`: Sets the direction of the GPIO pin to output.
        - The function returns 0, indicating successful LED initialization.

2. **Wi-Fi Initialization Function:**
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
temperature values in Celsius. Here's a breakdown of the function:

1. **Function Signature:**
    - `int comparator(const void *p, const void *q)`: The function takes two `const void` pointers (`p` and `q`) as
      parameters and returns an integer.

2. **Type Conversion:**
    - `(dht_reading*)p`: Casts the pointer `p` to a pointer of type `dht_reading`.
    - `(dht_reading*)q`: Casts the pointer `q` to a pointer of type `dht_reading`.

3. **Comparison:**
    - `((dht_reading*)p)->temp_celsius - ((dht_reading*)q)->temp_celsius`: Compares the temperature values of the
      two `dht_reading` objects.
    - The result of the subtraction is cast to an integer.

4. **Return Statement:**
    - `return (int)(((dht_reading*)p)->temp_celsius - ((dht_reading*)q)->temp_celsius)`: Returns the result of the
      temperature comparison as an integer.
    - If the result is negative, it indicates that the temperature of the object pointed to by `p` is less than the
      temperature of the object pointed to by `q`.
    - If the result is positive, it indicates the opposite.
    - If the result is zero, it means both temperatures are equal.

Note: This function is commonly used as a callback function for sorting an array of `dht_reading` objects, for example,
when using the `qsort` function from the C standard library.

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

The provided C code represents the main logic for a Raspberry Pi Pico project involving sleep cycles, sensor
measurements, and wireless communication. Here's a breakdown of the code:

1. **Global Variables:**
    - `static volatile bool awake;`: Declares a global boolean variable to track the wake state of the system.

2. **Sleep Callback Function:**
    - `static void sleep_callback(void) { awake = true; }`: Defines a callback function triggered when the system wakes
      from sleep. It sets the global `awake` variable to `true`.

3. **Main Function:**
    - `int main(void) { /*...*/ }`: The entry point of the program containing the main logic.

4. **Initialization:**
    - `stdio_init_all()`: Initializes standard I/O for printf.
    - `init_led()`: Initializes an LED PIN.
    - `dht_init()`: Initializes the DHT sensor.

5. **Definitions:**
    - Defines an array `dht_reading measurements[5]` for storing sensor readings.
    - Initializes variables for storing original values of certain hardware registers.

6. **Date and Time Configuration:**
    - Defines a `datetime_t` structure with a specific date and time.
    - Initializes the RTC (Real-Time Clock) with the provided date and time.

7. **Logic:**
    - `sleep_ms(2000)`: Sleeps for 2000 milliseconds.
    - `measure_freqs()`: Measures frequencies.
    - `sleep_ms(1000)`: Sleeps for 1000 milliseconds.

8. **Main Loop:**
    - Initiates a loop for continuous operation.
    - Sets `awake` to `false` and turns off the LED.
    - Checks if the Wi-Fi module is initialized and deinitializes it if necessary.
    - Initiates a sleep cycle using `rtc_sleep()` and waits for the sleep callback to set `awake` to `true`.
    - Prints a message during the sleep cycle.
    - Turns on the LED and recovers from sleep.
    - Initializes the Wi-Fi module.
    - Reads sensor data from the DHT sensor, sorts the measurements, and sends the data wirelessly.
    - Repeats the loop.

9. **Return:**
    - `return 0;`: Indicates successful execution.

## Server

```python
import argparse
import os
import socket
import sqlite3
import struct
import pathlib
from datetime import datetime
from psutil import process_iter
from signal import SIGTERM

import requests


def forward_data(config: argparse.Namespace, temperature: float, humidity: float) -> None:
    # Save measurements to local database
    if config.db:
        connection = sqlite3.connect(config.db)
        cursor = connection.cursor()
        cursor.execute('INSERT INTO sensordata VALUES (?, ?, ?)', (temperature, humidity, datetime.now()))
        connection.commit()
        cursor.close()
        connection.cursor()


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
                            forward_data(config, temperature, humidity)
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


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='TCP server for PICO')
    parser.add_argument('-p', '--port', type=int, default=8008, required=False, help='port on which server is open')
    parser.add_argument('--ip', type=str, default='', required=False,
                        help='IP on which server is working (default: '')')
    parser.add_argument('--db', type=pathlib.Path, required=False, help='SQLite database location')
    args = parser.parse_args()

    main(args)

```

This Python server script serves as a TCP server for Raspberry Pi Pico. It listens for incoming connections, receives
temperature and humidity data in a specific format from the Pico device, and forwards the data to a specified SQLite
database. The server runs indefinitely, continuously accepting and processing incoming data. Key functionalities
include:

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

1. **Server Setup:**
    - Begin by launching the Python server script on the designated host machine. Ensure that the server is running and
      ready to accept connections.

2. **Raspberry Pico Flashing:**
    - Flash the Raspberry Pico with the programmed firmware using the appropriate development environment or tool.

3. **Observation:**
    - Observe the behavior and interactions between the Raspberry Pico and the server.
    - Verify that temperature and humidity data is successfully transmitted from the Pico to the server.
    - Confirm any expected actions or responses, such as database storage on the server.

4. **Enjoy the Results:**
    - Once the testing process is complete and the interactions are confirmed, you can consider the setup successful.

![Testing](https://res.cloudinary.com/dhqoqqstc/image/upload/v1703521376/blog/blinking_led/u1lx7uhl3c7rhlplvk0q.webp)

## Summary

In summary, this article provides a comprehensive guide for creating a temperature measurement system using the
Raspberry Pi Pico. Starting from the basics of sensor interfacing and data acquisition, we progress through the
essential steps of configuring the Pico to act as a robust temperature monitor. The journey doesn't stop there; we
extend our exploration to seamlessly forward this valuable temperature data to a remote server, adding a layer of
connectivity to our Pico project. Join us in this step-by-step walkthrough, and by the end, you'll have a smart and
connected temperature monitoring solution at your fingertips, offering practical insights for real-world applications.
