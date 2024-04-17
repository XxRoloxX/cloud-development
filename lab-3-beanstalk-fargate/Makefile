SHELL := /bin/bash
# Path: Makefile
destroy:
	cd aws && terraform destroy -var-file=terraform.tfvars

deploy_beanstalk:
	./build_frontend.sh && cd aws && terraform apply -var-file=terraform.tfvars
deploy_fargate:
	cd aws && terraform apply -var-file=terraform.tfvars


