## Introduction

The Raspberry Pico, developed by the Raspberry Pi Foundation, is a specialized microcontroller board designed for a
variety of applications. Unlike traditional Raspberry Pi single-board computers, it caters specifically to the needs of
microcontroller projects, providing a compact and versatile platform for both beginners and experienced developers.

Key features of the Raspberry Pico include:

1. **RP2040 MCU:** Pico features a dual-core ARM Cortex-M0+ for balanced performance and power efficiency.
2. **26 GPIO Pins:** Equipped for easy connection and control of external devices and sensors.
3. **Versatile Peripherals:** Supports SPI, I2C, UART, PWM, and more for diverse hardware interfacing.
4. **Multi-Language Support:** Pico is programmable in MicroPython and for C language.
5. **Cost-Effective, Compact:** Budget-friendly and designed for space-constrained embedded projects.

The Raspberry Pico is commonly used in projects that require the functionality of a microcontroller, such as
robotics, embedded systems, and various DIY electronics projects. It provides an affordable and accessible platform for
learning and experimenting with physical computing.

## Development Environment

We will utilize `PyCharm` as our preferred IDE (integrated development environment) for
programming the Raspberry Pico. `PyCharm` provides a user-friendly interface, powerful code editing features, and
seamless integration with Python development.

In this article we will be programming using the MicroPython, so you will need to install the MicroPython plugin. It can
be downloaded from the following [page](https://plugins.jetbrains.com/plugin/9777-micropython). If you're using a
different IDE, be sure to explore and install the appropriate plugins accordingly.

![PyCharm](https://res.cloudinary.com/dhqoqqstc/image/upload/v1690661594/blog/blinking_led/rzg4u0nqksung1azitw2.webp)

## Write the code

Create a new `PyCharm` project and create the `main.py` file. Then paste the following snippet. This code is a simple
example of controlling an LED.

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

In Raspberry Pico, pin 25 is connected with builtin green LED (For more details
see [pinout schemas](https://www.raspberrypi.com/documentation/microcontrollers/raspberry-pi-pico.html))

## Flashing

Flashing the Raspberry Pico involves updating the firmware on the microcontroller.

### Prerequisites

* Raspberry Pico: Ensure you have the Raspberry Pico microcontroller board.
* Micro USB Cable: Use a micro USB cable to connect the Pico to your computer.
* Get the right MicroPython UF2 file by downloading it from
  the [official source](https://micropython.org/download/?vendor=Raspberry%20Pi), such as
  the [latest Raspberry Pico file](https://micropython.org/download/rp2-pico/rp2-pico-latest.uf2).

### Flash Raspberry Pico with MicroPython

1. Enter Bootloader Mode:
    * Ensure the Raspberry Pico is not connected to power.
    * Hold down the BOOTSEL button on the Pico.
    * While holding the button, connect the Pico to your computer using the micro USB cable.
2. Locate Pico as a Mass Storage Device:
    * The Raspberry Pico will appear as a mass storage device on your computer.
3. Drag and Drop Firmware:
    * Open the folder containing the firmware file.
    * Drag and drop the firmware file onto the mass storage device representing the Pico.
4. Wait for Flashing:
    * The Pico will automatically reboot and start flashing the new firmware.
    * The ACT (Activity) LED on the Pico will blink rapidly during the flashing process.
5. Reconnect Pico:
    * After the flashing is complete, disconnect the Pico from your computer.
6. Power Cycle Pico:
    * Reconnect the Pico to power or press the RESET button to start running the new program.

### Upload our code

1. Make sure you have enabled MicroPython support and selected desired device.
   ![Settings](https://res.cloudinary.com/dhqoqqstc/image/upload/v1703450005/blog/blinking_led/mlctuav7crw6p5ve64dr.webp)
2. To upload our code, right click `main.py` file and then select `Run 'Flash main.py'` or simply
   press `CTRL+SHIFT+F10`.
   ![Settings](https://res.cloudinary.com/dhqoqqstc/image/upload/v1703450005/blog/blinking_led/hdfwzjldedmzc1rblql0.webp)

### Troubleshooting / Tips

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

The complete code is available on
my [GitHub repository](https://github.com/Porok12/blog-examples/tree/master/raspberry-pico-python-blinking-led).

## References

* [RaspberryPI Documentation](https://www.raspberrypi.com/documentation/microcontrollers/micropython.html)
* [MicroPython](https://micropython.org/download/?vendor=Raspberry%20Pi)
