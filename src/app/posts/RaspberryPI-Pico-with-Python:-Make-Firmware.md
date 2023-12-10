## Introduction

In this article, I'll guide you through the exciting process of crafting a custom firmware file for the Raspberry Pi
Pico using MicroPython. Whether you're a coding enthusiast or an experienced developer, join me on this hands-on journey
to unlock the full potential of the Raspberry Pi Pico. We'll explore the simplicity and power of MicroPython, delving
into step-by-step instructions for creating a personalized firmware. By the end, you'll have the skills to shape the
capabilities of your Raspberry Pi Pico, enhancing its versatility and tailoring it to your specific project needs. Let's
dive into the world of MicroPython and elevate your microcontroller programming experience!

## Setup

### Clone micropython

1. Choose Location:
    * Decide on a suitable location on your local machine where you want to store the MicroPython repository. This could
      be a specific directory or folder.
2. Open Terminal or Command Prompt:
    * Open your terminal or command prompt. Navigate to the location where you want to clone the repository. You can use
      the cd command to change directories.
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

Create a new file named `main.py` within the `$MICROPYTHON_PATH/ports/rp2/modules` directory. This is a file in which you
can write your own script. As example, I will use the following snippet:

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

This sequence of commands is used to build and compile MicroPython, specifically for the Raspberry Pi Pico.

```shell
micropython/mpy-cross$ make
micropython/ports/rp2$ make submodules
micropython/ports/rp2$ make
```

1. `make`: This command is executed in the `micropython/mpy-cross directory`. It invokes the make tool to build the
   MicroPython cross-compiler.
2. `make submodules`: Executed in the `micropython/ports/rp2 directory`, this command initializes and updates the
   submodules required for the Raspberry Pi Pico.
3. `make`: The final command, also executed in the `micropython/ports/rp2 directory`, triggers the actual build process
   for MicroPython on the Raspberry
   Pi Pico. It compiles the code and generates the firmware that can be flashed onto the microcontroller

Upon executing the specified commands, a `uf2` file will be generated as the output. This `uf2` file encapsulates the
compiled and processed MicroPython firmware, ready to be flashed onto the Raspberry Pi Pico or the target device
specified in the build configuration.

```bash
ls build-PICO/*.uf2
```

The complete code is available on
my [GitHub repository](https://github.com/Porok12/blog-examples/tree/master/raspberry-pico-python-blinking-led).

## References

* [MicroPython](https://www.raspberrypi.com/documentation/microcontrollers/micropython.html)
