## Introduction

In this article, I'll walk you through the process of crafting a custom firmware file for the Raspberry Pi Pico using
MicroPython. We'll explore the simplicity and power of MicroPython, providing step-by-step
instructions for creating a personalized firmware. By the end, you'll have the skills to shape the capabilities of your
Raspberry Pi Pico, enhancing its versatility and tailoring it to your specific project needs. Let's delve into the world
of MicroPython and enhance your microcontroller programming experience!

## Setup

### Clone micropython

1. Choose Location:
    * Decide on a suitable location on your PC where you want to store the MicroPython repository.
2. Open Terminal:
    * Navigate to the location where you want to clone the repository. You can use
      the `cd` command to change directories.
3. Clone the Repository:
    * Run the following command to clone the MicroPython repository into the chosen location:
      ```shell
      git clone git@github.com:micropython/micropython.git
      cd micropython
      git submodule update --init lib/pico-sdk lib/tinyusb
      ```

Once these steps are completed, you'll have successfully cloned the MicroPython repository to your local machine, and
you can proceed with the next steps in your project.

### Create module

Create a new file named `main.py` within the `$MICROPYTHON_PATH/ports/rp2/modules` directory. This is a file in which
you can write your own script. As example, I will use the following snippet:

```python
import time
from machine import Pin

led = Pin(25, Pin.OUT)

while True:
    led.value(0)
    time.sleep(0.5)
    led.value(1)
    time.sleep(0.5)
```

## Create firmware

This sequence of commands is used to build and compile our firmware.

```shell
micropython/mpy-cross$ make
micropython/ports/rp2$ make submodules
micropython/ports/rp2$ make
```

1. `make`: This command is executed in the `micropython/mpy-cross directory`. It invokes the make tool to build the
   MicroPython cross-compiler.
2. `make submodules`: Executed in the `micropython/ports/rp2 directory`, this command initializes and updates the
   submodules required for the Raspberry Pico.
3. `make`: The final command, also executed in the `micropython/ports/rp2 directory`, triggers the actual build process
   for MicroPython on the Raspberry
   Pi Pico. It compiles the code and generates the firmware that can be flashed onto the microcontroller

Upon executing the specified commands, a `uf2` file will be generated as the output. This `uf2` file encapsulates the
compiled and processed MicroPython firmware, ready to be flashed onto the Raspberry Pico or the target device
specified in the build configuration.

```bash
ls build-PICO/*.uf2
```

To flash your raspberry follow steps from [the previous article](/blog/articles/1552276#flashing).

## Summary

In short, this article helps you make a custom firmware for the Raspberry Pico using MicroPython. It explains setup
steps, like cloning MicroPython and creating a module with a sample LED blink script. The step-by-step guide then shows
how to create a uf2 file ready to flash onto the Raspberry Pico.

The complete code is available on
my [GitHub repository](https://github.com/Porok12/blog-examples/tree/master/raspberry-pico-python-blinking-led).

## References

* [MicroPython](https://www.raspberrypi.com/documentation/microcontrollers/micropython.html)
