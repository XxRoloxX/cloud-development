SHELL := /bin/bash
# Path: Makefile
deploy_aws:
	cd aws && terraform apply -var-file=terraform.tfvars
destroy_aws:
	cd aws && terraform destroy -var-file=terraform.tfvars
deploy_docker:
	cd docker && terraform apply -var-file=terraform.tfvars
destroy_docker:
	cd docker && terraform destroy -var-file=terraform.tfvars

full_deploy:
	make deploy_aws
	# Build frotend image with new backend address
	./build_frontend.sh
	# Wait for host to be ready
	sleep 30
	make deploy_docker
	# Open frontend in browser
	./open_frontend.sh

full_destroy:
	make destroy_docker
	make destroy_aws

