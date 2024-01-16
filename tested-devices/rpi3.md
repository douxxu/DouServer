## Raspberry pi 3 (debian 11) test

DouServer was tested on a [Raspberry Pi 3 b+]([https://www.welectron.com/Raspberry-Pi-5-8-GB-Official-Black-Kit](https://www.reichelt.com/ch/de/raspberry-pi-3-b-4x-1-4-ghz-1-gb-ram-wlan-bt-raspberry-pi-3b--p217696.html?CCOUNTRY=459&LANGUAGE=de&utm_source=display&utm_medium=rsp-foundation&src=raspberrypi&&r=1)https://www.reichelt.com/ch/de/raspberry-pi-3-b-4x-1-4-ghz-1-gb-ram-wlan-bt-raspberry-pi-3b--p217696.html?CCOUNTRY=459&LANGUAGE=de&utm_source=display&utm_medium=rsp-foundation&src=raspberrypi&&r=1).

## Specs

**CPU:**
```
Broadcom BCM2837B0, Cortex-A53 (ARMv8) 64-bit SoC @ 1.4GHz
```

**RAM:**
```
1GB LPDDR2 SDRAM
```

**Alimentation:**
```
5V/2.5A micro-usb
```

## Parameters
**OS:** [Pi Os with desktop](https://www.raspberrypi.com/software/operating-systems/#raspberry-pi-os-64-bit)
- [ ] Overclocked
- [ ] Ethernet
- [x] WiFi 6

## Personal opinion

I wouldn't recommend using a raspberry pi 3 b+ as a server at all. The raspberry pi 3 b+ is very slow, and doesn't handle large requests very well. What's more, I had a really hard time installing nvm and node js, which took me over 2 hours to install. However, this may also be due to the fact that I forgot the password for my raspberry pi 3, so I couldn't establish an ssh connection from my macbook. As for DouServer, the raspberry pi 3 b+ took 3 minutes to install DouServer with the command given in the [README](https://github.com/douxxu/DouServer/blob/866f8d4dc5cc9514712de5e398ebf30ad8b345e7/README.md#-installation), then, to launch the server it takes more or less 4.5 seconds. During an http flood attack, the server takes more or less 10000 ms to respond, and after this attack it drops back down to 4000 ms. Without any attack, the ping is around 3000 ms. The shield works well, as do all options. All logs are present and functional. 
**In conclusion, I don't recommend using the raspberry pi 3 b+, but for testing a few small projects, it might work.**
