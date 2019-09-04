#! /usr/bin/python3
# coding: utf-8

import subprocess
import yaml
import json

def get_minio_accounts_from_values_file(yaml_file):
    with open(yaml_file) as file:
        values = yaml.load(file, Loader=yaml.FullLoader)
        return values['minio_accounts']

def get_minio_credentials_from_values_file(yaml_file):
    with open(yaml_file) as file:
        values = yaml.load(file, Loader=yaml.FullLoader)
        return values['minio_credentials']

def configure_minio(account_list, minio_credentials):
    configure_access_to_minio = 'mc config host add ' +  minio_credentials['alias'] + ' ' + minio_credentials['url'] + ' ' + minio_credentials['access_key'] + ' ' + minio_credentials['secret_key']
    subprocess.run(configure_access_to_minio, shell=True)
    for account in account_list:
        create_bucket(account['name'], minio_credentials)
        for user in account['users']:
            create_user_and_group(user['name'], user['password'], account['name'], minio_credentials)
        set_read_write_policy_to_group = 'mc admin policy set ' + minio_credentials['alias'] + ' readwrite group=' + account['name']
        subprocess.run(set_read_write_policy_to_group, shell=True)
        create_policy(account['name'], minio_credentials)


def create_bucket(bucket_name, minio_credentials):
    create_bucket = 'mc mb ' +  minio_credentials['alias'] + '/' + bucket_name
    subprocess.run(create_bucket, shell=True)


def create_user_and_group(user, password, group, minio_credentials):
    create_user = 'mc admin user add ' + minio_credentials['alias'] + ' ' + user + ' ' + password
    subprocess.run(create_user, shell=True)

    create_group = 'mc admin group add ' + minio_credentials['alias'] + ' ' + group + ' ' + user
    subprocess.run(create_group, shell=True)


def create_policy(group, minio_credentials):
    read_write_group = 'rw' + group
    policy_filename = read_write_group + '.json'
    bucket_name = 'arn:aws:s3:::'+ group + '/*'
    policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": [
                    "s3:*"
                ],
                "Effect": "Allow",
                "Resource": [
                ],
                "Sid": ""
            }
        ]
    }

    policy["Statement"][0]["Resource"].append(bucket_name)
    with open(policy_filename, 'w') as file:
        json.dump(policy, file)

    create_policy = 'mc admin policy add ' + minio_credentials['alias'] + ' ' + read_write_group + ' ' + policy_filename
    subprocess.run(create_policy, shell=True)

    set_policy_to_group = 'mc admin policy set ' + minio_credentials['alias'] + ' ' + read_write_group + ' group=' + group
    subprocess.run(set_policy_to_group, shell=True)


if __name__ == '__main__':
    accounts = get_minio_accounts_from_values_file('values.yaml')
    credentials = get_minio_credentials_from_values_file('values.yaml')
    configure_minio(accounts, credentials)



