#Install utils
##Required packages for htop
sudo yum -y install epel-release
#######
sudo yum install htop
sudo yum install git
#Install docker
sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
#Configure docker user relations
#Sometimes it is required -> sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
sudo systemctl enable docker
#Install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
#Create required dirrectories
sudo mkdir -p /home/factory/deployment
sudo mkdir -p /mnt/data/shared
sudo chown -R factory:factory /home/factory/deployment
sudo chown -R factory:factory /mnt/data/shared
