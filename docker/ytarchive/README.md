# ytarchive

This container uses ytarchive to download things from youtube


### Download a livestream

```
mkdir test
docker run -v test:/app ghcr.io/rustyguts/alexandria/ytarchive:main ytlink best
```