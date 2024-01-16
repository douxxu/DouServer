### Raspberry Pi 5 (debian 12 bookworm) test

DouServer was tested on a [Raspberry Pi 5 with a fan case](https://www.welectron.com/Raspberry-Pi-5-8-GB-Official-Black-Kit).

## Specs

**CPU:**
```
4x 2,4 GHz (64 bits)
Broadcom BCM2712
(Cortex-A76, ARM v8)
```

**RAM:**
```
8 Go LPDDR4X
```

**PCI interface:**
```
1x PCIe 2.0x1
```

**Alinentation:**
```
5V/5A USB-C
```

## Parameters
**OS:** [Pi Os with desktop](https://www.raspberrypi.com/software/operating-systems/#raspberry-pi-os-64-bit)
- [ ] Overcloked
- [ ] Ethernet
- [x] WiFi 6

## Personal opinion
The raspberry pi 5 easily runs DouServer without a hitch, the setup took about 10 seconds and the server launches immediately after executing the `dserver -s` command. I ran http flood on it and the server held firm, blacklisting the ip quickly. The cpu temperature was around 55 degrees Celsius with the help of the box with built-in fan.
