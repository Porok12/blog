## Introduce

In this article, we'll start from scratch on an exhilarating Raspberry Pi Pico project. Our mission is to create software that will transform the Pico into a powerful temperature measurement device. From the basics of sensor interfacing and data acquisition to the advanced steps of forwarding this vital temperature data to a remote server, we'll guide you through every step. Join us on this hands-on journey as we explore the capabilities of the Raspberry Pi Pico, blending hardware and software to craft a smart and connected temperature monitoring solution. Let's begin from ground zero and build a project that delivers meaningful real-world insights!

## Setup

## Development

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

```c
int comparator(const void *p, const void *q) {
    return (int)(((dht_reading*)p)->temp_celsius - ((dht_reading*)q)->temp_celsius);
}
```

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

## Summary

In summary, this article provides a comprehensive guide for creating a temperature measurement system using the Raspberry Pi Pico. Starting from the basics of sensor interfacing and data acquisition, we progress through the essential steps of configuring the Pico to act as a robust temperature monitor. The journey doesn't stop there; we extend our exploration to seamlessly forward this valuable temperature data to a remote server, adding a layer of connectivity to our Pico project. Join us in this step-by-step walkthrough, and by the end, you'll have a smart and connected temperature monitoring solution at your fingertips, offering practical insights for real-world applications.
