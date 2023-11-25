## Introduction

The Raspberry Pico is a microcontroller board developed by the Raspberry Pi Foundation. It's a departure from the
traditional Raspberry Pi single-board computers. The Raspberry Pico is designed specifically for microcontroller
applications.

Key features of the Raspberry Pico include:

1. Microcontroller Unit (MCU): The Pico is built around the RP2040 microcontroller. This microcontroller is dual-core
   ARM Cortex-M0+ based, providing a balance between performance and power efficiency.
2. GPIO Pins: The board includes 26 programmable General Purpose Input/Output (GPIO) pins, allowing users to connect and
   control various external devices and sensors.
3. Peripherals: It has a range of peripherals, including SPI, I2C, UART, PWM, and more, making it versatile for
   interfacing with other hardware components.
4. Programmability: The Raspberry Pico can be programmed using MicroPython, a lightweight implementation of Python
   for microcontrollers. It also supports C and other languages.
5. Low-Cost and Compact Design: The Pico is relatively low-cost compared to traditional Raspberry Pi SBCs and is
   designed to be compact, making it suitable for embedded projects and applications with space constraints.

The Raspberry Pico is commonly used in projects that require the functionality of a microcontroller, such as
robotics, embedded systems, and various DIY electronics projects. It provides an affordable and accessible platform for
learning and experimenting with physical computing.

## Setup

Programming the Raspberry Pico involves a few key steps. You can program it using the MicroPython programming
language. Below is a general guide for programming the Raspberry Pico:

### Development Environment

We will utilize PyCharm as our preferred integrated development environment (IDE) for
programming the Raspberry Pico. PyCharm provides a user-friendly interface, powerful code editing features, and
seamless integration with Python development, making it an ideal choice for our project.

1. In such case, we will have to install plugin MicroPython. You can download it using
   following [link](https://plugins.jetbrains.com/plugin/9777-micropython). For other IDE search proper plugins etc.

### Raspberry Pico

1. Download proper MicroPython UF2 file e.g. [Raspberry Pi Pico](https://micropython.org/download/rp2-pico/rp2-pico-latest.uf2).

## Write the code

This Python code is a simple example of controlling an LED using the MicroPython programming language on a
microcontroller.

```python
import time
from machine import Pin

led = Pin(25, Pin.OUT)

while True:
    led.value(1)
    time.sleep(0.5)
    led.value(0)
    time.sleep(0.5)
```

Let's break down the code step by step:

1. The code begins by importing two modules:
    * `time` for managing time-related functions,
    * and `Pin` from the `machine` module, which is commonly used in MicroPython for GPIO (General-Purpose Input/Output)
      operations.
2. Initializing LED Pin
    * It creates an instance of the `Pin` class named `led`. This pin is configured as an output (`Pin.OUT`) and is
      connected to physical pin 25 on the microcontroller or board.
3. LED Blinking Loop:
    * The code enters an infinite loop (`while True`) to continuously toggle the LED on and off.
    * `led.value(1)` sets the LED pin to a high state (turning the LED on).
    * `time.sleep(0.5)` pauses the program for 0.5 seconds, creating a half-second delay.
    * `led.value(0)` sets the LED pin to a low state (turning the LED off)
    * Another `time.sleep(0.5)` introduces another half-second delay before the loop repeats.

This code creates a simple blinking pattern for an LED connected to pin 25. The LED turns on for 0.5 seconds, turns off
for 0.5 seconds, and the cycle repeats indefinitely.

## Flashing

Flashing the Raspberry Pico involves updating the firmware on the microcontroller. Here's a general guide on how to
flash the Raspberry Pico:

### Prerequisites

* Raspberry Pico: Ensure you have the Raspberry Pico microcontroller board.
* Firmware file: Firmware ready to be uploaded to our microcontroller.
* Micro USB Cable: Use a micro USB cable to connect the Pico to your computer.

### Steps

1. Enter Bootloader Mode:
    * Ensure the Raspberry Pico is not connected to power.
    * Hold down the BOOTSEL button on the Pico.
    * While holding the button, connect the Pico to your computer using the micro USB cable.
2. Locate Pico as a Mass Storage Device:
    * The Raspberry Pico will appear as a mass storage device on your computer.
3. Download Firmware:
    * Obtain the firmware for your project. This could be a MicroPython script (.uf2 file) or a compiled C/C++ binary.
4. Drag and Drop Firmware:
    * Open the folder containing the firmware file.
    * Drag and drop the firmware file onto the mass storage device representing the Pico.
5. Wait for Flashing:
    * The Pico will automatically reboot and start flashing the new firmware.
    * The ACT (Activity) LED on the Pico will blink rapidly during the flashing process.
6. Reconnect Pico:
    * After the flashing is complete, disconnect the Pico from your computer.
7. Power Cycle Pico:
    * Reconnect the Pico to power or press the RESET button to start running the new program.

### Additional Tips

* Bootloader Mode Button: If you encounter issues entering bootloader mode, double-check that you are holding down the
  BOOTSEL button while connecting the Pico to your computer.
* Verify Flashing: Some firmware files may include a verification step. Ensure that the flashing process completes
  without errors, and the ACT LED indicates successful activity.
* Check Firmware Compatibility: Ensure that the firmware you are flashing is compatible with the Raspberry Pico and
  its hardware specifications.
* If you end up with `failed to access /dev/ttyACM0` error then you will need to adjust permissions:
    ```shell
     $ ls -la /dev/ttyACM0
     crw-rw---- 1 root dialout 166, 0 Jul 28 19:51 /dev/ttyACM0
     $ chmod 777 /dev/ttyACM0
     # or
     $ usermod -a -G dialout $USER && reboot
    ```

## Tests

After testing, we confirm that the blinking LED using MicroPython on the Raspberry Pico works as intended. The
results give us confidence in the reliability of the code and the accuracy of GPIO control. This success lays a solid
foundation for future projects and developments.

![Blinking LED](https://res.cloudinary.com/dhqoqqstc/image/upload/v1690661594/blog/blinking_led/zozgbpie5tijiad9b1io.gif)

## Summary

In conclusion, this article explored the foundational steps of using MicroPython on the Raspberry Pico to control an
LED. By importing essential modules such as time and machine, and leveraging the Pin class, we initialized the LED pin
and implemented a straightforward blinking pattern. The code, encapsulated in an infinite loop, demonstrated the
sequential activation and deactivation of the LED with half-second intervals, providing a hands-on introduction to basic
GPIO operations. This exercise serves as a fundamental building block for more complex projects and serves as a
practical starting point for those delving into embedded systems development with MicroPython on the Raspberry Pico.

## References

* [RaspberryPI Documentation](https://www.raspberrypi.com/documentation/microcontrollers/micropython.html)
* [MicroPython](https://micropython.org/download/?vendor=Raspberry%20Pi)
