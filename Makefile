TAG                         := $$(git log -1 --pretty=format:%h)
NAME_SERVER                 := $$env-2

ass:
	@echo ${TAG}
	@echo ${NAME_SERVER}