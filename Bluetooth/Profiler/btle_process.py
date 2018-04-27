import json
import sys

if __name__ == '__main__':
    if(len(sys.argv) != 2):
        print '\n!!! Invalid Arguement. Valid btle json required.\n'
        raise ValueError

    with open(sys.argv[1], 'r') as f:
        btle_file = json.load(f)
        f.close()

    output = []
    for entry in btle_file:
        entry = entry['_source']['layers']
        if 'btle' in entry:
            data = {}
            data['epoch'] = entry['frame']['frame.time_epoch']
            data['timestamp'] = entry['frame']['frame.time']
            data['access_address'] = entry['btle']['btle.access_address']

            if 'btle.advertising_address' in entry['btle']:
                data['advertising_address'] = entry['btle']['btle.advertising_address']

            if 'btle.master_bd_addr' in entry['btle']:
                data['master_address'] = entry['btle']['btle.master_bd_addr']
                data['slave_address'] = entry['btle']['btle.slave_bd_addr']

            if 'btle.advertising_header_tree' in entry['btle']:
                data['pdu_type'] = entry['btle']['btle.advertising_header_tree']['btle.advertising_header.pdu_type']
                if data['pdu_type'] == '3':
                    data['scanning_address'] = entry['btle']['btle.scanning_address']

            output.append(data)

    #Write to file
    with open('output_' + sys.argv[1], 'w') as f:
        f.write(json.dumps(output, sort_keys=True, indent=4, separators=(',', ': ')))
        f.close()
