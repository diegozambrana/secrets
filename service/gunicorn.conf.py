import multiprocessing

wsgi_app = "service.wsgi"
bind = "0.0.0.0:8000"
workers = multiprocessing.cpu_count() * 2 + 1
loglevel = "info"
