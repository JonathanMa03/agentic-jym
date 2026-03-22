import time
from collections import defaultdict, deque

MAX_REQUESTS = 10
WINDOW_SECONDS = 60 * 60  # 1 hour

REQUEST_LOGS = defaultdict(deque)


def is_rate_limited(client_id: str) -> tuple[bool, int]:
    now = time.time()
    window_start = now - WINDOW_SECONDS
    requests = REQUEST_LOGS[client_id]

    while requests and requests[0] < window_start:
        requests.popleft()

    if len(requests) >= MAX_REQUESTS:
        return True, 0

    requests.append(now)
    remaining = MAX_REQUESTS - len(requests)
    return False, remaining