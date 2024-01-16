## MacBook Retina (Unix) test

DouServer was tested on a [MacBook Retina](https://support.apple.com/kb/SP712)

## Specs
**CPU:**
```
1.3 GHz Intel Core i5 dual-core
```

**RAM:**
```
8 Go 1867 MHz LPDDR3
```

**Alimentation:**
```
None / battery
```

## Parameters
**Os:** [MacOs Big Sur 11.5.2](https://support.apple.com/106338)
- [ ] Overclocked
- [ ] Ethernet
- [x] WiFi 6 

## Personnal opinion
This macbook is getting old, but it's still perfectly functional and I was able to install node js very quickly without any problems. DouServer was installed within 10 seconds, and all commands work perfectly. Although the [Raspberry Pi 5](https://github.com/douxxu/DouServer/blob/689679cb07a1ece7c5b66aeb059d5a674757b147/tested-devices/rpi5.md) has almost better specs, the macbook manages to compete with it. I did a dos on the server, and the ping didn't change from usual: around 500 ms. If I activate the shield option, the macbook handles http flood attacks very well, quickly blacklisting the attacker. The logging system is fully functional.
