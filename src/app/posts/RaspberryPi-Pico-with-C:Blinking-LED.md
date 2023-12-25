## Introduction

In this article, we'll explore embedded programming and show you how to make a blinking LED on the Raspberry Pico
using C language. Whether you're a beginner or have some experience, we'll go through each step to help you get the most
out of your Raspberry Pico.

We will use CMake. CMake is a open-source cross-platform tool that simplifies the process of building and managing
software projects. It helps developers create consistent and platform-independent build configurations, making it easier
to work on different systems.

## Setup

### Preparations

To ensure a comprehensive working environment, install the necessary libraries. On Ubuntu you can run the following
command:

```bash
sudo apt install cmake gcc-arm-none-eabi libnewlib-arm-none-eabi libstdc++-arm-none-eabi-newlib
```

In addition to this we will need `pico_sdk_import.cmake` file. In order to get this we copy it
from `$PICO_SDK_PATH/external`

```bash
git clone https://github.com/raspberrypi/pico-sdk.git
```

### Development environment

We'll be using CLion by JetBrains as our IDE for this project. CLion streamlines coding with features like intelligent
code completion and robust debugging tools, making our development process more efficient.

Remember to set essential evironment variables like `PICO_BOARD` or `PICO_SK_PATH`

![Settings](https://res.cloudinary.com/dhqoqqstc/image/upload/v1703505672/blog/blinking_led/shvjrasqrnsztn83kr1k.webp)

## Let's code it

To begin, create or update the CMakeLists.txt file with the following content:

```cmake
cmake_minimum_required(VERSION 3.26)

include(pico_sdk_import.cmake)
project(raspberry_pico_c_blinking_led C CXX ASM)
pico_sdk_init()
add_executable(raspberry_pico_c_blinking_led main.c)
target_link_libraries(raspberry_pico_c_blinking_led pico_stdlib)
pico_add_extra_outputs(raspberry_pico_c_blinking_led)
```

Here's a breakdown of the key elements:

* `include(pico_sdk_import.cmake)`: This line imports the pico_sdk, an essential component for Raspberry Pico
  development.
* `project(raspberry_pico_c_blinking_led C CXX ASM)`: Declares the project, specifying support for C, C++, and Assembly
  languages.
* `pico_sdk_init()`: Initializes the pico_sdk for the project.
* `add_executable(raspberry_pico_c_blinking_led main.c)`: Defines the executable and points to the main source file (
  main.c).
* `target_link_libraries(raspberry_pico_c_blinking_led pico_stdlib)`: Links the pico_stdlib library to the executable.
* `pico_add_extra_outputs(raspberry_pico_c_blinking_led)`: Adds extra outputs for the project.

Now, let's move on to the `main.c` file:

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

Here's a breakdown of the code:

* Include Statement: The code includes the necessary header file `pico/stdlib.h` which is part of the Pico SDK.
* `gpio_toggle` Function:
    * This function takes a GPIO pin as a parameter.
    * It toggles the state of the specified GPIO pin (switches it from high to low and vice versa).
* `main` Function:
    * The `#ifndef PICO_DEFAULT_LED_PIN` block, checks if the default LED pin is defined for the board. If not, it emits
      a compilation warning.
    * Inside the `#else` block (indicating that a regular LED pin is available):
        * The LED pin is set as `PICO_DEFAULT_LED_PIN`.
        * GPIO initialization and configuration are performed to set the LED pin as an output.
        * The main loop toggles the LED state and sleeps for 250 milliseconds, creating a blinking effect.

The code is available on
my [GitHub repository](https://github.com/Porok12/blog-examples/tree/master/raspberry-pico-c-blinking-led)

## Flashing Raspberry Pico

To begin the update process, reload your CMake project in CLion. Once reloaded, proceed by clicking the 'Build' button.
This action initiates the compilation process, resulting in the creation of a `.uf2` file. You can find this file within
the `build` folder of your project directory.

![Build](https://res.cloudinary.com/dhqoqqstc/image/upload/v1703506401/blog/blinking_led/f4yjovcecpp3lsp4swq5.webp)

To flash your raspberry follow steps from [the previous article](/blog/articles/1552276#flashing).

## Summary

I've guided through the process of implementing a blinking LED on the Raspberry Pico using the C programming language.
We set up the development environment within CLion, installed necessary libraries, and coded the LED blinking
functionality. To conclude, we've learned the flashing procedure, creating a `.uf2` file for the Raspberry Pico by
reloading the CMake project and initiating the `Build` operation.

## References

* [Raspberry Pico C/C++ SDK Documentation](https://www.raspberrypi.com/documentation/microcontrollers/c_sdk.html)
