# Installation Docker CE

source : https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1

## Install using the repository

Before you install Docker CE for the first time on a new host machine, you need to set up the Docker repository. Afterward, you can install and update Docker from the repository.
Set up the repository

    Update the apt package index:

sudo apt-get update

    Install packages to allow apt to use a repository over HTTPS:

sudo apt-get install \
 apt-transport-https \
 ca-certificates \
 curl \
 software-properties-common

    Add Docker’s official GPG key:

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

    Verify that you now have the key with the fingerprint 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88, by searching for the last 8 characters of the fingerprint.

sudo apt-key fingerprint 0EBFCD88

    pub   4096R/0EBFCD88 2017-02-22
          Key fingerprint = 9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
    uid                  Docker Release (CE deb) <docker@docker.com>
    sub   4096R/F273FCD8 2017-02-22

    Use the following command to set up the stable repository. You always need the stable repository, even if you want to install builds from the edge or test repositories as well. To add the edge or test repository, add the word edge or test (or both) after the word stable in the commands below.

        Note: The lsb_release -cs sub-command below returns the name of your Ubuntu distribution, such as xenial. Sometimes, in a distribution like Linux Mint, you might need to change $(lsb_release -cs) to your parent Ubuntu distribution. For example, if you are using Linux Mint Rafaela, you could use trusty.

sudo add-apt-repository \
 "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
 $(lsb_release -cs) \
 stable"

            Note: Starting with Docker 17.06, stable releases are also pushed to the edge and test repositories.



            Install Docker CE

                Update the apt package index.

                $ sudo apt-get update

                Install the latest version of Docker CE, or go to the next step to install a specific version. Any existing installation of Docker is replaced.

                $ sudo apt-get install docker-ce

                    Got multiple Docker repositories?

                    If you have multiple Docker repositories enabled, installing or updating without specifying a version in the apt-get install or apt-get update command always installs the highest possible version, which may not be appropriate for your stability needs.

                On production systems, you should install a specific version of Docker CE instead of always using the latest. This output is truncated. List the available versions.

                $ apt-cache madison docker-ce

                docker-ce | 17.12.0~ce-0~ubuntu | https://download.docker.com/linux/ubuntu xenial/stable amd64 Packages

                The contents of the list depend upon which repositories are enabled. Choose a specific version to install. The second column is the version string. The third column is the repository name, which indicates which repository the package is from and by extension its stability level. To install a specific version, append the version string to the package name and separate them by an equals sign (=):

                $ sudo apt-get install docker-ce=<VERSION>

                The Docker daemon starts automatically.

                Verify that Docker CE is installed correctly by running the hello-world image.

sudo docker run hello-world

                This command downloads a test

image and runs it in a container. When the container runs, it prints an informational message and exits.

            Docker CE is installed and running. The docker group is created but no users are added to it. You need to use sudo to run Docker commands. Continue to Linux postinstall to allow non-privileged users to run Docker commands and for other optional configuration steps.
            Upgrade Docker CE

            To upgrade Docker CE, first run sudo apt-get update, then follow the installation instructions, choosing the new version you want to install.
