# NGINX Tutorial for Beginners

Welcome to the **NGINX Tutorial for Beginners**! This tutorial provides a comprehensive introduction to NGINX, guiding you through its installation, configuration, and essential features.

## Table of Contents

- [Introduction to NGINX](#introduction-to-nginx)
- [Installation](#installation)
- [Basic Configuration](#basic-configuration)
- [Serving Static Content](#serving-static-content)
- [Reverse Proxy Setup](#reverse-proxy-setup)
- [Load Balancing](#load-balancing)
- [Security Best Practices](#security-best-practices)
- [Conclusion](#conclusion)

## Introduction to NGINX

NGINX is a high-performance web server and reverse proxy server known for its stability, rich feature set, simple configuration, and low resource consumption. It is widely used for serving static content, acting as a reverse proxy, and load balancing.

## Installation

To install NGINX on your system, follow these steps:

### For Debian/Ubuntu:
```sh
sudo apt update
sudo apt install nginx
```

### For CentOS/RHEL:
```sh
sudo yum install epel-release
sudo yum install nginx
```

After installation, start and enable NGINX:

```sh
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Basic Configuration

The main configuration file for NGINX is located at `/etc/nginx/nginx.conf`. Key directives include:

- **`worker_processes`**: Defines the number of worker processes.
- **`events`**: Manages connection processing.
- **`http`**: Contains configurations for web traffic, including server blocks.

## Serving Static Content

To serve static content:

1. Place your HTML files in `/usr/share/nginx/html/`.
2. Ensure the default server block in `/etc/nginx/nginx.conf` points to this directory:
   
   ```nginx
   server {
       listen 80;
       server_name your_domain.com;
       root /usr/share/nginx/html;
       index index.html;
   }
   ```

## Reverse Proxy Setup

NGINX can act as a reverse proxy, forwarding client requests to backend servers. Example configuration:

```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Load Balancing

To distribute traffic across multiple servers, configure load balancing:

```nginx
http {
    upstream backend {
        server backend1.example.com;
        server backend2.example.com;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://backend;
        }
    }
}
```

## Security Best Practices

- **Disable Server Tokens**: Prevent NGINX from displaying its version number.
  
  ```nginx
  server_tokens off;
  ```

- **Limit Request Methods**: Allow only necessary HTTP methods.
  
  ```nginx
  if ($request_method !~ ^(GET|POST)$) {
      return 405;
  }
  ```

- **Implement Rate Limiting**: Protect against DDoS attacks.
  
  ```nginx
  http {
      limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;

      server {
          location / {
              limit_req zone=one burst=5;
          }
      }
  }
  ```

## Conclusion

This tutorial covers the basics of NGINX, from installation to configuration and security practices. For a more in-depth understanding, consider watching the full tutorial video: [NGINX Tutorial for Beginners](https://www.youtube.com/watch?v=9t9Mp0BGnyI).

---

**Contributions & Feedback**

Feel free to contribute or provide feedback by opening an issue or pull request on this repository!
