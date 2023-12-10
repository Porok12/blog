## Introduction

In this article, we'll delve into the fascinating world of embedded programming, guiding you through the creation of a blinking LED on the Raspberry Pi Pico using the powerful C programming language. Whether you're just starting out or have some experience, we'll go through each step together, unlocking the full potential of the Raspberry Pi Pico.

## Preparations

To ensure a comprehensive working environment, install the necessary libraries. On Ubuntu you can run the following command:

```bash
$ sudo apt install cmake gcc-arm-none-eabi libnewlib-arm-none-eabi libstdc++-arm-none-eabi-newlib
```

In addition to this we will need `pico_sdk_import.cmake` file. In order to get this we copy it from `$PICO_SDK_PATH/external` 

```bash
$ git clone https://github.com/raspberrypi/pico-sdk.git
```

## Let's code it

Begin by creating or updating the `CMakeLists.txt` file with the following content:

```cmake
cmake_minimum_required(VERSION 3.26)

include(pico_sdk_import.cmake)
project(raspberry_pico_c_blinking_led C CXX ASM)
pico_sdk_init()
add_executable(raspberry_pico_c_blinking_led main.c)
target_link_libraries(raspberry_pico_c_blinking_led pico_stdlib)
pico_add_extra_outputs(raspberry_pico_c_blinking_led)
```

* include(pico_sdk_import.cmake): Imports the pico_sdk, which is essential for Raspberry Pi Pico development.
* project(raspberry_pico_c_blinking_led C CXX ASM): Declares the project and includes C, C++, and Assembly language support.
* pico_sdk_init(): Initializes the pico_sdk for the project.
* add_executable(raspberry_pico_c_blinking_led main.c): Defines the executable and specifies the main source file (main.c).
* target_link_libraries(raspberry_pico_c_blinking_led pico_stdlib): Links the pico_stdlib library to the executable.
* pico_add_extra_outputs(raspberry_pico_c_blinking_led): Adds extra outputs for the project.

Now, let's proceed to our beloved `main.c`:

```c
#include "pico/stdlib.h"

void gpio_toggle(uint pin) {
    gpio_put(pin, !gpio_get(pin));
}

int main() {
#ifndef PICO_DEFAULT_LED_PIN
#warning blink example requires a board with a regular LED
#else
    const uint LED_PIN = PICO_DEFAULT_LED_PIN;
    gpio_init(LED_PIN);
    gpio_set_dir(LED_PIN, GPIO_OUT);
    while (true) {
        gpio_toggle(LED_PIN);
        sleep_ms(250);
    }
#endif
}
```

* Include Statement: The code includes the necessary header file `pico/stdlib.h` which is part of the Pico SDK.
* `gpio_toggle` Function:
    * This function takes a GPIO pin as a parameter.
    * It toggles the state of the specified GPIO pin (switches it from high to low or vice versa).
* `main` Function:
    * The `#ifndef PICO_DEFAULT_LED_PIN` block checks if the default LED pin is defined for the board. If not, it emits a compilation warning.
    * Inside the `#else` block (indicating that a regular LED pin is available):
        * The LED pin is set as `PICO_DEFAULT_LED_PIN`.
        * GPIO initialization and configuration are performed to set the LED pin as an output.
        * The main loop toggles the LED state and sleeps for 250 milliseconds, creating a blinking effect.

The code can be found at my [github](https://github.com/Porok12/blog-examples/tree/master/raspberry-pico-c-blinking-led)

## References

* https://www.raspberrypi.com/documentation/microcontrollers/c_sdk.html
