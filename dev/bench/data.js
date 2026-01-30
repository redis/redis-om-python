window.BENCHMARK_DATA = {
  "lastUpdate": 1769732134081,
  "repoUrl": "https://github.com/redis/redis-om-python",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "andrew.brookins@redis.com",
            "name": "Andrew Brookins",
            "username": "abrookins"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "b2d9ceab32765ee80386a018646d1def076a1ce8",
          "message": "Add benchmark regression detection (#799)\n\nAdd benchmark regression detection with github-action-benchmark",
          "timestamp": "2026-01-28T17:45:52-08:00",
          "tree_id": "46358a62b30d4c3df64993a5c65fbddecc80e1ca",
          "url": "https://github.com/redis/redis-om-python/commit/b2d9ceab32765ee80386a018646d1def076a1ce8"
        },
        "date": 1769651274655,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 920968.6559726145,
            "unit": "iter/sec",
            "range": "stddev: 2.239613046840372e-7",
            "extra": "mean: 1.0858132831284275 usec\nrounds: 21953"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 497197.22594354145,
            "unit": "iter/sec",
            "range": "stddev: 3.545191960766513e-7",
            "extra": "mean: 2.011274294827931 usec\nrounds: 35954"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 75574.85502410594,
            "unit": "iter/sec",
            "range": "stddev: 0.00000130066833900299",
            "extra": "mean: 13.231914234979774 usec\nrounds: 15694"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 70606.64861324239,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011011716892038396",
            "extra": "mean: 14.162972179541296 usec\nrounds: 17577"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 71612.69987995217,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012381713651060715",
            "extra": "mean: 13.964003614950258 usec\nrounds: 16045"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 65799.72461027511,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012636408394925082",
            "extra": "mean: 15.19763199501055 usec\nrounds: 19228"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1809.1184963302503,
            "unit": "iter/sec",
            "range": "stddev: 0.0000659911041462444",
            "extra": "mean: 552.7553900026305 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2539.5545138910475,
            "unit": "iter/sec",
            "range": "stddev: 0.000054044468692189205",
            "extra": "mean: 393.7698499993303 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2407.0660676178136,
            "unit": "iter/sec",
            "range": "stddev: 0.00013942661798730733",
            "extra": "mean: 415.44351999846185 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4122.048752249151,
            "unit": "iter/sec",
            "range": "stddev: 0.000025168591635201483",
            "extra": "mean: 242.59780999784653 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3377.376689560871,
            "unit": "iter/sec",
            "range": "stddev: 0.000024314815769157867",
            "extra": "mean: 296.08778999715923 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 2021.2976451962447,
            "unit": "iter/sec",
            "range": "stddev: 0.0016397298010955492",
            "extra": "mean: 494.7316899995258 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 360.1052708702814,
            "unit": "iter/sec",
            "range": "stddev: 0.00006233586595187541",
            "extra": "mean: 2.7769657399994685 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3434.7991315657696,
            "unit": "iter/sec",
            "range": "stddev: 0.00002813322557062576",
            "extra": "mean: 291.1378400006015 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 79.43442738536696,
            "unit": "iter/sec",
            "range": "stddev: 0.0005900360570534084",
            "extra": "mean: 12.588999920004653 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 2106.8305067250003,
            "unit": "iter/sec",
            "range": "stddev: 0.000022777510034913377",
            "extra": "mean: 474.64663000084784 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 636.5616382814709,
            "unit": "iter/sec",
            "range": "stddev: 0.00008953179201652732",
            "extra": "mean: 1.5709397800026181 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 48.58334734079935,
            "unit": "iter/sec",
            "range": "stddev: 0.0032643506494187844",
            "extra": "mean: 20.583184460001576 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1261.654470086675,
            "unit": "iter/sec",
            "range": "stddev: 0.00005826352522842739",
            "extra": "mean: 792.610039998749 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 2185.6795065669176,
            "unit": "iter/sec",
            "range": "stddev: 0.000026657113771130594",
            "extra": "mean: 457.52361999802815 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2970.2881776660806,
            "unit": "iter/sec",
            "range": "stddev: 0.000034002433689860395",
            "extra": "mean: 336.6676699988602 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2486.0529940723454,
            "unit": "iter/sec",
            "range": "stddev: 0.00007688751598848798",
            "extra": "mean: 402.2440400041205 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 864.6313153268605,
            "unit": "iter/sec",
            "range": "stddev: 0.000059223004631471264",
            "extra": "mean: 1.1565623200010577 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 715.162892226189,
            "unit": "iter/sec",
            "range": "stddev: 0.00009286545708239079",
            "extra": "mean: 1.3982828399934988 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 548.235190352283,
            "unit": "iter/sec",
            "range": "stddev: 0.00007591643958647358",
            "extra": "mean: 1.824034680001887 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Andrew Brookins",
            "username": "abrookins",
            "email": "andrew.brookins@redis.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "b2d9ceab32765ee80386a018646d1def076a1ce8",
          "message": "Add benchmark regression detection (#799)\n\nAdd benchmark regression detection with github-action-benchmark",
          "timestamp": "2026-01-29T01:45:52Z",
          "url": "https://github.com/redis/redis-om-python/commit/b2d9ceab32765ee80386a018646d1def076a1ce8"
        },
        "date": 1769667607077,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 923437.6529625127,
            "unit": "iter/sec",
            "range": "stddev: 1.990324982214446e-7",
            "extra": "mean: 1.0829101421106937 usec\nrounds: 25774"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 528808.1192722572,
            "unit": "iter/sec",
            "range": "stddev: 2.67251965452821e-7",
            "extra": "mean: 1.891045094723951 usec\nrounds: 32842"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 75731.32811635797,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012467805623239633",
            "extra": "mean: 13.204574974091862 usec\nrounds: 15472"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 69699.4206592024,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015348276900180858",
            "extra": "mean: 14.347321549335865 usec\nrounds: 18047"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 70482.80325962785,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013719163539908205",
            "extra": "mean: 14.18785794197823 usec\nrounds: 16803"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 61819.38233647604,
            "unit": "iter/sec",
            "range": "stddev: 0.000003084724689527071",
            "extra": "mean: 16.176156444868877 usec\nrounds: 16517"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1834.5447902753788,
            "unit": "iter/sec",
            "range": "stddev: 0.00012480683186627813",
            "extra": "mean: 545.094349999431 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2607.2666659856627,
            "unit": "iter/sec",
            "range": "stddev: 0.00006986606486609657",
            "extra": "mean: 383.54343000122526 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1827.8452037319025,
            "unit": "iter/sec",
            "range": "stddev: 0.00024349468073456778",
            "extra": "mean: 547.0922800017775 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4159.820814863618,
            "unit": "iter/sec",
            "range": "stddev: 0.000021689303138884947",
            "extra": "mean: 240.3949700013186 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3412.2202252527045,
            "unit": "iter/sec",
            "range": "stddev: 0.00002946988605421251",
            "extra": "mean: 293.0643199988481 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1959.6031725218181,
            "unit": "iter/sec",
            "range": "stddev: 0.001690917624606734",
            "extra": "mean: 510.3073999993057 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 341.44101410518135,
            "unit": "iter/sec",
            "range": "stddev: 0.00014583873339257575",
            "extra": "mean: 2.9287635599979467 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3348.2265799656293,
            "unit": "iter/sec",
            "range": "stddev: 0.00006448534426055602",
            "extra": "mean: 298.6655700016172 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 77.13717649672617,
            "unit": "iter/sec",
            "range": "stddev: 0.00021571949639467622",
            "extra": "mean: 12.963917599997217 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1884.8527970511984,
            "unit": "iter/sec",
            "range": "stddev: 0.00006199451040779085",
            "extra": "mean: 530.5454099993767 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 624.4396902656107,
            "unit": "iter/sec",
            "range": "stddev: 0.00009962290332603389",
            "extra": "mean: 1.6014356800008045 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 45.1707393418329,
            "unit": "iter/sec",
            "range": "stddev: 0.0037878510063878656",
            "extra": "mean: 22.13822520000008 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1217.9111914499797,
            "unit": "iter/sec",
            "range": "stddev: 0.00005248622135274357",
            "extra": "mean: 821.0779300003423 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1994.5089572766312,
            "unit": "iter/sec",
            "range": "stddev: 0.0000645868437082454",
            "extra": "mean: 501.37654000081966 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 3052.543492194109,
            "unit": "iter/sec",
            "range": "stddev: 0.000024030857967661033",
            "extra": "mean: 327.59565999867846 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2304.0260528195804,
            "unit": "iter/sec",
            "range": "stddev: 0.00018066125495919624",
            "extra": "mean: 434.0228700002058 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 847.0341818094191,
            "unit": "iter/sec",
            "range": "stddev: 0.00009906385019002532",
            "extra": "mean: 1.1805899000012232 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 652.9862563375194,
            "unit": "iter/sec",
            "range": "stddev: 0.00024872841636768467",
            "extra": "mean: 1.5314257999989422 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 514.641864689334,
            "unit": "iter/sec",
            "range": "stddev: 0.000149636314386996",
            "extra": "mean: 1.9430988199991361 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "andrew.brookins@redis.com",
            "name": "Andrew Brookins",
            "username": "abrookins"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "419f5ca27bb4c03bed02020c5ad4a79e93723034",
          "message": "Add separator parameter to Field() for TAG fields (#800)\n\nFixes #488 - TAG separators are now honored when creating indexes.\nUsers can specify custom separators via Field(separator=',')",
          "timestamp": "2026-01-29T16:13:30-08:00",
          "tree_id": "368fb4179b1f2d3ee77bb3b8bb17a354512b56b4",
          "url": "https://github.com/redis/redis-om-python/commit/419f5ca27bb4c03bed02020c5ad4a79e93723034"
        },
        "date": 1769732133085,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 917249.9823751585,
            "unit": "iter/sec",
            "range": "stddev: 3.107666690014826e-7",
            "extra": "mean: 1.0902153384735598 usec\nrounds: 20015"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 514370.8401329429,
            "unit": "iter/sec",
            "range": "stddev: 4.470375132470638e-7",
            "extra": "mean: 1.944122648440846 usec\nrounds: 45023"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68225.50445556467,
            "unit": "iter/sec",
            "range": "stddev: 0.000001998412219767322",
            "extra": "mean: 14.657275281142125 usec\nrounds: 17335"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64426.03024781696,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018592417723685983",
            "extra": "mean: 15.52167650487645 usec\nrounds: 24835"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63223.864794249625,
            "unit": "iter/sec",
            "range": "stddev: 0.00000191057325274532",
            "extra": "mean: 15.816812263127462 usec\nrounds: 23224"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58066.5780639881,
            "unit": "iter/sec",
            "range": "stddev: 0.000002865382649359653",
            "extra": "mean: 17.221610663849038 usec\nrounds: 17142"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1526.6252139034057,
            "unit": "iter/sec",
            "range": "stddev: 0.000028411086038656776",
            "extra": "mean: 655.039620001503 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2187.8284887835457,
            "unit": "iter/sec",
            "range": "stddev: 0.000026793641069948976",
            "extra": "mean: 457.07421999793496 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1934.0603775680627,
            "unit": "iter/sec",
            "range": "stddev: 0.00012059596875225704",
            "extra": "mean: 517.0469400016486 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3276.728396425532,
            "unit": "iter/sec",
            "range": "stddev: 0.000012839088382635266",
            "extra": "mean: 305.18244999825583 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2711.9522924117623,
            "unit": "iter/sec",
            "range": "stddev: 0.0000333573721743128",
            "extra": "mean: 368.73805000112725 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1678.0433249639227,
            "unit": "iter/sec",
            "range": "stddev: 0.0017369125575951924",
            "extra": "mean: 595.9321700001396 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 318.9663713564654,
            "unit": "iter/sec",
            "range": "stddev: 0.000049441213078589254",
            "extra": "mean: 3.135126739998668 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2537.800539028384,
            "unit": "iter/sec",
            "range": "stddev: 0.00003402624699767188",
            "extra": "mean: 394.04200000006995 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.97590904391885,
            "unit": "iter/sec",
            "range": "stddev: 0.00019562135056197346",
            "extra": "mean: 14.290632499998992 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1639.5330236139591,
            "unit": "iter/sec",
            "range": "stddev: 0.00002850595983816084",
            "extra": "mean: 609.9297699998374 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 559.314775414891,
            "unit": "iter/sec",
            "range": "stddev: 0.000047824839761739016",
            "extra": "mean: 1.7879019899987725 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.649466289307796,
            "unit": "iter/sec",
            "range": "stddev: 0.0033229314016542605",
            "extra": "mean: 23.44695226000283 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1055.2977721071902,
            "unit": "iter/sec",
            "range": "stddev: 0.000025172478558558306",
            "extra": "mean: 947.5998399989294 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1566.7682439057498,
            "unit": "iter/sec",
            "range": "stddev: 0.00003525478010212643",
            "extra": "mean: 638.2564900007992 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2384.675995741108,
            "unit": "iter/sec",
            "range": "stddev: 0.000031742088407964694",
            "extra": "mean: 419.34418000010965 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2132.962027306523,
            "unit": "iter/sec",
            "range": "stddev: 0.00007154840364621396",
            "extra": "mean: 468.83159999936197 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 745.7389594470251,
            "unit": "iter/sec",
            "range": "stddev: 0.00003791549080663405",
            "extra": "mean: 1.340951799999175 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 611.8167111664316,
            "unit": "iter/sec",
            "range": "stddev: 0.00009529110445378546",
            "extra": "mean: 1.6344764400002987 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 471.33506959445094,
            "unit": "iter/sec",
            "range": "stddev: 0.00007672376118123301",
            "extra": "mean: 2.121632919995591 msec\nrounds: 50"
          }
        ]
      }
    ]
  }
}