# ytarchive

This container uses ytarchive to download things from youtube

### Download a livestream

```sh
mkdir test
docker run -v test:/app ghcr.io/rustyguts/alexandria/ytarchive:main ytlink best
```

### Development commands

```sh
docker build -t ytarchive:local .
docker run -v test:/app ytarchive:local -- --mkv --merge https://www.youtube.com/live/77cj7eLoL3k\?si\=QgTdGjPEx7ESN5IL best
```