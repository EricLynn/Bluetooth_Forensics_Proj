import json
import sys

if __name__ == '__main__':
    if(len(sys.argv) < 2):
        print '\n!!! No btle file provided. \n'
        raise ValueError

    data = {} 
    for fi in sys.argv[1:]:
        with open(fi, 'r') as f:
            devices = json.load(f)
            for device in devices:
                addr = None
                if 'pdu_type' in device and device['pdu_type'] == '3':
                    addr = device['scanning_address']
                elif 'master_address' in device:
                    addr = device['master_address']
                elif 'advertising_address' in device:
                    addr = device['advertising_address']

                if addr != None:
                    if not addr in data:
                        data[addr] = {}
                        data[addr]['profile'] = []
                        data[addr]['epoch'] = device['epoch']
                        data[addr]['timestamp'] = device['timestamp']
                    elif (float(data[addr]['epoch'])) < float(device['epoch']):
                        data[addr]['epoch'] = device['epoch']
                        data[addr]['timestamp'] = device['timestamp']

                    if 'pdu_type' in device and device['pdu_type'] == '3' and not device['advertising_address'] in data[addr]['profile']:
                        data[addr]['profile'].append(device['advertising_address'])
                    elif 'slave_address' in device and not device['slave_address'] in data[addr]['profile']:
                        data[addr]['profile'].append(device['slave_address'])
                    elif 'advertising_address' in device and device['advertising_address'] != addr and not device['advertising_address'] in data[addr]['profile']:
                        data[addr]['profile'].append(device['advertising_address'])
            f.close()

    for addr in data:
        for entry in data:
            if entry in data[addr]['profile'] and not addr in data[entry]['profile']:
                data[entry]['profile'].append(addr)


    with open('bt_profiles.json', 'w') as f:
        f.write(json.dumps(data, sort_keys=True, indent=4, separators=(',', ': ')))
        f.close()

