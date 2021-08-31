# Adapted from the Cassandra Python driver.
#
# Copyright DataStax, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
import calendar
import random
import uuid


def uuid_from_time(time_arg, node=None, clock_seq=None):
    """
    Converts a datetime or timestamp to a type 1 :class:`uuid.UUID`.

    :param time_arg:
      The time to use for the timestamp portion of the UUID.
      This can either be a :class:`datetime` object or a timestamp
      in seconds (as returned from :meth:`time.time()`).
    :type datetime: :class:`datetime` or timestamp

    :param node:
      None integer for the UUID (up to 48 bits). If not specified, this
      field is randomized.
    :type node: long

    :param clock_seq:
      Clock sequence field for the UUID (up to 14 bits). If not specified,
      a random sequence is generated.
    :type clock_seq: int

    :rtype: :class:`uuid.UUID`

    """
    if hasattr(time_arg, 'utctimetuple'):
        seconds = int(calendar.timegm(time_arg.utctimetuple()))
        microseconds = (seconds * 1e6) + time_arg.time().microsecond
    else:
        microseconds = int(time_arg * 1e6)

    # 0x01b21dd213814000 is the number of 100-ns intervals between the
    # UUID epoch 1582-10-15 00:00:00 and the Unix epoch 1970-01-01 00:00:00.
    intervals = int(microseconds * 10) + 0x01b21dd213814000

    time_low = intervals & 0xffffffff
    time_mid = (intervals >> 32) & 0xffff
    time_hi_version = (intervals >> 48) & 0x0fff

    if clock_seq is None:
        clock_seq = random.getrandbits(14)
    else:
        if clock_seq > 0x3fff:
            raise ValueError('clock_seq is out of range (need a 14-bit value)')

    clock_seq_low = clock_seq & 0xff
    clock_seq_hi_variant = 0x80 | ((clock_seq >> 8) & 0x3f)

    if node is None:
        node = random.getrandbits(48)

    return uuid.UUID(fields=(time_low, time_mid, time_hi_version,
                             clock_seq_hi_variant, clock_seq_low, node), version=1)
