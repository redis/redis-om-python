import unasync


def build(setup_kwargs):
    setup_kwargs.update(
        {"cmdclass": {'build_py': unasync.cmdclass_build_py(rules=[
            unasync.Rule("/aredis_om/", "/redis_om/"),
            unasync.Rule("/aredis_om/tests/", "/redis_om/tests/", additional_replacements={"aredis_om": "redis_om"}),
        ])}}
    )
