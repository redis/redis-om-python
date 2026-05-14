window.BENCHMARK_DATA = {
  "lastUpdate": 1778742516455,
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
      },
      {
        "commit": {
          "author": {
            "email": "a.m.brookins@gmail.com",
            "name": "Andrew Brookins",
            "username": "abrookins"
          },
          "committer": {
            "email": "a.m.brookins@gmail.com",
            "name": "Andrew Brookins",
            "username": "abrookins"
          },
          "distinct": true,
          "id": "59aecd6753183e757434e1ba03f99cd482c8d96f",
          "message": "Don't fail build on benchmark regression, just report",
          "timestamp": "2026-01-29T17:38:06-08:00",
          "tree_id": "8b60c0931ec6a6763e2f3e2aaece90bf48f93900",
          "url": "https://github.com/redis/redis-om-python/commit/59aecd6753183e757434e1ba03f99cd482c8d96f"
        },
        "date": 1769737216225,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 913191.2745757421,
            "unit": "iter/sec",
            "range": "stddev: 3.2169884610001773e-7",
            "extra": "mean: 1.0950608353814903 usec\nrounds: 24706"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 473906.1920096556,
            "unit": "iter/sec",
            "range": "stddev: 8.723212799386873e-7",
            "extra": "mean: 2.110122249636328 usec\nrounds: 38495"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67025.24763592609,
            "unit": "iter/sec",
            "range": "stddev: 0.000002213740016955382",
            "extra": "mean: 14.919750918816323 usec\nrounds: 9796"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63347.70885887698,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019026573350960077",
            "extra": "mean: 15.785890571476745 usec\nrounds: 23376"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62113.608535631276,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021626955810668584",
            "extra": "mean: 16.099531545109848 usec\nrounds: 21287"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 56704.3939799881,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022369723986725395",
            "extra": "mean: 17.635317650214485 usec\nrounds: 22572"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1415.5965158082522,
            "unit": "iter/sec",
            "range": "stddev: 0.00004600132509077082",
            "extra": "mean: 706.4159800005143 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 1979.4871291407328,
            "unit": "iter/sec",
            "range": "stddev: 0.00004182836035315412",
            "extra": "mean: 505.1813599990851 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1859.8286223707487,
            "unit": "iter/sec",
            "range": "stddev: 0.00014093126524689106",
            "extra": "mean: 537.6839500003427 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3125.6193610106966,
            "unit": "iter/sec",
            "range": "stddev: 0.00002768239514010708",
            "extra": "mean: 319.9365900000828 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2689.1403503998085,
            "unit": "iter/sec",
            "range": "stddev: 0.0000237866431704125",
            "extra": "mean: 371.8660500004489 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1778.5042928295647,
            "unit": "iter/sec",
            "range": "stddev: 0.0015530043391087513",
            "extra": "mean: 562.2702199998741 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 321.9353040357673,
            "unit": "iter/sec",
            "range": "stddev: 0.00012144298533603612",
            "extra": "mean: 3.1062141600006044 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2485.1070022434765,
            "unit": "iter/sec",
            "range": "stddev: 0.000024361116685165097",
            "extra": "mean: 402.39716000044723 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.61472738542084,
            "unit": "iter/sec",
            "range": "stddev: 0.00024983966767969914",
            "extra": "mean: 14.364776500000005 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1604.831724647464,
            "unit": "iter/sec",
            "range": "stddev: 0.000028478031980137855",
            "extra": "mean: 623.118289999951 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 543.2720271314902,
            "unit": "iter/sec",
            "range": "stddev: 0.0000499089093156423",
            "extra": "mean: 1.8406984899996814 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 40.852494761601854,
            "unit": "iter/sec",
            "range": "stddev: 0.004496263757347958",
            "extra": "mean: 24.478309240000726 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1010.819907260669,
            "unit": "iter/sec",
            "range": "stddev: 0.00004013423153737611",
            "extra": "mean: 989.2959100004362 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1584.4071771798278,
            "unit": "iter/sec",
            "range": "stddev: 0.000015686295512493153",
            "extra": "mean: 631.150890000356 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2333.245891055374,
            "unit": "iter/sec",
            "range": "stddev: 0.000033064522620518816",
            "extra": "mean: 428.5874899998987 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2005.503341828417,
            "unit": "iter/sec",
            "range": "stddev: 0.00009195126827585605",
            "extra": "mean: 498.627940000489 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 743.4029271969904,
            "unit": "iter/sec",
            "range": "stddev: 0.00004568952600626282",
            "extra": "mean: 1.3451655399993 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 595.6320845895808,
            "unit": "iter/sec",
            "range": "stddev: 0.00009454364392442677",
            "extra": "mean: 1.6788887399997066 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 469.1183649337401,
            "unit": "iter/sec",
            "range": "stddev: 0.00008114293079528765",
            "extra": "mean: 2.1316581800016365 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "a.m.brookins@gmail.com",
            "name": "Andrew Brookins",
            "username": "abrookins"
          },
          "committer": {
            "email": "a.m.brookins@gmail.com",
            "name": "Andrew Brookins",
            "username": "abrookins"
          },
          "distinct": true,
          "id": "9d039644cc8af796770970b543689d62809afccb",
          "message": "Bump version to 1.0.5",
          "timestamp": "2026-01-29T17:40:00-08:00",
          "tree_id": "1395d1d41beb0f5f5390cc2f42bdad336c768b70",
          "url": "https://github.com/redis/redis-om-python/commit/9d039644cc8af796770970b543689d62809afccb"
        },
        "date": 1769737322293,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 879257.5909212277,
            "unit": "iter/sec",
            "range": "stddev: 5.863880423731868e-7",
            "extra": "mean: 1.1373231352512594 usec\nrounds: 29025"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 509437.64900220867,
            "unit": "iter/sec",
            "range": "stddev: 4.193998830688742e-7",
            "extra": "mean: 1.9629487572397002 usec\nrounds: 46426"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67588.02691630539,
            "unit": "iter/sec",
            "range": "stddev: 0.000001952508591364654",
            "extra": "mean: 14.79551994080705 usec\nrounds: 17552"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 62506.163678541256,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020938585274894995",
            "extra": "mean: 15.998422253888958 usec\nrounds: 23834"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 61861.05212317331,
            "unit": "iter/sec",
            "range": "stddev: 0.00000280750421618579",
            "extra": "mean: 16.165260138299484 usec\nrounds: 22415"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58358.120107252675,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023453698066046235",
            "extra": "mean: 17.135575960331888 usec\nrounds: 15225"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1523.9773064587207,
            "unit": "iter/sec",
            "range": "stddev: 0.000030053473260150797",
            "extra": "mean: 656.1777499979371 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2232.7721699685376,
            "unit": "iter/sec",
            "range": "stddev: 0.00003015972030657934",
            "extra": "mean: 447.8737299982072 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1893.4602911167553,
            "unit": "iter/sec",
            "range": "stddev: 0.0001280017605155093",
            "extra": "mean: 528.1335999976022 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3309.39307351716,
            "unit": "iter/sec",
            "range": "stddev: 0.000020082699095427803",
            "extra": "mean: 302.1702100008383 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2911.600602933308,
            "unit": "iter/sec",
            "range": "stddev: 0.00003797980286761904",
            "extra": "mean: 343.45370000011144 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1751.0176827242674,
            "unit": "iter/sec",
            "range": "stddev: 0.0015345565842146804",
            "extra": "mean: 571.0964599992963 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 329.7452760611374,
            "unit": "iter/sec",
            "range": "stddev: 0.00005659096478924195",
            "extra": "mean: 3.0326438999981065 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2539.762457544397,
            "unit": "iter/sec",
            "range": "stddev: 0.000022668837969668448",
            "extra": "mean: 393.7376099995049 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.85494628256133,
            "unit": "iter/sec",
            "range": "stddev: 0.00023043049777628813",
            "extra": "mean: 14.113340739997398 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1676.605556465731,
            "unit": "iter/sec",
            "range": "stddev: 0.000025964047585866563",
            "extra": "mean: 596.4432099986539 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 584.374947588767,
            "unit": "iter/sec",
            "range": "stddev: 0.00005948334661969669",
            "extra": "mean: 1.7112301000003072 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 44.06846887690396,
            "unit": "iter/sec",
            "range": "stddev: 0.002931871387318763",
            "extra": "mean: 22.691961519999495 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1087.962875575087,
            "unit": "iter/sec",
            "range": "stddev: 0.000048050536089458424",
            "extra": "mean: 919.1490099985344 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1532.5238103232384,
            "unit": "iter/sec",
            "range": "stddev: 0.0000368601442206132",
            "extra": "mean: 652.5184100004822 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2338.7630445942355,
            "unit": "iter/sec",
            "range": "stddev: 0.000036036530943675546",
            "extra": "mean: 427.57645000051525 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2115.8256714464237,
            "unit": "iter/sec",
            "range": "stddev: 0.0000693791648573061",
            "extra": "mean: 472.62873000136096 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 734.4874559981174,
            "unit": "iter/sec",
            "range": "stddev: 0.00005083525203325544",
            "extra": "mean: 1.3614936399983435 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 601.6543521251997,
            "unit": "iter/sec",
            "range": "stddev: 0.00009559703371085685",
            "extra": "mean: 1.6620838800014326 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 479.46520067940327,
            "unit": "iter/sec",
            "range": "stddev: 0.00008634880615198641",
            "extra": "mean: 2.0856571000001622 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Andrew Brookins",
            "username": "abrookins",
            "email": "a.m.brookins@gmail.com"
          },
          "committer": {
            "name": "Andrew Brookins",
            "username": "abrookins",
            "email": "a.m.brookins@gmail.com"
          },
          "id": "9d039644cc8af796770970b543689d62809afccb",
          "message": "Bump version to 1.0.5",
          "timestamp": "2026-01-30T01:40:00Z",
          "url": "https://github.com/redis/redis-om-python/commit/9d039644cc8af796770970b543689d62809afccb"
        },
        "date": 1769754022438,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 917221.9414060097,
            "unit": "iter/sec",
            "range": "stddev: 2.9922695250464843e-7",
            "extra": "mean: 1.0902486681327093 usec\nrounds: 26839"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 511019.5121027161,
            "unit": "iter/sec",
            "range": "stddev: 3.9871485170385476e-7",
            "extra": "mean: 1.956872440907888 usec\nrounds: 40248"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67429.37486337482,
            "unit": "iter/sec",
            "range": "stddev: 0.0000036825722690773703",
            "extra": "mean: 14.830331766032188 usec\nrounds: 12548"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64891.284504906296,
            "unit": "iter/sec",
            "range": "stddev: 0.0000025836375030607673",
            "extra": "mean: 15.410389971929007 usec\nrounds: 16773"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64527.11037654602,
            "unit": "iter/sec",
            "range": "stddev: 0.000002121971928691031",
            "extra": "mean: 15.497362181020195 usec\nrounds: 20926"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59353.79632936103,
            "unit": "iter/sec",
            "range": "stddev: 0.000002216959997630995",
            "extra": "mean: 16.84812197101741 usec\nrounds: 23481"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1417.7095858220848,
            "unit": "iter/sec",
            "range": "stddev: 0.00006424471920642867",
            "extra": "mean: 705.3630799993016 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2110.7403736325678,
            "unit": "iter/sec",
            "range": "stddev: 0.00004443967051139827",
            "extra": "mean: 473.76741000078937 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1876.2656819173228,
            "unit": "iter/sec",
            "range": "stddev: 0.00015177015722942213",
            "extra": "mean: 532.9735600014374 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3334.09261735509,
            "unit": "iter/sec",
            "range": "stddev: 0.000031795288820875544",
            "extra": "mean: 299.9316800003271 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2775.033038862557,
            "unit": "iter/sec",
            "range": "stddev: 0.000023125323891868546",
            "extra": "mean: 360.3560699983177 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1703.550813165324,
            "unit": "iter/sec",
            "range": "stddev: 0.0017024394728501068",
            "extra": "mean: 587.0092000026261 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 324.98918403477666,
            "unit": "iter/sec",
            "range": "stddev: 0.00009523083661537768",
            "extra": "mean: 3.0770254800017938 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2521.772415637877,
            "unit": "iter/sec",
            "range": "stddev: 0.000054216034096904686",
            "extra": "mean: 396.54648999999154 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.20779685274856,
            "unit": "iter/sec",
            "range": "stddev: 0.000691870782418557",
            "extra": "mean: 14.243432279998274 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1645.8825441943218,
            "unit": "iter/sec",
            "range": "stddev: 0.00003548242312243632",
            "extra": "mean: 607.5767699994117 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 560.3227880623131,
            "unit": "iter/sec",
            "range": "stddev: 0.00004852215987612227",
            "extra": "mean: 1.784685579999632 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.89936782962889,
            "unit": "iter/sec",
            "range": "stddev: 0.003523447044385669",
            "extra": "mean: 23.866708539999877 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1021.5348014901864,
            "unit": "iter/sec",
            "range": "stddev: 0.00003046584515859592",
            "extra": "mean: 978.9191699991306 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1518.4443076444334,
            "unit": "iter/sec",
            "range": "stddev: 0.00004734474491330323",
            "extra": "mean: 658.568770000727 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2193.2174574789556,
            "unit": "iter/sec",
            "range": "stddev: 0.00003649270467452003",
            "extra": "mean: 455.95113999752357 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2039.8741128447484,
            "unit": "iter/sec",
            "range": "stddev: 0.00009259810105127433",
            "extra": "mean: 490.226329999075 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 733.7285028730518,
            "unit": "iter/sec",
            "range": "stddev: 0.00006651728014476806",
            "extra": "mean: 1.362901940001393 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 597.2437963281417,
            "unit": "iter/sec",
            "range": "stddev: 0.00010079791756184733",
            "extra": "mean: 1.6743581199972368 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 479.30536765481213,
            "unit": "iter/sec",
            "range": "stddev: 0.00010125565894905208",
            "extra": "mean: 2.086352599998804 msec\nrounds: 50"
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
          "id": "2a27d4859985841f1acf6e8f5f4323b05c0512a2",
          "message": "Fix pyright type resolution for Pipeline parameter (#802)\n\nDirect import of Pipeline from redis.asyncio.client allows pyright\nto correctly resolve the type instead of showing Unknown.",
          "timestamp": "2026-01-30T13:39:56-08:00",
          "tree_id": "5445c1d5965b3fc97f3fe0e1b22f0fc00ac9ffe6",
          "url": "https://github.com/redis/redis-om-python/commit/2a27d4859985841f1acf6e8f5f4323b05c0512a2"
        },
        "date": 1769809326265,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 903806.8604240658,
            "unit": "iter/sec",
            "range": "stddev: 3.1045837491009653e-7",
            "extra": "mean: 1.1064310792361107 usec\nrounds: 26661"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 512509.56391856197,
            "unit": "iter/sec",
            "range": "stddev: 3.912749194939133e-7",
            "extra": "mean: 1.951183100573125 usec\nrounds: 43173"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67627.27181021112,
            "unit": "iter/sec",
            "range": "stddev: 0.000002023152830167895",
            "extra": "mean: 14.786933928170214 usec\nrounds: 16921"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63034.90468975052,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019114550643633817",
            "extra": "mean: 15.864226414267904 usec\nrounds: 24411"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63115.270080768605,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017022665193263622",
            "extra": "mean: 15.844026314397452 usec\nrounds: 18887"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 57698.93085581165,
            "unit": "iter/sec",
            "range": "stddev: 0.000002241111090016611",
            "extra": "mean: 17.331343669070364 usec\nrounds: 22737"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1590.0345285517596,
            "unit": "iter/sec",
            "range": "stddev: 0.0000360115075814188",
            "extra": "mean: 628.9171600008103 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2162.498342987188,
            "unit": "iter/sec",
            "range": "stddev: 0.00003049869546675161",
            "extra": "mean: 462.42809999966994 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1913.253287283299,
            "unit": "iter/sec",
            "range": "stddev: 0.00012178102554573232",
            "extra": "mean: 522.6699499991128 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3169.3237854806134,
            "unit": "iter/sec",
            "range": "stddev: 0.000017181261562147152",
            "extra": "mean: 315.52471999901854 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2765.162874325695,
            "unit": "iter/sec",
            "range": "stddev: 0.000033695832341450966",
            "extra": "mean: 361.6423499985899 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1800.8685949411274,
            "unit": "iter/sec",
            "range": "stddev: 0.001535452772820716",
            "extra": "mean: 555.2875999998719 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 318.9457928087876,
            "unit": "iter/sec",
            "range": "stddev: 0.000050153147802787376",
            "extra": "mean: 3.1353290199990624 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2626.0162847283227,
            "unit": "iter/sec",
            "range": "stddev: 0.00003847909613921318",
            "extra": "mean: 380.80494999803705 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.29626775388479,
            "unit": "iter/sec",
            "range": "stddev: 0.00040518013055091464",
            "extra": "mean: 14.430791619999468 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1610.5586939517252,
            "unit": "iter/sec",
            "range": "stddev: 0.00003436857741586899",
            "extra": "mean: 620.9025500004373 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 550.8420035907094,
            "unit": "iter/sec",
            "range": "stddev: 0.00005559605964904035",
            "extra": "mean: 1.8154025900011561 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.820188648897016,
            "unit": "iter/sec",
            "range": "stddev: 0.003187314121519289",
            "extra": "mean: 23.911895960000038 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1055.845806983081,
            "unit": "iter/sec",
            "range": "stddev: 0.00002894272643222999",
            "extra": "mean: 947.1079899984147 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1713.2968972175315,
            "unit": "iter/sec",
            "range": "stddev: 0.0000228630735803329",
            "extra": "mean: 583.670000000609 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2434.6703682769444,
            "unit": "iter/sec",
            "range": "stddev: 0.000033892964020684454",
            "extra": "mean: 410.73321999959944 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2094.8588978557877,
            "unit": "iter/sec",
            "range": "stddev: 0.0000733214408088239",
            "extra": "mean: 477.3591199978 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 744.0528340605524,
            "unit": "iter/sec",
            "range": "stddev: 0.000027354253772710317",
            "extra": "mean: 1.3439905800004226 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 579.974128978473,
            "unit": "iter/sec",
            "range": "stddev: 0.00020601885113946008",
            "extra": "mean: 1.7242148399986945 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 471.96536582185433,
            "unit": "iter/sec",
            "range": "stddev: 0.0000854877082198601",
            "extra": "mean: 2.1187995400015325 msec\nrounds: 50"
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
          "id": "43a7d4936535cca258ea2e19abce64884d4be5c3",
          "message": "Fix packaging bug: include generated sync code in wheel (v1.0.6) (#803)\n\nFix packaging bug: include generated sync code in wheel\n\n- Add artifacts option to pyproject.toml so hatchling includes redis_om/\n  files that are in .gitignore (generated by make sync)\n- Fix supports_hash_field_expiration() to check sync Redis class in\n  generated sync code via post-processing in make_sync.py\n- Bump version to 1.0.6",
          "timestamp": "2026-01-30T14:34:58-08:00",
          "tree_id": "f3b5cf1e41ff20e79b1922d6c47cdbb183aa23c0",
          "url": "https://github.com/redis/redis-om-python/commit/43a7d4936535cca258ea2e19abce64884d4be5c3"
        },
        "date": 1769812622615,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 863812.0097173633,
            "unit": "iter/sec",
            "range": "stddev: 3.216988052887154e-7",
            "extra": "mean: 1.1576592924740619 usec\nrounds: 29427"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 483589.9392825543,
            "unit": "iter/sec",
            "range": "stddev: 4.868135714407075e-7",
            "extra": "mean: 2.0678676679741987 usec\nrounds: 44940"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 66674.64328517081,
            "unit": "iter/sec",
            "range": "stddev: 0.000003050882373560925",
            "extra": "mean: 14.99820547555012 usec\nrounds: 17350"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63028.50183957946,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018863505722320056",
            "extra": "mean: 15.865838006830725 usec\nrounds: 23822"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62668.11460307048,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020526417783959652",
            "extra": "mean: 15.957078114346274 usec\nrounds: 22211"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58362.461238986696,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021580008069041027",
            "extra": "mean: 17.13430137747498 usec\nrounds: 23376"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1527.5001970463284,
            "unit": "iter/sec",
            "range": "stddev: 0.00003423742538473943",
            "extra": "mean: 654.6644000005131 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2221.4297641834064,
            "unit": "iter/sec",
            "range": "stddev: 0.000028648621903247437",
            "extra": "mean: 450.1605299988398 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1957.9137817783414,
            "unit": "iter/sec",
            "range": "stddev: 0.00013400437910309827",
            "extra": "mean: 510.7477200000688 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3414.2422246390474,
            "unit": "iter/sec",
            "range": "stddev: 0.00001150490834495518",
            "extra": "mean: 292.8907600004038 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2806.8174227066797,
            "unit": "iter/sec",
            "range": "stddev: 0.000032645157310322195",
            "extra": "mean: 356.27539999936175 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1885.7698674335727,
            "unit": "iter/sec",
            "range": "stddev: 0.0014014334992746354",
            "extra": "mean: 530.2874000001623 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 317.8916409120397,
            "unit": "iter/sec",
            "range": "stddev: 0.00006060571394094967",
            "extra": "mean: 3.145726000001048 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2599.5350939425207,
            "unit": "iter/sec",
            "range": "stddev: 0.00003429876197400835",
            "extra": "mean: 384.68417000032673 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.11977866807955,
            "unit": "iter/sec",
            "range": "stddev: 0.000184966225696532",
            "extra": "mean: 14.467638919998649 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1667.7794090883788,
            "unit": "iter/sec",
            "range": "stddev: 0.00003599880530802435",
            "extra": "mean: 599.5996800000114 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 557.1666928134734,
            "unit": "iter/sec",
            "range": "stddev: 0.00003137481190174499",
            "extra": "mean: 1.794795010000314 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.252862529604876,
            "unit": "iter/sec",
            "range": "stddev: 0.0030695462047581543",
            "extra": "mean: 23.66703556000118 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1029.8664886229153,
            "unit": "iter/sec",
            "range": "stddev: 0.00010560006616459152",
            "extra": "mean: 970.9996500004081 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1653.1828663577462,
            "unit": "iter/sec",
            "range": "stddev: 0.00001644482078736172",
            "extra": "mean: 604.8937600007775 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2431.7294983050365,
            "unit": "iter/sec",
            "range": "stddev: 0.00003367523629526598",
            "extra": "mean: 411.229949999381 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2145.9912250877783,
            "unit": "iter/sec",
            "range": "stddev: 0.0000624382559029906",
            "extra": "mean: 465.9851299993534 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 740.6713480647188,
            "unit": "iter/sec",
            "range": "stddev: 0.000044333237378508116",
            "extra": "mean: 1.3501264800007107 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 604.4037631822818,
            "unit": "iter/sec",
            "range": "stddev: 0.00012268397211482847",
            "extra": "mean: 1.6545231199998511 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 476.9074816081637,
            "unit": "iter/sec",
            "range": "stddev: 0.00007668337948102939",
            "extra": "mean: 2.096842760000186 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1769840059095,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 866637.6639362122,
            "unit": "iter/sec",
            "range": "stddev: 2.0947993762122535e-7",
            "extra": "mean: 1.1538847682410485 usec\nrounds: 25158"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 483775.19262059615,
            "unit": "iter/sec",
            "range": "stddev: 3.625811803175142e-7",
            "extra": "mean: 2.067075813836235 usec\nrounds: 38832"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 76136.7452341431,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011224120115481511",
            "extra": "mean: 13.13426252888409 usec\nrounds: 17480"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 70259.7619105279,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012868494229913748",
            "extra": "mean: 14.232897647353932 usec\nrounds: 22442"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 70410.44490403039,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012185105159535552",
            "extra": "mean: 14.202438308165819 usec\nrounds: 22272"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 64123.16641231128,
            "unit": "iter/sec",
            "range": "stddev: 0.000002046437069727274",
            "extra": "mean: 15.59498783279058 usec\nrounds: 23506"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1924.8616029348555,
            "unit": "iter/sec",
            "range": "stddev: 0.000044622396977635315",
            "extra": "mean: 519.5178699992198 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2453.28925001675,
            "unit": "iter/sec",
            "range": "stddev: 0.00003975962042783667",
            "extra": "mean: 407.6160199997503 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2382.399632000941,
            "unit": "iter/sec",
            "range": "stddev: 0.00015766671467584096",
            "extra": "mean: 419.7448600007192 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4316.7930371651855,
            "unit": "iter/sec",
            "range": "stddev: 0.000014381472359023898",
            "extra": "mean: 231.65345000109028 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3438.040578162934,
            "unit": "iter/sec",
            "range": "stddev: 0.00003293169178020055",
            "extra": "mean: 290.8633499998814 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 2113.4035434145653,
            "unit": "iter/sec",
            "range": "stddev: 0.001553969691901305",
            "extra": "mean: 473.17040000052657 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 351.80597309555947,
            "unit": "iter/sec",
            "range": "stddev: 0.00008824266498879587",
            "extra": "mean: 2.8424758999994992 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3092.9672975763747,
            "unit": "iter/sec",
            "range": "stddev: 0.00003157546814377938",
            "extra": "mean: 323.3141199984857 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 77.81509845235568,
            "unit": "iter/sec",
            "range": "stddev: 0.0005528235060948989",
            "extra": "mean: 12.850976479998621 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 2078.742560308103,
            "unit": "iter/sec",
            "range": "stddev: 0.00005134490815151503",
            "extra": "mean: 481.060050000508 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 651.3910259941495,
            "unit": "iter/sec",
            "range": "stddev: 0.00004886949077097373",
            "extra": "mean: 1.5351762000003077 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 47.75103320295872,
            "unit": "iter/sec",
            "range": "stddev: 0.003330807164820845",
            "extra": "mean: 20.941955239997583 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1239.0031808029205,
            "unit": "iter/sec",
            "range": "stddev: 0.00004636050342097564",
            "extra": "mean: 807.1004300020945 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1853.3435531725318,
            "unit": "iter/sec",
            "range": "stddev: 0.00003518612814131109",
            "extra": "mean: 539.56536999749 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2643.542088396654,
            "unit": "iter/sec",
            "range": "stddev: 0.0000343819641766264",
            "extra": "mean: 378.28033999886657 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2640.539060773373,
            "unit": "iter/sec",
            "range": "stddev: 0.0000722696004241573",
            "extra": "mean: 378.7105499992549 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 871.6587750180267,
            "unit": "iter/sec",
            "range": "stddev: 0.00005718629791846199",
            "extra": "mean: 1.1472379199983607 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 719.6083695504063,
            "unit": "iter/sec",
            "range": "stddev: 0.00010106151338647886",
            "extra": "mean: 1.389644760002966 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 551.7356931788438,
            "unit": "iter/sec",
            "range": "stddev: 0.00007649201128496645",
            "extra": "mean: 1.8124620400004687 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1769926932840,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 924224.5945335539,
            "unit": "iter/sec",
            "range": "stddev: 2.9334289544168853e-7",
            "extra": "mean: 1.081988085920489 usec\nrounds: 22914"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 502346.0176442202,
            "unit": "iter/sec",
            "range": "stddev: 5.399599357991854e-7",
            "extra": "mean: 1.9906597541860807 usec\nrounds: 40362"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69310.1356563534,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019827880041623906",
            "extra": "mean: 14.427904238394513 usec\nrounds: 15737"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65427.79335494785,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019162848952047513",
            "extra": "mean: 15.28402455169118 usec\nrounds: 22972"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64354.10454535404,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019546797275579134",
            "extra": "mean: 15.539024388028622 usec\nrounds: 21937"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 57215.13163027287,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020577401105949807",
            "extra": "mean: 17.477893898104643 usec\nrounds: 19453"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1444.7271309896796,
            "unit": "iter/sec",
            "range": "stddev: 0.0000469259335694774",
            "extra": "mean: 692.1722300009492 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2138.4350119974374,
            "unit": "iter/sec",
            "range": "stddev: 0.00004546862896448836",
            "extra": "mean: 467.63170000005516 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1898.8183501504436,
            "unit": "iter/sec",
            "range": "stddev: 0.0001380396085072751",
            "extra": "mean: 526.6433199999199 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3298.874064592054,
            "unit": "iter/sec",
            "range": "stddev: 0.00002949992087582412",
            "extra": "mean: 303.1337299999848 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2820.875664691012,
            "unit": "iter/sec",
            "range": "stddev: 0.000025294489294693648",
            "extra": "mean: 354.49984999942785 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1834.4628763336075,
            "unit": "iter/sec",
            "range": "stddev: 0.0014519116362212395",
            "extra": "mean: 545.1186899996685 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 329.7919786966898,
            "unit": "iter/sec",
            "range": "stddev: 0.00007104475576170278",
            "extra": "mean: 3.0322144399991657 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2471.035754408823,
            "unit": "iter/sec",
            "range": "stddev: 0.000024597829399424525",
            "extra": "mean: 404.68859999933215 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.30482448514225,
            "unit": "iter/sec",
            "range": "stddev: 0.00024648703471587214",
            "extra": "mean: 14.42900992000034 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1623.565336489208,
            "unit": "iter/sec",
            "range": "stddev: 0.000026617801855331252",
            "extra": "mean: 615.9284000004561 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 556.2501605821149,
            "unit": "iter/sec",
            "range": "stddev: 0.0000581475651025792",
            "extra": "mean: 1.7977522900011422 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.91540848877333,
            "unit": "iter/sec",
            "range": "stddev: 0.003529863877543994",
            "extra": "mean: 23.85757496000167 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1014.1792502396619,
            "unit": "iter/sec",
            "range": "stddev: 0.00002905024975065577",
            "extra": "mean: 986.0189899997351 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1598.95234084334,
            "unit": "iter/sec",
            "range": "stddev: 0.00003438654655896179",
            "extra": "mean: 625.4095099998835 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2374.6337632061595,
            "unit": "iter/sec",
            "range": "stddev: 0.000023541829448633194",
            "extra": "mean: 421.1175699994385 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2094.689561873857,
            "unit": "iter/sec",
            "range": "stddev: 0.00008608842701573959",
            "extra": "mean: 477.3977100002469 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 725.6168643117461,
            "unit": "iter/sec",
            "range": "stddev: 0.00007107594667665691",
            "extra": "mean: 1.3781377599988787 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 582.2922956399151,
            "unit": "iter/sec",
            "range": "stddev: 0.00016712112414515995",
            "extra": "mean: 1.717350559998465 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 458.7585470732081,
            "unit": "iter/sec",
            "range": "stddev: 0.00012732454466834965",
            "extra": "mean: 2.1797958999997036 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1770445069800,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 918403.8497825502,
            "unit": "iter/sec",
            "range": "stddev: 2.964185358150641e-7",
            "extra": "mean: 1.0888456099533657 usec\nrounds: 22346"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 525154.3091108894,
            "unit": "iter/sec",
            "range": "stddev: 4.752438470845615e-7",
            "extra": "mean: 1.904202217616849 usec\nrounds: 39863"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70343.43711596433,
            "unit": "iter/sec",
            "range": "stddev: 0.000001992149342426351",
            "extra": "mean: 14.215967274266893 usec\nrounds: 16898"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65827.64656500085,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017868726159461172",
            "extra": "mean: 15.191185651951875 usec\nrounds: 22930"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 65318.762533733534,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022573928116634276",
            "extra": "mean: 15.309536819279993 usec\nrounds: 18876"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58675.10875182743,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023280667051494933",
            "extra": "mean: 17.043002071450868 usec\nrounds: 22690"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1520.05442767515,
            "unit": "iter/sec",
            "range": "stddev: 0.00003041057854487165",
            "extra": "mean: 657.8711800007397 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2163.305416454992,
            "unit": "iter/sec",
            "range": "stddev: 0.000030789158470676915",
            "extra": "mean: 462.25557999974853 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1823.5024003287301,
            "unit": "iter/sec",
            "range": "stddev: 0.0001463756966400686",
            "extra": "mean: 548.395220000657 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3100.9357693856073,
            "unit": "iter/sec",
            "range": "stddev: 0.000019140076593600802",
            "extra": "mean: 322.4833000001581 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2694.7181072975845,
            "unit": "iter/sec",
            "range": "stddev: 0.00003849822200639076",
            "extra": "mean: 371.09632999900555 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1697.780042237664,
            "unit": "iter/sec",
            "range": "stddev: 0.001526759108237862",
            "extra": "mean: 589.0044500004876 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 314.9576638633081,
            "unit": "iter/sec",
            "range": "stddev: 0.00008870785947390603",
            "extra": "mean: 3.1750298999995152 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2458.688440680084,
            "unit": "iter/sec",
            "range": "stddev: 0.00003960846606414",
            "extra": "mean: 406.72091000004684 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 71.27970254786429,
            "unit": "iter/sec",
            "range": "stddev: 0.0003432668259239231",
            "extra": "mean: 14.02923923999964 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1578.269003484667,
            "unit": "iter/sec",
            "range": "stddev: 0.00006319244041772634",
            "extra": "mean: 633.6055499994586 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 517.2980243358603,
            "unit": "iter/sec",
            "range": "stddev: 0.0003642420383569478",
            "extra": "mean: 1.9331216300001586 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 43.04031948092381,
            "unit": "iter/sec",
            "range": "stddev: 0.003459037711318",
            "extra": "mean: 23.234028279999563 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1044.7002367431242,
            "unit": "iter/sec",
            "range": "stddev: 0.00005523528403054387",
            "extra": "mean: 957.2123800005272 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1523.2835876632528,
            "unit": "iter/sec",
            "range": "stddev: 0.00008420651736903784",
            "extra": "mean: 656.476580000458 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2292.2090701880607,
            "unit": "iter/sec",
            "range": "stddev: 0.000037741798322420204",
            "extra": "mean: 436.2603800001352 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2055.26648575196,
            "unit": "iter/sec",
            "range": "stddev: 0.00008130010811613287",
            "extra": "mean: 486.5549099994837 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 713.4957929001283,
            "unit": "iter/sec",
            "range": "stddev: 0.00006251941684659286",
            "extra": "mean: 1.4015499600009207 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 581.2722002381255,
            "unit": "iter/sec",
            "range": "stddev: 0.00011098382026823293",
            "extra": "mean: 1.720364400001131 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 430.59701475174916,
            "unit": "iter/sec",
            "range": "stddev: 0.0004081312137171551",
            "extra": "mean: 2.3223570200005383 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1770531737203,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 920915.0082940351,
            "unit": "iter/sec",
            "range": "stddev: 2.819427556116123e-7",
            "extra": "mean: 1.0858765369156782 usec\nrounds: 25700"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 508793.7696116504,
            "unit": "iter/sec",
            "range": "stddev: 5.539603088441432e-7",
            "extra": "mean: 1.9654328722682182 usec\nrounds: 42583"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70262.34861092588,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019131464923122105",
            "extra": "mean: 14.232373664840727 usec\nrounds: 17414"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65102.04931093175,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018199068636553989",
            "extra": "mean: 15.360499563138681 usec\nrounds: 24035"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63784.537104479154,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021106016668654102",
            "extra": "mean: 15.677780938693632 usec\nrounds: 22286"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58633.58696839232,
            "unit": "iter/sec",
            "range": "stddev: 0.000002122552812842403",
            "extra": "mean: 17.05507119220032 usec\nrounds: 23570"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1479.332767074253,
            "unit": "iter/sec",
            "range": "stddev: 0.00005083853129406549",
            "extra": "mean: 675.9804300000383 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2165.355839634149,
            "unit": "iter/sec",
            "range": "stddev: 0.00006754744520593121",
            "extra": "mean: 461.81786000076386 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1968.452826983748,
            "unit": "iter/sec",
            "range": "stddev: 0.00012226304544393998",
            "extra": "mean: 508.0131899997298 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3256.3403144007716,
            "unit": "iter/sec",
            "range": "stddev: 0.00001834347335783466",
            "extra": "mean: 307.093209999465 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2763.442878412862,
            "unit": "iter/sec",
            "range": "stddev: 0.000019752519424414433",
            "extra": "mean: 361.867440000907 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1798.857056592798,
            "unit": "iter/sec",
            "range": "stddev: 0.0014063292875915313",
            "extra": "mean: 555.9085400004449 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 325.25875439787893,
            "unit": "iter/sec",
            "range": "stddev: 0.00006403036625325641",
            "extra": "mean: 3.0744752800003994 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2493.9862509565983,
            "unit": "iter/sec",
            "range": "stddev: 0.000027615628018499894",
            "extra": "mean: 400.96451999943383 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.93651129887732,
            "unit": "iter/sec",
            "range": "stddev: 0.0006412427079388305",
            "extra": "mean: 14.097112779999748 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1630.4137910320344,
            "unit": "iter/sec",
            "range": "stddev: 0.000023645747822037593",
            "extra": "mean: 613.3412299996621 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 560.2839254480053,
            "unit": "iter/sec",
            "range": "stddev: 0.000027557883111986357",
            "extra": "mean: 1.7848093700000334 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 43.00761500056301,
            "unit": "iter/sec",
            "range": "stddev: 0.0031920781787104966",
            "extra": "mean: 23.251696240000967 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1028.114933790898,
            "unit": "iter/sec",
            "range": "stddev: 0.00003361649222835359",
            "extra": "mean: 972.65390000004 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1666.8506036314247,
            "unit": "iter/sec",
            "range": "stddev: 0.00001764098869594534",
            "extra": "mean: 599.933789999767 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2318.5797697305084,
            "unit": "iter/sec",
            "range": "stddev: 0.000026694356591239774",
            "extra": "mean: 431.29850999960695 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2146.0224953857664,
            "unit": "iter/sec",
            "range": "stddev: 0.0000673662441305914",
            "extra": "mean: 465.9783399988271 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 739.8838675315639,
            "unit": "iter/sec",
            "range": "stddev: 0.000043880749283411616",
            "extra": "mean: 1.3515634600011595 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 610.894200907371,
            "unit": "iter/sec",
            "range": "stddev: 0.00008223478001970704",
            "extra": "mean: 1.6369446599995285 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 474.46482502813984,
            "unit": "iter/sec",
            "range": "stddev: 0.00009843435730465169",
            "extra": "mean: 2.1076378000006457 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1770618636012,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 888963.1051011358,
            "unit": "iter/sec",
            "range": "stddev: 4.751502734655026e-7",
            "extra": "mean: 1.1249060779482314 usec\nrounds: 19793"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 501371.7062691087,
            "unit": "iter/sec",
            "range": "stddev: 4.159530704361077e-7",
            "extra": "mean: 1.9945281863656965 usec\nrounds: 38068"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 71024.91477287657,
            "unit": "iter/sec",
            "range": "stddev: 0.000001758005204370618",
            "extra": "mean: 14.079566349326845 usec\nrounds: 15441"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 67040.79935064568,
            "unit": "iter/sec",
            "range": "stddev: 0.000001553598951986782",
            "extra": "mean: 14.916289926223394 usec\nrounds: 19367"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 66889.79720985211,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016870175338726393",
            "extra": "mean: 14.94996309919611 usec\nrounds: 19295"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 61184.41332545534,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024315288036137807",
            "extra": "mean: 16.3440318481236 usec\nrounds: 19750"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1430.9919514579367,
            "unit": "iter/sec",
            "range": "stddev: 0.00003333752716968788",
            "extra": "mean: 698.8159499996982 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2544.5464847187295,
            "unit": "iter/sec",
            "range": "stddev: 0.0000426938324790361",
            "extra": "mean: 392.9973399996811 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2243.88372831276,
            "unit": "iter/sec",
            "range": "stddev: 0.00014551381454320594",
            "extra": "mean: 445.6558900010066 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3837.932551790042,
            "unit": "iter/sec",
            "range": "stddev: 0.000033653991563193205",
            "extra": "mean: 260.55694999996604 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3232.2155179244764,
            "unit": "iter/sec",
            "range": "stddev: 0.000027360621937366037",
            "extra": "mean: 309.38531000003877 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1840.4874553094407,
            "unit": "iter/sec",
            "range": "stddev: 0.001858904614293306",
            "extra": "mean: 543.334320000497 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 337.87592193337036,
            "unit": "iter/sec",
            "range": "stddev: 0.00006695907220080658",
            "extra": "mean: 2.95966635999946 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2603.2358742562806,
            "unit": "iter/sec",
            "range": "stddev: 0.000026988847105936988",
            "extra": "mean: 384.13730000002033 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 79.50921151823916,
            "unit": "iter/sec",
            "range": "stddev: 0.00017781309085642183",
            "extra": "mean: 12.577159059999019 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1948.7209667355728,
            "unit": "iter/sec",
            "range": "stddev: 0.00003831787841225628",
            "extra": "mean: 513.1571000003987 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 616.6990116049755,
            "unit": "iter/sec",
            "range": "stddev: 0.00006831425840152739",
            "extra": "mean: 1.6215365699994777 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 47.37128250248398,
            "unit": "iter/sec",
            "range": "stddev: 0.0037270691913827716",
            "extra": "mean: 21.109835900000462 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1140.0423067406973,
            "unit": "iter/sec",
            "range": "stddev: 0.00004037877477188163",
            "extra": "mean: 877.1604300009983 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1942.34807895199,
            "unit": "iter/sec",
            "range": "stddev: 0.000050357198411644786",
            "extra": "mean: 514.8407800004406 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2644.730566087745,
            "unit": "iter/sec",
            "range": "stddev: 0.000035205463772505275",
            "extra": "mean: 378.1103500003269 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2442.129229960667,
            "unit": "iter/sec",
            "range": "stddev: 0.00009457631049336249",
            "extra": "mean: 409.47873999940043 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 875.2463271384055,
            "unit": "iter/sec",
            "range": "stddev: 0.000049305002811029875",
            "extra": "mean: 1.142535499999724 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 693.2433425836863,
            "unit": "iter/sec",
            "range": "stddev: 0.00011765228209878181",
            "extra": "mean: 1.4424949199988646 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 548.3129627388456,
            "unit": "iter/sec",
            "range": "stddev: 0.00013454980606123702",
            "extra": "mean: 1.823775960000944 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1770791410085,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 876631.5244931284,
            "unit": "iter/sec",
            "range": "stddev: 3.626063873701438e-7",
            "extra": "mean: 1.1407301381024415 usec\nrounds: 22241"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 513857.94723687577,
            "unit": "iter/sec",
            "range": "stddev: 4.67816770559115e-7",
            "extra": "mean: 1.946063119928794 usec\nrounds: 29436"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70330.73976763966,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021618969276810636",
            "extra": "mean: 14.218533791963843 usec\nrounds: 13953"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66066.41151039964,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027626475990555366",
            "extra": "mean: 15.13628449219749 usec\nrounds: 14496"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63667.103628583514,
            "unit": "iter/sec",
            "range": "stddev: 0.0000025102746248729324",
            "extra": "mean: 15.706698483312932 usec\nrounds: 15495"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59486.48129265581,
            "unit": "iter/sec",
            "range": "stddev: 0.000002297236245588578",
            "extra": "mean: 16.810542131081803 usec\nrounds: 15345"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1364.675731690202,
            "unit": "iter/sec",
            "range": "stddev: 0.00006091594559157217",
            "extra": "mean: 732.7748099993414 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2019.8085451794875,
            "unit": "iter/sec",
            "range": "stddev: 0.00004355069590143096",
            "extra": "mean: 495.09642999908004 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1791.1538921471624,
            "unit": "iter/sec",
            "range": "stddev: 0.00014516232104224894",
            "extra": "mean: 558.299319999378 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3049.891838647689,
            "unit": "iter/sec",
            "range": "stddev: 0.00003034925905268601",
            "extra": "mean: 327.8804799987256 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2696.1504740997407,
            "unit": "iter/sec",
            "range": "stddev: 0.000060650968414161596",
            "extra": "mean: 370.89917999992394 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1687.722210786418,
            "unit": "iter/sec",
            "range": "stddev: 0.0017058570536271453",
            "extra": "mean: 592.5145699978884 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 320.87567742468497,
            "unit": "iter/sec",
            "range": "stddev: 0.00007381166381188145",
            "extra": "mean: 3.1164718000002267 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2497.2727908227052,
            "unit": "iter/sec",
            "range": "stddev: 0.00002582298113191279",
            "extra": "mean: 400.43682999908015 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 68.94123109995213,
            "unit": "iter/sec",
            "range": "stddev: 0.00028861226353832766",
            "extra": "mean: 14.505107959998327 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1612.3407009434206,
            "unit": "iter/sec",
            "range": "stddev: 0.00003599861307929401",
            "extra": "mean: 620.2163099987956 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 551.933068578327,
            "unit": "iter/sec",
            "range": "stddev: 0.000058680108511360034",
            "extra": "mean: 1.81181388999903 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.48368861529587,
            "unit": "iter/sec",
            "range": "stddev: 0.003384135611517641",
            "extra": "mean: 24.10586023999997 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1020.5112453151227,
            "unit": "iter/sec",
            "range": "stddev: 0.00004439286979602683",
            "extra": "mean: 979.9010099993666 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1569.2857632826453,
            "unit": "iter/sec",
            "range": "stddev: 0.00005240120388997282",
            "extra": "mean: 637.2325699993553 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2338.322424820893,
            "unit": "iter/sec",
            "range": "stddev: 0.00003242550245361607",
            "extra": "mean: 427.6570200008223 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2030.2738189683043,
            "unit": "iter/sec",
            "range": "stddev: 0.00009620512971998568",
            "extra": "mean: 492.54440000026995 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 736.0732620195114,
            "unit": "iter/sec",
            "range": "stddev: 0.00005512335891237558",
            "extra": "mean: 1.3585604200000034 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 584.731616666392,
            "unit": "iter/sec",
            "range": "stddev: 0.00011003017995943075",
            "extra": "mean: 1.7101863000004869 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 457.3023516594818,
            "unit": "iter/sec",
            "range": "stddev: 0.00009447676345601094",
            "extra": "mean: 2.186737060002315 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1770877819849,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 880810.0357046011,
            "unit": "iter/sec",
            "range": "stddev: 3.2308510729765786e-7",
            "extra": "mean: 1.13531858115133 usec\nrounds: 17060"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 487597.90667904896,
            "unit": "iter/sec",
            "range": "stddev: 4.921740851317059e-7",
            "extra": "mean: 2.0508701663853306 usec\nrounds: 34937"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70147.33052739118,
            "unit": "iter/sec",
            "range": "stddev: 0.000001646548652807813",
            "extra": "mean: 14.255709981857672 usec\nrounds: 14637"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65513.44681169996,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016484829974964964",
            "extra": "mean: 15.264041943545111 usec\nrounds: 16689"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64730.02982676449,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016587292665022465",
            "extra": "mean: 15.448780151596985 usec\nrounds: 15306"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59803.09662255664,
            "unit": "iter/sec",
            "range": "stddev: 0.0000029328933133443317",
            "extra": "mean: 16.721542135375284 usec\nrounds: 17420"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1628.8706506947735,
            "unit": "iter/sec",
            "range": "stddev: 0.000040822881414289926",
            "extra": "mean: 613.9222900071672 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2402.403556720572,
            "unit": "iter/sec",
            "range": "stddev: 0.0000340591574238086",
            "extra": "mean: 416.24979999824063 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2077.710313374693,
            "unit": "iter/sec",
            "range": "stddev: 0.0001528298288073445",
            "extra": "mean: 481.29904999882456 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3900.462688432002,
            "unit": "iter/sec",
            "range": "stddev: 0.00001759854865044204",
            "extra": "mean: 256.37984000354663 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2950.4275360708934,
            "unit": "iter/sec",
            "range": "stddev: 0.00002490360398452017",
            "extra": "mean: 338.93393000653305 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1800.7645938536991,
            "unit": "iter/sec",
            "range": "stddev: 0.0018091389737322871",
            "extra": "mean: 555.3196699963792 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 331.0710059638534,
            "unit": "iter/sec",
            "range": "stddev: 0.00008088197661294843",
            "extra": "mean: 3.0205000800015114 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2751.6950717328773,
            "unit": "iter/sec",
            "range": "stddev: 0.000039650238330504015",
            "extra": "mean: 363.4123599931627 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 77.58609354061751,
            "unit": "iter/sec",
            "range": "stddev: 0.00017958710184411941",
            "extra": "mean: 12.888907719996041 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1735.840398331356,
            "unit": "iter/sec",
            "range": "stddev: 0.000060512623174908384",
            "extra": "mean: 576.08983001046 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 593.4852647696819,
            "unit": "iter/sec",
            "range": "stddev: 0.00009432302344789759",
            "extra": "mean: 1.6849618000003375 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 45.95683063496535,
            "unit": "iter/sec",
            "range": "stddev: 0.003974338319865499",
            "extra": "mean: 21.759551000002375 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1103.0713875605343,
            "unit": "iter/sec",
            "range": "stddev: 0.00004185303482004452",
            "extra": "mean: 906.5596399989317 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1714.8214833013049,
            "unit": "iter/sec",
            "range": "stddev: 0.00004229491552949389",
            "extra": "mean: 583.1510800032902 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2373.4311471811443,
            "unit": "iter/sec",
            "range": "stddev: 0.00002967836270996004",
            "extra": "mean: 421.3309499994011 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2251.8077737774497,
            "unit": "iter/sec",
            "range": "stddev: 0.00010872863435133152",
            "extra": "mean: 444.08764000422707 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 880.5347043491145,
            "unit": "iter/sec",
            "range": "stddev: 0.00006241117855855756",
            "extra": "mean: 1.135673579997274 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 694.6346778710774,
            "unit": "iter/sec",
            "range": "stddev: 0.00011910554158705598",
            "extra": "mean: 1.439605639995989 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 543.3048580399181,
            "unit": "iter/sec",
            "range": "stddev: 0.0000851039802722517",
            "extra": "mean: 1.8405872599919348 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1770964009208,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 901041.7841109356,
            "unit": "iter/sec",
            "range": "stddev: 3.492268065504738e-7",
            "extra": "mean: 1.10982644493752 usec\nrounds: 22598"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 522623.4137945911,
            "unit": "iter/sec",
            "range": "stddev: 4.05375763728479e-7",
            "extra": "mean: 1.9134236500032398 usec\nrounds: 33294"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70851.9959675612,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019718291089185725",
            "extra": "mean: 14.113928427052906 usec\nrounds: 16305"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65498.454068885534,
            "unit": "iter/sec",
            "range": "stddev: 0.000002019122904626483",
            "extra": "mean: 15.267535916928479 usec\nrounds: 23095"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63878.61306549741,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022780229059300833",
            "extra": "mean: 15.65469179762338 usec\nrounds: 16898"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59359.344301325276,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023139326638141003",
            "extra": "mean: 16.846547275248014 usec\nrounds: 21121"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1345.9778259074737,
            "unit": "iter/sec",
            "range": "stddev: 0.000054329208134372436",
            "extra": "mean: 742.9542899978969 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2027.8100357249177,
            "unit": "iter/sec",
            "range": "stddev: 0.000042156916911588655",
            "extra": "mean: 493.1428400010418 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1802.5951710343218,
            "unit": "iter/sec",
            "range": "stddev: 0.00013805002409060415",
            "extra": "mean: 554.7557299991013 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2944.095281256753,
            "unit": "iter/sec",
            "range": "stddev: 0.00003691299217222063",
            "extra": "mean: 339.662920003434 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2634.392686743418,
            "unit": "iter/sec",
            "range": "stddev: 0.000022704142904318487",
            "extra": "mean: 379.5941299989636 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1586.9834601073494,
            "unit": "iter/sec",
            "range": "stddev: 0.001956759408496538",
            "extra": "mean: 630.1262899944504 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 317.35865388241723,
            "unit": "iter/sec",
            "range": "stddev: 0.0000770314282547446",
            "extra": "mean: 3.151009079999767 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2454.6353321400093,
            "unit": "iter/sec",
            "range": "stddev: 0.00002463499974083109",
            "extra": "mean: 407.39248999898336 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.5979095750219,
            "unit": "iter/sec",
            "range": "stddev: 0.0002720681474332891",
            "extra": "mean: 14.368247639996525 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1544.477730684886,
            "unit": "iter/sec",
            "range": "stddev: 0.000035240630391543844",
            "extra": "mean: 647.4680600001648 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 506.7378448216125,
            "unit": "iter/sec",
            "range": "stddev: 0.00021473373854021015",
            "extra": "mean: 1.973406979997776 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.00203612430862,
            "unit": "iter/sec",
            "range": "stddev: 0.004161974634573461",
            "extra": "mean: 23.80836959999783 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1003.6498026184217,
            "unit": "iter/sec",
            "range": "stddev: 0.00004388833173865001",
            "extra": "mean: 996.3634699983004 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1502.3105837240619,
            "unit": "iter/sec",
            "range": "stddev: 0.0000324995527108775",
            "extra": "mean: 665.6413199999633 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2115.014532581716,
            "unit": "iter/sec",
            "range": "stddev: 0.000020389273059080427",
            "extra": "mean: 472.80999000008705 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1996.6359080932732,
            "unit": "iter/sec",
            "range": "stddev: 0.00007971672715678882",
            "extra": "mean: 500.84243999947375 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 718.3910110310975,
            "unit": "iter/sec",
            "range": "stddev: 0.000047604846605434297",
            "extra": "mean: 1.3919996000015544 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 573.879113947925,
            "unit": "iter/sec",
            "range": "stddev: 0.00010813756065156703",
            "extra": "mean: 1.742527260001907 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 453.5732779525241,
            "unit": "iter/sec",
            "range": "stddev: 0.00008687592276225953",
            "extra": "mean: 2.204715419995864 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1771049933188,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 921799.0198017292,
            "unit": "iter/sec",
            "range": "stddev: 3.148456711214382e-7",
            "extra": "mean: 1.0848351739569988 usec\nrounds: 23631"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 514999.8909475792,
            "unit": "iter/sec",
            "range": "stddev: 4.7327211161922633e-7",
            "extra": "mean: 1.9417479839850842 usec\nrounds: 37077"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69286.493887978,
            "unit": "iter/sec",
            "range": "stddev: 0.000002230619558271795",
            "extra": "mean: 14.432827292672568 usec\nrounds: 16664"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64003.16666949033,
            "unit": "iter/sec",
            "range": "stddev: 0.000002299169654545391",
            "extra": "mean: 15.624226925582574 usec\nrounds: 22276"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 58525.23962938182,
            "unit": "iter/sec",
            "range": "stddev: 0.000005303207446578213",
            "extra": "mean: 17.086645118116923 usec\nrounds: 16614"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58345.932322507564,
            "unit": "iter/sec",
            "range": "stddev: 0.00000231366612238862",
            "extra": "mean: 17.139155382289424 usec\nrounds: 22583"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1276.0348757675317,
            "unit": "iter/sec",
            "range": "stddev: 0.00006129900188086371",
            "extra": "mean: 783.6776400006329 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2131.0083861424387,
            "unit": "iter/sec",
            "range": "stddev: 0.000028470587130123352",
            "extra": "mean: 469.26140999858035 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1846.8521153973836,
            "unit": "iter/sec",
            "range": "stddev: 0.00012767593477316276",
            "extra": "mean: 541.4618699910534 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3032.5290903665846,
            "unit": "iter/sec",
            "range": "stddev: 0.000012156264340364414",
            "extra": "mean: 329.7577600085333 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2576.559237004936,
            "unit": "iter/sec",
            "range": "stddev: 0.0000344981015840515",
            "extra": "mean: 388.11450000366676 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1676.4089777497402,
            "unit": "iter/sec",
            "range": "stddev: 0.0015757214289313952",
            "extra": "mean: 596.5131499965537 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 323.7985475934144,
            "unit": "iter/sec",
            "range": "stddev: 0.00007255506289650719",
            "extra": "mean: 3.0883399800040934 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2378.6207662468296,
            "unit": "iter/sec",
            "range": "stddev: 0.00002782231861226921",
            "extra": "mean: 420.4117000028873 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.99687347768602,
            "unit": "iter/sec",
            "range": "stddev: 0.0002718951739751055",
            "extra": "mean: 14.286352379992877 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1602.6329335982634,
            "unit": "iter/sec",
            "range": "stddev: 0.000034759181420834454",
            "extra": "mean: 623.9731999983178 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 544.0630636121065,
            "unit": "iter/sec",
            "range": "stddev: 0.00006864026966945272",
            "extra": "mean: 1.8380222199994023 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.81993190781174,
            "unit": "iter/sec",
            "range": "stddev: 0.0031536711145101408",
            "extra": "mean: 23.912042760002805 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 908.0831514264129,
            "unit": "iter/sec",
            "range": "stddev: 0.00034071223092988764",
            "extra": "mean: 1.1012207400051466 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1479.9461743649097,
            "unit": "iter/sec",
            "range": "stddev: 0.00004405140174158276",
            "extra": "mean: 675.7002499966802 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2170.839370874867,
            "unit": "iter/sec",
            "range": "stddev: 0.00004580705658514885",
            "extra": "mean: 460.65131000318615 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2025.452935330105,
            "unit": "iter/sec",
            "range": "stddev: 0.00009134533290646575",
            "extra": "mean: 493.7167299999601 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 712.6680088121008,
            "unit": "iter/sec",
            "range": "stddev: 0.00007824713095861906",
            "extra": "mean: 1.4031778999969902 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 593.5659563418988,
            "unit": "iter/sec",
            "range": "stddev: 0.00011526347029061899",
            "extra": "mean: 1.684732740002346 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 476.65088917488583,
            "unit": "iter/sec",
            "range": "stddev: 0.00010524201492962517",
            "extra": "mean: 2.09797153999034 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1771136568881,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 911965.9785457032,
            "unit": "iter/sec",
            "range": "stddev: 2.992801335569601e-7",
            "extra": "mean: 1.0965321333529165 usec\nrounds: 23278"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 508964.25859020144,
            "unit": "iter/sec",
            "range": "stddev: 4.437642795710149e-7",
            "extra": "mean: 1.9647745065045163 usec\nrounds: 42152"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69148.74048325233,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021015460259500873",
            "extra": "mean: 14.46157938686096 usec\nrounds: 17484"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63189.390870955234,
            "unit": "iter/sec",
            "range": "stddev: 0.0000036302318570400653",
            "extra": "mean: 15.82544136312677 usec\nrounds: 23475"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64797.67398583915,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020023151876110996",
            "extra": "mean: 15.432652724826813 usec\nrounds: 22020"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 60071.41541920398,
            "unit": "iter/sec",
            "range": "stddev: 0.000002572972931876173",
            "extra": "mean: 16.64685263401192 usec\nrounds: 22685"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1432.6228039969853,
            "unit": "iter/sec",
            "range": "stddev: 0.00005107264858004246",
            "extra": "mean: 698.0204399999934 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2110.3670918107323,
            "unit": "iter/sec",
            "range": "stddev: 0.00003831978543878937",
            "extra": "mean: 473.8512100006176 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1816.4109496123483,
            "unit": "iter/sec",
            "range": "stddev: 0.00012028520539763054",
            "extra": "mean: 550.5362099988531 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3021.1390002165626,
            "unit": "iter/sec",
            "range": "stddev: 0.000014485187493714203",
            "extra": "mean: 331.0009900002342 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2555.4187923839418,
            "unit": "iter/sec",
            "range": "stddev: 0.00003057992538379569",
            "extra": "mean: 391.32528999957117 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1763.9081911857713,
            "unit": "iter/sec",
            "range": "stddev: 0.0014467819193522313",
            "extra": "mean: 566.9229300011125 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 317.2572466361826,
            "unit": "iter/sec",
            "range": "stddev: 0.00009235196024079908",
            "extra": "mean: 3.1520162599997548 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2391.056816262908,
            "unit": "iter/sec",
            "range": "stddev: 0.00003458694617301716",
            "extra": "mean: 418.2251100009182 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.62784787815146,
            "unit": "iter/sec",
            "range": "stddev: 0.0004951504772091182",
            "extra": "mean: 14.158721100000378 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1595.750783751634,
            "unit": "iter/sec",
            "range": "stddev: 0.000030044000345548506",
            "extra": "mean: 626.6642699989688 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 539.6054101982983,
            "unit": "iter/sec",
            "range": "stddev: 0.00005136700183000576",
            "extra": "mean: 1.8532060299997966 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.99388943069537,
            "unit": "iter/sec",
            "range": "stddev: 0.002924475125966343",
            "extra": "mean: 23.259119219999036 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1003.0463923200028,
            "unit": "iter/sec",
            "range": "stddev: 0.000033030466270745125",
            "extra": "mean: 996.962859999968 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1515.6702877545024,
            "unit": "iter/sec",
            "range": "stddev: 0.000033255053832296286",
            "extra": "mean: 659.7741000000212 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2274.8901245124416,
            "unit": "iter/sec",
            "range": "stddev: 0.00003443015705465264",
            "extra": "mean: 439.5816700001376 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1996.4101351478223,
            "unit": "iter/sec",
            "range": "stddev: 0.00007030042065707303",
            "extra": "mean: 500.89908000089173 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 720.499798606278,
            "unit": "iter/sec",
            "range": "stddev: 0.00007298690494884811",
            "extra": "mean: 1.3879254399992647 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 579.2639404331599,
            "unit": "iter/sec",
            "range": "stddev: 0.00010910213197201773",
            "extra": "mean: 1.7263287599988075 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 470.31635481553315,
            "unit": "iter/sec",
            "range": "stddev: 0.00006415333166637466",
            "extra": "mean: 2.1262284200008708 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1771223414116,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 914712.026490687,
            "unit": "iter/sec",
            "range": "stddev: 3.350067912785703e-7",
            "extra": "mean: 1.0932402450599914 usec\nrounds: 24321"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 518689.59941387555,
            "unit": "iter/sec",
            "range": "stddev: 4.2408279657340827e-7",
            "extra": "mean: 1.92793532226212 usec\nrounds: 41730"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68869.08558819894,
            "unit": "iter/sec",
            "range": "stddev: 0.0000025113378645549062",
            "extra": "mean: 14.520303144134601 usec\nrounds: 16507"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65844.09694037076,
            "unit": "iter/sec",
            "range": "stddev: 0.000002072010208114793",
            "extra": "mean: 15.187390312386128 usec\nrounds: 23143"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64965.219912142646,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027644804200563324",
            "extra": "mean: 15.39285176518105 usec\nrounds: 22660"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58076.80714938496,
            "unit": "iter/sec",
            "range": "stddev: 0.000002257750659233871",
            "extra": "mean: 17.21857741641691 usec\nrounds: 22999"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1395.110539350389,
            "unit": "iter/sec",
            "range": "stddev: 0.00003976397436385545",
            "extra": "mean: 716.7890800005239 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2136.971221966834,
            "unit": "iter/sec",
            "range": "stddev: 0.00003884732521850203",
            "extra": "mean: 467.9520199994158 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1879.9731517267242,
            "unit": "iter/sec",
            "range": "stddev: 0.00013103634690958362",
            "extra": "mean: 531.9224900001984 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3134.3699049858205,
            "unit": "iter/sec",
            "range": "stddev: 0.000014849251346781092",
            "extra": "mean: 319.0433899997913 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2631.2668652627767,
            "unit": "iter/sec",
            "range": "stddev: 0.00002934789891905292",
            "extra": "mean: 380.04507000096055 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1757.7939573314827,
            "unit": "iter/sec",
            "range": "stddev: 0.0014812938555873933",
            "extra": "mean: 568.8948900007063 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 324.03989926603055,
            "unit": "iter/sec",
            "range": "stddev: 0.00007152494693655655",
            "extra": "mean: 3.086039720000713 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2482.378895467896,
            "unit": "iter/sec",
            "range": "stddev: 0.000024289245725640916",
            "extra": "mean: 402.83939000033797 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.71120034116682,
            "unit": "iter/sec",
            "range": "stddev: 0.00026221478681024633",
            "extra": "mean: 14.14203117999989 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1608.819134636563,
            "unit": "iter/sec",
            "range": "stddev: 0.000019198750614336655",
            "extra": "mean: 621.5739100007056 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 545.8869931605179,
            "unit": "iter/sec",
            "range": "stddev: 0.00004569679679134348",
            "extra": "mean: 1.8318809799997382 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.9947597208681,
            "unit": "iter/sec",
            "range": "stddev: 0.0036262235695820907",
            "extra": "mean: 23.812494859997457 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1011.4894377176531,
            "unit": "iter/sec",
            "range": "stddev: 0.000036344992194371025",
            "extra": "mean: 988.6410700011083 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1582.2124887319242,
            "unit": "iter/sec",
            "range": "stddev: 0.000026279585952044704",
            "extra": "mean: 632.0263600001397 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2278.557324139539,
            "unit": "iter/sec",
            "range": "stddev: 0.000023732212504975045",
            "extra": "mean: 438.87418999986494 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2013.2525570760881,
            "unit": "iter/sec",
            "range": "stddev: 0.0000843676861861869",
            "extra": "mean: 496.7086700003165 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 712.529431028422,
            "unit": "iter/sec",
            "range": "stddev: 0.000054446166018824346",
            "extra": "mean: 1.4034507999994617 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 572.0292609893091,
            "unit": "iter/sec",
            "range": "stddev: 0.00014262121498644976",
            "extra": "mean: 1.7481623200018248 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 472.4749601027104,
            "unit": "iter/sec",
            "range": "stddev: 0.00008430367952661184",
            "extra": "mean: 2.1165142800003878 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1771309570593,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 936121.953923641,
            "unit": "iter/sec",
            "range": "stddev: 2.1187648383493442e-7",
            "extra": "mean: 1.0682368849578008 usec\nrounds: 30099"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 517878.0922500433,
            "unit": "iter/sec",
            "range": "stddev: 2.7396332884310764e-7",
            "extra": "mean: 1.9309563678495543 usec\nrounds: 39833"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 76203.06824966396,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015243860719933369",
            "extra": "mean: 13.122831179496629 usec\nrounds: 18108"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 70763.71236702934,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017864217146372205",
            "extra": "mean: 14.131536723417103 usec\nrounds: 20491"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 70886.23052752536,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014894922944278157",
            "extra": "mean: 14.10711209438195 usec\nrounds: 12882"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 65252.46345797758,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011428444494513435",
            "extra": "mean: 15.325091912338259 usec\nrounds: 22652"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1721.688324759534,
            "unit": "iter/sec",
            "range": "stddev: 0.00004046353107831",
            "extra": "mean: 580.8252200000652 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2609.7512625229792,
            "unit": "iter/sec",
            "range": "stddev: 0.000030264920200267724",
            "extra": "mean: 383.17827999946985 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2118.2321344795487,
            "unit": "iter/sec",
            "range": "stddev: 0.00012572606622581126",
            "extra": "mean: 472.09178999906953 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3932.1573876125753,
            "unit": "iter/sec",
            "range": "stddev: 0.000012991880389384877",
            "extra": "mean: 254.31331999840265 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3519.861469507256,
            "unit": "iter/sec",
            "range": "stddev: 0.00003530908902173882",
            "extra": "mean: 284.1020900007152 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 2003.8324899460324,
            "unit": "iter/sec",
            "range": "stddev: 0.0014246828613170487",
            "extra": "mean: 499.0437099993983 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 350.485546904876,
            "unit": "iter/sec",
            "range": "stddev: 0.00005816339285532891",
            "extra": "mean: 2.8531846999996446 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3151.544772210009,
            "unit": "iter/sec",
            "range": "stddev: 0.00003932303838065516",
            "extra": "mean: 317.3047100005988 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 80.57431229751944,
            "unit": "iter/sec",
            "range": "stddev: 0.00031154648466330884",
            "extra": "mean: 12.410903319999989 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 2007.604202439356,
            "unit": "iter/sec",
            "range": "stddev: 0.000020565517451787572",
            "extra": "mean: 498.1061499995576 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 654.7696633926288,
            "unit": "iter/sec",
            "range": "stddev: 0.000032028773752147036",
            "extra": "mean: 1.527254630000101 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 49.349492995892625,
            "unit": "iter/sec",
            "range": "stddev: 0.002898419524167075",
            "extra": "mean: 20.263632700000187 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1260.866080841669,
            "unit": "iter/sec",
            "range": "stddev: 0.00004420419170930924",
            "extra": "mean: 793.1056399998226 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 2037.950552144457,
            "unit": "iter/sec",
            "range": "stddev: 0.000046658978579996054",
            "extra": "mean: 490.68904000037605 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 3049.1064075368135,
            "unit": "iter/sec",
            "range": "stddev: 0.00001999642479878336",
            "extra": "mean: 327.96493999953213 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2660.8886356903386,
            "unit": "iter/sec",
            "range": "stddev: 0.0000629302905437926",
            "extra": "mean: 375.81430000003024 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 857.125347297008,
            "unit": "iter/sec",
            "range": "stddev: 0.000038817332634166676",
            "extra": "mean: 1.1666904999992767 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 716.9470216307873,
            "unit": "iter/sec",
            "range": "stddev: 0.0000746112870796202",
            "extra": "mean: 1.3948031999984778 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 545.2668427964663,
            "unit": "iter/sec",
            "range": "stddev: 0.00007574516410504933",
            "extra": "mean: 1.8339644400003863 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1771396128633,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 894380.4980527767,
            "unit": "iter/sec",
            "range": "stddev: 3.303561122121436e-7",
            "extra": "mean: 1.1180923579809439 usec\nrounds: 24470"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 524824.5231382269,
            "unit": "iter/sec",
            "range": "stddev: 4.3658004110676877e-7",
            "extra": "mean: 1.9053987683739058 usec\nrounds: 44981"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67692.66413341965,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022269738805851025",
            "extra": "mean: 14.772649485755775 usec\nrounds: 16821"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64155.18060692419,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028291688071164276",
            "extra": "mean: 15.58720574924344 usec\nrounds: 22994"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 61870.645454434634,
            "unit": "iter/sec",
            "range": "stddev: 0.000002810270789970776",
            "extra": "mean: 16.162753639550466 usec\nrounds: 22118"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 57408.61513832532,
            "unit": "iter/sec",
            "range": "stddev: 0.000002209576704560719",
            "extra": "mean: 17.41898837988885 usec\nrounds: 22375"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1370.8238485457762,
            "unit": "iter/sec",
            "range": "stddev: 0.00006154670357401492",
            "extra": "mean: 729.4883300001231 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2133.8080743365904,
            "unit": "iter/sec",
            "range": "stddev: 0.00003214623552404434",
            "extra": "mean: 468.64570999943567 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1807.961837254051,
            "unit": "iter/sec",
            "range": "stddev: 0.00013136993549260487",
            "extra": "mean: 553.1090199994537 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3099.1467243228335,
            "unit": "iter/sec",
            "range": "stddev: 0.000029251878614816886",
            "extra": "mean: 322.6694600006397 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2699.0165755300177,
            "unit": "iter/sec",
            "range": "stddev: 0.000032295218574599604",
            "extra": "mean: 370.5053199992392 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1733.1490210232018,
            "unit": "iter/sec",
            "range": "stddev: 0.0016056661299719424",
            "extra": "mean: 576.9844299999249 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 328.6368519996572,
            "unit": "iter/sec",
            "range": "stddev: 0.00007153140164627465",
            "extra": "mean: 3.04287238000029 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2407.2718289666227,
            "unit": "iter/sec",
            "range": "stddev: 0.00003504444631144142",
            "extra": "mean: 415.40800999996463 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.30627546685953,
            "unit": "iter/sec",
            "range": "stddev: 0.00025468987477493733",
            "extra": "mean: 14.223481379999612 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1570.4685821230344,
            "unit": "iter/sec",
            "range": "stddev: 0.000031577770842121226",
            "extra": "mean: 636.7526300005011 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 548.4505102147344,
            "unit": "iter/sec",
            "range": "stddev: 0.00004013899595417548",
            "extra": "mean: 1.8233185699990884 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.75012697967007,
            "unit": "iter/sec",
            "range": "stddev: 0.003417683779635628",
            "extra": "mean: 23.952022960000647 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1032.2832122666948,
            "unit": "iter/sec",
            "range": "stddev: 0.00003530105163345713",
            "extra": "mean: 968.7264000004348 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1606.9436420437003,
            "unit": "iter/sec",
            "range": "stddev: 0.000021465292897584782",
            "extra": "mean: 622.2993600000848 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2273.0355790098015,
            "unit": "iter/sec",
            "range": "stddev: 0.00002003753370012491",
            "extra": "mean: 439.94031999957883 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1997.4174191730235,
            "unit": "iter/sec",
            "range": "stddev: 0.00009058380617192118",
            "extra": "mean: 500.64648000017087 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 719.4521308706422,
            "unit": "iter/sec",
            "range": "stddev: 0.00003931707244787144",
            "extra": "mean: 1.3899465400010058 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 591.479825386357,
            "unit": "iter/sec",
            "range": "stddev: 0.00011690345592151879",
            "extra": "mean: 1.6906747399994515 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 461.82288901954183,
            "unit": "iter/sec",
            "range": "stddev: 0.00007828346576082912",
            "extra": "mean: 2.1653322599991043 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1771482475219,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 926404.638260872,
            "unit": "iter/sec",
            "range": "stddev: 2.143144642203359e-7",
            "extra": "mean: 1.0794419184658743 usec\nrounds: 24018"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 521836.3008928176,
            "unit": "iter/sec",
            "range": "stddev: 3.653243857427824e-7",
            "extra": "mean: 1.9163097666626197 usec\nrounds: 40679"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 75823.48558468636,
            "unit": "iter/sec",
            "range": "stddev: 0.000001143748605434151",
            "extra": "mean: 13.188525854342474 usec\nrounds: 16767"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 71487.86798138153,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011182690579584756",
            "extra": "mean: 13.9883875157732 usec\nrounds: 18856"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 70494.50522406575,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013463760846916064",
            "extra": "mean: 14.185502782401475 usec\nrounds: 18330"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 65463.929809832065,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014989214257786086",
            "extra": "mean: 15.275587684774301 usec\nrounds: 19553"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1883.0837017068766,
            "unit": "iter/sec",
            "range": "stddev: 0.00004135284742310894",
            "extra": "mean: 531.0438400022122 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2738.1415811377833,
            "unit": "iter/sec",
            "range": "stddev: 0.000028401303799055548",
            "extra": "mean: 365.2112100004956 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2365.6689205708203,
            "unit": "iter/sec",
            "range": "stddev: 0.00013573657673737944",
            "extra": "mean: 422.7134199990701 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4243.821822960565,
            "unit": "iter/sec",
            "range": "stddev: 0.000011161196973842824",
            "extra": "mean: 235.63666000057992 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3429.178883094628,
            "unit": "iter/sec",
            "range": "stddev: 0.000026558425250091887",
            "extra": "mean: 291.6150000018547 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 2105.88193250713,
            "unit": "iter/sec",
            "range": "stddev: 0.0015167650845742454",
            "extra": "mean: 474.8604300002057 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 351.74692118599626,
            "unit": "iter/sec",
            "range": "stddev: 0.00007099502054091778",
            "extra": "mean: 2.8429530999966346 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3347.4667844346845,
            "unit": "iter/sec",
            "range": "stddev: 0.00004199715491327355",
            "extra": "mean: 298.73335999923256 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 80.56754978991528,
            "unit": "iter/sec",
            "range": "stddev: 0.00019222925438196472",
            "extra": "mean: 12.411945040001342 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1908.1193224890546,
            "unit": "iter/sec",
            "range": "stddev: 0.00003511674101714999",
            "extra": "mean: 524.0762399992605 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 627.8736639572527,
            "unit": "iter/sec",
            "range": "stddev: 0.0002025510573675119",
            "extra": "mean: 1.592677090001473 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 49.06702130582126,
            "unit": "iter/sec",
            "range": "stddev: 0.00311729836557738",
            "extra": "mean: 20.380287480001584 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1219.8537244130216,
            "unit": "iter/sec",
            "range": "stddev: 0.000055276116787192734",
            "extra": "mean: 819.770419999486 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1975.1576131272982,
            "unit": "iter/sec",
            "range": "stddev: 0.00006933661615258166",
            "extra": "mean: 506.28871000157005 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 3100.5066755296525,
            "unit": "iter/sec",
            "range": "stddev: 0.000021268554437238823",
            "extra": "mean: 322.527929996852 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2332.5436584465983,
            "unit": "iter/sec",
            "range": "stddev: 0.00010273109376268619",
            "extra": "mean: 428.71652000116 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 893.6349084256457,
            "unit": "iter/sec",
            "range": "stddev: 0.00004149843135110876",
            "extra": "mean: 1.11902521999923 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 724.2658598606168,
            "unit": "iter/sec",
            "range": "stddev: 0.00008314810866743955",
            "extra": "mean: 1.380708460001756 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 552.7098185132417,
            "unit": "iter/sec",
            "range": "stddev: 0.00007166544000902394",
            "extra": "mean: 1.8092676599991364 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1771568672151,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 928243.7852982975,
            "unit": "iter/sec",
            "range": "stddev: 2.357126333248682e-7",
            "extra": "mean: 1.0773031996962341 usec\nrounds: 24502"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 516465.6381365536,
            "unit": "iter/sec",
            "range": "stddev: 3.476771352803695e-7",
            "extra": "mean: 1.9362372366302516 usec\nrounds: 39606"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 76906.87272944342,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013722524948736467",
            "extra": "mean: 13.002739085724842 usec\nrounds: 14614"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 67222.50154954934,
            "unit": "iter/sec",
            "range": "stddev: 0.00007387750763994016",
            "extra": "mean: 14.875971243987482 usec\nrounds: 17040"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 70549.08850567293,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019865262215125444",
            "extra": "mean: 14.17452756912074 usec\nrounds: 16504"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 64825.076376860816,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011955429781144251",
            "extra": "mean: 15.426129144630643 usec\nrounds: 17523"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 2022.1377166471248,
            "unit": "iter/sec",
            "range": "stddev: 0.00003366168131725995",
            "extra": "mean: 494.52615999769023 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2785.0841365719775,
            "unit": "iter/sec",
            "range": "stddev: 0.00003143133176767817",
            "extra": "mean: 359.0555799979711 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2147.180045112006,
            "unit": "iter/sec",
            "range": "stddev: 0.00016147888129098022",
            "extra": "mean: 465.72712999847 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4322.649472918194,
            "unit": "iter/sec",
            "range": "stddev: 0.000012031489778165108",
            "extra": "mean: 231.3395999988188 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3468.5105546179557,
            "unit": "iter/sec",
            "range": "stddev: 0.00003213410461980442",
            "extra": "mean: 288.30819000063457 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1959.2008184745705,
            "unit": "iter/sec",
            "range": "stddev: 0.0018450522623097649",
            "extra": "mean: 510.41220000030313 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 350.0072885516736,
            "unit": "iter/sec",
            "range": "stddev: 0.00008256268115534498",
            "extra": "mean: 2.8570833600008427 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3415.6760608388286,
            "unit": "iter/sec",
            "range": "stddev: 0.00003993643487155484",
            "extra": "mean: 292.7678099996456 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 76.83175682455455,
            "unit": "iter/sec",
            "range": "stddev: 0.0002639415402982466",
            "extra": "mean: 13.015451440001584 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1893.5974704858547,
            "unit": "iter/sec",
            "range": "stddev: 0.00003475332385770055",
            "extra": "mean: 528.0953400003341 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 640.5959776981532,
            "unit": "iter/sec",
            "range": "stddev: 0.00004687764414403549",
            "extra": "mean: 1.561046330002398 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 46.40173659501995,
            "unit": "iter/sec",
            "range": "stddev: 0.004226377212468559",
            "extra": "mean: 21.55091755999763 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1183.8177651772855,
            "unit": "iter/sec",
            "range": "stddev: 0.00003405178764112354",
            "extra": "mean: 844.7246099996164 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 2158.761494344291,
            "unit": "iter/sec",
            "range": "stddev: 0.000019679834069087796",
            "extra": "mean: 463.22857000177464 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 3114.369489034697,
            "unit": "iter/sec",
            "range": "stddev: 0.000023798374201523048",
            "extra": "mean: 321.09228000109624 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2700.5491242550033,
            "unit": "iter/sec",
            "range": "stddev: 0.0000829885608398945",
            "extra": "mean: 370.29506000038737 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 847.8571115217002,
            "unit": "iter/sec",
            "range": "stddev: 0.000050265763658904945",
            "extra": "mean: 1.1794440200014833 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 694.911540818545,
            "unit": "iter/sec",
            "range": "stddev: 0.00013737788696391987",
            "extra": "mean: 1.4390320799998335 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 537.1695720894188,
            "unit": "iter/sec",
            "range": "stddev: 0.00009398180532472347",
            "extra": "mean: 1.8616095400011545 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1771828247389,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 907369.0394363941,
            "unit": "iter/sec",
            "range": "stddev: 3.1830386644510547e-7",
            "extra": "mean: 1.1020874159659921 usec\nrounds: 23966"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 526309.7315572988,
            "unit": "iter/sec",
            "range": "stddev: 4.127235560821132e-7",
            "extra": "mean: 1.9000218693298678 usec\nrounds: 37724"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69793.77257383673,
            "unit": "iter/sec",
            "range": "stddev: 0.000002566083087202951",
            "extra": "mean: 14.32792587536478 usec\nrounds: 14071"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 60452.78453457235,
            "unit": "iter/sec",
            "range": "stddev: 0.000004893455647417233",
            "extra": "mean: 16.5418352140274 usec\nrounds: 11433"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62428.99962567115,
            "unit": "iter/sec",
            "range": "stddev: 0.000002163207231482453",
            "extra": "mean: 16.01819676746501 usec\nrounds: 17818"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58493.8305572551,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021899941770299885",
            "extra": "mean: 17.095820028766575 usec\nrounds: 20670"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1400.4772154172817,
            "unit": "iter/sec",
            "range": "stddev: 0.00005432267351907617",
            "extra": "mean: 714.0423199973611 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2099.575297913639,
            "unit": "iter/sec",
            "range": "stddev: 0.00004289795275028136",
            "extra": "mean: 476.28679999888845 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1803.3126854031273,
            "unit": "iter/sec",
            "range": "stddev: 0.0001452549534323835",
            "extra": "mean: 554.5349999999871 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3161.346294802069,
            "unit": "iter/sec",
            "range": "stddev: 0.000013450933959025969",
            "extra": "mean: 316.3209299924574 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2850.885733131705,
            "unit": "iter/sec",
            "range": "stddev: 0.000024350239235253216",
            "extra": "mean: 350.76818000050025 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1658.3128053486685,
            "unit": "iter/sec",
            "range": "stddev: 0.0016160176044968094",
            "extra": "mean: 603.0225400024847 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 315.2025764417277,
            "unit": "iter/sec",
            "range": "stddev: 0.00006495824518808865",
            "extra": "mean: 3.1725628999890887 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2554.4166093177914,
            "unit": "iter/sec",
            "range": "stddev: 0.00002784505707362154",
            "extra": "mean: 391.4788199983832 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 66.80841318612474,
            "unit": "iter/sec",
            "range": "stddev: 0.0017056602205218771",
            "extra": "mean: 14.96817470000451 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1629.0838117293254,
            "unit": "iter/sec",
            "range": "stddev: 0.00003054742811563927",
            "extra": "mean: 613.8419600023326 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 543.3493069508576,
            "unit": "iter/sec",
            "range": "stddev: 0.0000445755575199174",
            "extra": "mean: 1.840436690002889 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 40.2685743168145,
            "unit": "iter/sec",
            "range": "stddev: 0.004444876722009692",
            "extra": "mean: 24.83326060000195 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1039.130862631336,
            "unit": "iter/sec",
            "range": "stddev: 0.00002137680070125249",
            "extra": "mean: 962.3427000019547 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1656.7401973231924,
            "unit": "iter/sec",
            "range": "stddev: 0.00003401021817900876",
            "extra": "mean: 603.5949400006757 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2395.8036253795904,
            "unit": "iter/sec",
            "range": "stddev: 0.000022427761469839864",
            "extra": "mean: 417.39647999804674 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2081.307137480931,
            "unit": "iter/sec",
            "range": "stddev: 0.0000988596367054651",
            "extra": "mean: 480.46728999850075 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 747.8571835097695,
            "unit": "iter/sec",
            "range": "stddev: 0.00005195031975309638",
            "extra": "mean: 1.3371536999977707 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 606.8663111994638,
            "unit": "iter/sec",
            "range": "stddev: 0.00011319474184032513",
            "extra": "mean: 1.6478093799992166 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 470.48607450202513,
            "unit": "iter/sec",
            "range": "stddev: 0.00007169974916430577",
            "extra": "mean: 2.1254614199972366 msec\nrounds: 50"
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
          "id": "0044f555d261df22fe2f171129f747088e546bbe",
          "message": "Reorganize docs and switch to ruff (#804)\n\n* Reorganize docs and switch to ruff\n\n* Add technical terms to spellcheck wordlist",
          "timestamp": "2026-01-31T02:34:21Z",
          "url": "https://github.com/redis/redis-om-python/commit/0044f555d261df22fe2f171129f747088e546bbe"
        },
        "date": 1771914439848,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 927714.6207345682,
            "unit": "iter/sec",
            "range": "stddev: 2.723755756372554e-7",
            "extra": "mean: 1.0779176889636555 usec\nrounds: 24128"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 523793.51156790595,
            "unit": "iter/sec",
            "range": "stddev: 5.52028248346501e-7",
            "extra": "mean: 1.9091492695406505 usec\nrounds: 40658"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70996.74092247682,
            "unit": "iter/sec",
            "range": "stddev: 0.000001846808002455148",
            "extra": "mean: 14.085153586020601 usec\nrounds: 16564"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 67649.67589904398,
            "unit": "iter/sec",
            "range": "stddev: 0.00000192706904385364",
            "extra": "mean: 14.78203681998914 usec\nrounds: 23547"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 65266.810422149516,
            "unit": "iter/sec",
            "range": "stddev: 0.000001839201137972358",
            "extra": "mean: 15.321723147369115 usec\nrounds: 20538"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 61007.029116081205,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018318492271499985",
            "extra": "mean: 16.391553801075098 usec\nrounds: 24191"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1508.2863896788826,
            "unit": "iter/sec",
            "range": "stddev: 0.00003657884666293253",
            "extra": "mean: 663.0040600001053 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2272.32372868924,
            "unit": "iter/sec",
            "range": "stddev: 0.000027345585267378025",
            "extra": "mean: 440.0781400002529 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1959.1947537139167,
            "unit": "iter/sec",
            "range": "stddev: 0.00012872276803399315",
            "extra": "mean: 510.41378000036275 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3255.602460473526,
            "unit": "iter/sec",
            "range": "stddev: 0.000011676232453275314",
            "extra": "mean: 307.16280999939727 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2842.164487878069,
            "unit": "iter/sec",
            "range": "stddev: 0.00003108259284223438",
            "extra": "mean: 351.844520000526 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1786.6094089336198,
            "unit": "iter/sec",
            "range": "stddev: 0.0016553270741707486",
            "extra": "mean: 559.7194299994612 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 321.7669194570156,
            "unit": "iter/sec",
            "range": "stddev: 0.00008146365796420644",
            "extra": "mean: 3.1078396800003816 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2621.2370634809035,
            "unit": "iter/sec",
            "range": "stddev: 0.000021591337234215258",
            "extra": "mean: 381.4992599990319 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.71293410927724,
            "unit": "iter/sec",
            "range": "stddev: 0.0002846756803117835",
            "extra": "mean: 14.141684440001256 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1627.3612014274042,
            "unit": "iter/sec",
            "range": "stddev: 0.00004368018095818032",
            "extra": "mean: 614.4917299999975 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 565.5362172646452,
            "unit": "iter/sec",
            "range": "stddev: 0.00004669155633916509",
            "extra": "mean: 1.7682333499996616 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 43.313457345058254,
            "unit": "iter/sec",
            "range": "stddev: 0.0030913544431235315",
            "extra": "mean: 23.0875127799996 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1067.0460570271962,
            "unit": "iter/sec",
            "range": "stddev: 0.0000368051026846613",
            "extra": "mean: 937.1666699992431 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1724.1169443682993,
            "unit": "iter/sec",
            "range": "stddev: 0.000021197988488126595",
            "extra": "mean: 580.0070600004403 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2437.755865331398,
            "unit": "iter/sec",
            "range": "stddev: 0.00004489561830619335",
            "extra": "mean: 410.21335000010595 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2151.8971706461584,
            "unit": "iter/sec",
            "range": "stddev: 0.00007559883951778785",
            "extra": "mean: 464.7062200001528 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 757.6076344912898,
            "unit": "iter/sec",
            "range": "stddev: 0.000034937357229249045",
            "extra": "mean: 1.3199444599993626 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 592.4859065086854,
            "unit": "iter/sec",
            "range": "stddev: 0.0001393845087044485",
            "extra": "mean: 1.6878038599983824 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 483.17521102387775,
            "unit": "iter/sec",
            "range": "stddev: 0.00007990016518518221",
            "extra": "mean: 2.069642600002055 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "dee6a3fe5273266c42917bd3db757abb79c4a5b8",
          "message": "Bump actions/upload-artifact from 4 to 6 (#805)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 6.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v6)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '6'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-02-24T10:27:07-08:00",
          "tree_id": "ea1fb6a2c116dfad0aa1a5f26f63ab50c6c9c1e8",
          "url": "https://github.com/redis/redis-om-python/commit/dee6a3fe5273266c42917bd3db757abb79c4a5b8"
        },
        "date": 1771957795211,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 915959.9217249239,
            "unit": "iter/sec",
            "range": "stddev: 2.725659046794215e-7",
            "extra": "mean: 1.0917508247706 usec\nrounds: 23642"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 522618.13017582014,
            "unit": "iter/sec",
            "range": "stddev: 3.82562898265276e-7",
            "extra": "mean: 1.9134429945313574 usec\nrounds: 39005"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68900.43770069744,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018423647968501512",
            "extra": "mean: 14.513695897607885 usec\nrounds: 13992"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66004.57780912153,
            "unit": "iter/sec",
            "range": "stddev: 0.000002097051558344697",
            "extra": "mean: 15.150464304035054 usec\nrounds: 23392"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63726.34650507947,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021609086135897168",
            "extra": "mean: 15.692096830316366 usec\nrounds: 20696"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58600.375843071444,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020498477359624906",
            "extra": "mean: 17.064736968205537 usec\nrounds: 19184"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1498.0894565521126,
            "unit": "iter/sec",
            "range": "stddev: 0.00003251000582162615",
            "extra": "mean: 667.5168800009601 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2166.8138077656686,
            "unit": "iter/sec",
            "range": "stddev: 0.00003624985161344952",
            "extra": "mean: 461.5071200008458 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1974.2155602529413,
            "unit": "iter/sec",
            "range": "stddev: 0.00012710855302103545",
            "extra": "mean: 506.53030000020743 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3349.3707905538936,
            "unit": "iter/sec",
            "range": "stddev: 0.00002815583197746415",
            "extra": "mean: 298.5635399998898 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2701.3595429395978,
            "unit": "iter/sec",
            "range": "stddev: 0.000026007172357479062",
            "extra": "mean: 370.1839699989762 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1432.1025228467295,
            "unit": "iter/sec",
            "range": "stddev: 0.002799574873776426",
            "extra": "mean: 698.2740299990553 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 320.12452587945097,
            "unit": "iter/sec",
            "range": "stddev: 0.00008931433795165014",
            "extra": "mean: 3.1237844000011705 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2485.4862515830378,
            "unit": "iter/sec",
            "range": "stddev: 0.000028274405902267483",
            "extra": "mean: 402.33575999991444 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.62034518529825,
            "unit": "iter/sec",
            "range": "stddev: 0.00022919575539489642",
            "extra": "mean: 14.160225319999995 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1607.2853487296693,
            "unit": "iter/sec",
            "range": "stddev: 0.00005268453665253589",
            "extra": "mean: 622.1670599998674 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 564.1753493773049,
            "unit": "iter/sec",
            "range": "stddev: 0.000037137054242759224",
            "extra": "mean: 1.7724985699990725 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.55416509244243,
            "unit": "iter/sec",
            "range": "stddev: 0.003515553867065854",
            "extra": "mean: 23.49946234000015 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1047.389208531066,
            "unit": "iter/sec",
            "range": "stddev: 0.000031873102965485765",
            "extra": "mean: 954.754920000056 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1581.8924942353472,
            "unit": "iter/sec",
            "range": "stddev: 0.000040953888088680794",
            "extra": "mean: 632.1542100010902 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2330.666041425302,
            "unit": "iter/sec",
            "range": "stddev: 0.0000242518033383345",
            "extra": "mean: 429.06190000024935 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2139.869396074138,
            "unit": "iter/sec",
            "range": "stddev: 0.0000814001682472667",
            "extra": "mean: 467.318239998491 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 738.0743569170617,
            "unit": "iter/sec",
            "range": "stddev: 0.00003765878706319179",
            "extra": "mean: 1.3548770400004173 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 595.4172733068959,
            "unit": "iter/sec",
            "range": "stddev: 0.00009409819755556214",
            "extra": "mean: 1.6794944400018608 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 471.1022843711336,
            "unit": "iter/sec",
            "range": "stddev: 0.0000987311029125901",
            "extra": "mean: 2.122681280000336 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "dependabot[bot]",
            "username": "dependabot[bot]",
            "email": "49699333+dependabot[bot]@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "dee6a3fe5273266c42917bd3db757abb79c4a5b8",
          "message": "Bump actions/upload-artifact from 4 to 6 (#805)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 6.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v6)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '6'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-02-24T18:27:07Z",
          "url": "https://github.com/redis/redis-om-python/commit/dee6a3fe5273266c42917bd3db757abb79c4a5b8"
        },
        "date": 1772000981062,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 861295.0003420868,
            "unit": "iter/sec",
            "range": "stddev: 3.469853263486208e-7",
            "extra": "mean: 1.161042383391083 usec\nrounds: 22320"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 487668.12545228424,
            "unit": "iter/sec",
            "range": "stddev: 5.198435958475877e-7",
            "extra": "mean: 2.050574863945757 usec\nrounds: 34055"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67552.26284055892,
            "unit": "iter/sec",
            "range": "stddev: 0.000002217585684568146",
            "extra": "mean: 14.803353106916088 usec\nrounds: 15981"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63345.473549167815,
            "unit": "iter/sec",
            "range": "stddev: 0.0000031554237566560195",
            "extra": "mean: 15.78644761766308 usec\nrounds: 17019"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62111.526183788366,
            "unit": "iter/sec",
            "range": "stddev: 0.000002218254234915989",
            "extra": "mean: 16.100071298215955 usec\nrounds: 22988"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 56571.061921289715,
            "unit": "iter/sec",
            "range": "stddev: 0.000004760980627909833",
            "extra": "mean: 17.676882243988143 usec\nrounds: 11838"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1281.4628605844753,
            "unit": "iter/sec",
            "range": "stddev: 0.0006955261350382047",
            "extra": "mean: 780.3581600046527 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2067.2166234360616,
            "unit": "iter/sec",
            "range": "stddev: 0.00008570069381474937",
            "extra": "mean: 483.7422400066771 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1796.9174563782879,
            "unit": "iter/sec",
            "range": "stddev: 0.00019341900526281095",
            "extra": "mean: 556.5085900025224 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3139.332228816758,
            "unit": "iter/sec",
            "range": "stddev: 0.00003078989013634626",
            "extra": "mean: 318.5390800058485 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2767.45869299969,
            "unit": "iter/sec",
            "range": "stddev: 0.00003350900182919658",
            "extra": "mean: 361.3423400065585 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1352.3814639552775,
            "unit": "iter/sec",
            "range": "stddev: 0.002414343700267505",
            "extra": "mean: 739.436340006705 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 297.2067934912866,
            "unit": "iter/sec",
            "range": "stddev: 0.0003737992260580987",
            "extra": "mean: 3.36466063999751 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2423.284154877973,
            "unit": "iter/sec",
            "range": "stddev: 0.00006143333214814738",
            "extra": "mean: 412.6631200006159 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 65.43729010272477,
            "unit": "iter/sec",
            "range": "stddev: 0.0003497749286424567",
            "extra": "mean: 15.28180642001189 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1475.9222181702285,
            "unit": "iter/sec",
            "range": "stddev: 0.0001260720403426212",
            "extra": "mean: 677.5424800093788 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 515.8690422493709,
            "unit": "iter/sec",
            "range": "stddev: 0.00016127016595645721",
            "extra": "mean: 1.9384764699964308 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 39.307196696324674,
            "unit": "iter/sec",
            "range": "stddev: 0.0047508434500441385",
            "extra": "mean: 25.44063387999131 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 963.5768992001051,
            "unit": "iter/sec",
            "range": "stddev: 0.0000803726136897697",
            "extra": "mean: 1.0377998900037255 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1286.7017190030517,
            "unit": "iter/sec",
            "range": "stddev: 0.0005240110626697562",
            "extra": "mean: 777.1808999950736 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2138.58794088588,
            "unit": "iter/sec",
            "range": "stddev: 0.00007828512877340093",
            "extra": "mean: 467.59825999288296 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1931.674919562866,
            "unit": "iter/sec",
            "range": "stddev: 0.00016009606975412062",
            "extra": "mean: 517.685450006411 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 568.0726384943541,
            "unit": "iter/sec",
            "range": "stddev: 0.0010023610500250397",
            "extra": "mean: 1.7603382599986617 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 556.3515772113586,
            "unit": "iter/sec",
            "range": "stddev: 0.00020091032390738488",
            "extra": "mean: 1.7974245799973687 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 429.6013142565229,
            "unit": "iter/sec",
            "range": "stddev: 0.0003941553243065737",
            "extra": "mean: 2.327739620002376 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "dependabot[bot]",
            "username": "dependabot[bot]",
            "email": "49699333+dependabot[bot]@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "dee6a3fe5273266c42917bd3db757abb79c4a5b8",
          "message": "Bump actions/upload-artifact from 4 to 6 (#805)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 6.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v6)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '6'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-02-24T18:27:07Z",
          "url": "https://github.com/redis/redis-om-python/commit/dee6a3fe5273266c42917bd3db757abb79c4a5b8"
        },
        "date": 1772087197110,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 847621.8465609524,
            "unit": "iter/sec",
            "range": "stddev: 3.073289307661505e-7",
            "extra": "mean: 1.179771385149274 usec\nrounds: 36205"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 506148.40641765564,
            "unit": "iter/sec",
            "range": "stddev: 4.912516341296514e-7",
            "extra": "mean: 1.9757051238739562 usec\nrounds: 53436"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68055.15417943483,
            "unit": "iter/sec",
            "range": "stddev: 0.0000033984874512772276",
            "extra": "mean: 14.69396421266479 usec\nrounds: 19560"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65164.69951563524,
            "unit": "iter/sec",
            "range": "stddev: 0.000003219179720179113",
            "extra": "mean: 15.345731775530796 usec\nrounds: 25035"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63713.134790435295,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021715549124652337",
            "extra": "mean: 15.695350782679137 usec\nrounds: 23382"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 57902.527598146575,
            "unit": "iter/sec",
            "range": "stddev: 0.00000219526684804417",
            "extra": "mean: 17.270403235937653 usec\nrounds: 23857"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1432.5884475095766,
            "unit": "iter/sec",
            "range": "stddev: 0.00003942598685082922",
            "extra": "mean: 698.0371799998863 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2124.139694218202,
            "unit": "iter/sec",
            "range": "stddev: 0.0000310165727555826",
            "extra": "mean: 470.7788299997162 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1862.6127867902471,
            "unit": "iter/sec",
            "range": "stddev: 0.00011120594384117984",
            "extra": "mean: 536.8802400005279 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3151.3953984815826,
            "unit": "iter/sec",
            "range": "stddev: 0.000027074436964928263",
            "extra": "mean: 317.31975000084844 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2805.284999838911,
            "unit": "iter/sec",
            "range": "stddev: 0.000024566618737084688",
            "extra": "mean: 356.47002000061434 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1731.5656610648232,
            "unit": "iter/sec",
            "range": "stddev: 0.0015675751172124384",
            "extra": "mean: 577.5120300000935 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 317.9316779195348,
            "unit": "iter/sec",
            "range": "stddev: 0.00005633575895571857",
            "extra": "mean: 3.145329859999322 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2507.393362751147,
            "unit": "iter/sec",
            "range": "stddev: 0.00002052982556806916",
            "extra": "mean: 398.82055000049377 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.26891067514002,
            "unit": "iter/sec",
            "range": "stddev: 0.00019886662507630383",
            "extra": "mean: 14.436490920000722 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1608.0671454240485,
            "unit": "iter/sec",
            "range": "stddev: 0.000021633523840116522",
            "extra": "mean: 621.8645799994249 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 546.7153326414656,
            "unit": "iter/sec",
            "range": "stddev: 0.00004913296387832653",
            "extra": "mean: 1.829105459999596 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.54350985377174,
            "unit": "iter/sec",
            "range": "stddev: 0.0029257709216361787",
            "extra": "mean: 23.5053479000004 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1045.186910618067,
            "unit": "iter/sec",
            "range": "stddev: 0.000027365742353520266",
            "extra": "mean: 956.7666700003485 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1537.0003949497655,
            "unit": "iter/sec",
            "range": "stddev: 0.00005877018669094396",
            "extra": "mean: 650.6179199990925 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2335.3749258821517,
            "unit": "iter/sec",
            "range": "stddev: 0.000023821646273701656",
            "extra": "mean: 428.1967699992606 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2034.6675611665946,
            "unit": "iter/sec",
            "range": "stddev: 0.00006437384315110913",
            "extra": "mean: 491.4807799985965 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 727.5137115603861,
            "unit": "iter/sec",
            "range": "stddev: 0.00010241250721615538",
            "extra": "mean: 1.3745445399993628 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 586.9518307184874,
            "unit": "iter/sec",
            "range": "stddev: 0.00017084077518466037",
            "extra": "mean: 1.7037173199986455 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 443.9856080113603,
            "unit": "iter/sec",
            "range": "stddev: 0.0004062619345325636",
            "extra": "mean: 2.2523252599989974 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "dependabot[bot]",
            "username": "dependabot[bot]",
            "email": "49699333+dependabot[bot]@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "dee6a3fe5273266c42917bd3db757abb79c4a5b8",
          "message": "Bump actions/upload-artifact from 4 to 6 (#805)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 6.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v6)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '6'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-02-24T18:27:07Z",
          "url": "https://github.com/redis/redis-om-python/commit/dee6a3fe5273266c42917bd3db757abb79c4a5b8"
        },
        "date": 1772259193776,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 862923.1806627614,
            "unit": "iter/sec",
            "range": "stddev: 3.480758911900452e-7",
            "extra": "mean: 1.1588517059328012 usec\nrounds: 24357"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 508652.9092218239,
            "unit": "iter/sec",
            "range": "stddev: 4.845200035632064e-7",
            "extra": "mean: 1.9659771562692452 usec\nrounds: 40755"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68136.34362233312,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021802403890381",
            "extra": "mean: 14.676455278299215 usec\nrounds: 16625"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63566.211361388625,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019688766177671993",
            "extra": "mean: 15.731628149344445 usec\nrounds: 23020"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63140.57597185876,
            "unit": "iter/sec",
            "range": "stddev: 0.000002111370541055088",
            "extra": "mean: 15.8376762423848 usec\nrounds: 22557"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58461.50636009788,
            "unit": "iter/sec",
            "range": "stddev: 0.000002193009916452601",
            "extra": "mean: 17.105272550461287 usec\nrounds: 21596"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1422.958102789925,
            "unit": "iter/sec",
            "range": "stddev: 0.000044012769217512025",
            "extra": "mean: 702.7613800008226 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 1964.1171895251373,
            "unit": "iter/sec",
            "range": "stddev: 0.00003578612074350015",
            "extra": "mean: 509.13458999957584 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1828.9502449298002,
            "unit": "iter/sec",
            "range": "stddev: 0.00012728832512343512",
            "extra": "mean: 546.7617299990479 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3063.828087140151,
            "unit": "iter/sec",
            "range": "stddev: 0.000013787194199708156",
            "extra": "mean: 326.38906999949313 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2680.018016176197,
            "unit": "iter/sec",
            "range": "stddev: 0.00002115448021993204",
            "extra": "mean: 373.1318199967859 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1752.8922546917747,
            "unit": "iter/sec",
            "range": "stddev: 0.00161667566824981",
            "extra": "mean: 570.4857199998514 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 322.1171331539018,
            "unit": "iter/sec",
            "range": "stddev: 0.0000649855811611345",
            "extra": "mean: 3.1044607600000518 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2451.236209905135,
            "unit": "iter/sec",
            "range": "stddev: 0.000026129046270030782",
            "extra": "mean: 407.9574199985814 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.70182491909402,
            "unit": "iter/sec",
            "range": "stddev: 0.00022463113585406548",
            "extra": "mean: 14.346826660001284 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1625.0974063017677,
            "unit": "iter/sec",
            "range": "stddev: 0.00003009211389301557",
            "extra": "mean: 615.3477300020427 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 549.7122819656478,
            "unit": "iter/sec",
            "range": "stddev: 0.000049684596135438675",
            "extra": "mean: 1.8191334500008338 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.32588731780389,
            "unit": "iter/sec",
            "range": "stddev: 0.0033528087774088978",
            "extra": "mean: 23.626202860001513 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1036.6789665841775,
            "unit": "iter/sec",
            "range": "stddev: 0.00003160549407235125",
            "extra": "mean: 964.6187800018424 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1551.710688881924,
            "unit": "iter/sec",
            "range": "stddev: 0.00003425649301312554",
            "extra": "mean: 644.4500299991773 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2324.13183971281,
            "unit": "iter/sec",
            "range": "stddev: 0.00002833191835109728",
            "extra": "mean: 430.2681900023231 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2121.059604169091,
            "unit": "iter/sec",
            "range": "stddev: 0.00006164072172548437",
            "extra": "mean: 471.4624700005743 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 726.6637249387958,
            "unit": "iter/sec",
            "range": "stddev: 0.00003747703202295077",
            "extra": "mean: 1.3761523599987413 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 587.2720436027649,
            "unit": "iter/sec",
            "range": "stddev: 0.00011944420355823886",
            "extra": "mean: 1.7027883599996585 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 452.2575125692302,
            "unit": "iter/sec",
            "range": "stddev: 0.00044072621851181764",
            "extra": "mean: 2.211129660000779 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "dependabot[bot]",
            "username": "dependabot[bot]",
            "email": "49699333+dependabot[bot]@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "dee6a3fe5273266c42917bd3db757abb79c4a5b8",
          "message": "Bump actions/upload-artifact from 4 to 6 (#805)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 6.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v6)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '6'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-02-24T18:27:07Z",
          "url": "https://github.com/redis/redis-om-python/commit/dee6a3fe5273266c42917bd3db757abb79c4a5b8"
        },
        "date": 1772346016306,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 916883.3538151721,
            "unit": "iter/sec",
            "range": "stddev: 3.4056129647085684e-7",
            "extra": "mean: 1.0906512762381144 usec\nrounds: 22763"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 508769.22460592794,
            "unit": "iter/sec",
            "range": "stddev: 4.40227374548427e-7",
            "extra": "mean: 1.9655276923924783 usec\nrounds: 37736"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70296.90990899275,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020997710101158134",
            "extra": "mean: 14.225376354303659 usec\nrounds: 14675"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 67328.00108255865,
            "unit": "iter/sec",
            "range": "stddev: 0.000002022453142648136",
            "extra": "mean: 14.852661358144056 usec\nrounds: 22103"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 65418.04830840084,
            "unit": "iter/sec",
            "range": "stddev: 0.000002120098138162316",
            "extra": "mean: 15.286301347384928 usec\nrounds: 21301"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58217.30931917834,
            "unit": "iter/sec",
            "range": "stddev: 0.000003001876191948829",
            "extra": "mean: 17.177021949219032 usec\nrounds: 21732"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1431.248415161767,
            "unit": "iter/sec",
            "range": "stddev: 0.0000448766066068111",
            "extra": "mean: 698.6907299994982 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2112.193821665053,
            "unit": "iter/sec",
            "range": "stddev: 0.0000285425630857546",
            "extra": "mean: 473.4413999997855 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1841.035427785323,
            "unit": "iter/sec",
            "range": "stddev: 0.000135582386153644",
            "extra": "mean: 543.1725999987691 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3097.0179588391793,
            "unit": "iter/sec",
            "range": "stddev: 0.000015896621040164144",
            "extra": "mean: 322.89124999934415 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2584.824372044228,
            "unit": "iter/sec",
            "range": "stddev: 0.000028065501439119715",
            "extra": "mean: 386.8734799993945 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1609.3368574593524,
            "unit": "iter/sec",
            "range": "stddev: 0.0017817913771989713",
            "extra": "mean: 621.3739499999349 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 313.84966143000014,
            "unit": "iter/sec",
            "range": "stddev: 0.00008052686530964307",
            "extra": "mean: 3.186238899999694 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2443.558502443176,
            "unit": "iter/sec",
            "range": "stddev: 0.000023224792822036344",
            "extra": "mean: 409.23923000008244 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 68.61039014588292,
            "unit": "iter/sec",
            "range": "stddev: 0.00022158792336708055",
            "extra": "mean: 14.575051940001345 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1594.0296067411562,
            "unit": "iter/sec",
            "range": "stddev: 0.000015108940984362095",
            "extra": "mean: 627.3409199998525 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 525.8896389564954,
            "unit": "iter/sec",
            "range": "stddev: 0.00009833581985864094",
            "extra": "mean: 1.9015396500000747 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.86783200473646,
            "unit": "iter/sec",
            "range": "stddev: 0.0031668089670092085",
            "extra": "mean: 23.884685500000842 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1025.1576664291415,
            "unit": "iter/sec",
            "range": "stddev: 0.00003786299100038928",
            "extra": "mean: 975.4597100007345 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1566.7671147171843,
            "unit": "iter/sec",
            "range": "stddev: 0.00001681503164938467",
            "extra": "mean: 638.2569500001978 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2298.20179498219,
            "unit": "iter/sec",
            "range": "stddev: 0.00003452805671068396",
            "extra": "mean: 435.122800001011 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2009.0457687567177,
            "unit": "iter/sec",
            "range": "stddev: 0.00006787547920347593",
            "extra": "mean: 497.7487399995084 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 736.2649262630682,
            "unit": "iter/sec",
            "range": "stddev: 0.00007574873735615361",
            "extra": "mean: 1.3582067599980974 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 604.690582429321,
            "unit": "iter/sec",
            "range": "stddev: 0.00009953823127704002",
            "extra": "mean: 1.6537383399995065 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 474.85774496577653,
            "unit": "iter/sec",
            "range": "stddev: 0.00010030143243037044",
            "extra": "mean: 2.10589384000059 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "dependabot[bot]",
            "username": "dependabot[bot]",
            "email": "49699333+dependabot[bot]@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "dee6a3fe5273266c42917bd3db757abb79c4a5b8",
          "message": "Bump actions/upload-artifact from 4 to 6 (#805)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 6.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v6)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '6'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-02-24T18:27:07Z",
          "url": "https://github.com/redis/redis-om-python/commit/dee6a3fe5273266c42917bd3db757abb79c4a5b8"
        },
        "date": 1772432709326,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 907401.0717527571,
            "unit": "iter/sec",
            "range": "stddev: 3.2280392715172923e-7",
            "extra": "mean: 1.1020485109945668 usec\nrounds: 26427"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 517805.94401473744,
            "unit": "iter/sec",
            "range": "stddev: 4.307486952994279e-7",
            "extra": "mean: 1.9312254167007759 usec\nrounds: 42366"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68798.88956228795,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020266922159080835",
            "extra": "mean: 14.535118318946664 usec\nrounds: 17774"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64552.11616141309,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028157774749618856",
            "extra": "mean: 15.491358912223605 usec\nrounds: 21880"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63032.11885209165,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022087753771083197",
            "extra": "mean: 15.864927567270195 usec\nrounds: 22904"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 55115.990739856665,
            "unit": "iter/sec",
            "range": "stddev: 0.000004302583308878373",
            "extra": "mean: 18.143554830029725 usec\nrounds: 22360"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1443.3860960235863,
            "unit": "iter/sec",
            "range": "stddev: 0.00006759470859569303",
            "extra": "mean: 692.8153199999088 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2075.1318071832266,
            "unit": "iter/sec",
            "range": "stddev: 0.00003525212856635005",
            "extra": "mean: 481.8971000003103 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1862.8571635072794,
            "unit": "iter/sec",
            "range": "stddev: 0.0001310521121914673",
            "extra": "mean: 536.8098100002783 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3076.2150741861424,
            "unit": "iter/sec",
            "range": "stddev: 0.000016102133258753366",
            "extra": "mean: 325.0748000006354 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2797.4673632786526,
            "unit": "iter/sec",
            "range": "stddev: 0.000023700473024161365",
            "extra": "mean: 357.46618999979773 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1757.4580323838277,
            "unit": "iter/sec",
            "range": "stddev: 0.0015531332201393392",
            "extra": "mean: 569.0036300005374 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 325.14553156339974,
            "unit": "iter/sec",
            "range": "stddev: 0.00005852964842491719",
            "extra": "mean: 3.0755458799993107 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2474.767150396609,
            "unit": "iter/sec",
            "range": "stddev: 0.00003534865123896899",
            "extra": "mean: 404.07841999993366 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.61977654555358,
            "unit": "iter/sec",
            "range": "stddev: 0.00025773788664103985",
            "extra": "mean: 14.160339339999837 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1639.6733528023078,
            "unit": "iter/sec",
            "range": "stddev: 0.00003146936594181954",
            "extra": "mean: 609.8775699994974 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 550.696048415392,
            "unit": "iter/sec",
            "range": "stddev: 0.00003992672354877911",
            "extra": "mean: 1.8158837400004302 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.598240125273996,
            "unit": "iter/sec",
            "range": "stddev: 0.003326523234034101",
            "extra": "mean: 23.47514820000015 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1006.0955202577445,
            "unit": "iter/sec",
            "range": "stddev: 0.00004040838766261462",
            "extra": "mean: 993.9414100003318 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1579.8140710498228,
            "unit": "iter/sec",
            "range": "stddev: 0.00002370139424292094",
            "extra": "mean: 632.985880000092 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2259.7146545350697,
            "unit": "iter/sec",
            "range": "stddev: 0.00003420944448666714",
            "extra": "mean: 442.53374999939865 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2071.7889369135737,
            "unit": "iter/sec",
            "range": "stddev: 0.00007214616489984905",
            "extra": "mean: 482.6746500006607 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 731.5147146015712,
            "unit": "iter/sec",
            "range": "stddev: 0.000038434911957697534",
            "extra": "mean: 1.3670264999996107 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 588.5465036601012,
            "unit": "iter/sec",
            "range": "stddev: 0.00009557790704862128",
            "extra": "mean: 1.699101080001526 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 468.45508702776533,
            "unit": "iter/sec",
            "range": "stddev: 0.00006872568880512508",
            "extra": "mean: 2.134676360000185 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "dependabot[bot]",
            "username": "dependabot[bot]",
            "email": "49699333+dependabot[bot]@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "dee6a3fe5273266c42917bd3db757abb79c4a5b8",
          "message": "Bump actions/upload-artifact from 4 to 6 (#805)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 6.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v6)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '6'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-02-24T18:27:07Z",
          "url": "https://github.com/redis/redis-om-python/commit/dee6a3fe5273266c42917bd3db757abb79c4a5b8"
        },
        "date": 1772691742207,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 937051.7509116426,
            "unit": "iter/sec",
            "range": "stddev: 1.8291679500211734e-7",
            "extra": "mean: 1.067176918486216 usec\nrounds: 25215"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 527293.9300104562,
            "unit": "iter/sec",
            "range": "stddev: 2.542120646005759e-7",
            "extra": "mean: 1.8964754628982168 usec\nrounds: 37046"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 76040.79311885417,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011500620238826492",
            "extra": "mean: 13.150836005050186 usec\nrounds: 17592"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 71306.95764299248,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013613969085407139",
            "extra": "mean: 14.02387695470938 usec\nrounds: 19952"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 70860.68140292184,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011545677328649254",
            "extra": "mean: 14.112198474551592 usec\nrounds: 19272"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 65606.9181457795,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011026395663853752",
            "extra": "mean: 15.242294993616158 usec\nrounds: 17458"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1813.1153475520262,
            "unit": "iter/sec",
            "range": "stddev: 0.000043850143092657015",
            "extra": "mean: 551.5368899999373 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2140.734543386412,
            "unit": "iter/sec",
            "range": "stddev: 0.0000423697563082669",
            "extra": "mean: 467.1293800015519 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2258.651051378053,
            "unit": "iter/sec",
            "range": "stddev: 0.0001474410149248386",
            "extra": "mean: 442.7421399998366 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4181.542329269118,
            "unit": "iter/sec",
            "range": "stddev: 0.000029072570880508077",
            "extra": "mean: 239.14621000017178 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3541.906402079082,
            "unit": "iter/sec",
            "range": "stddev: 0.000022597582293710547",
            "extra": "mean: 282.3338299998568 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1983.4060711124305,
            "unit": "iter/sec",
            "range": "stddev: 0.0015712286957905498",
            "extra": "mean: 504.18319000058887 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 348.21303824103387,
            "unit": "iter/sec",
            "range": "stddev: 0.00008944131390917006",
            "extra": "mean: 2.871805160000349 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2634.5599519598027,
            "unit": "iter/sec",
            "range": "stddev: 0.00003762442270855901",
            "extra": "mean: 379.5700299991722 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 80.79019310855034,
            "unit": "iter/sec",
            "range": "stddev: 0.00017262148280907421",
            "extra": "mean: 12.377739939999799 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1772.6754977069552,
            "unit": "iter/sec",
            "range": "stddev: 0.0000398918661499556",
            "extra": "mean: 564.1190400011453 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 642.3983928578185,
            "unit": "iter/sec",
            "range": "stddev: 0.000055389697888346614",
            "extra": "mean: 1.556666410000389 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 48.50147020324292,
            "unit": "iter/sec",
            "range": "stddev: 0.0032045526195971724",
            "extra": "mean: 20.61793169999902 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1244.55192726799,
            "unit": "iter/sec",
            "range": "stddev: 0.00004984360879870026",
            "extra": "mean: 803.5020299998052 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 2112.0847915904233,
            "unit": "iter/sec",
            "range": "stddev: 0.00003277095847546619",
            "extra": "mean: 473.46583999924974 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 3011.3967514554997,
            "unit": "iter/sec",
            "range": "stddev: 0.000023902159621950924",
            "extra": "mean: 332.07182000069224 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2508.3224256829267,
            "unit": "iter/sec",
            "range": "stddev: 0.00009195455910976538",
            "extra": "mean: 398.6728300002085 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 858.8505563270148,
            "unit": "iter/sec",
            "range": "stddev: 0.00003291710218617746",
            "extra": "mean: 1.164346920000412 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 706.244954056758,
            "unit": "iter/sec",
            "range": "stddev: 0.00009792257877477413",
            "extra": "mean: 1.415939319999211 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 552.4023996935538,
            "unit": "iter/sec",
            "range": "stddev: 0.00010389352003493207",
            "extra": "mean: 1.8102745399997389 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "dependabot[bot]",
            "username": "dependabot[bot]",
            "email": "49699333+dependabot[bot]@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "dee6a3fe5273266c42917bd3db757abb79c4a5b8",
          "message": "Bump actions/upload-artifact from 4 to 6 (#805)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 6.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v6)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '6'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-02-24T18:27:07Z",
          "url": "https://github.com/redis/redis-om-python/commit/dee6a3fe5273266c42917bd3db757abb79c4a5b8"
        },
        "date": 1772778047180,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 915288.0600831171,
            "unit": "iter/sec",
            "range": "stddev: 3.385411780551458e-7",
            "extra": "mean: 1.092552217833138 usec\nrounds: 19840"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 523404.1932774639,
            "unit": "iter/sec",
            "range": "stddev: 4.313864831135233e-7",
            "extra": "mean: 1.9105693321602528 usec\nrounds: 37342"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67774.99428402577,
            "unit": "iter/sec",
            "range": "stddev: 0.0000029874242248314236",
            "extra": "mean: 14.754704305975798 usec\nrounds: 12611"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64002.81826623265,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022551035393517203",
            "extra": "mean: 15.624311977017918 usec\nrounds: 23069"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62183.97079934653,
            "unit": "iter/sec",
            "range": "stddev: 0.000002485140579703828",
            "extra": "mean: 16.081314640179084 usec\nrounds: 13463"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58251.226113124816,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022806757271734145",
            "extra": "mean: 17.167020623016313 usec\nrounds: 20996"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1381.342900406062,
            "unit": "iter/sec",
            "range": "stddev: 0.00004166119484482744",
            "extra": "mean: 723.9332099987905 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2115.1416710248022,
            "unit": "iter/sec",
            "range": "stddev: 0.00003039259929649745",
            "extra": "mean: 472.7815700002225 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1811.6679167796112,
            "unit": "iter/sec",
            "range": "stddev: 0.00015222896928182868",
            "extra": "mean: 551.9775399994842 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3051.3776939740487,
            "unit": "iter/sec",
            "range": "stddev: 0.000032079399895000003",
            "extra": "mean: 327.7208200003656 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2598.7402398756253,
            "unit": "iter/sec",
            "range": "stddev: 0.000025675851375827497",
            "extra": "mean: 384.80183000046964 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1496.8068768553499,
            "unit": "iter/sec",
            "range": "stddev: 0.002347689516606422",
            "extra": "mean: 668.0888600010348 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 324.2848793634808,
            "unit": "iter/sec",
            "range": "stddev: 0.00007759816694919663",
            "extra": "mean: 3.0837083799985976 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2370.6219442859388,
            "unit": "iter/sec",
            "range": "stddev: 0.000022385994247404516",
            "extra": "mean: 421.83022999950026 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.2089450641567,
            "unit": "iter/sec",
            "range": "stddev: 0.0002645041206145927",
            "extra": "mean: 14.243199340001524 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1605.6546790461068,
            "unit": "iter/sec",
            "range": "stddev: 0.00002483757137995601",
            "extra": "mean: 622.7989199982176 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 559.3765260843488,
            "unit": "iter/sec",
            "range": "stddev: 0.000053583457511438536",
            "extra": "mean: 1.7877046199990332 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.92015543617899,
            "unit": "iter/sec",
            "range": "stddev: 0.00333278138067239",
            "extra": "mean: 23.854873380000754 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1013.3026780902175,
            "unit": "iter/sec",
            "range": "stddev: 0.00003156672333035002",
            "extra": "mean: 986.8719599998599 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1512.025814148572,
            "unit": "iter/sec",
            "range": "stddev: 0.00003946639806050193",
            "extra": "mean: 661.3643700012517 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2197.9238806616095,
            "unit": "iter/sec",
            "range": "stddev: 0.000035715132293094705",
            "extra": "mean: 454.9748100006923 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2075.5476514068955,
            "unit": "iter/sec",
            "range": "stddev: 0.00007033238000776301",
            "extra": "mean: 481.8005500004574 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 721.887947195509,
            "unit": "iter/sec",
            "range": "stddev: 0.000057410686355808906",
            "extra": "mean: 1.3852565400003414 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 590.4905163388182,
            "unit": "iter/sec",
            "range": "stddev: 0.00009706478290784952",
            "extra": "mean: 1.6935072999990552 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 480.93228531077835,
            "unit": "iter/sec",
            "range": "stddev: 0.00007308555153801999",
            "extra": "mean: 2.079294800002458 msec\nrounds: 50"
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
          "id": "72ed796ccbc5eddfb8413cbbd569e8f5d55f2083",
          "message": "fix: Return UTC-aware datetimes from unmarshalling (#809)\n\nPreviously, datetime fields were unmarshalled using datetime.fromtimestamp(value)\nwhich returns a naive datetime in the server's local timezone. This caused:\n- Non-deterministic behavior depending on server timezone\n- Inability to compare retrieved datetimes with timezone-aware datetimes\n- Time jumps around daylight savings transitions\n\nThis fix changes unmarshalling to use datetime.fromtimestamp(value, timezone.utc)\nwhich returns a UTC-aware datetime. This follows the standard ORM pattern of\nstoring UTC and returning UTC-aware datetimes.\n\nBREAKING CHANGE: Retrieved datetime fields are now UTC-aware instead of naive\nlocal time. Code that compared retrieved datetimes with naive datetimes will\nneed to either:\n1. Make the comparison datetime UTC-aware, or\n2. Use .timestamp() for comparison\n\nFixes #807 (Return UTC-aware datetimes from unmarshalling)\n\n* style: Format test file with ruff\n* style: Format model.py with ruff\n* fix: Make test use UTC-aware datetime after fix\n* fix: preserve date round-trips across timezones\n* chore: keep sync output formatter-clean in CI\n* chore: align lint with current ruff rules\n* fix: normalize date query timestamps to UTC",
          "timestamp": "2026-03-06T14:11:28-08:00",
          "tree_id": "e2e6a0c9577d984b762b9f00c26b473eaaa548f7",
          "url": "https://github.com/redis/redis-om-python/commit/72ed796ccbc5eddfb8413cbbd569e8f5d55f2083"
        },
        "date": 1772835212884,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 809017.0806066158,
            "unit": "iter/sec",
            "range": "stddev: 6.090394406746725e-7",
            "extra": "mean: 1.236067845749538 usec\nrounds: 22787"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 493151.1013246448,
            "unit": "iter/sec",
            "range": "stddev: 5.414851785329968e-7",
            "extra": "mean: 2.0277760656194763 usec\nrounds: 38614"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70075.29330644732,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016912458172575172",
            "extra": "mean: 14.27036481498386 usec\nrounds: 15967"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65609.76473177741,
            "unit": "iter/sec",
            "range": "stddev: 0.0000033033682274794605",
            "extra": "mean: 15.241633681939732 usec\nrounds: 20747"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 66156.82216442155,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016253242661991345",
            "extra": "mean: 15.115599076307953 usec\nrounds: 20136"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 61108.25622780652,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015512375221131558",
            "extra": "mean: 16.364400847441672 usec\nrounds: 22420"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1717.1528787907316,
            "unit": "iter/sec",
            "range": "stddev: 0.000039744166417484845",
            "extra": "mean: 582.3593299999175 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2131.3109181975615,
            "unit": "iter/sec",
            "range": "stddev: 0.0000502083535402564",
            "extra": "mean: 469.19479999928626 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1998.6209914874898,
            "unit": "iter/sec",
            "range": "stddev: 0.00015111065289619545",
            "extra": "mean: 500.34499000020105 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3379.8993330773023,
            "unit": "iter/sec",
            "range": "stddev: 0.00002957846738215988",
            "extra": "mean: 295.86680000008414 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2812.198066594857,
            "unit": "iter/sec",
            "range": "stddev: 0.000027979215607374606",
            "extra": "mean: 355.5937300002654 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1905.8228127932082,
            "unit": "iter/sec",
            "range": "stddev: 0.0015846338472494123",
            "extra": "mean: 524.7077500003172 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 330.4254156514515,
            "unit": "iter/sec",
            "range": "stddev: 0.00006085225123615641",
            "extra": "mean: 3.026401580000879 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2524.30947892747,
            "unit": "iter/sec",
            "range": "stddev: 0.00002298253529762194",
            "extra": "mean: 396.1479400001622 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 79.00114891055709,
            "unit": "iter/sec",
            "range": "stddev: 0.00016487685957812618",
            "extra": "mean: 12.658043759998634 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1780.146369332471,
            "unit": "iter/sec",
            "range": "stddev: 0.000025330155659169365",
            "extra": "mean: 561.7515599995215 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 611.1870504230022,
            "unit": "iter/sec",
            "range": "stddev: 0.000044363819297973176",
            "extra": "mean: 1.636160320000073 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 47.60518671153397,
            "unit": "iter/sec",
            "range": "stddev: 0.003339454487979819",
            "extra": "mean: 21.006114439998953 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1153.7838317685837,
            "unit": "iter/sec",
            "range": "stddev: 0.00003062464686871627",
            "extra": "mean: 866.7134800001008 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1778.083133919892,
            "unit": "iter/sec",
            "range": "stddev: 0.000043485872527417824",
            "extra": "mean: 562.4034000004485 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2665.8543275350894,
            "unit": "iter/sec",
            "range": "stddev: 0.000033177653790789774",
            "extra": "mean: 375.1142700001253 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2226.5555941978196,
            "unit": "iter/sec",
            "range": "stddev: 0.00009319212015436672",
            "extra": "mean: 449.1242000001705 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 843.4396806180512,
            "unit": "iter/sec",
            "range": "stddev: 0.00005218048870315679",
            "extra": "mean: 1.1856212400005006 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 682.7204651850999,
            "unit": "iter/sec",
            "range": "stddev: 0.00010317352486273616",
            "extra": "mean: 1.4647283199997219 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 524.0736369578913,
            "unit": "iter/sec",
            "range": "stddev: 0.00009908263049780831",
            "extra": "mean: 1.9081287999998153 msec\nrounds: 50"
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
          "id": "72ed796ccbc5eddfb8413cbbd569e8f5d55f2083",
          "message": "fix: Return UTC-aware datetimes from unmarshalling (#809)\n\nPreviously, datetime fields were unmarshalled using datetime.fromtimestamp(value)\nwhich returns a naive datetime in the server's local timezone. This caused:\n- Non-deterministic behavior depending on server timezone\n- Inability to compare retrieved datetimes with timezone-aware datetimes\n- Time jumps around daylight savings transitions\n\nThis fix changes unmarshalling to use datetime.fromtimestamp(value, timezone.utc)\nwhich returns a UTC-aware datetime. This follows the standard ORM pattern of\nstoring UTC and returning UTC-aware datetimes.\n\nBREAKING CHANGE: Retrieved datetime fields are now UTC-aware instead of naive\nlocal time. Code that compared retrieved datetimes with naive datetimes will\nneed to either:\n1. Make the comparison datetime UTC-aware, or\n2. Use .timestamp() for comparison\n\nFixes #807 (Return UTC-aware datetimes from unmarshalling)\n\n* style: Format test file with ruff\n* style: Format model.py with ruff\n* fix: Make test use UTC-aware datetime after fix\n* fix: preserve date round-trips across timezones\n* chore: keep sync output formatter-clean in CI\n* chore: align lint with current ruff rules\n* fix: normalize date query timestamps to UTC",
          "timestamp": "2026-03-06T22:11:28Z",
          "url": "https://github.com/redis/redis-om-python/commit/72ed796ccbc5eddfb8413cbbd569e8f5d55f2083"
        },
        "date": 1772864093210,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 905133.4233480081,
            "unit": "iter/sec",
            "range": "stddev: 3.2639967514918706e-7",
            "extra": "mean: 1.1048094946058769 usec\nrounds: 24477"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 509893.2516444436,
            "unit": "iter/sec",
            "range": "stddev: 4.796907916896091e-7",
            "extra": "mean: 1.9611948123944096 usec\nrounds: 41676"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68276.60107838028,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019211254877398654",
            "extra": "mean: 14.646306116674124 usec\nrounds: 17673"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63870.44120488089,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020159066815100545",
            "extra": "mean: 15.656694726630153 usec\nrounds: 20670"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62873.2854235001,
            "unit": "iter/sec",
            "range": "stddev: 0.000002071343283842403",
            "extra": "mean: 15.905006287872954 usec\nrounds: 22742"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58097.250383987164,
            "unit": "iter/sec",
            "range": "stddev: 0.000002036217716351091",
            "extra": "mean: 17.212518551060743 usec\nrounds: 20538"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1414.6717931753142,
            "unit": "iter/sec",
            "range": "stddev: 0.000037262577148886717",
            "extra": "mean: 706.8777399989301 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2110.4919795277087,
            "unit": "iter/sec",
            "range": "stddev: 0.000030883615738418154",
            "extra": "mean: 473.82317000028706 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1859.5677840067804,
            "unit": "iter/sec",
            "range": "stddev: 0.0001261669239103295",
            "extra": "mean: 537.7593700001171 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3061.8163576416096,
            "unit": "iter/sec",
            "range": "stddev: 0.000012757478498669032",
            "extra": "mean: 326.6035200002193 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2650.2238299542696,
            "unit": "iter/sec",
            "range": "stddev: 0.00003233459089958994",
            "extra": "mean: 377.32661999996253 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1783.984680707579,
            "unit": "iter/sec",
            "range": "stddev: 0.0014416360123638025",
            "extra": "mean: 560.5429300005937 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 318.81945186847634,
            "unit": "iter/sec",
            "range": "stddev: 0.00007055559123858109",
            "extra": "mean: 3.1365714800003275 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2327.275272887983,
            "unit": "iter/sec",
            "range": "stddev: 0.0000390475429104886",
            "extra": "mean: 429.68703000013875 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 68.87896251200806,
            "unit": "iter/sec",
            "range": "stddev: 0.0007669850024799807",
            "extra": "mean: 14.5182209999993 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1586.2525456188898,
            "unit": "iter/sec",
            "range": "stddev: 0.00004484341076400036",
            "extra": "mean: 630.4166399996802 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 533.0460996657077,
            "unit": "iter/sec",
            "range": "stddev: 0.00007157800889425611",
            "extra": "mean: 1.8760103500000014 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.94429670055323,
            "unit": "iter/sec",
            "range": "stddev: 0.003292326374669993",
            "extra": "mean: 23.841143579999766 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 990.7312828338778,
            "unit": "iter/sec",
            "range": "stddev: 0.000050687703815374685",
            "extra": "mean: 1.0093554300007668 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1539.5620410932179,
            "unit": "iter/sec",
            "range": "stddev: 0.000032856806422349266",
            "extra": "mean: 649.5353700003648 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2320.3924043446827,
            "unit": "iter/sec",
            "range": "stddev: 0.00002661530552914544",
            "extra": "mean: 430.96158999986756 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2027.4948577664795,
            "unit": "iter/sec",
            "range": "stddev: 0.00007481494473570127",
            "extra": "mean: 493.219499999924 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 724.6555559956064,
            "unit": "iter/sec",
            "range": "stddev: 0.000045755361365228754",
            "extra": "mean: 1.3799659600016412 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 588.4223570458931,
            "unit": "iter/sec",
            "range": "stddev: 0.00011154344981852738",
            "extra": "mean: 1.6994595600010598 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 464.4954538899911,
            "unit": "iter/sec",
            "range": "stddev: 0.00008813065281658036",
            "extra": "mean: 2.1528736000004756 msec\nrounds: 50"
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
          "id": "72ed796ccbc5eddfb8413cbbd569e8f5d55f2083",
          "message": "fix: Return UTC-aware datetimes from unmarshalling (#809)\n\nPreviously, datetime fields were unmarshalled using datetime.fromtimestamp(value)\nwhich returns a naive datetime in the server's local timezone. This caused:\n- Non-deterministic behavior depending on server timezone\n- Inability to compare retrieved datetimes with timezone-aware datetimes\n- Time jumps around daylight savings transitions\n\nThis fix changes unmarshalling to use datetime.fromtimestamp(value, timezone.utc)\nwhich returns a UTC-aware datetime. This follows the standard ORM pattern of\nstoring UTC and returning UTC-aware datetimes.\n\nBREAKING CHANGE: Retrieved datetime fields are now UTC-aware instead of naive\nlocal time. Code that compared retrieved datetimes with naive datetimes will\nneed to either:\n1. Make the comparison datetime UTC-aware, or\n2. Use .timestamp() for comparison\n\nFixes #807 (Return UTC-aware datetimes from unmarshalling)\n\n* style: Format test file with ruff\n* style: Format model.py with ruff\n* fix: Make test use UTC-aware datetime after fix\n* fix: preserve date round-trips across timezones\n* chore: keep sync output formatter-clean in CI\n* chore: align lint with current ruff rules\n* fix: normalize date query timestamps to UTC",
          "timestamp": "2026-03-06T22:11:28Z",
          "url": "https://github.com/redis/redis-om-python/commit/72ed796ccbc5eddfb8413cbbd569e8f5d55f2083"
        },
        "date": 1772950702488,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 917009.180572015,
            "unit": "iter/sec",
            "range": "stddev: 3.2989464410650307e-7",
            "extra": "mean: 1.0905016233056868 usec\nrounds: 22794"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 523153.17009615386,
            "unit": "iter/sec",
            "range": "stddev: 4.504596035529857e-7",
            "extra": "mean: 1.9114860755143723 usec\nrounds: 36375"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68259.52073570379,
            "unit": "iter/sec",
            "range": "stddev: 0.000002065073412131408",
            "extra": "mean: 14.649971010958778 usec\nrounds: 16144"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63804.72566470833,
            "unit": "iter/sec",
            "range": "stddev: 0.000002138882313697733",
            "extra": "mean: 15.67282030573983 usec\nrounds: 15966"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62861.86184434448,
            "unit": "iter/sec",
            "range": "stddev: 0.000002059193406255288",
            "extra": "mean: 15.907896626990654 usec\nrounds: 19715"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58921.34985244486,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023302124841949223",
            "extra": "mean: 16.971776826299347 usec\nrounds: 18685"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1413.8952763972998,
            "unit": "iter/sec",
            "range": "stddev: 0.00004781038767642304",
            "extra": "mean: 707.2659599995745 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2115.3530356026395,
            "unit": "iter/sec",
            "range": "stddev: 0.000027237751007077",
            "extra": "mean: 472.73433000043497 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1844.6148470968385,
            "unit": "iter/sec",
            "range": "stddev: 0.00013358548442593193",
            "extra": "mean: 542.1185899993475 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3018.9909626537656,
            "unit": "iter/sec",
            "range": "stddev: 0.00002655751338084618",
            "extra": "mean: 331.23649999964755 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2691.5295090188233,
            "unit": "iter/sec",
            "range": "stddev: 0.000021612112443226116",
            "extra": "mean: 371.5359599993917 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1688.5111321762136,
            "unit": "iter/sec",
            "range": "stddev: 0.0016713171981906762",
            "extra": "mean: 592.2377300001358 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 321.412067607406,
            "unit": "iter/sec",
            "range": "stddev: 0.00014234532476315918",
            "extra": "mean: 3.1112708600022643 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2391.300506148907,
            "unit": "iter/sec",
            "range": "stddev: 0.000023942667097137437",
            "extra": "mean: 418.18249000016294 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 67.90144051048,
            "unit": "iter/sec",
            "range": "stddev: 0.00026384000494169717",
            "extra": "mean: 14.727228059994673 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1457.2628735671078,
            "unit": "iter/sec",
            "range": "stddev: 0.00016582221035511761",
            "extra": "mean: 686.2179899994203 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 539.4907353122838,
            "unit": "iter/sec",
            "range": "stddev: 0.000058267413687487074",
            "extra": "mean: 1.8535999499994205 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 40.92969001092113,
            "unit": "iter/sec",
            "range": "stddev: 0.0034650691285611815",
            "extra": "mean: 24.432142040000144 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 998.0075975932444,
            "unit": "iter/sec",
            "range": "stddev: 0.0000342946328513684",
            "extra": "mean: 1.0019963799990705 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1519.5001865487366,
            "unit": "iter/sec",
            "range": "stddev: 0.00007823356724744114",
            "extra": "mean: 658.1111400001305 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 1784.4204534268451,
            "unit": "iter/sec",
            "range": "stddev: 0.00014434386011606315",
            "extra": "mean: 560.4060400000321 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2011.3812802899097,
            "unit": "iter/sec",
            "range": "stddev: 0.00009027187326872519",
            "extra": "mean: 497.170780000431 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 730.1428737735617,
            "unit": "iter/sec",
            "range": "stddev: 0.00006939163606679322",
            "extra": "mean: 1.3695949599997448 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 568.1497951935044,
            "unit": "iter/sec",
            "range": "stddev: 0.0002711869008991273",
            "extra": "mean: 1.7600991999995586 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 470.7907395606129,
            "unit": "iter/sec",
            "range": "stddev: 0.00008658512991454546",
            "extra": "mean: 2.1240859600027306 msec\nrounds: 50"
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
          "id": "72ed796ccbc5eddfb8413cbbd569e8f5d55f2083",
          "message": "fix: Return UTC-aware datetimes from unmarshalling (#809)\n\nPreviously, datetime fields were unmarshalled using datetime.fromtimestamp(value)\nwhich returns a naive datetime in the server's local timezone. This caused:\n- Non-deterministic behavior depending on server timezone\n- Inability to compare retrieved datetimes with timezone-aware datetimes\n- Time jumps around daylight savings transitions\n\nThis fix changes unmarshalling to use datetime.fromtimestamp(value, timezone.utc)\nwhich returns a UTC-aware datetime. This follows the standard ORM pattern of\nstoring UTC and returning UTC-aware datetimes.\n\nBREAKING CHANGE: Retrieved datetime fields are now UTC-aware instead of naive\nlocal time. Code that compared retrieved datetimes with naive datetimes will\nneed to either:\n1. Make the comparison datetime UTC-aware, or\n2. Use .timestamp() for comparison\n\nFixes #807 (Return UTC-aware datetimes from unmarshalling)\n\n* style: Format test file with ruff\n* style: Format model.py with ruff\n* fix: Make test use UTC-aware datetime after fix\n* fix: preserve date round-trips across timezones\n* chore: keep sync output formatter-clean in CI\n* chore: align lint with current ruff rules\n* fix: normalize date query timestamps to UTC",
          "timestamp": "2026-03-06T22:11:28Z",
          "url": "https://github.com/redis/redis-om-python/commit/72ed796ccbc5eddfb8413cbbd569e8f5d55f2083"
        },
        "date": 1773037685011,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 842389.9207027402,
            "unit": "iter/sec",
            "range": "stddev: 3.407697645556523e-7",
            "extra": "mean: 1.1870987240276782 usec\nrounds: 19438"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 472484.5805311514,
            "unit": "iter/sec",
            "range": "stddev: 8.035195700733256e-7",
            "extra": "mean: 2.116471184892073 usec\nrounds: 34999"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 66427.48407431833,
            "unit": "iter/sec",
            "range": "stddev: 0.000004903923492069886",
            "extra": "mean: 15.05400985654087 usec\nrounds: 13595"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66136.30272597341,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022523595139145984",
            "extra": "mean: 15.120288839600866 usec\nrounds: 15313"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64629.006495300964,
            "unit": "iter/sec",
            "range": "stddev: 0.000002913125424119217",
            "extra": "mean: 15.472928553724678 usec\nrounds: 16194"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 61248.31468425119,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021187739254919293",
            "extra": "mean: 16.326979854959674 usec\nrounds: 18218"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1688.1383515849873,
            "unit": "iter/sec",
            "range": "stddev: 0.000045636797894357974",
            "extra": "mean: 592.3685099986642 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 1832.4948356222383,
            "unit": "iter/sec",
            "range": "stddev: 0.0001712768115214272",
            "extra": "mean: 545.7041299985121 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1975.8073845503013,
            "unit": "iter/sec",
            "range": "stddev: 0.0002479180793094866",
            "extra": "mean: 506.1222099985229 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3688.733865356582,
            "unit": "iter/sec",
            "range": "stddev: 0.00001589987695553826",
            "extra": "mean: 271.09572999876264 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2894.843143799426,
            "unit": "iter/sec",
            "range": "stddev: 0.00003906542368664072",
            "extra": "mean: 345.4418599991982 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1583.3619565565782,
            "unit": "iter/sec",
            "range": "stddev: 0.0023996974768040477",
            "extra": "mean: 631.5675300010071 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 331.8128474139548,
            "unit": "iter/sec",
            "range": "stddev: 0.0000907943773432373",
            "extra": "mean: 3.0137470799991206 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2545.079789394788,
            "unit": "iter/sec",
            "range": "stddev: 0.0000532613434711086",
            "extra": "mean: 392.9149900002926 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 76.50886967326588,
            "unit": "iter/sec",
            "range": "stddev: 0.00019199871924764593",
            "extra": "mean: 13.070379999999204 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1576.6333850862243,
            "unit": "iter/sec",
            "range": "stddev: 0.000039547639478418426",
            "extra": "mean: 634.2628600023659 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 588.9019068269058,
            "unit": "iter/sec",
            "range": "stddev: 0.00004980581161402697",
            "extra": "mean: 1.6980756700010602 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 44.928670519330666,
            "unit": "iter/sec",
            "range": "stddev: 0.0053780426176839565",
            "extra": "mean: 22.25750258000062 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1138.7818525643418,
            "unit": "iter/sec",
            "range": "stddev: 0.00004121619963967091",
            "extra": "mean: 878.1313100030275 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1741.3004585524177,
            "unit": "iter/sec",
            "range": "stddev: 0.000057458319370852665",
            "extra": "mean: 574.2834300011168 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2261.382635580174,
            "unit": "iter/sec",
            "range": "stddev: 0.000030425155135377232",
            "extra": "mean: 442.20733999907225 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2328.695402664343,
            "unit": "iter/sec",
            "range": "stddev: 0.00010212996862428753",
            "extra": "mean: 429.4249899990632 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 786.1318295262864,
            "unit": "iter/sec",
            "range": "stddev: 0.00008104946230015705",
            "extra": "mean: 1.2720512800029837 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 666.359155244403,
            "unit": "iter/sec",
            "range": "stddev: 0.00014674938660576962",
            "extra": "mean: 1.5006922199984274 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 513.9688615869186,
            "unit": "iter/sec",
            "range": "stddev: 0.00009727258011530741",
            "extra": "mean: 1.9456431600008273 msec\nrounds: 50"
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
          "id": "72ed796ccbc5eddfb8413cbbd569e8f5d55f2083",
          "message": "fix: Return UTC-aware datetimes from unmarshalling (#809)\n\nPreviously, datetime fields were unmarshalled using datetime.fromtimestamp(value)\nwhich returns a naive datetime in the server's local timezone. This caused:\n- Non-deterministic behavior depending on server timezone\n- Inability to compare retrieved datetimes with timezone-aware datetimes\n- Time jumps around daylight savings transitions\n\nThis fix changes unmarshalling to use datetime.fromtimestamp(value, timezone.utc)\nwhich returns a UTC-aware datetime. This follows the standard ORM pattern of\nstoring UTC and returning UTC-aware datetimes.\n\nBREAKING CHANGE: Retrieved datetime fields are now UTC-aware instead of naive\nlocal time. Code that compared retrieved datetimes with naive datetimes will\nneed to either:\n1. Make the comparison datetime UTC-aware, or\n2. Use .timestamp() for comparison\n\nFixes #807 (Return UTC-aware datetimes from unmarshalling)\n\n* style: Format test file with ruff\n* style: Format model.py with ruff\n* fix: Make test use UTC-aware datetime after fix\n* fix: preserve date round-trips across timezones\n* chore: keep sync output formatter-clean in CI\n* chore: align lint with current ruff rules\n* fix: normalize date query timestamps to UTC",
          "timestamp": "2026-03-06T22:11:28Z",
          "url": "https://github.com/redis/redis-om-python/commit/72ed796ccbc5eddfb8413cbbd569e8f5d55f2083"
        },
        "date": 1773123649545,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 912885.2587899378,
            "unit": "iter/sec",
            "range": "stddev: 3.660623051470207e-7",
            "extra": "mean: 1.0954279197426584 usec\nrounds: 22572"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 527248.1626135609,
            "unit": "iter/sec",
            "range": "stddev: 3.8499188673313075e-7",
            "extra": "mean: 1.896640085084442 usec\nrounds: 30635"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 76605.95693599463,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014234507844534902",
            "extra": "mean: 13.05381513392639 usec\nrounds: 16136"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 71535.28089585253,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017125825634705434",
            "extra": "mean: 13.979116143485752 usec\nrounds: 18856"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 71850.13809534122,
            "unit": "iter/sec",
            "range": "stddev: 0.000001241312708463504",
            "extra": "mean: 13.917857731505745 usec\nrounds: 17713"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 65685.67184312144,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015362064153156927",
            "extra": "mean: 15.224020276268503 usec\nrounds: 18445"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1795.4406687449723,
            "unit": "iter/sec",
            "range": "stddev: 0.00005936662013884093",
            "extra": "mean: 556.9663299979766 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2355.5090138256824,
            "unit": "iter/sec",
            "range": "stddev: 0.000039480869909339775",
            "extra": "mean: 424.5366900022418 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2369.711036013131,
            "unit": "iter/sec",
            "range": "stddev: 0.000148883763337686",
            "extra": "mean: 421.9923800002334 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4005.820457136393,
            "unit": "iter/sec",
            "range": "stddev: 0.000017165650654600235",
            "extra": "mean: 249.63674999924024 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3186.946369660844,
            "unit": "iter/sec",
            "range": "stddev: 0.00007556682006777294",
            "extra": "mean: 313.7799899991478 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1912.134878317042,
            "unit": "iter/sec",
            "range": "stddev: 0.0018705227150819718",
            "extra": "mean: 522.9756600016344 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 340.472248764279,
            "unit": "iter/sec",
            "range": "stddev: 0.00011397153851400216",
            "extra": "mean: 2.9370969399985825 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3124.8636778666264,
            "unit": "iter/sec",
            "range": "stddev: 0.000033010546001160955",
            "extra": "mean: 320.01395999543547 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 76.44133060377662,
            "unit": "iter/sec",
            "range": "stddev: 0.000807539796893518",
            "extra": "mean: 13.081928220001373 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 2001.6350556096772,
            "unit": "iter/sec",
            "range": "stddev: 0.000053459318027645286",
            "extra": "mean: 499.5915700004616 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 631.0300163481394,
            "unit": "iter/sec",
            "range": "stddev: 0.00004111919261717907",
            "extra": "mean: 1.5847106700044833 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 46.16142769252718,
            "unit": "iter/sec",
            "range": "stddev: 0.0033044765763639516",
            "extra": "mean: 21.66310813999985 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1201.6416010430858,
            "unit": "iter/sec",
            "range": "stddev: 0.000037174317370138884",
            "extra": "mean: 832.1948900004372 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 2006.8013306647097,
            "unit": "iter/sec",
            "range": "stddev: 0.000029138692300979576",
            "extra": "mean: 498.3054299992773 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2626.267321695566,
            "unit": "iter/sec",
            "range": "stddev: 0.00004175891467686715",
            "extra": "mean: 380.7685500021307 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2224.7163764647066,
            "unit": "iter/sec",
            "range": "stddev: 0.00009309784183192759",
            "extra": "mean: 449.49550000126237 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 875.6173167732546,
            "unit": "iter/sec",
            "range": "stddev: 0.00004171110567459915",
            "extra": "mean: 1.142051420002872 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 701.0808563547805,
            "unit": "iter/sec",
            "range": "stddev: 0.0001052163264982048",
            "extra": "mean: 1.4263690000029783 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 546.0005042634454,
            "unit": "iter/sec",
            "range": "stddev: 0.00010682310281638559",
            "extra": "mean: 1.8315001400026176 msec\nrounds: 50"
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
          "id": "72ed796ccbc5eddfb8413cbbd569e8f5d55f2083",
          "message": "fix: Return UTC-aware datetimes from unmarshalling (#809)\n\nPreviously, datetime fields were unmarshalled using datetime.fromtimestamp(value)\nwhich returns a naive datetime in the server's local timezone. This caused:\n- Non-deterministic behavior depending on server timezone\n- Inability to compare retrieved datetimes with timezone-aware datetimes\n- Time jumps around daylight savings transitions\n\nThis fix changes unmarshalling to use datetime.fromtimestamp(value, timezone.utc)\nwhich returns a UTC-aware datetime. This follows the standard ORM pattern of\nstoring UTC and returning UTC-aware datetimes.\n\nBREAKING CHANGE: Retrieved datetime fields are now UTC-aware instead of naive\nlocal time. Code that compared retrieved datetimes with naive datetimes will\nneed to either:\n1. Make the comparison datetime UTC-aware, or\n2. Use .timestamp() for comparison\n\nFixes #807 (Return UTC-aware datetimes from unmarshalling)\n\n* style: Format test file with ruff\n* style: Format model.py with ruff\n* fix: Make test use UTC-aware datetime after fix\n* fix: preserve date round-trips across timezones\n* chore: keep sync output formatter-clean in CI\n* chore: align lint with current ruff rules\n* fix: normalize date query timestamps to UTC",
          "timestamp": "2026-03-06T22:11:28Z",
          "url": "https://github.com/redis/redis-om-python/commit/72ed796ccbc5eddfb8413cbbd569e8f5d55f2083"
        },
        "date": 1773210143819,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 916085.5402159936,
            "unit": "iter/sec",
            "range": "stddev: 3.257343725607679e-7",
            "extra": "mean: 1.091601118127267 usec\nrounds: 23789"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 511744.62390722573,
            "unit": "iter/sec",
            "range": "stddev: 4.310162303297095e-7",
            "extra": "mean: 1.9540996686294256 usec\nrounds: 38929"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69510.22180898221,
            "unit": "iter/sec",
            "range": "stddev: 0.000002145794128625995",
            "extra": "mean: 14.386373312806471 usec\nrounds: 16225"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64584.231289844334,
            "unit": "iter/sec",
            "range": "stddev: 0.00000300637940167062",
            "extra": "mean: 15.483655685428076 usec\nrounds: 23191"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64339.29121722057,
            "unit": "iter/sec",
            "range": "stddev: 0.000002093194489044485",
            "extra": "mean: 15.54260205670944 usec\nrounds: 21880"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58989.42191590811,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022793618618229765",
            "extra": "mean: 16.952191893413392 usec\nrounds: 22747"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1448.2301389474603,
            "unit": "iter/sec",
            "range": "stddev: 0.000033255491461637905",
            "extra": "mean: 690.4979899995567 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2023.119931337553,
            "unit": "iter/sec",
            "range": "stddev: 0.00003473406921980501",
            "extra": "mean: 494.2860700002427 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1728.6592093905858,
            "unit": "iter/sec",
            "range": "stddev: 0.0001594951533165702",
            "extra": "mean: 578.4830200005331 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3066.4271214693567,
            "unit": "iter/sec",
            "range": "stddev: 0.000018970417640116558",
            "extra": "mean: 326.11242999990964 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2623.2404254192006,
            "unit": "iter/sec",
            "range": "stddev: 0.00002377627833647578",
            "extra": "mean: 381.2079099994037 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1672.559567918267,
            "unit": "iter/sec",
            "range": "stddev: 0.0016466310509366659",
            "extra": "mean: 597.8860299993016 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 317.82480298028815,
            "unit": "iter/sec",
            "range": "stddev: 0.00023703974464641455",
            "extra": "mean: 3.14638753999958 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2402.0284649993805,
            "unit": "iter/sec",
            "range": "stddev: 0.000021777858075552963",
            "extra": "mean: 416.3147999997818 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.8056817084634,
            "unit": "iter/sec",
            "range": "stddev: 0.0002668983476274558",
            "extra": "mean: 14.123160400000359 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1568.231420272601,
            "unit": "iter/sec",
            "range": "stddev: 0.00004603810281553882",
            "extra": "mean: 637.6609899999153 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 536.9841092979719,
            "unit": "iter/sec",
            "range": "stddev: 0.000042955499129394525",
            "extra": "mean: 1.8622524999992152 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.959546680199665,
            "unit": "iter/sec",
            "range": "stddev: 0.0036390217658837753",
            "extra": "mean: 23.832478640001398 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1012.0909547111956,
            "unit": "iter/sec",
            "range": "stddev: 0.000032133042955965816",
            "extra": "mean: 988.0534900001692 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1550.9014622481645,
            "unit": "iter/sec",
            "range": "stddev: 0.000025401726125245692",
            "extra": "mean: 644.7862900009227 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2280.2794026388447,
            "unit": "iter/sec",
            "range": "stddev: 0.00003258221933691715",
            "extra": "mean: 438.5427499993 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2006.6620779658629,
            "unit": "iter/sec",
            "range": "stddev: 0.00006554446514601401",
            "extra": "mean: 498.3400099999358 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 731.9616255344148,
            "unit": "iter/sec",
            "range": "stddev: 0.00003746834522421647",
            "extra": "mean: 1.3661918400023865 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 576.0724925940165,
            "unit": "iter/sec",
            "range": "stddev: 0.00010012041157059286",
            "extra": "mean: 1.7358926399992924 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 466.23413504305836,
            "unit": "iter/sec",
            "range": "stddev: 0.0000767321974378427",
            "extra": "mean: 2.144845100000339 msec\nrounds: 50"
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
          "id": "72ed796ccbc5eddfb8413cbbd569e8f5d55f2083",
          "message": "fix: Return UTC-aware datetimes from unmarshalling (#809)\n\nPreviously, datetime fields were unmarshalled using datetime.fromtimestamp(value)\nwhich returns a naive datetime in the server's local timezone. This caused:\n- Non-deterministic behavior depending on server timezone\n- Inability to compare retrieved datetimes with timezone-aware datetimes\n- Time jumps around daylight savings transitions\n\nThis fix changes unmarshalling to use datetime.fromtimestamp(value, timezone.utc)\nwhich returns a UTC-aware datetime. This follows the standard ORM pattern of\nstoring UTC and returning UTC-aware datetimes.\n\nBREAKING CHANGE: Retrieved datetime fields are now UTC-aware instead of naive\nlocal time. Code that compared retrieved datetimes with naive datetimes will\nneed to either:\n1. Make the comparison datetime UTC-aware, or\n2. Use .timestamp() for comparison\n\nFixes #807 (Return UTC-aware datetimes from unmarshalling)\n\n* style: Format test file with ruff\n* style: Format model.py with ruff\n* fix: Make test use UTC-aware datetime after fix\n* fix: preserve date round-trips across timezones\n* chore: keep sync output formatter-clean in CI\n* chore: align lint with current ruff rules\n* fix: normalize date query timestamps to UTC",
          "timestamp": "2026-03-06T22:11:28Z",
          "url": "https://github.com/redis/redis-om-python/commit/72ed796ccbc5eddfb8413cbbd569e8f5d55f2083"
        },
        "date": 1773296612830,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 912854.6963354469,
            "unit": "iter/sec",
            "range": "stddev: 3.08757384904952e-7",
            "extra": "mean: 1.0954645947645207 usec\nrounds: 27058"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 527106.0717585371,
            "unit": "iter/sec",
            "range": "stddev: 4.81727597775473e-7",
            "extra": "mean: 1.8971513582907304 usec\nrounds: 43625"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69173.63870820195,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023437790312159157",
            "extra": "mean: 14.456374114109304 usec\nrounds: 16658"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64150.915688054934,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018770239547106408",
            "extra": "mean: 15.588242027014472 usec\nrounds: 16180"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 60602.1501387114,
            "unit": "iter/sec",
            "range": "stddev: 0.000002033686415562376",
            "extra": "mean: 16.50106469343273 usec\nrounds: 22568"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 57829.21686880401,
            "unit": "iter/sec",
            "range": "stddev: 0.000002240897171674816",
            "extra": "mean: 17.292297114600046 usec\nrounds: 18508"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1487.6997357675757,
            "unit": "iter/sec",
            "range": "stddev: 0.000028117941219699153",
            "extra": "mean: 672.1786500042981 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2083.3436198717554,
            "unit": "iter/sec",
            "range": "stddev: 0.00004091588832827086",
            "extra": "mean: 479.9976299932496 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1875.187694567676,
            "unit": "iter/sec",
            "range": "stddev: 0.00012475830305268935",
            "extra": "mean: 533.2799500001784 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3281.0951272609327,
            "unit": "iter/sec",
            "range": "stddev: 0.00001267542411960803",
            "extra": "mean: 304.7762899927875 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2633.7519313576695,
            "unit": "iter/sec",
            "range": "stddev: 0.00003344227974356031",
            "extra": "mean: 379.6864799960531 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1749.7490990986646,
            "unit": "iter/sec",
            "range": "stddev: 0.0015313733975018157",
            "extra": "mean: 571.5105100011897 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 321.6189298630539,
            "unit": "iter/sec",
            "range": "stddev: 0.00007463264385230456",
            "extra": "mean: 3.10926971999379 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2433.7543623195697,
            "unit": "iter/sec",
            "range": "stddev: 0.00003115002136167052",
            "extra": "mean: 410.8878099953017 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 71.12028379437795,
            "unit": "iter/sec",
            "range": "stddev: 0.00018933883045227733",
            "extra": "mean: 14.060686300003908 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1604.4161747746552,
            "unit": "iter/sec",
            "range": "stddev: 0.000031095030757880305",
            "extra": "mean: 623.2796799997686 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 552.09113156396,
            "unit": "iter/sec",
            "range": "stddev: 0.00004334405560878113",
            "extra": "mean: 1.811295169997038 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.67237069950854,
            "unit": "iter/sec",
            "range": "stddev: 0.0030927458368541633",
            "extra": "mean: 23.43436710001015 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1049.1914348418459,
            "unit": "iter/sec",
            "range": "stddev: 0.00003109097019001197",
            "extra": "mean: 953.1149100075709 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1554.8849751269074,
            "unit": "iter/sec",
            "range": "stddev: 0.00003472458264599282",
            "extra": "mean: 643.1343900010233 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2299.99184654793,
            "unit": "iter/sec",
            "range": "stddev: 0.000030917843274840163",
            "extra": "mean: 434.78414999640336 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2089.4742109895924,
            "unit": "iter/sec",
            "range": "stddev: 0.00008131758652166687",
            "extra": "mean: 478.58929999733846 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 731.2189270310262,
            "unit": "iter/sec",
            "range": "stddev: 0.00005089158657296983",
            "extra": "mean: 1.3675794800064978 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 589.357173634434,
            "unit": "iter/sec",
            "range": "stddev: 0.0001001505933594744",
            "extra": "mean: 1.6967639399945256 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 475.58806464079504,
            "unit": "iter/sec",
            "range": "stddev: 0.00007491139256916777",
            "extra": "mean: 2.1026600000050166 msec\nrounds: 50"
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
          "id": "72ed796ccbc5eddfb8413cbbd569e8f5d55f2083",
          "message": "fix: Return UTC-aware datetimes from unmarshalling (#809)\n\nPreviously, datetime fields were unmarshalled using datetime.fromtimestamp(value)\nwhich returns a naive datetime in the server's local timezone. This caused:\n- Non-deterministic behavior depending on server timezone\n- Inability to compare retrieved datetimes with timezone-aware datetimes\n- Time jumps around daylight savings transitions\n\nThis fix changes unmarshalling to use datetime.fromtimestamp(value, timezone.utc)\nwhich returns a UTC-aware datetime. This follows the standard ORM pattern of\nstoring UTC and returning UTC-aware datetimes.\n\nBREAKING CHANGE: Retrieved datetime fields are now UTC-aware instead of naive\nlocal time. Code that compared retrieved datetimes with naive datetimes will\nneed to either:\n1. Make the comparison datetime UTC-aware, or\n2. Use .timestamp() for comparison\n\nFixes #807 (Return UTC-aware datetimes from unmarshalling)\n\n* style: Format test file with ruff\n* style: Format model.py with ruff\n* fix: Make test use UTC-aware datetime after fix\n* fix: preserve date round-trips across timezones\n* chore: keep sync output formatter-clean in CI\n* chore: align lint with current ruff rules\n* fix: normalize date query timestamps to UTC",
          "timestamp": "2026-03-06T22:11:28Z",
          "url": "https://github.com/redis/redis-om-python/commit/72ed796ccbc5eddfb8413cbbd569e8f5d55f2083"
        },
        "date": 1773382984543,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 908847.6792691275,
            "unit": "iter/sec",
            "range": "stddev: 2.970276366753499e-7",
            "extra": "mean: 1.1002943868483825 usec\nrounds: 22107"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 478950.02189844404,
            "unit": "iter/sec",
            "range": "stddev: 6.261897920619606e-7",
            "extra": "mean: 2.087900520468164 usec\nrounds: 30750"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 63011.180639432045,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022750608361458547",
            "extra": "mean: 15.870199381317505 usec\nrounds: 11957"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 59381.69749120274,
            "unit": "iter/sec",
            "range": "stddev: 0.00000242721171358909",
            "extra": "mean: 16.84020569045113 usec\nrounds: 15008"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 61512.20592271849,
            "unit": "iter/sec",
            "range": "stddev: 0.0000026827618841019093",
            "extra": "mean: 16.256936082837942 usec\nrounds: 15786"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 56869.77027556975,
            "unit": "iter/sec",
            "range": "stddev: 0.000002641212693126737",
            "extra": "mean: 17.58403445546504 usec\nrounds: 16079"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1364.9737152386888,
            "unit": "iter/sec",
            "range": "stddev: 0.0000479698510791948",
            "extra": "mean: 732.614840004544 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2007.702994233825,
            "unit": "iter/sec",
            "range": "stddev: 0.00004674196641108015",
            "extra": "mean: 498.0816399995547 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1767.0613751478118,
            "unit": "iter/sec",
            "range": "stddev: 0.00016401746970113966",
            "extra": "mean: 565.9113000058369 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3004.544794709621,
            "unit": "iter/sec",
            "range": "stddev: 0.000018727763831094128",
            "extra": "mean: 332.8291199920841 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2570.3288892906176,
            "unit": "iter/sec",
            "range": "stddev: 0.00004091268663917311",
            "extra": "mean: 389.05526999542417 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1573.2212322888251,
            "unit": "iter/sec",
            "range": "stddev: 0.002078416359246428",
            "extra": "mean: 635.6385100048101 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 297.14527954045593,
            "unit": "iter/sec",
            "range": "stddev: 0.00009697330156177023",
            "extra": "mean: 3.365357179984585 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2243.5923395234086,
            "unit": "iter/sec",
            "range": "stddev: 0.00004449937996468809",
            "extra": "mean: 445.71377000352186 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 66.75995979391654,
            "unit": "iter/sec",
            "range": "stddev: 0.0006935117674772486",
            "extra": "mean: 14.979038379995018 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1535.473176953171,
            "unit": "iter/sec",
            "range": "stddev: 0.00003562262970125599",
            "extra": "mean: 651.2650399952236 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 532.2465030048977,
            "unit": "iter/sec",
            "range": "stddev: 0.00008026932884928617",
            "extra": "mean: 1.878828690004184 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.18310362126473,
            "unit": "iter/sec",
            "range": "stddev: 0.003620940823751433",
            "extra": "mean: 24.281802780003545 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1002.7302942033515,
            "unit": "iter/sec",
            "range": "stddev: 0.00005580038977739935",
            "extra": "mean: 997.277140005508 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1542.1510280367302,
            "unit": "iter/sec",
            "range": "stddev: 0.00003796104021044307",
            "extra": "mean: 648.4449199979281 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2320.9137678776233,
            "unit": "iter/sec",
            "range": "stddev: 0.000022074423742084152",
            "extra": "mean: 430.86478000191164 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2041.8248213405782,
            "unit": "iter/sec",
            "range": "stddev: 0.00008045015962679162",
            "extra": "mean: 489.7579799933283 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 731.7954359481474,
            "unit": "iter/sec",
            "range": "stddev: 0.000041202435272513084",
            "extra": "mean: 1.3665021000088018 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 574.6837839844417,
            "unit": "iter/sec",
            "range": "stddev: 0.00013785358239850235",
            "extra": "mean: 1.7400873799965666 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 460.9546348383403,
            "unit": "iter/sec",
            "range": "stddev: 0.00008631762643058654",
            "extra": "mean: 2.169410879989755 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e758be1c571ef3571b98cfc8fd1fc55dd4cc55cb",
          "message": "Bump flask from 3.1.2 to 3.1.3 (#811)\n\nBumps [flask](https://github.com/pallets/flask) from 3.1.2 to 3.1.3.\n- [Release notes](https://github.com/pallets/flask/releases)\n- [Changelog](https://github.com/pallets/flask/blob/main/CHANGES.rst)\n- [Commits](https://github.com/pallets/flask/compare/3.1.2...3.1.3)\n\n---\nupdated-dependencies:\n- dependency-name: flask\n  dependency-version: 3.1.3\n  dependency-type: direct:production\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-03-13T10:20:27-07:00",
          "tree_id": "d7d5f3e8d5e973248304d261363b394b9c51aa92",
          "url": "https://github.com/redis/redis-om-python/commit/e758be1c571ef3571b98cfc8fd1fc55dd4cc55cb"
        },
        "date": 1773422551463,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 902757.501410319,
            "unit": "iter/sec",
            "range": "stddev: 2.9620758999237064e-7",
            "extra": "mean: 1.1077171869940325 usec\nrounds: 22552"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 516909.19471722847,
            "unit": "iter/sec",
            "range": "stddev: 4.2893451142282606e-7",
            "extra": "mean: 1.9345757634414744 usec\nrounds: 36218"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 66635.56438460057,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020016982673795313",
            "extra": "mean: 15.00700127980156 usec\nrounds: 16409"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 62744.564774190585,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023695604752221213",
            "extra": "mean: 15.937635452550643 usec\nrounds: 23547"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62952.05099117646,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022617847912370325",
            "extra": "mean: 15.885105953738707 usec\nrounds: 21264"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 57945.12044301318,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021659687447203954",
            "extra": "mean: 17.257708541368242 usec\nrounds: 22034"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1486.889728970433,
            "unit": "iter/sec",
            "range": "stddev: 0.000029470841155901182",
            "extra": "mean: 672.544830000561 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2145.494568685729,
            "unit": "iter/sec",
            "range": "stddev: 0.000038499835998037545",
            "extra": "mean: 466.0929999988639 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1881.0082813885356,
            "unit": "iter/sec",
            "range": "stddev: 0.00013135776386746022",
            "extra": "mean: 531.6297699985739 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3119.0329001798027,
            "unit": "iter/sec",
            "range": "stddev: 0.000011865717998477114",
            "extra": "mean: 320.612200000312 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2718.18740826018,
            "unit": "iter/sec",
            "range": "stddev: 0.0000298850407978688",
            "extra": "mean: 367.8922199996748 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1773.572849378234,
            "unit": "iter/sec",
            "range": "stddev: 0.0015421485131879434",
            "extra": "mean: 563.8336200007643 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 313.11011070628507,
            "unit": "iter/sec",
            "range": "stddev: 0.000060151176551256044",
            "extra": "mean: 3.1937646399993014 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2460.356581938252,
            "unit": "iter/sec",
            "range": "stddev: 0.000038945655762626737",
            "extra": "mean: 406.44515000025194 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 67.94049754918747,
            "unit": "iter/sec",
            "range": "stddev: 0.0007258316891998622",
            "extra": "mean: 14.71876180000038 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1615.8288402927108,
            "unit": "iter/sec",
            "range": "stddev: 0.0000312980096309529",
            "extra": "mean: 618.8774299998556 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 540.1703399075403,
            "unit": "iter/sec",
            "range": "stddev: 0.0000312422610680233",
            "extra": "mean: 1.8512678800009041 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.277526125718694,
            "unit": "iter/sec",
            "range": "stddev: 0.003123063256326091",
            "extra": "mean: 24.226258059998713 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1000.6199541051618,
            "unit": "iter/sec",
            "range": "stddev: 0.000032141502258826925",
            "extra": "mean: 999.3804299998034 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1568.804830511147,
            "unit": "iter/sec",
            "range": "stddev: 0.00003317791315754079",
            "extra": "mean: 637.4279200008459 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2304.7167410989614,
            "unit": "iter/sec",
            "range": "stddev: 0.00002500417544078019",
            "extra": "mean: 433.89279999900054 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2028.2759105082512,
            "unit": "iter/sec",
            "range": "stddev: 0.00007818505769457718",
            "extra": "mean: 493.0295700003739 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 731.736029681693,
            "unit": "iter/sec",
            "range": "stddev: 0.000041161846509157903",
            "extra": "mean: 1.3666130399988674 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 604.4830299123291,
            "unit": "iter/sec",
            "range": "stddev: 0.00009666307795640749",
            "extra": "mean: 1.6543061600009423 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 476.4528882906912,
            "unit": "iter/sec",
            "range": "stddev: 0.00006705542479245603",
            "extra": "mean: 2.0988434000003053 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "adb1229399d3142228be82c37923c6d6d6afa943",
          "message": "Bump rojopolis/spellcheck-github-actions from 0.58.0 to 0.59.0 (#813)\n\nBumps [rojopolis/spellcheck-github-actions](https://github.com/rojopolis/spellcheck-github-actions) from 0.58.0 to 0.59.0.\n- [Release notes](https://github.com/rojopolis/spellcheck-github-actions/releases)\n- [Changelog](https://github.com/rojopolis/spellcheck-github-actions/blob/master/CHANGELOG.md)\n- [Commits](https://github.com/rojopolis/spellcheck-github-actions/compare/0.58.0...0.59.0)\n\n---\nupdated-dependencies:\n- dependency-name: rojopolis/spellcheck-github-actions\n  dependency-version: 0.59.0\n  dependency-type: direct:production\n  update-type: version-update:semver-minor\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-03-13T10:21:11-07:00",
          "tree_id": "fc66e277dd13fd8c7862d9a099928f59bb1711a3",
          "url": "https://github.com/redis/redis-om-python/commit/adb1229399d3142228be82c37923c6d6d6afa943"
        },
        "date": 1773422591167,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 899400.4053409518,
            "unit": "iter/sec",
            "range": "stddev: 3.3371766195394056e-7",
            "extra": "mean: 1.111851844919852 usec\nrounds: 21383"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 532327.697539033,
            "unit": "iter/sec",
            "range": "stddev: 4.559681920104118e-7",
            "extra": "mean: 1.8785421172391181 usec\nrounds: 42168"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69893.43570007248,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021566024882100324",
            "extra": "mean: 14.307495260230324 usec\nrounds: 17195"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64934.76416153451,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019450456983852267",
            "extra": "mean: 15.400071331780877 usec\nrounds: 24351"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64753.29416335292,
            "unit": "iter/sec",
            "range": "stddev: 0.000002199353648304068",
            "extra": "mean: 15.443229768006912 usec\nrounds: 22588"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 60368.50492541178,
            "unit": "iter/sec",
            "range": "stddev: 0.000002072639180262243",
            "extra": "mean: 16.564929034362347 usec\nrounds: 21292"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1419.334722616338,
            "unit": "iter/sec",
            "range": "stddev: 0.00004159573834643059",
            "extra": "mean: 704.5554399998366 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2110.2684035596385,
            "unit": "iter/sec",
            "range": "stddev: 0.000033548230830534515",
            "extra": "mean: 473.8733700003195 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1871.6200063348826,
            "unit": "iter/sec",
            "range": "stddev: 0.00012766119924745517",
            "extra": "mean: 534.2964900007985 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3276.790135024206,
            "unit": "iter/sec",
            "range": "stddev: 0.000013829535251887667",
            "extra": "mean: 305.17670000023145 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2854.7311802384133,
            "unit": "iter/sec",
            "range": "stddev: 0.00002426088403629863",
            "extra": "mean: 350.2956800004142 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1764.5611675754744,
            "unit": "iter/sec",
            "range": "stddev: 0.0014560533550588488",
            "extra": "mean: 566.7131400007008 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 325.7721614656881,
            "unit": "iter/sec",
            "range": "stddev: 0.000060089941696142174",
            "extra": "mean: 3.069630000000245 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2415.106296675425,
            "unit": "iter/sec",
            "range": "stddev: 0.00004250327965060176",
            "extra": "mean: 414.06045000030645 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 71.86351859918867,
            "unit": "iter/sec",
            "range": "stddev: 0.0005113393281953892",
            "extra": "mean: 13.915266320000228 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1667.3408281439179,
            "unit": "iter/sec",
            "range": "stddev: 0.0000292896988146533",
            "extra": "mean: 599.7573999991346 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 565.8682497671612,
            "unit": "iter/sec",
            "range": "stddev: 0.00004588025113564735",
            "extra": "mean: 1.7671958099990093 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 43.035470374348996,
            "unit": "iter/sec",
            "range": "stddev: 0.0034293391537763163",
            "extra": "mean: 23.236646219999102 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1038.5643667188158,
            "unit": "iter/sec",
            "range": "stddev: 0.00004606969181942628",
            "extra": "mean: 962.8676200006225 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1624.9959212600502,
            "unit": "iter/sec",
            "range": "stddev: 0.00003439996606322693",
            "extra": "mean: 615.386160000071 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2238.4762459391304,
            "unit": "iter/sec",
            "range": "stddev: 0.000029909623942789458",
            "extra": "mean: 446.7324600000211 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2044.363129673364,
            "unit": "iter/sec",
            "range": "stddev: 0.00006780482889791431",
            "extra": "mean: 489.1498900001067 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 712.7710757497327,
            "unit": "iter/sec",
            "range": "stddev: 0.0001569558465659338",
            "extra": "mean: 1.4029750000000263 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 593.0706268476031,
            "unit": "iter/sec",
            "range": "stddev: 0.00009017800590291426",
            "extra": "mean: 1.6861398199998234 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 474.4904266999599,
            "unit": "iter/sec",
            "range": "stddev: 0.00007859463739491273",
            "extra": "mean: 2.1075240800007577 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5cc2a0a6afe91f214fccfa4ef1f234cf5863d19f",
          "message": "Bump cryptography from 46.0.3 to 46.0.5 (#808)\n\nBumps [cryptography](https://github.com/pyca/cryptography) from 46.0.3 to 46.0.5.\n- [Changelog](https://github.com/pyca/cryptography/blob/main/CHANGELOG.rst)\n- [Commits](https://github.com/pyca/cryptography/compare/46.0.3...46.0.5)\n\n---\nupdated-dependencies:\n- dependency-name: cryptography\n  dependency-version: 46.0.5\n  dependency-type: indirect\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Andrew Brookins <andrew.brookins@redis.com>",
          "timestamp": "2026-03-13T10:21:36-07:00",
          "tree_id": "aee47e169590d14ced9d28f48d80572b45735d5a",
          "url": "https://github.com/redis/redis-om-python/commit/5cc2a0a6afe91f214fccfa4ef1f234cf5863d19f"
        },
        "date": 1773422607265,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 914598.9900571377,
            "unit": "iter/sec",
            "range": "stddev: 2.4552184465705183e-7",
            "extra": "mean: 1.0933753599897666 usec\nrounds: 24643"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 514495.72016540077,
            "unit": "iter/sec",
            "range": "stddev: 3.72039843004179e-7",
            "extra": "mean: 1.9436507648275845 usec\nrounds: 29682"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 75690.17769022164,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013093694356076516",
            "extra": "mean: 13.211753896162266 usec\nrounds: 15079"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 71400.7440649537,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012336334636101111",
            "extra": "mean: 14.005456288946986 usec\nrounds: 16529"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 70224.74775195228,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015835538523809608",
            "extra": "mean: 14.239994190256093 usec\nrounds: 15319"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 63714.00789864289,
            "unit": "iter/sec",
            "range": "stddev: 0.0000025308649678250354",
            "extra": "mean: 15.695135700626674 usec\nrounds: 15630"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1699.5276281873903,
            "unit": "iter/sec",
            "range": "stddev: 0.000047273503656264995",
            "extra": "mean: 588.3987900017473 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2695.9341592398578,
            "unit": "iter/sec",
            "range": "stddev: 0.00003651846926792038",
            "extra": "mean: 370.92894000124943 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2068.3347179411417,
            "unit": "iter/sec",
            "range": "stddev: 0.0001717480230308605",
            "extra": "mean: 483.4807400010277 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4064.2411844450407,
            "unit": "iter/sec",
            "range": "stddev: 0.000013458427244701447",
            "extra": "mean: 246.04838999891854 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2810.0174988174495,
            "unit": "iter/sec",
            "range": "stddev: 0.000051799478016012044",
            "extra": "mean: 355.86967000057257 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1780.1398730650287,
            "unit": "iter/sec",
            "range": "stddev: 0.0020040721111290807",
            "extra": "mean: 561.7536100004372 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 339.92051475448716,
            "unit": "iter/sec",
            "range": "stddev: 0.00009030085108393789",
            "extra": "mean: 2.9418642199993883 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2841.7370697570304,
            "unit": "iter/sec",
            "range": "stddev: 0.000030215168234826113",
            "extra": "mean: 351.89743999978873 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 77.19838965887794,
            "unit": "iter/sec",
            "range": "stddev: 0.0002538255199943029",
            "extra": "mean: 12.953638080001042 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 2001.4057073155302,
            "unit": "iter/sec",
            "range": "stddev: 0.00003533482101265644",
            "extra": "mean: 499.6488199992654 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 618.5605488595014,
            "unit": "iter/sec",
            "range": "stddev: 0.00004681905607331258",
            "extra": "mean: 1.6166566100017121 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 46.82388765879548,
            "unit": "iter/sec",
            "range": "stddev: 0.004428068709488821",
            "extra": "mean: 21.356620519999865 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1229.966278507361,
            "unit": "iter/sec",
            "range": "stddev: 0.00003393660690877957",
            "extra": "mean: 813.0304199994498 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1895.3189923313062,
            "unit": "iter/sec",
            "range": "stddev: 0.000027454978105497385",
            "extra": "mean: 527.6156699986245 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2661.981153927436,
            "unit": "iter/sec",
            "range": "stddev: 0.0000647896579880477",
            "extra": "mean: 375.66005999877916 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2455.134805196193,
            "unit": "iter/sec",
            "range": "stddev: 0.00008420559813407964",
            "extra": "mean: 407.30960999923127 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 854.0932367145679,
            "unit": "iter/sec",
            "range": "stddev: 0.0000589572960654061",
            "extra": "mean: 1.1708323599970072 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 698.0020152995705,
            "unit": "iter/sec",
            "range": "stddev: 0.00010061602456646967",
            "extra": "mean: 1.432660619999524 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 543.856459833428,
            "unit": "iter/sec",
            "range": "stddev: 0.0000951710924743158",
            "extra": "mean: 1.8387204600020368 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "643a11abd403af8f793529c00092a75bf1d461c6",
          "message": "Bump actions/upload-artifact from 6 to 7 (#812)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 6 to 7.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v6...v7)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '7'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Andrew Brookins <a.m.brookins@gmail.com>",
          "timestamp": "2026-03-13T10:28:22-07:00",
          "tree_id": "0deb658b26f3a94294727b0ed4171478eff1f34a",
          "url": "https://github.com/redis/redis-om-python/commit/643a11abd403af8f793529c00092a75bf1d461c6"
        },
        "date": 1773423026418,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 848496.5552779788,
            "unit": "iter/sec",
            "range": "stddev: 3.9432628016875767e-7",
            "extra": "mean: 1.1785551677017554 usec\nrounds: 21770"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 504037.5923195134,
            "unit": "iter/sec",
            "range": "stddev: 5.020094641944454e-7",
            "extra": "mean: 1.9839790032289735 usec\nrounds: 34053"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67569.24674460369,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023713544580740167",
            "extra": "mean: 14.799632202202453 usec\nrounds: 14943"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63827.39303987139,
            "unit": "iter/sec",
            "range": "stddev: 0.000002285672843083153",
            "extra": "mean: 15.667254330367602 usec\nrounds: 20379"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63253.41297562273,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022609403671828132",
            "extra": "mean: 15.809423601938926 usec\nrounds: 18973"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58641.337920410326,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024049991163644097",
            "extra": "mean: 17.052816928515995 usec\nrounds: 20238"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1472.701627108555,
            "unit": "iter/sec",
            "range": "stddev: 0.0000472791053648949",
            "extra": "mean: 679.0241699965804 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2029.4327412849282,
            "unit": "iter/sec",
            "range": "stddev: 0.000042918585951375926",
            "extra": "mean: 492.7485299990053 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1846.393093243402,
            "unit": "iter/sec",
            "range": "stddev: 0.00016714337323297146",
            "extra": "mean: 541.5964800016582 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3219.458717561681,
            "unit": "iter/sec",
            "range": "stddev: 0.000013598910887863",
            "extra": "mean: 310.61121999954366 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2662.842682548033,
            "unit": "iter/sec",
            "range": "stddev: 0.000028979354934422258",
            "extra": "mean: 375.5385200011574 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1579.0612436725078,
            "unit": "iter/sec",
            "range": "stddev: 0.0020961827484233062",
            "extra": "mean: 633.2876599987003 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 322.94480397296667,
            "unit": "iter/sec",
            "range": "stddev: 0.00007490340754559453",
            "extra": "mean: 3.0965043799983505 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2441.394627158269,
            "unit": "iter/sec",
            "range": "stddev: 0.000043334182858415844",
            "extra": "mean: 409.60194999854593 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.2192242202466,
            "unit": "iter/sec",
            "range": "stddev: 0.00045319407868366746",
            "extra": "mean: 14.446853620002003 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1573.667085883289,
            "unit": "iter/sec",
            "range": "stddev: 0.000037197774760426234",
            "extra": "mean: 635.4584199991109 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 551.9857411048008,
            "unit": "iter/sec",
            "range": "stddev: 0.000052782738369197846",
            "extra": "mean: 1.811640999998474 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.155949118370316,
            "unit": "iter/sec",
            "range": "stddev: 0.0042782557246556635",
            "extra": "mean: 24.297823800001765 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1023.4630752242825,
            "unit": "iter/sec",
            "range": "stddev: 0.000037500285160609905",
            "extra": "mean: 977.0748199986201 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1589.2798875896456,
            "unit": "iter/sec",
            "range": "stddev: 0.00004537723483772346",
            "extra": "mean: 629.2157899994777 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2328.85256665671,
            "unit": "iter/sec",
            "range": "stddev: 0.000028954982022412384",
            "extra": "mean: 429.3960099997207 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2011.5964916887528,
            "unit": "iter/sec",
            "range": "stddev: 0.00009618112109573474",
            "extra": "mean: 497.1175899996183 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 739.0140972566566,
            "unit": "iter/sec",
            "range": "stddev: 0.00005966269576189299",
            "extra": "mean: 1.3531541599979846 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 594.6961995648508,
            "unit": "iter/sec",
            "range": "stddev: 0.00012236027154899375",
            "extra": "mean: 1.6815308400015283 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 472.0936564325011,
            "unit": "iter/sec",
            "range": "stddev: 0.00008594966819627567",
            "extra": "mean: 2.1182237599987275 msec\nrounds: 50"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "b301d5439a4e1662bf39c8521928b2bb257d72cd",
          "message": "Bump werkzeug from 3.1.5 to 3.1.6 (#810)\n\n* Bump werkzeug from 3.1.5 to 3.1.6\n\nBumps [werkzeug](https://github.com/pallets/werkzeug) from 3.1.5 to 3.1.6.\n- [Release notes](https://github.com/pallets/werkzeug/releases)\n- [Changelog](https://github.com/pallets/werkzeug/blob/main/CHANGES.rst)\n- [Commits](https://github.com/pallets/werkzeug/compare/3.1.5...3.1.6)\n\n---\nupdated-dependencies:\n- dependency-name: werkzeug\n  dependency-version: 3.1.6\n  dependency-type: indirect\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\n\n* Avoid benchmark comment failures on Dependabot PRs\n\n---------\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>\nCo-authored-by: Andrew Brookins <a.m.brookins@gmail.com>",
          "timestamp": "2026-03-13T10:38:06-07:00",
          "tree_id": "65686aa5f715800ba7e23633a76c34de00c108ff",
          "url": "https://github.com/redis/redis-om-python/commit/b301d5439a4e1662bf39c8521928b2bb257d72cd"
        },
        "date": 1773423600517,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 864948.5681906205,
            "unit": "iter/sec",
            "range": "stddev: 3.090014237640629e-7",
            "extra": "mean: 1.1561381066759757 usec\nrounds: 25321"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 508668.1172724905,
            "unit": "iter/sec",
            "range": "stddev: 5.358974545955694e-7",
            "extra": "mean: 1.9659183779043612 usec\nrounds: 44461"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69118.71461095756,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027111330527291317",
            "extra": "mean: 14.467861643964477 usec\nrounds: 12251"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64464.71519628571,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021061836397117587",
            "extra": "mean: 15.512362025569258 usec\nrounds: 23084"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 61269.722219169846,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022692885983954127",
            "extra": "mean: 16.321275236451516 usec\nrounds: 18188"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 56163.63174507687,
            "unit": "iter/sec",
            "range": "stddev: 0.000002507143613177705",
            "extra": "mean: 17.80511638810923 usec\nrounds: 22614"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1403.2559495198266,
            "unit": "iter/sec",
            "range": "stddev: 0.000037954774097074984",
            "extra": "mean: 712.6283700006297 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2080.9810443868023,
            "unit": "iter/sec",
            "range": "stddev: 0.000043494831151197455",
            "extra": "mean: 480.5425799996499 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1848.6264779210699,
            "unit": "iter/sec",
            "range": "stddev: 0.00012531633886354613",
            "extra": "mean: 540.9421600000996 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2966.1400285097784,
            "unit": "iter/sec",
            "range": "stddev: 0.00001811438589208283",
            "extra": "mean: 337.13849999941203 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2666.9632329803762,
            "unit": "iter/sec",
            "range": "stddev: 0.000033937335698229194",
            "extra": "mean: 374.9582999996903 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1673.2583284113812,
            "unit": "iter/sec",
            "range": "stddev: 0.0017291304006979108",
            "extra": "mean: 597.6363500006698 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 308.3801491404466,
            "unit": "iter/sec",
            "range": "stddev: 0.00015377987807817952",
            "extra": "mean: 3.2427508800009264 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2375.797296780589,
            "unit": "iter/sec",
            "range": "stddev: 0.0000320921086398533",
            "extra": "mean: 420.91133000070613 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.05964811363684,
            "unit": "iter/sec",
            "range": "stddev: 0.00022731221545953847",
            "extra": "mean: 14.480235959999561 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1573.3027390996517,
            "unit": "iter/sec",
            "range": "stddev: 0.00004021447725914877",
            "extra": "mean: 635.6055799993499 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 539.0319387421708,
            "unit": "iter/sec",
            "range": "stddev: 0.000041101450273686567",
            "extra": "mean: 1.8551776399993969 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 40.577584585191694,
            "unit": "iter/sec",
            "range": "stddev: 0.003287430233746821",
            "extra": "mean: 24.644148000000428 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1003.5990466854047,
            "unit": "iter/sec",
            "range": "stddev: 0.0000422691935390205",
            "extra": "mean: 996.4138599998762 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1512.7270949401616,
            "unit": "iter/sec",
            "range": "stddev: 0.000030984730023339936",
            "extra": "mean: 661.0577700001841 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2300.261454616197,
            "unit": "iter/sec",
            "range": "stddev: 0.00003519685743441997",
            "extra": "mean: 434.7331900002871 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2083.856858951656,
            "unit": "iter/sec",
            "range": "stddev: 0.00006830129124891639",
            "extra": "mean: 479.8794100008763 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 719.9992892173591,
            "unit": "iter/sec",
            "range": "stddev: 0.00004595099634850055",
            "extra": "mean: 1.3888902599987318 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 585.3370151029844,
            "unit": "iter/sec",
            "range": "stddev: 0.00008478038002867735",
            "extra": "mean: 1.7084175000005075 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 455.8944836229499,
            "unit": "iter/sec",
            "range": "stddev: 0.00009155930552205767",
            "extra": "mean: 2.193490020000013 msec\nrounds: 50"
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
          "id": "704dc82fcce734f523bb3172cde5763ff9233cff",
          "message": "Bump RedisVL to 0.16.0 (#814)\n\n* Allow newer Python via RedisVL 0.16\n\n* Prepare 1.1.0 release",
          "timestamp": "2026-03-13T11:20:55-07:00",
          "tree_id": "5201f9f51ca5bb77b1b08dfa173b110f26a668ad",
          "url": "https://github.com/redis/redis-om-python/commit/704dc82fcce734f523bb3172cde5763ff9233cff"
        },
        "date": 1773426170910,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 909056.1046964179,
            "unit": "iter/sec",
            "range": "stddev: 1.834429407356516e-7",
            "extra": "mean: 1.1000421149296973 usec\nrounds: 26119"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 519391.23717243876,
            "unit": "iter/sec",
            "range": "stddev: 3.4050037614121537e-7",
            "extra": "mean: 1.9253309036247723 usec\nrounds: 39374"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 74491.84801854307,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023869638215967187",
            "extra": "mean: 13.424287712006723 usec\nrounds: 17806"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 72100.95657203461,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012187006352317225",
            "extra": "mean: 13.869441510126434 usec\nrounds: 22833"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 71065.2488558575,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011305818040136869",
            "extra": "mean: 14.07157529312691 usec\nrounds: 19703"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 64956.18026584648,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012590423118553652",
            "extra": "mean: 15.394993916010687 usec\nrounds: 22847"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1798.7168889059508,
            "unit": "iter/sec",
            "range": "stddev: 0.000047701004508117955",
            "extra": "mean: 555.9518599996238 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2543.7613439001443,
            "unit": "iter/sec",
            "range": "stddev: 0.00004076731219692598",
            "extra": "mean: 393.1186400005515 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2332.9339350448877,
            "unit": "iter/sec",
            "range": "stddev: 0.00012885492021570306",
            "extra": "mean: 428.64479999977334 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4249.161842197527,
            "unit": "iter/sec",
            "range": "stddev: 0.000011161451291204753",
            "extra": "mean: 235.34053000034305 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3395.216587986375,
            "unit": "iter/sec",
            "range": "stddev: 0.000022456019830359187",
            "extra": "mean: 294.5320200008439 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 2100.337843543124,
            "unit": "iter/sec",
            "range": "stddev: 0.0014949401095260472",
            "extra": "mean: 476.1138799999287 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 351.0271912121442,
            "unit": "iter/sec",
            "range": "stddev: 0.00008582672127400314",
            "extra": "mean: 2.848782159999814 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2962.179718758936,
            "unit": "iter/sec",
            "range": "stddev: 0.000033228689101757096",
            "extra": "mean: 337.5892400002556 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 80.40956580177817,
            "unit": "iter/sec",
            "range": "stddev: 0.00018025716846541644",
            "extra": "mean: 12.43633129999921 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 2085.714350071563,
            "unit": "iter/sec",
            "range": "stddev: 0.00002873392296156053",
            "extra": "mean: 479.4520400004387 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 635.6143019952649,
            "unit": "iter/sec",
            "range": "stddev: 0.00005016830098682419",
            "extra": "mean: 1.573281150000696 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 49.17344068511605,
            "unit": "iter/sec",
            "range": "stddev: 0.0029518779100249416",
            "extra": "mean: 20.336181200000567 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1253.8900999947432,
            "unit": "iter/sec",
            "range": "stddev: 0.00003038493119767993",
            "extra": "mean: 797.5180599991916 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1917.3786948314971,
            "unit": "iter/sec",
            "range": "stddev: 0.000041631865549954885",
            "extra": "mean: 521.5453800001058 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2644.5792116144776,
            "unit": "iter/sec",
            "range": "stddev: 0.000023876960525226607",
            "extra": "mean: 378.13198999984365 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2283.4117715751568,
            "unit": "iter/sec",
            "range": "stddev: 0.00006967793090964671",
            "extra": "mean: 437.94115999943983 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 845.8409955961375,
            "unit": "iter/sec",
            "range": "stddev: 0.000031256305530895905",
            "extra": "mean: 1.182255299999042 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 715.4241073457036,
            "unit": "iter/sec",
            "range": "stddev: 0.00008086817412092368",
            "extra": "mean: 1.3977722999999287 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 549.2453188070093,
            "unit": "iter/sec",
            "range": "stddev: 0.00008397278896137698",
            "extra": "mean: 1.8206800599995177 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T12:14:44-07:00",
          "tree_id": "720a125bfcd459e7693a931b36d40f8a9e2915ce",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1773429395484,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 939141.3327755041,
            "unit": "iter/sec",
            "range": "stddev: 1.9773739709274884e-7",
            "extra": "mean: 1.0648024584804894 usec\nrounds: 25301"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 522191.1848689016,
            "unit": "iter/sec",
            "range": "stddev: 2.883956844132525e-7",
            "extra": "mean: 1.9150074320979862 usec\nrounds: 37271"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 75927.27963570798,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014890042279845194",
            "extra": "mean: 13.170496885940166 usec\nrounds: 16217"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 71545.57750519692,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012866743730614347",
            "extra": "mean: 13.977104314062766 usec\nrounds: 17802"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 70118.82919840627,
            "unit": "iter/sec",
            "range": "stddev: 0.000001450808824699432",
            "extra": "mean: 14.261504526415125 usec\nrounds: 16348"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 65346.098563899264,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016257932448812408",
            "extra": "mean: 15.30313242835976 usec\nrounds: 18123"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1876.0385749607567,
            "unit": "iter/sec",
            "range": "stddev: 0.000046536713393368016",
            "extra": "mean: 533.0380799983914 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2630.9300769271513,
            "unit": "iter/sec",
            "range": "stddev: 0.00003997667620809394",
            "extra": "mean: 380.0937200003318 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2207.2261316824133,
            "unit": "iter/sec",
            "range": "stddev: 0.0001591920456782906",
            "extra": "mean: 453.0573400006688 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4124.348956037515,
            "unit": "iter/sec",
            "range": "stddev: 0.000011608874976892367",
            "extra": "mean: 242.46251000079155 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3468.4956367574778,
            "unit": "iter/sec",
            "range": "stddev: 0.00003630235127432574",
            "extra": "mean: 288.3094300025846 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1737.2919568908696,
            "unit": "iter/sec",
            "range": "stddev: 0.0020169844508302684",
            "extra": "mean: 575.6084900028213 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 341.65985038192383,
            "unit": "iter/sec",
            "range": "stddev: 0.00009535600852142335",
            "extra": "mean: 2.9268876599991245 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2812.3586174663797,
            "unit": "iter/sec",
            "range": "stddev: 0.00003988389328960372",
            "extra": "mean: 355.57342999908315 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 78.4581677055198,
            "unit": "iter/sec",
            "range": "stddev: 0.0004837717708197201",
            "extra": "mean: 12.745645600001012 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1932.502368907299,
            "unit": "iter/sec",
            "range": "stddev: 0.00004582522977446081",
            "extra": "mean: 517.4637900006474 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 626.0218162847077,
            "unit": "iter/sec",
            "range": "stddev: 0.00005515730297127919",
            "extra": "mean: 1.5973884199991062 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 47.02948872536503,
            "unit": "iter/sec",
            "range": "stddev: 0.003956855749909328",
            "extra": "mean: 21.263254760000336 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1269.5554062668496,
            "unit": "iter/sec",
            "range": "stddev: 0.000025193745818318543",
            "extra": "mean: 787.6773200001708 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 2008.8776723867709,
            "unit": "iter/sec",
            "range": "stddev: 0.000041172566958715264",
            "extra": "mean: 497.79039000014785 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2804.916671117226,
            "unit": "iter/sec",
            "range": "stddev: 0.000050476133159377136",
            "extra": "mean: 356.51682999969125 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2573.179090462384,
            "unit": "iter/sec",
            "range": "stddev: 0.00008290454761422204",
            "extra": "mean: 388.6243299996295 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 873.4701149095398,
            "unit": "iter/sec",
            "range": "stddev: 0.00006132199624517212",
            "extra": "mean: 1.1448588600006815 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 710.3455190213404,
            "unit": "iter/sec",
            "range": "stddev: 0.00009380233923075156",
            "extra": "mean: 1.407765620000987 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 548.8151300860616,
            "unit": "iter/sec",
            "range": "stddev: 0.00008270606034926338",
            "extra": "mean: 1.8221072000022787 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1773469230974,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 915214.2028638436,
            "unit": "iter/sec",
            "range": "stddev: 3.8837214904965555e-7",
            "extra": "mean: 1.0926403861203735 usec\nrounds: 23414"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 532538.0207286195,
            "unit": "iter/sec",
            "range": "stddev: 4.680408352614318e-7",
            "extra": "mean: 1.8778001965602344 usec\nrounds: 18308"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 65496.26910218158,
            "unit": "iter/sec",
            "range": "stddev: 0.00000401365171619949",
            "extra": "mean: 15.268045244529688 usec\nrounds: 14278"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64174.75905600802,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022016865988494922",
            "extra": "mean: 15.58245040121238 usec\nrounds: 16694"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 60173.565778067,
            "unit": "iter/sec",
            "range": "stddev: 0.000002640775893188157",
            "extra": "mean: 16.618593016212703 usec\nrounds: 14777"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 55649.94382638594,
            "unit": "iter/sec",
            "range": "stddev: 0.0000035017849252604244",
            "extra": "mean: 17.96947007026193 usec\nrounds: 16355"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1359.9048958669503,
            "unit": "iter/sec",
            "range": "stddev: 0.00003896337395728973",
            "extra": "mean: 735.3455400000541 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 1956.2861597518877,
            "unit": "iter/sec",
            "range": "stddev: 0.000051148080799833145",
            "extra": "mean: 511.1726599992039 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1698.4169293579482,
            "unit": "iter/sec",
            "range": "stddev: 0.0001747584166445557",
            "extra": "mean: 588.7835800000119 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2911.2243389762166,
            "unit": "iter/sec",
            "range": "stddev: 0.000020326724801430905",
            "extra": "mean: 343.49809000005394 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2553.7429456949985,
            "unit": "iter/sec",
            "range": "stddev: 0.000042308833595550486",
            "extra": "mean: 391.5820900007816 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1536.243675282036,
            "unit": "iter/sec",
            "range": "stddev: 0.002019792845719824",
            "extra": "mean: 650.9384000011664 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 306.8972982676759,
            "unit": "iter/sec",
            "range": "stddev: 0.00009120563642788613",
            "extra": "mean: 3.258419040000149 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2336.971577419288,
            "unit": "iter/sec",
            "range": "stddev: 0.00003671797106695545",
            "extra": "mean: 427.9042200009542 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 67.20861832565495,
            "unit": "iter/sec",
            "range": "stddev: 0.00035774494337509767",
            "extra": "mean: 14.879044159999921 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1531.918150408788,
            "unit": "iter/sec",
            "range": "stddev: 0.000035216602953192735",
            "extra": "mean: 652.7763900004402 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 515.9113855539276,
            "unit": "iter/sec",
            "range": "stddev: 0.00007579990931244134",
            "extra": "mean: 1.9383173700001066 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 39.326032036005884,
            "unit": "iter/sec",
            "range": "stddev: 0.00515723666849629",
            "extra": "mean: 25.42844900000148 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 993.3482717680464,
            "unit": "iter/sec",
            "range": "stddev: 0.00003443959849066611",
            "extra": "mean: 1.0066962700001625 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1471.016820371408,
            "unit": "iter/sec",
            "range": "stddev: 0.00003502449449873783",
            "extra": "mean: 679.8018799999284 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2253.9600331015904,
            "unit": "iter/sec",
            "range": "stddev: 0.00002813702220874036",
            "extra": "mean: 443.6635899989483 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1956.2260002877194,
            "unit": "iter/sec",
            "range": "stddev: 0.00012093131855554231",
            "extra": "mean: 511.18837999950983 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 694.8896080998546,
            "unit": "iter/sec",
            "range": "stddev: 0.00008145136742269081",
            "extra": "mean: 1.4390774999995415 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 550.7259096186853,
            "unit": "iter/sec",
            "range": "stddev: 0.00013821082594588712",
            "extra": "mean: 1.8157852799996022 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 450.54812603691306,
            "unit": "iter/sec",
            "range": "stddev: 0.0001115519323029612",
            "extra": "mean: 2.2195187200003375 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1773556002290,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 918224.8449387121,
            "unit": "iter/sec",
            "range": "stddev: 3.125004860950752e-7",
            "extra": "mean: 1.0890578767412313 usec\nrounds: 23360"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 523716.10764680244,
            "unit": "iter/sec",
            "range": "stddev: 4.7025389299510924e-7",
            "extra": "mean: 1.909431436992208 usec\nrounds: 40182"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70827.02081745483,
            "unit": "iter/sec",
            "range": "stddev: 0.00000225047511106096",
            "extra": "mean: 14.118905305608406 usec\nrounds: 15851"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65836.55678115365,
            "unit": "iter/sec",
            "range": "stddev: 0.000002132383280815071",
            "extra": "mean: 15.189129700754028 usec\nrounds: 21619"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64808.41074595289,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021444941177941558",
            "extra": "mean: 15.430096008988269 usec\nrounds: 20446"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59640.115443038114,
            "unit": "iter/sec",
            "range": "stddev: 0.000002177378104571765",
            "extra": "mean: 16.76723783264795 usec\nrounds: 18862"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1537.9568283512854,
            "unit": "iter/sec",
            "range": "stddev: 0.00003254889839791187",
            "extra": "mean: 650.213310000396 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2125.7905070918023,
            "unit": "iter/sec",
            "range": "stddev: 0.000039585358057075717",
            "extra": "mean: 470.41323999891915 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1871.5055365602182,
            "unit": "iter/sec",
            "range": "stddev: 0.0001254731767683028",
            "extra": "mean: 534.3291699996655 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3289.168786924419,
            "unit": "iter/sec",
            "range": "stddev: 0.0000160528543733458",
            "extra": "mean: 304.02817999956255 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2811.9534792597115,
            "unit": "iter/sec",
            "range": "stddev: 0.000031223832446912755",
            "extra": "mean: 355.62466000087056 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1706.6261518169854,
            "unit": "iter/sec",
            "range": "stddev: 0.0018193902169462899",
            "extra": "mean: 585.9514099999785 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 321.9632484360704,
            "unit": "iter/sec",
            "range": "stddev: 0.00006041287322347327",
            "extra": "mean: 3.1059445600001823 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2535.65620741695,
            "unit": "iter/sec",
            "range": "stddev: 0.000032472260351150744",
            "extra": "mean: 394.3752299996106 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.63514800161357,
            "unit": "iter/sec",
            "range": "stddev: 0.00019809145177949314",
            "extra": "mean: 14.157257800000025 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1658.4144241335105,
            "unit": "iter/sec",
            "range": "stddev: 0.000029714626234772294",
            "extra": "mean: 602.985589999605 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 555.4387375319093,
            "unit": "iter/sec",
            "range": "stddev: 0.00005150522645198167",
            "extra": "mean: 1.8003785699994523 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.70965173757492,
            "unit": "iter/sec",
            "range": "stddev: 0.0033794561066520044",
            "extra": "mean: 23.41391135999885 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1044.9996058259082,
            "unit": "iter/sec",
            "range": "stddev: 0.000026732940210199492",
            "extra": "mean: 956.9381600002203 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1599.5560400227978,
            "unit": "iter/sec",
            "range": "stddev: 0.000027629209383764",
            "extra": "mean: 625.1734699996803 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2365.5823475859042,
            "unit": "iter/sec",
            "range": "stddev: 0.00002385834270352361",
            "extra": "mean: 422.72889000059877 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2090.9708657927295,
            "unit": "iter/sec",
            "range": "stddev: 0.00006875823044829613",
            "extra": "mean: 478.24673999983247 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 745.5366176490926,
            "unit": "iter/sec",
            "range": "stddev: 0.00004127603183828225",
            "extra": "mean: 1.341315740001221 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 600.1849626010201,
            "unit": "iter/sec",
            "range": "stddev: 0.00008602833094190502",
            "extra": "mean: 1.6661530400000402 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 470.3436787150623,
            "unit": "iter/sec",
            "range": "stddev: 0.00007479603443491166",
            "extra": "mean: 2.1261048999997456 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1773643142900,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 932895.2619454241,
            "unit": "iter/sec",
            "range": "stddev: 2.0407117405945623e-7",
            "extra": "mean: 1.071931695648918 usec\nrounds: 17993"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 519182.25340499665,
            "unit": "iter/sec",
            "range": "stddev: 2.806688929167319e-7",
            "extra": "mean: 1.9261058971904683 usec\nrounds: 30133"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 76178.19071908295,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012632734936812283",
            "extra": "mean: 13.127116705720026 usec\nrounds: 14121"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 71367.58873305545,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012280162528959387",
            "extra": "mean: 14.011962821672691 usec\nrounds: 16246"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 71195.64583816004,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012073351302533315",
            "extra": "mean: 14.04580277666379 usec\nrounds: 16134"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 60088.635334377526,
            "unit": "iter/sec",
            "range": "stddev: 0.000012219558626847655",
            "extra": "mean: 16.64208205820055 usec\nrounds: 16403"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1662.9089635672062,
            "unit": "iter/sec",
            "range": "stddev: 0.00019893586308474182",
            "extra": "mean: 601.3558299997612 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2370.1703631105265,
            "unit": "iter/sec",
            "range": "stddev: 0.000046408059192704666",
            "extra": "mean: 421.9105999990802 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1704.2855897254935,
            "unit": "iter/sec",
            "range": "stddev: 0.000372310780181324",
            "extra": "mean: 586.7561200004445 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3528.0791884531795,
            "unit": "iter/sec",
            "range": "stddev: 0.000032302704962133316",
            "extra": "mean: 283.4403499991822 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3315.658882103185,
            "unit": "iter/sec",
            "range": "stddev: 0.0000889815251029628",
            "extra": "mean: 301.59917999938557 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1628.413523175287,
            "unit": "iter/sec",
            "range": "stddev: 0.0021754117706976692",
            "extra": "mean: 614.0946299991867 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 346.1512015587168,
            "unit": "iter/sec",
            "range": "stddev: 0.00014512114621938042",
            "extra": "mean: 2.8889109599995777 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2888.438427283779,
            "unit": "iter/sec",
            "range": "stddev: 0.00024609481360462956",
            "extra": "mean: 346.2078300005089 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 81.21158656425158,
            "unit": "iter/sec",
            "range": "stddev: 0.0002612360039563138",
            "extra": "mean: 12.31351390000043 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1831.9372353404378,
            "unit": "iter/sec",
            "range": "stddev: 0.00006535411041280422",
            "extra": "mean: 545.8702299995366 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 633.2426424330996,
            "unit": "iter/sec",
            "range": "stddev: 0.000054306521139753873",
            "extra": "mean: 1.5791734999994844 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 48.27427266683693,
            "unit": "iter/sec",
            "range": "stddev: 0.004203005909926228",
            "extra": "mean: 20.71496771999989 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1260.1712834889097,
            "unit": "iter/sec",
            "range": "stddev: 0.00004617171038003362",
            "extra": "mean: 793.5429200000499 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1900.8737309084925,
            "unit": "iter/sec",
            "range": "stddev: 0.000055187121087668814",
            "extra": "mean: 526.0738699998058 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 3063.5422783453896,
            "unit": "iter/sec",
            "range": "stddev: 0.000020393230136500063",
            "extra": "mean: 326.41952000091123 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2514.857969495682,
            "unit": "iter/sec",
            "range": "stddev: 0.00008760433185675683",
            "extra": "mean: 397.6367700003891 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 897.5282646013476,
            "unit": "iter/sec",
            "range": "stddev: 0.000040964014060589494",
            "extra": "mean: 1.1141710399996896 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 709.7994773881254,
            "unit": "iter/sec",
            "range": "stddev: 0.00010966606106062414",
            "extra": "mean: 1.40884860000142 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 559.084984518089,
            "unit": "iter/sec",
            "range": "stddev: 0.00006930300260251698",
            "extra": "mean: 1.7886368400002084 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1773728927452,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 898186.2119233124,
            "unit": "iter/sec",
            "range": "stddev: 2.7676179329064346e-7",
            "extra": "mean: 1.1133548775578184 usec\nrounds: 20996"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 516421.24605819985,
            "unit": "iter/sec",
            "range": "stddev: 4.3111863699568134e-7",
            "extra": "mean: 1.9364036774879354 usec\nrounds: 42150"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69628.95175534635,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023243914668454734",
            "extra": "mean: 14.361841946345494 usec\nrounds: 16526"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66233.77703855112,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021627278965181746",
            "extra": "mean: 15.098036752727445 usec\nrounds: 23726"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63930.18170518874,
            "unit": "iter/sec",
            "range": "stddev: 0.000002115399223738739",
            "extra": "mean: 15.642064097540919 usec\nrounds: 18581"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 57870.71987627286,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023669518984334676",
            "extra": "mean: 17.279895638727012 usec\nrounds: 22039"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1479.8718632267476,
            "unit": "iter/sec",
            "range": "stddev: 0.0000406834373023765",
            "extra": "mean: 675.7341799982441 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2128.6107918009693,
            "unit": "iter/sec",
            "range": "stddev: 0.000035455663644994995",
            "extra": "mean: 469.78996998973344 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1880.1785169456339,
            "unit": "iter/sec",
            "range": "stddev: 0.00014038346764271297",
            "extra": "mean: 531.8643899965991 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3203.5604114973,
            "unit": "iter/sec",
            "range": "stddev: 0.000030510498217657703",
            "extra": "mean: 312.1526899917626 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2801.6263888744115,
            "unit": "iter/sec",
            "range": "stddev: 0.000023574584858587618",
            "extra": "mean: 356.93553000896827 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1825.6254574561892,
            "unit": "iter/sec",
            "range": "stddev: 0.0014157466186703012",
            "extra": "mean: 547.7574799999729 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 322.3285530401662,
            "unit": "iter/sec",
            "range": "stddev: 0.0000651572256173184",
            "extra": "mean: 3.1024244999957773 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2462.251893392309,
            "unit": "iter/sec",
            "range": "stddev: 0.000025249869646561525",
            "extra": "mean: 406.1322899917741 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.3590788535011,
            "unit": "iter/sec",
            "range": "stddev: 0.00062782465381858",
            "extra": "mean: 14.212806880007065 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1608.935487106586,
            "unit": "iter/sec",
            "range": "stddev: 0.000031990376232835255",
            "extra": "mean: 621.5289599947482 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 552.2435637558527,
            "unit": "iter/sec",
            "range": "stddev: 0.00004395309783540996",
            "extra": "mean: 1.8107952099956037 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.7649090164723,
            "unit": "iter/sec",
            "range": "stddev: 0.0031463342543147435",
            "extra": "mean: 23.383657840001888 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1030.5359551593049,
            "unit": "iter/sec",
            "range": "stddev: 0.00003247634782204327",
            "extra": "mean: 970.3688600029636 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1596.8275507699827,
            "unit": "iter/sec",
            "range": "stddev: 0.000039238629757174434",
            "extra": "mean: 626.2416999993548 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2257.008949473242,
            "unit": "iter/sec",
            "range": "stddev: 0.000026373707321121277",
            "extra": "mean: 443.0642599947987 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2012.047577501788,
            "unit": "iter/sec",
            "range": "stddev: 0.00008257160988965579",
            "extra": "mean: 497.0061400047143 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 730.7103928392311,
            "unit": "iter/sec",
            "range": "stddev: 0.000047991163205851443",
            "extra": "mean: 1.3685312400093608 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 591.80048824814,
            "unit": "iter/sec",
            "range": "stddev: 0.00009362757976425339",
            "extra": "mean: 1.6897586599839087 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 476.2231541711179,
            "unit": "iter/sec",
            "range": "stddev: 0.00007150640729003356",
            "extra": "mean: 2.099855899994054 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1773815389062,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 708950.7050876322,
            "unit": "iter/sec",
            "range": "stddev: 6.751495037585754e-7",
            "extra": "mean: 1.4105353063671637 usec\nrounds: 26525"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 513587.7737489779,
            "unit": "iter/sec",
            "range": "stddev: 3.9922390058916166e-7",
            "extra": "mean: 1.9470868488562614 usec\nrounds: 35936"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 75616.78533650335,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011974656572140374",
            "extra": "mean: 13.224576997684913 usec\nrounds: 15981"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 70356.89708155754,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015035549595945234",
            "extra": "mean: 14.213247620070602 usec\nrounds: 17543"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 70184.09120876197,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013118672401757378",
            "extra": "mean: 14.24824319553428 usec\nrounds: 17599"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 65128.26543250124,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011432071898788859",
            "extra": "mean: 15.354316491606816 usec\nrounds: 20089"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1788.4331831999023,
            "unit": "iter/sec",
            "range": "stddev: 0.00005471292749735743",
            "extra": "mean: 559.1486499992016 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2404.456515889161,
            "unit": "iter/sec",
            "range": "stddev: 0.00004051690139054838",
            "extra": "mean: 415.89439999924593 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1957.9359775676585,
            "unit": "iter/sec",
            "range": "stddev: 0.00014512239073876448",
            "extra": "mean: 510.74193000033574 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3517.8070159853087,
            "unit": "iter/sec",
            "range": "stddev: 0.00003222691433588634",
            "extra": "mean: 284.2680100005168 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3345.4145172517224,
            "unit": "iter/sec",
            "range": "stddev: 0.0000407462584295579",
            "extra": "mean: 298.9166200012505 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1860.144790692579,
            "unit": "iter/sec",
            "range": "stddev: 0.0018544992081376934",
            "extra": "mean: 537.5925600004905 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 348.68581397638593,
            "unit": "iter/sec",
            "range": "stddev: 0.0000710745147956942",
            "extra": "mean: 2.867911339999978 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3402.7171172690278,
            "unit": "iter/sec",
            "range": "stddev: 0.00003357443736030279",
            "extra": "mean: 293.8827899988894 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 76.60632286005428,
            "unit": "iter/sec",
            "range": "stddev: 0.00020306548471798626",
            "extra": "mean: 13.053752779999854 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 2009.2782845228598,
            "unit": "iter/sec",
            "range": "stddev: 0.000039815490700400754",
            "extra": "mean: 497.69113999929004 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 615.6126572550935,
            "unit": "iter/sec",
            "range": "stddev: 0.00009123329664202201",
            "extra": "mean: 1.6243980499992006 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 46.646667884282365,
            "unit": "iter/sec",
            "range": "stddev: 0.003728255562979069",
            "extra": "mean: 21.437758479999616 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1155.3459039210245,
            "unit": "iter/sec",
            "range": "stddev: 0.0000519397980639387",
            "extra": "mean: 865.5416499995283 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 2051.1963428317936,
            "unit": "iter/sec",
            "range": "stddev: 0.000021093696431423997",
            "extra": "mean: 487.5203699999986 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2722.063934205851,
            "unit": "iter/sec",
            "range": "stddev: 0.00003925304019035314",
            "extra": "mean: 367.3682999998107 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2567.683626866176,
            "unit": "iter/sec",
            "range": "stddev: 0.00010012164302248147",
            "extra": "mean: 389.45608000020115 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 868.3907453375499,
            "unit": "iter/sec",
            "range": "stddev: 0.00005272273620796748",
            "extra": "mean: 1.151555339999959 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 715.2638682798748,
            "unit": "iter/sec",
            "range": "stddev: 0.0001018887257445092",
            "extra": "mean: 1.398085439999761 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 551.195732051801,
            "unit": "iter/sec",
            "range": "stddev: 0.00006825094012035855",
            "extra": "mean: 1.8142375599998672 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1773901623950,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 908814.4077490546,
            "unit": "iter/sec",
            "range": "stddev: 3.147523170754498e-7",
            "extra": "mean: 1.100334668413536 usec\nrounds: 21971"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 487680.205184719,
            "unit": "iter/sec",
            "range": "stddev: 7.130937825887739e-7",
            "extra": "mean: 2.050524071653122 usec\nrounds: 31427"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67592.24985064249,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020722317531328128",
            "extra": "mean: 14.79459556694272 usec\nrounds: 15204"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64592.04142322163,
            "unit": "iter/sec",
            "range": "stddev: 0.00000219844821804544",
            "extra": "mean: 15.481783482391808 usec\nrounds: 22691"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63158.58772092004,
            "unit": "iter/sec",
            "range": "stddev: 0.000002348615777286618",
            "extra": "mean: 15.833159607981063 usec\nrounds: 19078"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 57706.80124168072,
            "unit": "iter/sec",
            "range": "stddev: 0.000002455697792633674",
            "extra": "mean: 17.3289799206149 usec\nrounds: 21415"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1388.934530822226,
            "unit": "iter/sec",
            "range": "stddev: 0.0000384427617806279",
            "extra": "mean: 719.9763399992776 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 1993.8514406809827,
            "unit": "iter/sec",
            "range": "stddev: 0.00004386748069753838",
            "extra": "mean: 501.54188000007593 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1807.5405639686298,
            "unit": "iter/sec",
            "range": "stddev: 0.00016887057645619913",
            "extra": "mean: 553.2379299994261 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2912.983078191351,
            "unit": "iter/sec",
            "range": "stddev: 0.000020961866610026756",
            "extra": "mean: 343.29069999984085 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2615.4656143414973,
            "unit": "iter/sec",
            "range": "stddev: 0.000030192342890394357",
            "extra": "mean: 382.3411000001897 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1575.952676789367,
            "unit": "iter/sec",
            "range": "stddev: 0.0019063005393196242",
            "extra": "mean: 634.5368199997381 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 310.9636568439931,
            "unit": "iter/sec",
            "range": "stddev: 0.00022063168455258833",
            "extra": "mean: 3.2158098800005064 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2408.7213247424706,
            "unit": "iter/sec",
            "range": "stddev: 0.0000287379200097843",
            "extra": "mean: 415.1580300003843 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.94253711394254,
            "unit": "iter/sec",
            "range": "stddev: 0.00045229038512559157",
            "extra": "mean: 14.29745104000034 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1568.4562616683156,
            "unit": "iter/sec",
            "range": "stddev: 0.000035763476640973425",
            "extra": "mean: 637.5695799998482 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 534.5909164097773,
            "unit": "iter/sec",
            "range": "stddev: 0.00007307768536746629",
            "extra": "mean: 1.8705892099997357 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.71213836909581,
            "unit": "iter/sec",
            "range": "stddev: 0.0036702194238420493",
            "extra": "mean: 23.41254823999975 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1004.6806261948465,
            "unit": "iter/sec",
            "range": "stddev: 0.000032158505060534654",
            "extra": "mean: 995.3411800000822 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1478.548676136972,
            "unit": "iter/sec",
            "range": "stddev: 0.000024465322352328",
            "extra": "mean: 676.3389099997141 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2211.0885560393604,
            "unit": "iter/sec",
            "range": "stddev: 0.00003822161545461025",
            "extra": "mean: 452.2659200006274 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1968.2849846754852,
            "unit": "iter/sec",
            "range": "stddev: 0.00008661801970698428",
            "extra": "mean: 508.0565100001877 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 706.5850675852422,
            "unit": "iter/sec",
            "range": "stddev: 0.00004003799897407948",
            "extra": "mean: 1.415257759999804 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 568.2785611491344,
            "unit": "iter/sec",
            "range": "stddev: 0.00011358661124879638",
            "extra": "mean: 1.7597003800000266 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 459.2066314582344,
            "unit": "iter/sec",
            "range": "stddev: 0.00008980715232233334",
            "extra": "mean: 2.177668899999219 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1773987859543,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 898313.1290377644,
            "unit": "iter/sec",
            "range": "stddev: 3.1593265703830707e-7",
            "extra": "mean: 1.1131975785227122 usec\nrounds: 24861"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 506479.8602817117,
            "unit": "iter/sec",
            "range": "stddev: 4.869724521315098e-7",
            "extra": "mean: 1.9744121699997805 usec\nrounds: 40641"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69754.23362398693,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028483223988318127",
            "extra": "mean: 14.336047405961638 usec\nrounds: 17213"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65516.31585406988,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019341145172038917",
            "extra": "mean: 15.26337351183461 usec\nrounds: 23603"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 66379.7840745542,
            "unit": "iter/sec",
            "range": "stddev: 0.0000026747551787521047",
            "extra": "mean: 15.06482755166624 usec\nrounds: 21966"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59147.94570559425,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021260417675038013",
            "extra": "mean: 16.906757928287938 usec\nrounds: 23208"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1446.6279074555368,
            "unit": "iter/sec",
            "range": "stddev: 0.00003540110494043879",
            "extra": "mean: 691.2627599994892 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2056.5301474762487,
            "unit": "iter/sec",
            "range": "stddev: 0.000028352389143896803",
            "extra": "mean: 486.2559400002908 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1816.5297999277975,
            "unit": "iter/sec",
            "range": "stddev: 0.00013318776975827532",
            "extra": "mean: 550.5001899994966 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3055.267435352337,
            "unit": "iter/sec",
            "range": "stddev: 0.000012189620667023463",
            "extra": "mean: 327.3035899997012 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2714.3296437733497,
            "unit": "iter/sec",
            "range": "stddev: 0.000022460768004874037",
            "extra": "mean: 368.41508999984285 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1723.175715658615,
            "unit": "iter/sec",
            "range": "stddev: 0.0015925146810460606",
            "extra": "mean: 580.323869999404 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 316.94170424048144,
            "unit": "iter/sec",
            "range": "stddev: 0.00042057138970075475",
            "extra": "mean: 3.1551543599994147 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2398.521263671626,
            "unit": "iter/sec",
            "range": "stddev: 0.00001614735879465888",
            "extra": "mean: 416.9235499998081 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 71.3551643954554,
            "unit": "iter/sec",
            "range": "stddev: 0.00017897559004983655",
            "extra": "mean: 14.01440258000008 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1542.5672354175001,
            "unit": "iter/sec",
            "range": "stddev: 0.00005331911867985975",
            "extra": "mean: 648.2699599990838 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 563.1443416604659,
            "unit": "iter/sec",
            "range": "stddev: 0.00005020272873891015",
            "extra": "mean: 1.775743670000196 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.74999032396758,
            "unit": "iter/sec",
            "range": "stddev: 0.003577411148879627",
            "extra": "mean: 23.391818159999787 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1017.871585727325,
            "unit": "iter/sec",
            "range": "stddev: 0.0000288262877759376",
            "extra": "mean: 982.4422000005483 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1482.991540362644,
            "unit": "iter/sec",
            "range": "stddev: 0.00003431972586212966",
            "extra": "mean: 674.3126800004973 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2163.618593245766,
            "unit": "iter/sec",
            "range": "stddev: 0.000023675055724519406",
            "extra": "mean: 462.18867000021646 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2046.945298502283,
            "unit": "iter/sec",
            "range": "stddev: 0.00008556492180489069",
            "extra": "mean: 488.5328399990385 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 734.1648102204197,
            "unit": "iter/sec",
            "range": "stddev: 0.00006669969704086432",
            "extra": "mean: 1.3620919800007414 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 584.4748380191122,
            "unit": "iter/sec",
            "range": "stddev: 0.00009847049129327509",
            "extra": "mean: 1.7109376400003384 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 469.23294481128755,
            "unit": "iter/sec",
            "range": "stddev: 0.00009783024343319067",
            "extra": "mean: 2.131137659999922 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1774073894695,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 905285.4747318778,
            "unit": "iter/sec",
            "range": "stddev: 2.8082132474227766e-7",
            "extra": "mean: 1.104623931247957 usec\nrounds: 22456"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 522848.0198007546,
            "unit": "iter/sec",
            "range": "stddev: 4.4336340018923194e-7",
            "extra": "mean: 1.9126016779810642 usec\nrounds: 39453"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69913.58088958378,
            "unit": "iter/sec",
            "range": "stddev: 0.000002581482127111083",
            "extra": "mean: 14.303372639134654 usec\nrounds: 15884"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64116.21447303639,
            "unit": "iter/sec",
            "range": "stddev: 0.000003297553995490212",
            "extra": "mean: 15.596678753087376 usec\nrounds: 19664"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63518.89513949369,
            "unit": "iter/sec",
            "range": "stddev: 0.00000233840727835115",
            "extra": "mean: 15.743346886054967 usec\nrounds: 15864"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58664.343268789366,
            "unit": "iter/sec",
            "range": "stddev: 0.000002551788148967925",
            "extra": "mean: 17.046129629682916 usec\nrounds: 23004"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1367.4882859946754,
            "unit": "iter/sec",
            "range": "stddev: 0.000051684238480135855",
            "extra": "mean: 731.2676899989867 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2016.4369860955903,
            "unit": "iter/sec",
            "range": "stddev: 0.000044303651945951854",
            "extra": "mean: 495.924249999149 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1770.6423879943331,
            "unit": "iter/sec",
            "range": "stddev: 0.00016959373573443272",
            "extra": "mean: 564.7667800005252 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3028.3028821327694,
            "unit": "iter/sec",
            "range": "stddev: 0.0000173726202378857",
            "extra": "mean: 330.2179599999988 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2485.359060442049,
            "unit": "iter/sec",
            "range": "stddev: 0.00004240156983413825",
            "extra": "mean: 402.3563500004457 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1562.8889151362976,
            "unit": "iter/sec",
            "range": "stddev: 0.002079990316691253",
            "extra": "mean: 639.8407400008921 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 324.4409982177466,
            "unit": "iter/sec",
            "range": "stddev: 0.00010487517105415955",
            "extra": "mean: 3.0822245199999543 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2342.4798269144235,
            "unit": "iter/sec",
            "range": "stddev: 0.00004094842453188971",
            "extra": "mean: 426.8980200001238 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.3356011288893,
            "unit": "iter/sec",
            "range": "stddev: 0.000670857820064944",
            "extra": "mean: 14.422605180000971 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1591.5137431512899,
            "unit": "iter/sec",
            "range": "stddev: 0.00003909768704443219",
            "extra": "mean: 628.3326199998385 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 546.7680812104581,
            "unit": "iter/sec",
            "range": "stddev: 0.0001640202256529595",
            "extra": "mean: 1.8289289999997038 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 43.858667419636326,
            "unit": "iter/sec",
            "range": "stddev: 0.0034142575478501476",
            "extra": "mean: 22.800510339999107 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1022.7357010000435,
            "unit": "iter/sec",
            "range": "stddev: 0.00002984057831058999",
            "extra": "mean: 977.7697199992018 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1523.571649294434,
            "unit": "iter/sec",
            "range": "stddev: 0.000025692429665557593",
            "extra": "mean: 656.3524599995674 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2313.030568733719,
            "unit": "iter/sec",
            "range": "stddev: 0.000032116924054896954",
            "extra": "mean: 432.3332400001334 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2079.0419741298642,
            "unit": "iter/sec",
            "range": "stddev: 0.00006301540248793109",
            "extra": "mean: 480.9907700004601 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 731.0379288210107,
            "unit": "iter/sec",
            "range": "stddev: 0.00004273280742883922",
            "extra": "mean: 1.3679180799999813 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 597.8657722465455,
            "unit": "iter/sec",
            "range": "stddev: 0.0000816722323387963",
            "extra": "mean: 1.6726162400004796 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 475.7055872202752,
            "unit": "iter/sec",
            "range": "stddev: 0.00008012540342859826",
            "extra": "mean: 2.102140539999482 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1774160579334,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 896000.9826843026,
            "unit": "iter/sec",
            "range": "stddev: 3.378371503447747e-7",
            "extra": "mean: 1.1160702045260373 usec\nrounds: 21708"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 523629.39440565114,
            "unit": "iter/sec",
            "range": "stddev: 4.810686817952851e-7",
            "extra": "mean: 1.9097476396164819 usec\nrounds: 33892"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70471.64534314605,
            "unit": "iter/sec",
            "range": "stddev: 0.00000234512683698832",
            "extra": "mean: 14.190104333888073 usec\nrounds: 14329"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65121.345810061684,
            "unit": "iter/sec",
            "range": "stddev: 0.000003319463778311918",
            "extra": "mean: 15.35594800077816 usec\nrounds: 14731"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62994.273238698464,
            "unit": "iter/sec",
            "range": "stddev: 0.0000043483375338216804",
            "extra": "mean: 15.87445887677426 usec\nrounds: 13265"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 60770.57244493949,
            "unit": "iter/sec",
            "range": "stddev: 0.000002323137473737386",
            "extra": "mean: 16.45533289827143 usec\nrounds: 16089"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1369.8054068132062,
            "unit": "iter/sec",
            "range": "stddev: 0.000057506672047928336",
            "extra": "mean: 730.0307000002704 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2047.617005850335,
            "unit": "iter/sec",
            "range": "stddev: 0.00004235214733666589",
            "extra": "mean: 488.37258000048683 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1754.5022237688877,
            "unit": "iter/sec",
            "range": "stddev: 0.0001810663139379503",
            "extra": "mean: 569.9622300004137 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3079.5072098679757,
            "unit": "iter/sec",
            "range": "stddev: 0.000032495443321390475",
            "extra": "mean: 324.7272799997347 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2277.6786354902165,
            "unit": "iter/sec",
            "range": "stddev: 0.00031719198609841444",
            "extra": "mean: 439.04349999962733 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1489.4370169367908,
            "unit": "iter/sec",
            "range": "stddev: 0.0024205920529176733",
            "extra": "mean: 671.3946199998588 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 304.24591666850546,
            "unit": "iter/sec",
            "range": "stddev: 0.00007789514419108449",
            "extra": "mean: 3.286814859998799 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2332.6443168543315,
            "unit": "iter/sec",
            "range": "stddev: 0.00004631923974589557",
            "extra": "mean: 428.6980200001267 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 68.69344524466351,
            "unit": "iter/sec",
            "range": "stddev: 0.00030408794161874573",
            "extra": "mean: 14.55742970000017 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1537.8584140511557,
            "unit": "iter/sec",
            "range": "stddev: 0.00004587900294778993",
            "extra": "mean: 650.2549199998953 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 517.1115923246496,
            "unit": "iter/sec",
            "range": "stddev: 0.00005691175858342455",
            "extra": "mean: 1.933818570000625 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 40.61496278363329,
            "unit": "iter/sec",
            "range": "stddev: 0.005291019610783591",
            "extra": "mean: 24.62146783999941 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 986.6142785012535,
            "unit": "iter/sec",
            "range": "stddev: 0.00005375664412590359",
            "extra": "mean: 1.0135673299996029 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1479.918161707153,
            "unit": "iter/sec",
            "range": "stddev: 0.000043634059981505666",
            "extra": "mean: 675.7130400011135 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2162.4343717441975,
            "unit": "iter/sec",
            "range": "stddev: 0.000026379509687358748",
            "extra": "mean: 462.4417799988123 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1889.7583036896801,
            "unit": "iter/sec",
            "range": "stddev: 0.0001184715408023599",
            "extra": "mean: 529.1682000007825 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 684.4906011367729,
            "unit": "iter/sec",
            "range": "stddev: 0.00005576026186896433",
            "extra": "mean: 1.4609404399990922 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 532.9067862151662,
            "unit": "iter/sec",
            "range": "stddev: 0.00015391504407626805",
            "extra": "mean: 1.8765007799999012 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 423.0694275882939,
            "unit": "iter/sec",
            "range": "stddev: 0.0001414523805604288",
            "extra": "mean: 2.363678240000695 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1774247579273,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 884178.6588954568,
            "unit": "iter/sec",
            "range": "stddev: 3.5190947469611045e-7",
            "extra": "mean: 1.1309931425502067 usec\nrounds: 22603"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 463495.8774564876,
            "unit": "iter/sec",
            "range": "stddev: 9.710866610601354e-7",
            "extra": "mean: 2.1575164928923853 usec\nrounds: 40411"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68512.4954018356,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021040341889846013",
            "extra": "mean: 14.595877644433424 usec\nrounds: 16215"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64749.95092123072,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019600168683810937",
            "extra": "mean: 15.444027150175218 usec\nrounds: 21694"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63046.598635463226,
            "unit": "iter/sec",
            "range": "stddev: 0.000002065922672940923",
            "extra": "mean: 15.861283901801288 usec\nrounds: 23332"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58022.1441857278,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022967396419500157",
            "extra": "mean: 17.234799127709216 usec\nrounds: 23164"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1438.3363350487389,
            "unit": "iter/sec",
            "range": "stddev: 0.00002743936299613715",
            "extra": "mean: 695.2476799983742 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2126.710201971105,
            "unit": "iter/sec",
            "range": "stddev: 0.00003894656125203055",
            "extra": "mean: 470.20981000287065 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1886.3251780529126,
            "unit": "iter/sec",
            "range": "stddev: 0.0001337698235832775",
            "extra": "mean: 530.1312899996447 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3055.9507918944205,
            "unit": "iter/sec",
            "range": "stddev: 0.000016635864636777004",
            "extra": "mean: 327.2303999960968 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2692.595427225228,
            "unit": "iter/sec",
            "range": "stddev: 0.000023679429450186077",
            "extra": "mean: 371.3888799961751 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1679.9982931371876,
            "unit": "iter/sec",
            "range": "stddev: 0.0017073391821406656",
            "extra": "mean: 595.2386999945247 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 332.1606070948886,
            "unit": "iter/sec",
            "range": "stddev: 0.00006483403943234294",
            "extra": "mean: 3.010591799991289 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2534.6218574051722,
            "unit": "iter/sec",
            "range": "stddev: 0.000018754603405850632",
            "extra": "mean: 394.53616999253427 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.97667596219448,
            "unit": "iter/sec",
            "range": "stddev: 0.0006064070003203681",
            "extra": "mean: 14.290475879995483 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1511.9877723505438,
            "unit": "iter/sec",
            "range": "stddev: 0.00010761566315121008",
            "extra": "mean: 661.3810100100181 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 533.823140977075,
            "unit": "iter/sec",
            "range": "stddev: 0.00006972427810412156",
            "extra": "mean: 1.8732795999994778 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 43.069352200421925,
            "unit": "iter/sec",
            "range": "stddev: 0.003756172052265473",
            "extra": "mean: 23.218366399999013 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1044.271678517375,
            "unit": "iter/sec",
            "range": "stddev: 0.00003177225042470831",
            "extra": "mean: 957.6052099964727 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1582.2926014807197,
            "unit": "iter/sec",
            "range": "stddev: 0.00003242928769718938",
            "extra": "mean: 631.9943599964972 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2284.6317618565995,
            "unit": "iter/sec",
            "range": "stddev: 0.000030167073076256046",
            "extra": "mean: 437.70730001028824 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2120.882992251077,
            "unit": "iter/sec",
            "range": "stddev: 0.00006304671453406025",
            "extra": "mean: 471.50173001227813 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 735.6170102424956,
            "unit": "iter/sec",
            "range": "stddev: 0.00004017462365761204",
            "extra": "mean: 1.3594030400008705 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 593.1040714828587,
            "unit": "iter/sec",
            "range": "stddev: 0.00009455406329463927",
            "extra": "mean: 1.6860447400063094 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 475.40017094786367,
            "unit": "iter/sec",
            "range": "stddev: 0.00008354870077305888",
            "extra": "mean: 2.1034910399930595 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1774333771443,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 896700.9118178117,
            "unit": "iter/sec",
            "range": "stddev: 4.90408875096302e-7",
            "extra": "mean: 1.1151990444314126 usec\nrounds: 24070"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 531985.9338318795,
            "unit": "iter/sec",
            "range": "stddev: 4.7396695614854334e-7",
            "extra": "mean: 1.8797489489938741 usec\nrounds: 24262"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70539.1083498581,
            "unit": "iter/sec",
            "range": "stddev: 0.00000199396191099309",
            "extra": "mean: 14.176533038101716 usec\nrounds: 16935"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64691.4235074767,
            "unit": "iter/sec",
            "range": "stddev: 0.0000032154298117724695",
            "extra": "mean: 15.457999620064399 usec\nrounds: 23687"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64544.23784613697,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021661861498527247",
            "extra": "mean: 15.493249798438065 usec\nrounds: 22330"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 60355.99421710926,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021740352255564655",
            "extra": "mean: 16.568362645189058 usec\nrounds: 22380"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1407.62567697388,
            "unit": "iter/sec",
            "range": "stddev: 0.00004060412150043458",
            "extra": "mean: 710.4161399995235 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2047.1603930339677,
            "unit": "iter/sec",
            "range": "stddev: 0.000026891195928547292",
            "extra": "mean: 488.48150999930346 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1823.4112954710924,
            "unit": "iter/sec",
            "range": "stddev: 0.00013238710266747368",
            "extra": "mean: 548.4226200000819 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2951.2045769417655,
            "unit": "iter/sec",
            "range": "stddev: 0.000026766815345795218",
            "extra": "mean: 338.84468999985984 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2621.46966352902,
            "unit": "iter/sec",
            "range": "stddev: 0.00002261701261108435",
            "extra": "mean: 381.4654099997483 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1685.641454926366,
            "unit": "iter/sec",
            "range": "stddev: 0.001619220764721435",
            "extra": "mean: 593.2459699999981 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 332.5695032182669,
            "unit": "iter/sec",
            "range": "stddev: 0.00006345615493962433",
            "extra": "mean: 3.0068902599998637 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2461.9056415107407,
            "unit": "iter/sec",
            "range": "stddev: 0.000023993766426030187",
            "extra": "mean: 406.1894099996266 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 72.23972728069494,
            "unit": "iter/sec",
            "range": "stddev: 0.0005295963863806065",
            "extra": "mean: 13.842798660000426 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1580.4168150217668,
            "unit": "iter/sec",
            "range": "stddev: 0.000029686508529993865",
            "extra": "mean: 632.7444699999774 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 549.2145410984938,
            "unit": "iter/sec",
            "range": "stddev: 0.000040144115751796224",
            "extra": "mean: 1.8207820900005345 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 43.279877465108626,
            "unit": "iter/sec",
            "range": "stddev: 0.0034484738927836214",
            "extra": "mean: 23.105425860001105 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1012.0238451849303,
            "unit": "iter/sec",
            "range": "stddev: 0.000031124889954777294",
            "extra": "mean: 988.1190099994798 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1572.936581683823,
            "unit": "iter/sec",
            "range": "stddev: 0.00002229188973943484",
            "extra": "mean: 635.7535399993708 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2160.8374870229445,
            "unit": "iter/sec",
            "range": "stddev: 0.0000345656129585117",
            "extra": "mean: 462.78352999962635 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2018.2550768060985,
            "unit": "iter/sec",
            "range": "stddev: 0.00009036443007015786",
            "extra": "mean: 495.4775099996311 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 735.6002030547179,
            "unit": "iter/sec",
            "range": "stddev: 0.00004048993610821997",
            "extra": "mean: 1.3594341000006693 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 585.6790188007625,
            "unit": "iter/sec",
            "range": "stddev: 0.00010961026045998115",
            "extra": "mean: 1.7074198800011686 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 463.06714878341114,
            "unit": "iter/sec",
            "range": "stddev: 0.00013172570666103816",
            "extra": "mean: 2.1595140200017227 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1774420145343,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 886119.3983748677,
            "unit": "iter/sec",
            "range": "stddev: 2.9815935292563395e-7",
            "extra": "mean: 1.1285160914364225 usec\nrounds: 23149"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 477264.24262949545,
            "unit": "iter/sec",
            "range": "stddev: 7.884488677093938e-7",
            "extra": "mean: 2.0952753436764566 usec\nrounds: 40444"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70315.88445607065,
            "unit": "iter/sec",
            "range": "stddev: 0.00000209305725576756",
            "extra": "mean: 14.221537675811259 usec\nrounds: 16642"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64553.22362049744,
            "unit": "iter/sec",
            "range": "stddev: 0.000002113541491503259",
            "extra": "mean: 15.491093146314576 usec\nrounds: 23608"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64418.03345043402,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022881572525916257",
            "extra": "mean: 15.523603351993703 usec\nrounds: 21301"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59572.19582773601,
            "unit": "iter/sec",
            "range": "stddev: 0.000002405504030566495",
            "extra": "mean: 16.786354541834992 usec\nrounds: 22821"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1348.4651803013182,
            "unit": "iter/sec",
            "range": "stddev: 0.00005552764276956024",
            "extra": "mean: 741.5838500008931 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2041.9286359009775,
            "unit": "iter/sec",
            "range": "stddev: 0.00004772817670851815",
            "extra": "mean: 489.7330800000077 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1831.8114948791606,
            "unit": "iter/sec",
            "range": "stddev: 0.0001421258609176001",
            "extra": "mean: 545.9076999983381 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3102.3024885939876,
            "unit": "iter/sec",
            "range": "stddev: 0.00003041880808972954",
            "extra": "mean: 322.3412299982442 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2621.557217041878,
            "unit": "iter/sec",
            "range": "stddev: 0.00002961807246447569",
            "extra": "mean: 381.45267000061267 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1643.2504031977678,
            "unit": "iter/sec",
            "range": "stddev: 0.0017156664636618034",
            "extra": "mean: 608.5499799993954 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 324.20550458413703,
            "unit": "iter/sec",
            "range": "stddev: 0.00009608076240206341",
            "extra": "mean: 3.084463359999745 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2470.804296953277,
            "unit": "iter/sec",
            "range": "stddev: 0.000021292905628501155",
            "extra": "mean: 404.7265100004438 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 71.46381482977726,
            "unit": "iter/sec",
            "range": "stddev: 0.0002659830427233902",
            "extra": "mean: 13.993095699997866 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1536.1213875119083,
            "unit": "iter/sec",
            "range": "stddev: 0.000020556280722836088",
            "extra": "mean: 650.9902199979933 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 554.9873902976561,
            "unit": "iter/sec",
            "range": "stddev: 0.00004671095021851805",
            "extra": "mean: 1.8018427400011205 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.79884333660619,
            "unit": "iter/sec",
            "range": "stddev: 0.0034031096255614087",
            "extra": "mean: 23.365117420000274 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1030.6053724438327,
            "unit": "iter/sec",
            "range": "stddev: 0.00003236958845205964",
            "extra": "mean: 970.3034999989768 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1542.1405163269246,
            "unit": "iter/sec",
            "range": "stddev: 0.000036248554077294567",
            "extra": "mean: 648.4493400003544 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2301.3586323889567,
            "unit": "iter/sec",
            "range": "stddev: 0.000022579794078505948",
            "extra": "mean: 434.52592999898343 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1957.6066575046355,
            "unit": "iter/sec",
            "range": "stddev: 0.00008686238071094952",
            "extra": "mean: 510.8278500006235 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 726.4302583670484,
            "unit": "iter/sec",
            "range": "stddev: 0.00004549371124949178",
            "extra": "mean: 1.3765946399973927 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 596.2419537448186,
            "unit": "iter/sec",
            "range": "stddev: 0.00010005571687501267",
            "extra": "mean: 1.6771714799995152 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 480.51124705311145,
            "unit": "iter/sec",
            "range": "stddev: 0.00008818861621833506",
            "extra": "mean: 2.081116739998947 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1774506705832,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 903129.3509748029,
            "unit": "iter/sec",
            "range": "stddev: 3.0380972702528894e-7",
            "extra": "mean: 1.1072611015472353 usec\nrounds: 23420"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 516609.0655665912,
            "unit": "iter/sec",
            "range": "stddev: 4.608000613005159e-7",
            "extra": "mean: 1.9356996743819228 usec\nrounds: 42081"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 72939.47498049127,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021939344536371634",
            "extra": "mean: 13.709997230819999 usec\nrounds: 16973"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66439.0824570753,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020006172340659915",
            "extra": "mean: 15.051381852632836 usec\nrounds: 23805"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64595.79155832903,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020572458568159476",
            "extra": "mean: 15.480884681117576 usec\nrounds: 16953"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58868.586200715494,
            "unit": "iter/sec",
            "range": "stddev: 0.000002095538570958702",
            "extra": "mean: 16.986988554310585 usec\nrounds: 22716"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1445.620393991656,
            "unit": "iter/sec",
            "range": "stddev: 0.000027665046726792866",
            "extra": "mean: 691.7445299998803 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2037.1600400035318,
            "unit": "iter/sec",
            "range": "stddev: 0.000026703654137324987",
            "extra": "mean: 490.8794500005343 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1821.016147047914,
            "unit": "iter/sec",
            "range": "stddev: 0.00013934156007725573",
            "extra": "mean: 549.1439499979833 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2989.7847426778517,
            "unit": "iter/sec",
            "range": "stddev: 0.000025667507210780954",
            "extra": "mean: 334.4722399995703 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2654.4271385309557,
            "unit": "iter/sec",
            "range": "stddev: 0.000024699566796946568",
            "extra": "mean: 376.7291199989131 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1695.9727363552815,
            "unit": "iter/sec",
            "range": "stddev: 0.0014386885911480127",
            "extra": "mean: 589.632120000374 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 319.32955916048115,
            "unit": "iter/sec",
            "range": "stddev: 0.000053975102139797194",
            "extra": "mean: 3.131561019997662 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2470.7129714082553,
            "unit": "iter/sec",
            "range": "stddev: 0.00001791501565093384",
            "extra": "mean: 404.7414700016816 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.30622287367271,
            "unit": "iter/sec",
            "range": "stddev: 0.0007345061924852178",
            "extra": "mean: 14.22349201999964 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1588.0174807006483,
            "unit": "iter/sec",
            "range": "stddev: 0.000024137317591523514",
            "extra": "mean: 629.7159900020688 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 561.5687400290878,
            "unit": "iter/sec",
            "range": "stddev: 0.0000262741939669514",
            "extra": "mean: 1.7807258999997089 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.54236302782752,
            "unit": "iter/sec",
            "range": "stddev: 0.003336837148912139",
            "extra": "mean: 23.505981539997833 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1023.732756283742,
            "unit": "iter/sec",
            "range": "stddev: 0.000028554853321926728",
            "extra": "mean: 976.8174300000966 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1540.6586124564872,
            "unit": "iter/sec",
            "range": "stddev: 0.000034102086038682086",
            "extra": "mean: 649.0730599983863 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2181.13340110656,
            "unit": "iter/sec",
            "range": "stddev: 0.0000331322815371019",
            "extra": "mean: 458.477230000085 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2012.2298905773725,
            "unit": "iter/sec",
            "range": "stddev: 0.00007323394906967263",
            "extra": "mean: 496.9611100017346 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 739.6189415169117,
            "unit": "iter/sec",
            "range": "stddev: 0.00005467145217357258",
            "extra": "mean: 1.3520475799998621 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 585.2475091900286,
            "unit": "iter/sec",
            "range": "stddev: 0.00010628360036263649",
            "extra": "mean: 1.708678779998536 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 461.32547962939134,
            "unit": "iter/sec",
            "range": "stddev: 0.00007185541939425909",
            "extra": "mean: 2.1676669600026344 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1774593177817,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 889634.7290217063,
            "unit": "iter/sec",
            "range": "stddev: 4.0445379820860204e-7",
            "extra": "mean: 1.1240568374614353 usec\nrounds: 17682"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 524257.36282042635,
            "unit": "iter/sec",
            "range": "stddev: 5.305761215337867e-7",
            "extra": "mean: 1.9074600967359794 usec\nrounds: 36388"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 66732.51572834804,
            "unit": "iter/sec",
            "range": "stddev: 0.0000038555612617513665",
            "extra": "mean: 14.985198581014966 usec\nrounds: 13531"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63398.91478608268,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024339527095854753",
            "extra": "mean: 15.773140650343118 usec\nrounds: 15471"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62225.076646935304,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027409653293589162",
            "extra": "mean: 16.07069133355984 usec\nrounds: 14608"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58008.45490566218,
            "unit": "iter/sec",
            "range": "stddev: 0.0000026058864798937287",
            "extra": "mean: 17.23886632778406 usec\nrounds: 17311"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1352.5376914057874,
            "unit": "iter/sec",
            "range": "stddev: 0.00013450004556814931",
            "extra": "mean: 739.3509299993184 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2010.6764102421107,
            "unit": "iter/sec",
            "range": "stddev: 0.00006355816012672333",
            "extra": "mean: 497.34507000039224 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1593.0454009955577,
            "unit": "iter/sec",
            "range": "stddev: 0.00029464530383259446",
            "extra": "mean: 627.7285000007282 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3018.9857675021044,
            "unit": "iter/sec",
            "range": "stddev: 0.000031554879201970264",
            "extra": "mean: 331.2370700002987 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2621.6092433750728,
            "unit": "iter/sec",
            "range": "stddev: 0.000031576938572718755",
            "extra": "mean: 381.4450999999508 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1534.872534209669,
            "unit": "iter/sec",
            "range": "stddev: 0.0019432416220997867",
            "extra": "mean: 651.5198999993288 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 311.75866906086924,
            "unit": "iter/sec",
            "range": "stddev: 0.00011921564898203816",
            "extra": "mean: 3.2076092799997014 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2202.103656409957,
            "unit": "iter/sec",
            "range": "stddev: 0.00007396301206686631",
            "extra": "mean: 454.11123000008047 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 67.3989807664673,
            "unit": "iter/sec",
            "range": "stddev: 0.0005278951060556794",
            "extra": "mean: 14.837019619998841 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1504.500744065387,
            "unit": "iter/sec",
            "range": "stddev: 0.00014922835063994178",
            "extra": "mean: 664.6723200002214 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 536.0642246110174,
            "unit": "iter/sec",
            "range": "stddev: 0.00013617164063182746",
            "extra": "mean: 1.8654481200002238 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.14558285574195,
            "unit": "iter/sec",
            "range": "stddev: 0.004414979690151246",
            "extra": "mean: 24.303945419999025 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1002.632562187962,
            "unit": "iter/sec",
            "range": "stddev: 0.00008950217355291143",
            "extra": "mean: 997.3743499989496 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1487.2505594513884,
            "unit": "iter/sec",
            "range": "stddev: 0.00010778154827565985",
            "extra": "mean: 672.3816600000987 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2158.7284536807356,
            "unit": "iter/sec",
            "range": "stddev: 0.000041750650679749934",
            "extra": "mean: 463.2356599992704 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1873.0651822027671,
            "unit": "iter/sec",
            "range": "stddev: 0.00016367123543599343",
            "extra": "mean: 533.8842499992325 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 679.3014010045704,
            "unit": "iter/sec",
            "range": "stddev: 0.00031318529680327944",
            "extra": "mean: 1.4721006000004877 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 568.3657813926314,
            "unit": "iter/sec",
            "range": "stddev: 0.00012500912131431635",
            "extra": "mean: 1.7594303399999944 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 447.7898325289828,
            "unit": "iter/sec",
            "range": "stddev: 0.0001725673059919027",
            "extra": "mean: 2.2331904999992958 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1774679186255,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 930268.3608201357,
            "unit": "iter/sec",
            "range": "stddev: 1.9755142383198995e-7",
            "extra": "mean: 1.0749586271195852 usec\nrounds: 24533"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 492034.04934715084,
            "unit": "iter/sec",
            "range": "stddev: 7.261374721743679e-7",
            "extra": "mean: 2.0323796723556784 usec\nrounds: 36866"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 75250.70580555529,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012044991654806255",
            "extra": "mean: 13.288911901822669 usec\nrounds: 16107"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 70183.22580178634,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015284571628186492",
            "extra": "mean: 14.248418886077298 usec\nrounds: 17272"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 70584.6627152338,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011831421855490688",
            "extra": "mean: 14.167383699691133 usec\nrounds: 17055"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 65068.08468074919,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012472855069860176",
            "extra": "mean: 15.368517529083755 usec\nrounds: 18455"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 2016.4761426198793,
            "unit": "iter/sec",
            "range": "stddev: 0.00003581485521115472",
            "extra": "mean: 495.91461999682446 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2316.246115511461,
            "unit": "iter/sec",
            "range": "stddev: 0.00004686357611204799",
            "extra": "mean: 431.73304999982065 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2254.3066669144955,
            "unit": "iter/sec",
            "range": "stddev: 0.0001446488227230475",
            "extra": "mean: 443.5953699984907 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4349.896637726556,
            "unit": "iter/sec",
            "range": "stddev: 0.00002503750251761952",
            "extra": "mean: 229.89052000156107 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3419.796153481257,
            "unit": "iter/sec",
            "range": "stddev: 0.000026438827191164503",
            "extra": "mean: 292.41508999945154 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1905.9046852191025,
            "unit": "iter/sec",
            "range": "stddev: 0.0018056839667930722",
            "extra": "mean: 524.6852099978128 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 350.0654146236083,
            "unit": "iter/sec",
            "range": "stddev: 0.00006560663021504442",
            "extra": "mean: 2.8566089600002442 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3335.232748367168,
            "unit": "iter/sec",
            "range": "stddev: 0.00004748128215773581",
            "extra": "mean: 299.8291500014716 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 76.31183858489328,
            "unit": "iter/sec",
            "range": "stddev: 0.00023062501831767836",
            "extra": "mean: 13.10412667999799 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1956.4369956370904,
            "unit": "iter/sec",
            "range": "stddev: 0.00010171477603542725",
            "extra": "mean: 511.1332499998867 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 638.561456923838,
            "unit": "iter/sec",
            "range": "stddev: 0.000033391168990465074",
            "extra": "mean: 1.5660199799989982 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 46.87964713547253,
            "unit": "iter/sec",
            "range": "stddev: 0.00337711682342026",
            "extra": "mean: 21.331218579999245 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1197.603915522957,
            "unit": "iter/sec",
            "range": "stddev: 0.00004058829079266004",
            "extra": "mean: 835.0006099999518 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 2154.7238225797705,
            "unit": "iter/sec",
            "range": "stddev: 0.000021190667702880008",
            "extra": "mean: 464.09660000080066 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 3001.478828616627,
            "unit": "iter/sec",
            "range": "stddev: 0.00003275494527280584",
            "extra": "mean: 333.1691000002479 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2309.509891983232,
            "unit": "iter/sec",
            "range": "stddev: 0.00007872243716322542",
            "extra": "mean: 432.99229999888666 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 886.7565743243588,
            "unit": "iter/sec",
            "range": "stddev: 0.00006259938875832457",
            "extra": "mean: 1.127705200000264 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 720.783349650839,
            "unit": "iter/sec",
            "range": "stddev: 0.00009797615128023783",
            "extra": "mean: 1.3873794400001316 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 557.619373008666,
            "unit": "iter/sec",
            "range": "stddev: 0.0000709758842542669",
            "extra": "mean: 1.7933379799995919 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1774765841653,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 891284.2775047391,
            "unit": "iter/sec",
            "range": "stddev: 3.496534502248671e-7",
            "extra": "mean: 1.1219764840906026 usec\nrounds: 19136"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 511493.25437761546,
            "unit": "iter/sec",
            "range": "stddev: 5.868962109518425e-7",
            "extra": "mean: 1.9550599962785415 usec\nrounds: 21568"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67522.61782089809,
            "unit": "iter/sec",
            "range": "stddev: 0.00000400086130675321",
            "extra": "mean: 14.809852346845807 usec\nrounds: 15638"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66191.6276803384,
            "unit": "iter/sec",
            "range": "stddev: 0.000002266354151247383",
            "extra": "mean: 15.107650847163569 usec\nrounds: 23726"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64171.21551057612,
            "unit": "iter/sec",
            "range": "stddev: 0.00000312286871784582",
            "extra": "mean: 15.583310866773113 usec\nrounds: 22196"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59699.270628841296,
            "unit": "iter/sec",
            "range": "stddev: 0.000002551844715988441",
            "extra": "mean: 16.750623407397047 usec\nrounds: 23625"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1423.880454414652,
            "unit": "iter/sec",
            "range": "stddev: 0.000039961460652122525",
            "extra": "mean: 702.3061499998562 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2020.2942190849717,
            "unit": "iter/sec",
            "range": "stddev: 0.00003974185221134289",
            "extra": "mean: 494.97740999967726 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1872.8205752835668,
            "unit": "iter/sec",
            "range": "stddev: 0.0001224955307787267",
            "extra": "mean: 533.9539800007742 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3004.1031542868336,
            "unit": "iter/sec",
            "range": "stddev: 0.00003388475038139043",
            "extra": "mean: 332.8780500007156 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2562.517285784091,
            "unit": "iter/sec",
            "range": "stddev: 0.00003187367353474391",
            "extra": "mean: 390.2412699994784 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1649.3580830315855,
            "unit": "iter/sec",
            "range": "stddev: 0.0016349388055345792",
            "extra": "mean: 606.2964799990311 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 319.31362998787205,
            "unit": "iter/sec",
            "range": "stddev: 0.00007381200021452476",
            "extra": "mean: 3.1317172400000004 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2428.7536059099575,
            "unit": "iter/sec",
            "range": "stddev: 0.000024848160071138117",
            "extra": "mean: 411.7338199999665 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 71.07641520640678,
            "unit": "iter/sec",
            "range": "stddev: 0.0002357114600003027",
            "extra": "mean: 14.069364600001109 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1643.6232332976224,
            "unit": "iter/sec",
            "range": "stddev: 0.000020857397468073022",
            "extra": "mean: 608.4119400001953 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 540.1071527221601,
            "unit": "iter/sec",
            "range": "stddev: 0.00004942506048224488",
            "extra": "mean: 1.8514844600001368 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.338720538667296,
            "unit": "iter/sec",
            "range": "stddev: 0.003419824285180248",
            "extra": "mean: 23.6190415599998 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1008.5814954833095,
            "unit": "iter/sec",
            "range": "stddev: 0.000034863836064823365",
            "extra": "mean: 991.4915199993857 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1486.5284548027296,
            "unit": "iter/sec",
            "range": "stddev: 0.00004018654065521718",
            "extra": "mean: 672.7082799990569 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2231.2930233738866,
            "unit": "iter/sec",
            "range": "stddev: 0.00002663777551164157",
            "extra": "mean: 448.1706299999644 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2046.5505104628458,
            "unit": "iter/sec",
            "range": "stddev: 0.00007612328176563851",
            "extra": "mean: 488.6270800000148 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 741.7773168483409,
            "unit": "iter/sec",
            "range": "stddev: 0.0000417257050279907",
            "extra": "mean: 1.3481134799980055 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 584.9285895783316,
            "unit": "iter/sec",
            "range": "stddev: 0.00008419549703171306",
            "extra": "mean: 1.7096103999992351 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 466.1176124367329,
            "unit": "iter/sec",
            "range": "stddev: 0.00007978840624038415",
            "extra": "mean: 2.1453812799998673 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1774853092656,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 902086.8813076922,
            "unit": "iter/sec",
            "range": "stddev: 4.1089234234100204e-7",
            "extra": "mean: 1.1085406746525013 usec\nrounds: 22176"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 524858.7364101424,
            "unit": "iter/sec",
            "range": "stddev: 6.000387861603738e-7",
            "extra": "mean: 1.9052745636657673 usec\nrounds: 40395"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67119.52550479744,
            "unit": "iter/sec",
            "range": "stddev: 0.000004103015363375068",
            "extra": "mean: 14.898794240262083 usec\nrounds: 15591"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64547.14178284175,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027809029855158033",
            "extra": "mean: 15.492552766539776 usec\nrounds: 23585"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62151.01448272624,
            "unit": "iter/sec",
            "range": "stddev: 0.000003725535380265734",
            "extra": "mean: 16.08984194904706 usec\nrounds: 15495"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59336.94709583403,
            "unit": "iter/sec",
            "range": "stddev: 0.000002831637197461131",
            "extra": "mean: 16.8529061393219 usec\nrounds: 20882"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1418.9306461876263,
            "unit": "iter/sec",
            "range": "stddev: 0.000030363994338697477",
            "extra": "mean: 704.7560800006636 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 1985.9696802795124,
            "unit": "iter/sec",
            "range": "stddev: 0.000042681909689824005",
            "extra": "mean: 503.5323600002073 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1755.89474057003,
            "unit": "iter/sec",
            "range": "stddev: 0.0001315354601476502",
            "extra": "mean: 569.5102200006374 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3014.6725923813347,
            "unit": "iter/sec",
            "range": "stddev: 0.000017590751547740364",
            "extra": "mean: 331.710980000679 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2575.9637543286435,
            "unit": "iter/sec",
            "range": "stddev: 0.00003752659221769098",
            "extra": "mean: 388.2042200010005 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1616.9388966537917,
            "unit": "iter/sec",
            "range": "stddev: 0.001820040129394066",
            "extra": "mean: 618.4525600005486 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 318.0260120344387,
            "unit": "iter/sec",
            "range": "stddev: 0.00007617332952382286",
            "extra": "mean: 3.1443968800002153 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2340.4197107426094,
            "unit": "iter/sec",
            "range": "stddev: 0.00005422772994415907",
            "extra": "mean: 427.2737900001289 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.62945484338887,
            "unit": "iter/sec",
            "range": "stddev: 0.00022888108356912922",
            "extra": "mean: 14.158398959999943 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1592.6592931633475,
            "unit": "iter/sec",
            "range": "stddev: 0.000037105864918275894",
            "extra": "mean: 627.8806800001746 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 535.1060497783751,
            "unit": "iter/sec",
            "range": "stddev: 0.00009087549287736807",
            "extra": "mean: 1.868788440000202 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.275375280787905,
            "unit": "iter/sec",
            "range": "stddev: 0.003538337263872776",
            "extra": "mean: 23.654432240000745 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1011.6159714366974,
            "unit": "iter/sec",
            "range": "stddev: 0.000026947092740382337",
            "extra": "mean: 988.5174100007531 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1495.3289810496187,
            "unit": "iter/sec",
            "range": "stddev: 0.00003612608302783598",
            "extra": "mean: 668.7491599996065 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2235.6769234038884,
            "unit": "iter/sec",
            "range": "stddev: 0.00002608891707838454",
            "extra": "mean: 447.2918199994069 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1979.567654900227,
            "unit": "iter/sec",
            "range": "stddev: 0.00009290866720744406",
            "extra": "mean: 505.1608100004046 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 721.9784149251481,
            "unit": "iter/sec",
            "range": "stddev: 0.0000471699213075462",
            "extra": "mean: 1.3850829599991243 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 574.5893513328423,
            "unit": "iter/sec",
            "range": "stddev: 0.00010652215705283143",
            "extra": "mean: 1.740373360001115 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 463.6775243744926,
            "unit": "iter/sec",
            "range": "stddev: 0.00007742793008778044",
            "extra": "mean: 2.1566712800000687 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1774938941105,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 831547.4944715768,
            "unit": "iter/sec",
            "range": "stddev: 5.27638337158126e-7",
            "extra": "mean: 1.202577130769265 usec\nrounds: 24251"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 499010.3773999119,
            "unit": "iter/sec",
            "range": "stddev: 5.815124318226108e-7",
            "extra": "mean: 2.003966340761267 usec\nrounds: 45515"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69260.52809981754,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021935278803672593",
            "extra": "mean: 14.438238162995386 usec\nrounds: 16157"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64526.228585099845,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024486250257998166",
            "extra": "mean: 15.497573962209165 usec\nrounds: 24357"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64848.986089016325,
            "unit": "iter/sec",
            "range": "stddev: 0.00000235232921036992",
            "extra": "mean: 15.420441556747377 usec\nrounds: 22355"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59063.293962122705,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022807265651175505",
            "extra": "mean: 16.930989332245847 usec\nrounds: 22779"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1410.3871459155353,
            "unit": "iter/sec",
            "range": "stddev: 0.0000904047740188908",
            "extra": "mean: 709.0251799982639 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2110.517279548686,
            "unit": "iter/sec",
            "range": "stddev: 0.00003930806124757596",
            "extra": "mean: 473.8174900012382 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1937.7542188186237,
            "unit": "iter/sec",
            "range": "stddev: 0.00012737723282631096",
            "extra": "mean: 516.0613200004605 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2442.1105627983948,
            "unit": "iter/sec",
            "range": "stddev: 0.00011963072374358364",
            "extra": "mean: 409.4818699994107 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2545.6108552195874,
            "unit": "iter/sec",
            "range": "stddev: 0.000030906273739446006",
            "extra": "mean: 392.83301999972764 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1735.972052510099,
            "unit": "iter/sec",
            "range": "stddev: 0.0014817730413115616",
            "extra": "mean: 576.04614000212 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 308.8303503843886,
            "unit": "iter/sec",
            "range": "stddev: 0.0005553349628168341",
            "extra": "mean: 3.238023719998182 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2491.763724174388,
            "unit": "iter/sec",
            "range": "stddev: 0.00004013809737619342",
            "extra": "mean: 401.32216000188237 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 68.66287411676178,
            "unit": "iter/sec",
            "range": "stddev: 0.0010021793411219724",
            "extra": "mean: 14.563911179999423 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1621.3329805296992,
            "unit": "iter/sec",
            "range": "stddev: 0.000037815379964855074",
            "extra": "mean: 616.7764500006001 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 550.2292114594745,
            "unit": "iter/sec",
            "range": "stddev: 0.00004575305384171624",
            "extra": "mean: 1.8174244099972725 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.61478908105523,
            "unit": "iter/sec",
            "range": "stddev: 0.0035083890421107214",
            "extra": "mean: 24.029918740000085 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1015.4305847069053,
            "unit": "iter/sec",
            "range": "stddev: 0.00003255656715563441",
            "extra": "mean: 984.8039000013387 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1559.7956068812236,
            "unit": "iter/sec",
            "range": "stddev: 0.000025120301007600894",
            "extra": "mean: 641.1096399992289 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2083.0845783199966,
            "unit": "iter/sec",
            "range": "stddev: 0.00005036731937111308",
            "extra": "mean: 480.05731999921863 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1872.066495199026,
            "unit": "iter/sec",
            "range": "stddev: 0.00009532944895683964",
            "extra": "mean: 534.1690600010907 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 740.278083390212,
            "unit": "iter/sec",
            "range": "stddev: 0.0000512592847566853",
            "extra": "mean: 1.3508437199982382 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 595.3836310957493,
            "unit": "iter/sec",
            "range": "stddev: 0.00010435552483214167",
            "extra": "mean: 1.6795893400018258 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 469.0352144516852,
            "unit": "iter/sec",
            "range": "stddev: 0.00007686748734881732",
            "extra": "mean: 2.1320360799967375 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1775025692939,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 893178.9620639466,
            "unit": "iter/sec",
            "range": "stddev: 3.4331393608212064e-7",
            "extra": "mean: 1.1195964554395823 usec\nrounds: 24488"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 510341.2230113759,
            "unit": "iter/sec",
            "range": "stddev: 0.000001620426927860914",
            "extra": "mean: 1.959473299255132 usec\nrounds: 42115"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68292.86755165351,
            "unit": "iter/sec",
            "range": "stddev: 0.000002194840022971524",
            "extra": "mean: 14.642817556952737 usec\nrounds: 16586"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64771.54346190469,
            "unit": "iter/sec",
            "range": "stddev: 0.000002303784938708148",
            "extra": "mean: 15.438878658004327 usec\nrounds: 24023"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64736.66872135658,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022152340507824704",
            "extra": "mean: 15.447195843583788 usec\nrounds: 18622"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59746.15745386289,
            "unit": "iter/sec",
            "range": "stddev: 0.0000025685743534287764",
            "extra": "mean: 16.737478067476033 usec\nrounds: 22250"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1441.6020696748137,
            "unit": "iter/sec",
            "range": "stddev: 0.00005590237112406023",
            "extra": "mean: 693.6727000021392 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2096.861673266734,
            "unit": "iter/sec",
            "range": "stddev: 0.000027042241932163183",
            "extra": "mean: 476.9031799995105 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1894.144592937963,
            "unit": "iter/sec",
            "range": "stddev: 0.0001335755524702205",
            "extra": "mean: 527.942799999721 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3049.2295984128377,
            "unit": "iter/sec",
            "range": "stddev: 0.000014446580928721588",
            "extra": "mean: 327.95169000081614 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2679.469601148174,
            "unit": "iter/sec",
            "range": "stddev: 0.00003447637716865953",
            "extra": "mean: 373.2081899983086 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1582.9942599196318,
            "unit": "iter/sec",
            "range": "stddev: 0.0015537231470511995",
            "extra": "mean: 631.7142300002843 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 318.4436187866943,
            "unit": "iter/sec",
            "range": "stddev: 0.00008265985741928066",
            "extra": "mean: 3.1402733199996646 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2511.32544995718,
            "unit": "iter/sec",
            "range": "stddev: 0.00003569003595576206",
            "extra": "mean: 398.196099998529 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 67.37221327709837,
            "unit": "iter/sec",
            "range": "stddev: 0.001147303978954829",
            "extra": "mean: 14.84291447999567 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1594.0754210274285,
            "unit": "iter/sec",
            "range": "stddev: 0.00002575654264658314",
            "extra": "mean: 627.322890001949 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 532.8587423393684,
            "unit": "iter/sec",
            "range": "stddev: 0.00004024108477335143",
            "extra": "mean: 1.8766699699995115 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.390460055575126,
            "unit": "iter/sec",
            "range": "stddev: 0.00403893712007627",
            "extra": "mean: 24.16015668000057 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1008.3631013880467,
            "unit": "iter/sec",
            "range": "stddev: 0.00004761095332012498",
            "extra": "mean: 991.7062600004556 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1543.4179521457302,
            "unit": "iter/sec",
            "range": "stddev: 0.000029664021619763792",
            "extra": "mean: 647.9126400012092 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2364.257681948059,
            "unit": "iter/sec",
            "range": "stddev: 0.00003257950496194131",
            "extra": "mean: 422.96574000175724 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2013.494399184294,
            "unit": "iter/sec",
            "range": "stddev: 0.0000889586911637333",
            "extra": "mean: 496.6490100022725 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 725.0252964958314,
            "unit": "iter/sec",
            "range": "stddev: 0.000036128022488754115",
            "extra": "mean: 1.3792622199986226 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 590.2714946663034,
            "unit": "iter/sec",
            "range": "stddev: 0.00009316677851005659",
            "extra": "mean: 1.6941356799981122 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 473.07924127427697,
            "unit": "iter/sec",
            "range": "stddev: 0.00007846676697293729",
            "extra": "mean: 2.113810780000449 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1775111582336,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 879698.757385583,
            "unit": "iter/sec",
            "range": "stddev: 4.5406069373968005e-7",
            "extra": "mean: 1.1367527708825527 usec\nrounds: 28601"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 432742.0556248384,
            "unit": "iter/sec",
            "range": "stddev: 0.0000029452393463358596",
            "extra": "mean: 2.3108454262807787 usec\nrounds: 23788"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70925.18116650719,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023144761977802126",
            "extra": "mean: 14.09936476090705 usec\nrounds: 17946"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66004.7758533728,
            "unit": "iter/sec",
            "range": "stddev: 0.000002180977566350015",
            "extra": "mean: 15.150418845773576 usec\nrounds: 24398"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64426.68508292776,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024649727023803563",
            "extra": "mean: 15.521518742006286 usec\nrounds: 23530"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59405.27100851825,
            "unit": "iter/sec",
            "range": "stddev: 0.000002358150146839779",
            "extra": "mean: 16.83352306997485 usec\nrounds: 24339"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1471.273286101002,
            "unit": "iter/sec",
            "range": "stddev: 0.0000440613964192421",
            "extra": "mean: 679.6833799994317 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2199.9746122935308,
            "unit": "iter/sec",
            "range": "stddev: 0.000028993030680571427",
            "extra": "mean: 454.55069999988496 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1897.0901084971524,
            "unit": "iter/sec",
            "range": "stddev: 0.00011120207456581775",
            "extra": "mean: 527.1230900002877 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3186.227950261367,
            "unit": "iter/sec",
            "range": "stddev: 0.000013459639605693857",
            "extra": "mean: 313.8507400005608 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2741.4300702867704,
            "unit": "iter/sec",
            "range": "stddev: 0.000032694186907011775",
            "extra": "mean: 364.7731199998816 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1806.49409697989,
            "unit": "iter/sec",
            "range": "stddev: 0.001339693605614819",
            "extra": "mean: 553.5584100007895 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 320.9794485012519,
            "unit": "iter/sec",
            "range": "stddev: 0.00007688204795935944",
            "extra": "mean: 3.1154642599994986 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2588.786242654043,
            "unit": "iter/sec",
            "range": "stddev: 0.000030375404873178708",
            "extra": "mean: 386.28140999961147 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 71.08719032843703,
            "unit": "iter/sec",
            "range": "stddev: 0.00022357571225771307",
            "extra": "mean: 14.067232019999665 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1643.3103514232512,
            "unit": "iter/sec",
            "range": "stddev: 0.000030099507687301837",
            "extra": "mean: 608.5277799984112 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 541.2493841395756,
            "unit": "iter/sec",
            "range": "stddev: 0.000046258651193557475",
            "extra": "mean: 1.8475771599993607 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 43.106578668172496,
            "unit": "iter/sec",
            "range": "stddev: 0.002683775652823546",
            "extra": "mean: 23.198315220000154 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1036.0528788953154,
            "unit": "iter/sec",
            "range": "stddev: 0.000027533037125831386",
            "extra": "mean: 965.2017000003354 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1606.0516282321566,
            "unit": "iter/sec",
            "range": "stddev: 0.00003552099290196601",
            "extra": "mean: 622.6449899999409 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2379.996359080692,
            "unit": "iter/sec",
            "range": "stddev: 0.000028372952575335714",
            "extra": "mean: 420.168710000155 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2145.222235047152,
            "unit": "iter/sec",
            "range": "stddev: 0.00006432042427501637",
            "extra": "mean: 466.15217000024245 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 752.4114901115889,
            "unit": "iter/sec",
            "range": "stddev: 0.000035625170340525104",
            "extra": "mean: 1.329059980000693 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 586.2586506568524,
            "unit": "iter/sec",
            "range": "stddev: 0.00011765127397739664",
            "extra": "mean: 1.7057317599997646 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 467.4898314885043,
            "unit": "iter/sec",
            "range": "stddev: 0.00007893600432277126",
            "extra": "mean: 2.1390839599996525 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1775197937954,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 815771.1528278938,
            "unit": "iter/sec",
            "range": "stddev: 3.9760032660089087e-7",
            "extra": "mean: 1.2258339811765488 usec\nrounds: 17751"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 497276.7201729516,
            "unit": "iter/sec",
            "range": "stddev: 5.609580860300402e-7",
            "extra": "mean: 2.010952774246505 usec\nrounds: 39110"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68133.12616128355,
            "unit": "iter/sec",
            "range": "stddev: 0.000005138771102424288",
            "extra": "mean: 14.677148346794148 usec\nrounds: 13610"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64761.80526677588,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024631748638318753",
            "extra": "mean: 15.441200193241372 usec\nrounds: 20695"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63994.97523708042,
            "unit": "iter/sec",
            "range": "stddev: 0.0000025305993652107554",
            "extra": "mean: 15.626226845081629 usec\nrounds: 15839"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59751.79246997344,
            "unit": "iter/sec",
            "range": "stddev: 0.000002691209222093698",
            "extra": "mean: 16.735899605062414 usec\nrounds: 18228"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1449.0978163339428,
            "unit": "iter/sec",
            "range": "stddev: 0.00003478500271684597",
            "extra": "mean: 690.0845400001288 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2064.178999326379,
            "unit": "iter/sec",
            "range": "stddev: 0.000033647701157379205",
            "extra": "mean: 484.45411000031413 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1911.440148967371,
            "unit": "iter/sec",
            "range": "stddev: 0.00014008851731884352",
            "extra": "mean: 523.1657399998824 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3101.343052122671,
            "unit": "iter/sec",
            "range": "stddev: 0.000014346566732361733",
            "extra": "mean: 322.44094999924755 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2678.1364465983334,
            "unit": "iter/sec",
            "range": "stddev: 0.000035242696096168255",
            "extra": "mean: 373.3939700011035 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1609.2820038653063,
            "unit": "iter/sec",
            "range": "stddev: 0.0020455583819132613",
            "extra": "mean: 621.3951300009057 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 317.0659618889581,
            "unit": "iter/sec",
            "range": "stddev: 0.00012060001214567637",
            "extra": "mean: 3.1539178600010587 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2467.5264269003223,
            "unit": "iter/sec",
            "range": "stddev: 0.00005059337457919914",
            "extra": "mean: 405.2641499998799 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 67.61562893936309,
            "unit": "iter/sec",
            "range": "stddev: 0.0005596222657274492",
            "extra": "mean: 14.789480119999894 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1598.301682992921,
            "unit": "iter/sec",
            "range": "stddev: 0.00003166305579815243",
            "extra": "mean: 625.6641099992066 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 544.9058549806284,
            "unit": "iter/sec",
            "range": "stddev: 0.00005601975968536532",
            "extra": "mean: 1.8351794000002997 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 40.51827335109077,
            "unit": "iter/sec",
            "range": "stddev: 0.004610077292126329",
            "extra": "mean: 24.680222459999754 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1001.0863889596644,
            "unit": "iter/sec",
            "range": "stddev: 0.000038239684757900926",
            "extra": "mean: 998.914790000498 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1573.391433431935,
            "unit": "iter/sec",
            "range": "stddev: 0.000035077995582852754",
            "extra": "mean: 635.5697500009683 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2280.3405524406708,
            "unit": "iter/sec",
            "range": "stddev: 0.00003474229464429055",
            "extra": "mean: 438.5309900004586 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2074.763910024169,
            "unit": "iter/sec",
            "range": "stddev: 0.00009695274527415793",
            "extra": "mean: 481.9825499993158 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 722.8125167018779,
            "unit": "iter/sec",
            "range": "stddev: 0.00004632882923769382",
            "extra": "mean: 1.3834846199992512 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 578.4109099587746,
            "unit": "iter/sec",
            "range": "stddev: 0.00013637970858775973",
            "extra": "mean: 1.7288747200001353 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 476.59104869733176,
            "unit": "iter/sec",
            "range": "stddev: 0.00008947413501847416",
            "extra": "mean: 2.0982349600004113 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1775284068776,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 900511.8540246296,
            "unit": "iter/sec",
            "range": "stddev: 3.5571872154089346e-7",
            "extra": "mean: 1.110479551746855 usec\nrounds: 23376"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 519739.80640830426,
            "unit": "iter/sec",
            "range": "stddev: 5.579639861965392e-7",
            "extra": "mean: 1.9240396592105675 usec\nrounds: 42134"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70616.84623638852,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024139613260370884",
            "extra": "mean: 14.160926935939894 usec\nrounds: 15548"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 67095.47688597193,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023219297908604716",
            "extra": "mean: 14.904134323383522 usec\nrounds: 23637"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 65760.27079268282,
            "unit": "iter/sec",
            "range": "stddev: 0.000002345698355338993",
            "extra": "mean: 15.206750032289566 usec\nrounds: 23235"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59544.13722101908,
            "unit": "iter/sec",
            "range": "stddev: 0.000003212277856127047",
            "extra": "mean: 16.79426466938545 usec\nrounds: 20161"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1410.9043463704954,
            "unit": "iter/sec",
            "range": "stddev: 0.00003731566333998578",
            "extra": "mean: 708.7652700003844 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2026.728659702724,
            "unit": "iter/sec",
            "range": "stddev: 0.00003468541169923633",
            "extra": "mean: 493.405959999933 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1825.0207682783227,
            "unit": "iter/sec",
            "range": "stddev: 0.00014118160843884693",
            "extra": "mean: 547.9389700005299 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3021.7209764518743,
            "unit": "iter/sec",
            "range": "stddev: 0.0000161162622255041",
            "extra": "mean: 330.9372400009636 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2578.657698300625,
            "unit": "iter/sec",
            "range": "stddev: 0.00003919984336431984",
            "extra": "mean: 387.7986600001293 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1598.2517938280369,
            "unit": "iter/sec",
            "range": "stddev: 0.0018786547393225372",
            "extra": "mean: 625.683640000716 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 328.72296525632197,
            "unit": "iter/sec",
            "range": "stddev: 0.0000919767059687909",
            "extra": "mean: 3.042075259999706 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2382.441860920573,
            "unit": "iter/sec",
            "range": "stddev: 0.000048912616417399216",
            "extra": "mean: 419.73741999882463 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.60193851573534,
            "unit": "iter/sec",
            "range": "stddev: 0.00021607174530423692",
            "extra": "mean: 14.163917039999205 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1604.4544018331012,
            "unit": "iter/sec",
            "range": "stddev: 0.00003880556735187638",
            "extra": "mean: 623.264829999215 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 553.4587892318367,
            "unit": "iter/sec",
            "range": "stddev: 0.00004406164617234401",
            "extra": "mean: 1.8068192599993438 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.7321979028818,
            "unit": "iter/sec",
            "range": "stddev: 0.003672586031993627",
            "extra": "mean: 23.401557820000676 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1017.9165839157884,
            "unit": "iter/sec",
            "range": "stddev: 0.00003392183601886065",
            "extra": "mean: 982.3987699985536 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1496.7991250053092,
            "unit": "iter/sec",
            "range": "stddev: 0.00003466603158291512",
            "extra": "mean: 668.0923200008237 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2278.8826902519595,
            "unit": "iter/sec",
            "range": "stddev: 0.000033628802868933626",
            "extra": "mean: 438.8115300000095 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2008.0002746959087,
            "unit": "iter/sec",
            "range": "stddev: 0.00009027024283961078",
            "extra": "mean: 498.00789999963513 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 718.5952532066912,
            "unit": "iter/sec",
            "range": "stddev: 0.00003729764689607221",
            "extra": "mean: 1.3916039600005092 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 592.1382655164438,
            "unit": "iter/sec",
            "range": "stddev: 0.00010805599823577175",
            "extra": "mean: 1.688794760000576 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 469.1654694813615,
            "unit": "iter/sec",
            "range": "stddev: 0.00006775674158769897",
            "extra": "mean: 2.131444160000626 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1775370740327,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 902395.2463798986,
            "unit": "iter/sec",
            "range": "stddev: 3.8823237847655707e-7",
            "extra": "mean: 1.108161865891535 usec\nrounds: 28641"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 511682.6347796884,
            "unit": "iter/sec",
            "range": "stddev: 5.19168446591522e-7",
            "extra": "mean: 1.954336403131138 usec\nrounds: 43760"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 72093.74460039707,
            "unit": "iter/sec",
            "range": "stddev: 0.000002626061606195991",
            "extra": "mean: 13.870828953924143 usec\nrounds: 18001"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 67737.34668956416,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021645893795925746",
            "extra": "mean: 14.762904791398677 usec\nrounds: 22603"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 66706.35401107516,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023750876859011995",
            "extra": "mean: 14.99107566025826 usec\nrounds: 23513"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 61524.712328924375,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022336542073653947",
            "extra": "mean: 16.253631462001554 usec\nrounds: 23851"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1422.4318874192925,
            "unit": "iter/sec",
            "range": "stddev: 0.00003573487955249383",
            "extra": "mean: 703.0213599993829 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2084.3306855661294,
            "unit": "iter/sec",
            "range": "stddev: 0.000035431479254733616",
            "extra": "mean: 479.7703200000569 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1885.6316864267599,
            "unit": "iter/sec",
            "range": "stddev: 0.00011511473748163526",
            "extra": "mean: 530.3262599998959 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3116.7270376744923,
            "unit": "iter/sec",
            "range": "stddev: 0.000025248591753164508",
            "extra": "mean: 320.8493999994744 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2649.9370838665322,
            "unit": "iter/sec",
            "range": "stddev: 0.000026147806172418483",
            "extra": "mean: 377.367450000321 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1733.1276341925404,
            "unit": "iter/sec",
            "range": "stddev: 0.001420417012345804",
            "extra": "mean: 576.9915499996614 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 332.5338819770407,
            "unit": "iter/sec",
            "range": "stddev: 0.0000623729941885654",
            "extra": "mean: 3.007212359999585 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2502.558302793782,
            "unit": "iter/sec",
            "range": "stddev: 0.000017591785808417232",
            "extra": "mean: 399.5910899992339 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 72.09163236345732,
            "unit": "iter/sec",
            "range": "stddev: 0.00017405666953519163",
            "extra": "mean: 13.87123535999848 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1617.6199969913137,
            "unit": "iter/sec",
            "range": "stddev: 0.000018393701334730506",
            "extra": "mean: 618.1921600004614 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 543.3290402730637,
            "unit": "iter/sec",
            "range": "stddev: 0.000058922174384849994",
            "extra": "mean: 1.8405053400006466 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 43.21202892903711,
            "unit": "iter/sec",
            "range": "stddev: 0.0029635557529118822",
            "extra": "mean: 23.141704399999412 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1008.4972854936069,
            "unit": "iter/sec",
            "range": "stddev: 0.000030804375176279446",
            "extra": "mean: 991.5743099998055 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1487.147690436107,
            "unit": "iter/sec",
            "range": "stddev: 0.000043092218866773074",
            "extra": "mean: 672.4281700002166 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2118.6787207661055,
            "unit": "iter/sec",
            "range": "stddev: 0.000035912086351657044",
            "extra": "mean: 471.99227999911386 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2005.0261594764602,
            "unit": "iter/sec",
            "range": "stddev: 0.0000748968180010302",
            "extra": "mean: 498.7466099998982 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 706.5441004832395,
            "unit": "iter/sec",
            "range": "stddev: 0.00004284615247795788",
            "extra": "mean: 1.4153398199999856 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 582.9069009897964,
            "unit": "iter/sec",
            "range": "stddev: 0.0000951286200318651",
            "extra": "mean: 1.7155398199986394 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 463.4508780394204,
            "unit": "iter/sec",
            "range": "stddev: 0.0000828505959597688",
            "extra": "mean: 2.157725980001146 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1775457896233,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 886923.1009444068,
            "unit": "iter/sec",
            "range": "stddev: 3.502417543751815e-7",
            "extra": "mean: 1.1274934646929227 usec\nrounds: 26089"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 514029.22807266377,
            "unit": "iter/sec",
            "range": "stddev: 5.347346540326742e-7",
            "extra": "mean: 1.945414667857445 usec\nrounds: 42692"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 66938.44435557729,
            "unit": "iter/sec",
            "range": "stddev: 0.0000032595432655009925",
            "extra": "mean: 14.939098295861134 usec\nrounds: 16959"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64799.78881560673,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027624469588386904",
            "extra": "mean: 15.43214905909006 usec\nrounds: 24393"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 61366.21046244523,
            "unit": "iter/sec",
            "range": "stddev: 0.0000040744311218401026",
            "extra": "mean: 16.29561272342176 usec\nrounds: 22054"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 57654.65497828271,
            "unit": "iter/sec",
            "range": "stddev: 0.000002377638576785251",
            "extra": "mean: 17.34465327000359 usec\nrounds: 23165"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1382.0849614072163,
            "unit": "iter/sec",
            "range": "stddev: 0.000029049507347783962",
            "extra": "mean: 723.5445199995638 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2070.8998233730445,
            "unit": "iter/sec",
            "range": "stddev: 0.00003242665077608447",
            "extra": "mean: 482.8818799990131 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1785.7566017678914,
            "unit": "iter/sec",
            "range": "stddev: 0.00012502986506091168",
            "extra": "mean: 559.9867300000483 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3025.656904910894,
            "unit": "iter/sec",
            "range": "stddev: 0.000014343165471079548",
            "extra": "mean: 330.5067399998052 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2601.5942725874775,
            "unit": "iter/sec",
            "range": "stddev: 0.000033929063856658656",
            "extra": "mean: 384.37968999886607 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1741.6373930786442,
            "unit": "iter/sec",
            "range": "stddev: 0.0014505603358461183",
            "extra": "mean: 574.1723300005219 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 324.5528228446198,
            "unit": "iter/sec",
            "range": "stddev: 0.00006644388565347524",
            "extra": "mean: 3.0811625399996956 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2462.033595429492,
            "unit": "iter/sec",
            "range": "stddev: 0.000028660012380052035",
            "extra": "mean: 406.16830000061555 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.18549812385594,
            "unit": "iter/sec",
            "range": "stddev: 0.00020448115711654117",
            "extra": "mean: 14.247957580001867 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1635.8015987282959,
            "unit": "iter/sec",
            "range": "stddev: 0.00003720133313207326",
            "extra": "mean: 611.3210799998114 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 545.7286768755223,
            "unit": "iter/sec",
            "range": "stddev: 0.00003670135300170162",
            "extra": "mean: 1.8324124100007566 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.8490158067338,
            "unit": "iter/sec",
            "range": "stddev: 0.0030994101141810803",
            "extra": "mean: 23.337758900003678 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 980.5336901719326,
            "unit": "iter/sec",
            "range": "stddev: 0.00013428895070019808",
            "extra": "mean: 1.0198527699998294 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1516.4089398252859,
            "unit": "iter/sec",
            "range": "stddev: 0.00001677321876197337",
            "extra": "mean: 659.4527199999334 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2276.8494050835093,
            "unit": "iter/sec",
            "range": "stddev: 0.00003463030987930525",
            "extra": "mean: 439.2033999997125 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2005.5119088217057,
            "unit": "iter/sec",
            "range": "stddev: 0.00007155805911555386",
            "extra": "mean: 498.62580999956657 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 725.1986591074302,
            "unit": "iter/sec",
            "range": "stddev: 0.00004813548804517637",
            "extra": "mean: 1.3789325000004737 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 589.8293043425458,
            "unit": "iter/sec",
            "range": "stddev: 0.00012034499995574635",
            "extra": "mean: 1.6954057600014494 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 475.2982192127685,
            "unit": "iter/sec",
            "range": "stddev: 0.00009066852535772602",
            "extra": "mean: 2.103942240003107 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1775543847458,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 892665.9866036553,
            "unit": "iter/sec",
            "range": "stddev: 4.4997256541486386e-7",
            "extra": "mean: 1.1202398377524394 usec\nrounds: 20222"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 520794.2148537538,
            "unit": "iter/sec",
            "range": "stddev: 4.839274637878643e-7",
            "extra": "mean: 1.9201442171949124 usec\nrounds: 39704"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67306.11499073723,
            "unit": "iter/sec",
            "range": "stddev: 0.000003987248443907344",
            "extra": "mean: 14.857491033877405 usec\nrounds: 14276"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65592.17974860976,
            "unit": "iter/sec",
            "range": "stddev: 0.000002465328091101769",
            "extra": "mean: 15.24571989881454 usec\nrounds: 15423"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64413.098780103945,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027577189102078264",
            "extra": "mean: 15.524792611109127 usec\nrounds: 14779"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59055.57135422956,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027953905234874234",
            "extra": "mean: 16.933203372155333 usec\nrounds: 16310"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1391.9126644959533,
            "unit": "iter/sec",
            "range": "stddev: 0.00003605213907666223",
            "extra": "mean: 718.4358799997881 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2085.353736992794,
            "unit": "iter/sec",
            "range": "stddev: 0.00003338095213830158",
            "extra": "mean: 479.53494999944724 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1767.675785633311,
            "unit": "iter/sec",
            "range": "stddev: 0.00017012596275906735",
            "extra": "mean: 565.7146000004332 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2981.46082934285,
            "unit": "iter/sec",
            "range": "stddev: 0.00001727862781176714",
            "extra": "mean: 335.406050000131 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2543.8855878329214,
            "unit": "iter/sec",
            "range": "stddev: 0.000038455056533226055",
            "extra": "mean: 393.09943999953134 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1481.053731223011,
            "unit": "iter/sec",
            "range": "stddev: 0.0023785564284223323",
            "extra": "mean: 675.1949499997068 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 307.75373533788104,
            "unit": "iter/sec",
            "range": "stddev: 0.00009566261342760242",
            "extra": "mean: 3.2493513000000007 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2400.516648795326,
            "unit": "iter/sec",
            "range": "stddev: 0.000030977594112426964",
            "extra": "mean: 416.5769899999816 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 67.31384775777357,
            "unit": "iter/sec",
            "range": "stddev: 0.00024866077520447884",
            "extra": "mean: 14.855784260000462 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1580.2083580551684,
            "unit": "iter/sec",
            "range": "stddev: 0.00006479573096318555",
            "extra": "mean: 632.8279400007375 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 520.9180286360719,
            "unit": "iter/sec",
            "range": "stddev: 0.00006613311692188293",
            "extra": "mean: 1.9196878299995035 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 40.139743917392586,
            "unit": "iter/sec",
            "range": "stddev: 0.004078190605235154",
            "extra": "mean: 24.912964120000254 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1002.3061862568446,
            "unit": "iter/sec",
            "range": "stddev: 0.00004167546123086304",
            "extra": "mean: 997.6991200009878 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1501.403098730764,
            "unit": "iter/sec",
            "range": "stddev: 0.00003428029987696471",
            "extra": "mean: 666.0436500000344 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2216.3583782350297,
            "unit": "iter/sec",
            "range": "stddev: 0.00003933103536086949",
            "extra": "mean: 451.19056999993745 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1984.212139898329,
            "unit": "iter/sec",
            "range": "stddev: 0.0000994117412870223",
            "extra": "mean: 503.9783699999134 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 711.5147607083383,
            "unit": "iter/sec",
            "range": "stddev: 0.000042609508315402883",
            "extra": "mean: 1.4054522199995745 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 578.262357006706,
            "unit": "iter/sec",
            "range": "stddev: 0.0001271806519458143",
            "extra": "mean: 1.7293188600004328 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 466.0242286554205,
            "unit": "iter/sec",
            "range": "stddev: 0.00011217374253282082",
            "extra": "mean: 2.145811180000692 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1775630336551,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 881414.5501053971,
            "unit": "iter/sec",
            "range": "stddev: 4.3449510560219967e-7",
            "extra": "mean: 1.1345399277563808 usec\nrounds: 25759"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 530572.3736539128,
            "unit": "iter/sec",
            "range": "stddev: 4.906552257199651e-7",
            "extra": "mean: 1.8847570089510355 usec\nrounds: 45870"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67246.30891410162,
            "unit": "iter/sec",
            "range": "stddev: 0.0000037101024144097856",
            "extra": "mean: 14.870704669863285 usec\nrounds: 16981"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66257.326831057,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023065005592971793",
            "extra": "mean: 15.092670468728706 usec\nrounds: 24110"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63555.2061630816,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023269117946110838",
            "extra": "mean: 15.73435223282915 usec\nrounds: 21923"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58480.39369531316,
            "unit": "iter/sec",
            "range": "stddev: 0.000002509030401187183",
            "extra": "mean: 17.099748083264764 usec\nrounds: 22956"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1430.565411950754,
            "unit": "iter/sec",
            "range": "stddev: 0.00003132866665911165",
            "extra": "mean: 699.0243100008797 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2117.58509578745,
            "unit": "iter/sec",
            "range": "stddev: 0.00003894706054729723",
            "extra": "mean: 472.23604000109276 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1895.872465723019,
            "unit": "iter/sec",
            "range": "stddev: 0.00013953527572840908",
            "extra": "mean: 527.4616399994159 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2900.8728523392874,
            "unit": "iter/sec",
            "range": "stddev: 0.000031588461768245884",
            "extra": "mean: 344.72382999950923 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2715.6270323155914,
            "unit": "iter/sec",
            "range": "stddev: 0.000022428789327680318",
            "extra": "mean: 368.2390799988866 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1618.3016975601158,
            "unit": "iter/sec",
            "range": "stddev: 0.001718506673123374",
            "extra": "mean: 617.931749999201 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 307.54919795311395,
            "unit": "iter/sec",
            "range": "stddev: 0.00007820422891484583",
            "extra": "mean: 3.251512300001025 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2473.427963385471,
            "unit": "iter/sec",
            "range": "stddev: 0.000020878960038245975",
            "extra": "mean: 404.2972000006273 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 68.08638972161164,
            "unit": "iter/sec",
            "range": "stddev: 0.0002115947415029106",
            "extra": "mean: 14.687223159999405 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1526.1914755568562,
            "unit": "iter/sec",
            "range": "stddev: 0.00002774959321184288",
            "extra": "mean: 655.2257799992844 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 534.5831402460236,
            "unit": "iter/sec",
            "range": "stddev: 0.00006237371807678801",
            "extra": "mean: 1.87061642000117 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.82040537719812,
            "unit": "iter/sec",
            "range": "stddev: 0.0030968435428691443",
            "extra": "mean: 23.911772040001154 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1019.7042551752693,
            "unit": "iter/sec",
            "range": "stddev: 0.000030216345751519673",
            "extra": "mean: 980.6764999996177 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1535.6610361203288,
            "unit": "iter/sec",
            "range": "stddev: 0.000019295676980064245",
            "extra": "mean: 651.1853699996095 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2285.255980892871,
            "unit": "iter/sec",
            "range": "stddev: 0.000037054611975120856",
            "extra": "mean: 437.58773999982736 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2045.5037026328514,
            "unit": "iter/sec",
            "range": "stddev: 0.00007242846598066588",
            "extra": "mean: 488.877139998749 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 704.3721690674743,
            "unit": "iter/sec",
            "range": "stddev: 0.00003498590551312921",
            "extra": "mean: 1.419704019998278 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 588.446380219339,
            "unit": "iter/sec",
            "range": "stddev: 0.00009108774794218242",
            "extra": "mean: 1.6993901799978062 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 470.7983864009082,
            "unit": "iter/sec",
            "range": "stddev: 0.00009368910344598614",
            "extra": "mean: 2.1240514599989524 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1775716744216,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 890019.5121041663,
            "unit": "iter/sec",
            "range": "stddev: 3.443885675054992e-7",
            "extra": "mean: 1.1235708727731373 usec\nrounds: 23902"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 511648.81910058606,
            "unit": "iter/sec",
            "range": "stddev: 5.163340323384658e-7",
            "extra": "mean: 1.9544655683128 usec\nrounds: 41212"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70996.24544539046,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024322310852494247",
            "extra": "mean: 14.085251885174534 usec\nrounds: 16444"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64689.77595523255,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023645126702030406",
            "extra": "mean: 15.458393312291465 usec\nrounds: 22280"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 61737.36990197944,
            "unit": "iter/sec",
            "range": "stddev: 0.0000029468812089014215",
            "extra": "mean: 16.19764498532578 usec\nrounds: 12284"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59614.06694216052,
            "unit": "iter/sec",
            "range": "stddev: 0.00000444641543676485",
            "extra": "mean: 16.77456431500022 usec\nrounds: 22211"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1372.1532314248097,
            "unit": "iter/sec",
            "range": "stddev: 0.00004482209187841589",
            "extra": "mean: 728.7815800000885 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2068.8092151361843,
            "unit": "iter/sec",
            "range": "stddev: 0.00003958301835584142",
            "extra": "mean: 483.3698500004857 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1876.7110443792,
            "unit": "iter/sec",
            "range": "stddev: 0.000045729999947559104",
            "extra": "mean: 532.8470799993568 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3010.340731127644,
            "unit": "iter/sec",
            "range": "stddev: 0.000028689615939860906",
            "extra": "mean: 332.1883100008449 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2625.746956081748,
            "unit": "iter/sec",
            "range": "stddev: 0.0000249570833780632",
            "extra": "mean: 380.84401000020307 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1740.2914361663677,
            "unit": "iter/sec",
            "range": "stddev: 0.0014833617749981372",
            "extra": "mean: 574.6163999995701 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 325.9018032056459,
            "unit": "iter/sec",
            "range": "stddev: 0.00007869722704812833",
            "extra": "mean: 3.068408919999115 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2488.6543492538594,
            "unit": "iter/sec",
            "range": "stddev: 0.00002696637734823806",
            "extra": "mean: 401.823580000098 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.1136945238757,
            "unit": "iter/sec",
            "range": "stddev: 0.00023484692687731582",
            "extra": "mean: 14.468912520000572 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1629.422017128465,
            "unit": "iter/sec",
            "range": "stddev: 0.000028407972650829308",
            "extra": "mean: 613.7145499987184 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 535.7088291373699,
            "unit": "iter/sec",
            "range": "stddev: 0.00006409883984942488",
            "extra": "mean: 1.8666856799994491 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.483911231648435,
            "unit": "iter/sec",
            "range": "stddev: 0.00352351902090956",
            "extra": "mean: 24.105730880001772 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1009.8957564392878,
            "unit": "iter/sec",
            "range": "stddev: 0.00003792575335389511",
            "extra": "mean: 990.2012099999523 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1521.6015379610576,
            "unit": "iter/sec",
            "range": "stddev: 0.000027075017416718198",
            "extra": "mean: 657.2022800003197 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2260.704231072748,
            "unit": "iter/sec",
            "range": "stddev: 0.000036426524820246066",
            "extra": "mean: 442.3400399996069 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2019.5417320504584,
            "unit": "iter/sec",
            "range": "stddev: 0.00009914526262661602",
            "extra": "mean: 495.16184000054864 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 736.5635415835562,
            "unit": "iter/sec",
            "range": "stddev: 0.00005189407799985834",
            "extra": "mean: 1.3576561200002857 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 566.6984013991625,
            "unit": "iter/sec",
            "range": "stddev: 0.00021779639191829326",
            "extra": "mean: 1.7646070600005714 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 468.9938372242809,
            "unit": "iter/sec",
            "range": "stddev: 0.00009975356742932959",
            "extra": "mean: 2.1322241799987296 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1775803410564,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 875359.3100096122,
            "unit": "iter/sec",
            "range": "stddev: 3.2639505475771387e-7",
            "extra": "mean: 1.142388032622877 usec\nrounds: 19269"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 487259.0010774742,
            "unit": "iter/sec",
            "range": "stddev: 6.135197621644356e-7",
            "extra": "mean: 2.0522966179972117 usec\nrounds: 39593"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 71073.59658134799,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016230010129036351",
            "extra": "mean: 14.069922560559322 usec\nrounds: 15341"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65495.68940575761,
            "unit": "iter/sec",
            "range": "stddev: 0.000001572971395607539",
            "extra": "mean: 15.268180380617412 usec\nrounds: 21000"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 65758.66865799385,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017541367652124053",
            "extra": "mean: 15.20712052734718 usec\nrounds: 11682"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 61494.18900836402,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017202620270644055",
            "extra": "mean: 16.26169913166896 usec\nrounds: 18420"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1772.102199115089,
            "unit": "iter/sec",
            "range": "stddev: 0.000041754180316461605",
            "extra": "mean: 564.3015400011109 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2191.221358057372,
            "unit": "iter/sec",
            "range": "stddev: 0.000029750487800626035",
            "extra": "mean: 456.3664900047115 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2254.421777806058,
            "unit": "iter/sec",
            "range": "stddev: 0.000030719168346701856",
            "extra": "mean: 443.5727199961548 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3605.3799190865698,
            "unit": "iter/sec",
            "range": "stddev: 0.00001793265213197748",
            "extra": "mean: 277.36327999889454 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2908.602094685168,
            "unit": "iter/sec",
            "range": "stddev: 0.000030183830501288555",
            "extra": "mean: 343.8077700030817 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1757.9995484033263,
            "unit": "iter/sec",
            "range": "stddev: 0.0017311388186901512",
            "extra": "mean: 568.8283600005661 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 333.63630178637555,
            "unit": "iter/sec",
            "range": "stddev: 0.0001576913015476328",
            "extra": "mean: 2.9972757599989563 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3038.191833500049,
            "unit": "iter/sec",
            "range": "stddev: 0.00004905542496845399",
            "extra": "mean: 329.1431399998146 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 81.09040042824553,
            "unit": "iter/sec",
            "range": "stddev: 0.00018290178121360175",
            "extra": "mean: 12.331915919996845 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1849.5017174200843,
            "unit": "iter/sec",
            "range": "stddev: 0.000025442223890791494",
            "extra": "mean: 540.6861699998444 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 624.2164133326584,
            "unit": "iter/sec",
            "range": "stddev: 0.000043600952768226655",
            "extra": "mean: 1.602008500002512 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 48.637865591780105,
            "unit": "iter/sec",
            "range": "stddev: 0.003665877208368187",
            "extra": "mean: 20.560112740000704 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1170.7345125110191,
            "unit": "iter/sec",
            "range": "stddev: 0.00014662348767658178",
            "extra": "mean: 854.1646200001196 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1874.3541678435,
            "unit": "iter/sec",
            "range": "stddev: 0.00004171042912574149",
            "extra": "mean: 533.5170999995853 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2792.2609249454654,
            "unit": "iter/sec",
            "range": "stddev: 0.000022633400839368193",
            "extra": "mean: 358.1327199998441 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2393.72495536908,
            "unit": "iter/sec",
            "range": "stddev: 0.00010364554468127295",
            "extra": "mean: 417.7589399972703 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 883.1636334442679,
            "unit": "iter/sec",
            "range": "stddev: 0.000053373688906604416",
            "extra": "mean: 1.1322929999960252 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 645.9253825452892,
            "unit": "iter/sec",
            "range": "stddev: 0.00012321991524108012",
            "extra": "mean: 1.5481664399987949 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 519.6595793231792,
            "unit": "iter/sec",
            "range": "stddev: 0.00009878013645829647",
            "extra": "mean: 1.9243367000035505 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1775888908820,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 872808.872823358,
            "unit": "iter/sec",
            "range": "stddev: 3.800523909370987e-7",
            "extra": "mean: 1.1457262078067614 usec\nrounds: 22623"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 499914.62286496896,
            "unit": "iter/sec",
            "range": "stddev: 5.425913636446211e-7",
            "extra": "mean: 2.0003415668641247 usec\nrounds: 39878"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 64869.25399637163,
            "unit": "iter/sec",
            "range": "stddev: 0.000004613278977716381",
            "extra": "mean: 15.41562355651467 usec\nrounds: 11343"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64202.251358724796,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022213825366044023",
            "extra": "mean: 15.575777777831844 usec\nrounds: 24291"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 61648.894101154976,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023006083816712616",
            "extra": "mean: 16.220891138114762 usec\nrounds: 22726"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59063.60023608245,
            "unit": "iter/sec",
            "range": "stddev: 0.0000025712658299984107",
            "extra": "mean: 16.93090153669792 usec\nrounds: 22516"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1446.089313195877,
            "unit": "iter/sec",
            "range": "stddev: 0.000047850483297574234",
            "extra": "mean: 691.5202199994042 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2102.629780088596,
            "unit": "iter/sec",
            "range": "stddev: 0.00003551350575794462",
            "extra": "mean: 475.5949000008286 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1990.7027413608002,
            "unit": "iter/sec",
            "range": "stddev: 0.000028859697039644028",
            "extra": "mean: 502.335169999526 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3083.1050345669955,
            "unit": "iter/sec",
            "range": "stddev: 0.000014515919619274537",
            "extra": "mean: 324.3483399975844 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2726.348098724912,
            "unit": "iter/sec",
            "range": "stddev: 0.00002332667145974139",
            "extra": "mean: 366.79101999766317 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1705.5869673519892,
            "unit": "iter/sec",
            "range": "stddev: 0.0015302690893469351",
            "extra": "mean: 586.3084199995683 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 316.19745893873994,
            "unit": "iter/sec",
            "range": "stddev: 0.00043300558614668135",
            "extra": "mean: 3.1625807599982636 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2531.108077600641,
            "unit": "iter/sec",
            "range": "stddev: 0.000019135315268359584",
            "extra": "mean: 395.08388000086825 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 71.1414057903021,
            "unit": "iter/sec",
            "range": "stddev: 0.0003484688105374335",
            "extra": "mean: 14.056511659997568 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1631.5835681840408,
            "unit": "iter/sec",
            "range": "stddev: 0.00003058283901749123",
            "extra": "mean: 612.9014900002971 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 542.4546754307196,
            "unit": "iter/sec",
            "range": "stddev: 0.000048949164822388175",
            "extra": "mean: 1.8434719899980223 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.271091814561274,
            "unit": "iter/sec",
            "range": "stddev: 0.0038911415796045786",
            "extra": "mean: 23.656829219999622 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1021.886927497564,
            "unit": "iter/sec",
            "range": "stddev: 0.000032999664204287505",
            "extra": "mean: 978.5818499986477 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1555.2988932223193,
            "unit": "iter/sec",
            "range": "stddev: 0.000029303225993413626",
            "extra": "mean: 642.9632299989407 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2357.0487082015443,
            "unit": "iter/sec",
            "range": "stddev: 0.00002545624810190549",
            "extra": "mean: 424.2593699996178 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2022.2320552175656,
            "unit": "iter/sec",
            "range": "stddev: 0.00009207752648343815",
            "extra": "mean: 494.50308999894327 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 725.7879498734999,
            "unit": "iter/sec",
            "range": "stddev: 0.00004491203880279305",
            "extra": "mean: 1.3778128999996397 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 587.812850311235,
            "unit": "iter/sec",
            "range": "stddev: 0.00011068615509352565",
            "extra": "mean: 1.701221739998573 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 470.10221818004186,
            "unit": "iter/sec",
            "range": "stddev: 0.0000855199285713863",
            "extra": "mean: 2.127196940000431 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1775975902508,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 777102.6499932437,
            "unit": "iter/sec",
            "range": "stddev: 5.666628853340887e-7",
            "extra": "mean: 1.2868312828539372 usec\nrounds: 20075"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 463376.44155952695,
            "unit": "iter/sec",
            "range": "stddev: 6.947468845062012e-7",
            "extra": "mean: 2.1580725956512326 usec\nrounds: 26806"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69536.74727673775,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015881698197618786",
            "extra": "mean: 14.380885490951513 usec\nrounds: 14977"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66087.35214123192,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014230011834631243",
            "extra": "mean: 15.13148836501954 usec\nrounds: 16502"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 66046.80031956389,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015970500447452545",
            "extra": "mean: 15.140778889538232 usec\nrounds: 18588"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 60737.92321449324,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014775863998332961",
            "extra": "mean: 16.464178343216396 usec\nrounds: 19726"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1644.0297741069887,
            "unit": "iter/sec",
            "range": "stddev: 0.000053341560135169465",
            "extra": "mean: 608.2614899983696 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2560.7765094004,
            "unit": "iter/sec",
            "range": "stddev: 0.00003128690789475308",
            "extra": "mean: 390.5065499972693 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1980.395902534158,
            "unit": "iter/sec",
            "range": "stddev: 0.00006910084561962761",
            "extra": "mean: 504.94953999873366 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3632.1674923231567,
            "unit": "iter/sec",
            "range": "stddev: 0.000018746839534603142",
            "extra": "mean: 275.31769999967537 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2963.3863540465863,
            "unit": "iter/sec",
            "range": "stddev: 0.00002607951263865569",
            "extra": "mean: 337.4517799997534 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1798.0679112934965,
            "unit": "iter/sec",
            "range": "stddev: 0.0020872599073016597",
            "extra": "mean: 556.1525200016604 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 340.28385335714194,
            "unit": "iter/sec",
            "range": "stddev: 0.00008840802197020216",
            "extra": "mean: 2.9387230399981945 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2951.0166355408483,
            "unit": "iter/sec",
            "range": "stddev: 0.00008271653150240333",
            "extra": "mean: 338.86627000214276 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 80.40957265542363,
            "unit": "iter/sec",
            "range": "stddev: 0.00020644739739923284",
            "extra": "mean: 12.436330239998483 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1956.3354534657444,
            "unit": "iter/sec",
            "range": "stddev: 0.000040475393328892644",
            "extra": "mean: 511.1597800001277 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 630.0452090832591,
            "unit": "iter/sec",
            "range": "stddev: 0.000034794546387597695",
            "extra": "mean: 1.5871876899993254 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 47.83392091741054,
            "unit": "iter/sec",
            "range": "stddev: 0.00406419031032588",
            "extra": "mean: 20.905666539997583 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1196.4121609281124,
            "unit": "iter/sec",
            "range": "stddev: 0.000052286337089609",
            "extra": "mean: 835.8323599989603 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1757.6462754087768,
            "unit": "iter/sec",
            "range": "stddev: 0.00003752842572732346",
            "extra": "mean: 568.9426900002559 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2432.108423009748,
            "unit": "iter/sec",
            "range": "stddev: 0.00004735097640903951",
            "extra": "mean: 411.16587999908916 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2070.6851998836,
            "unit": "iter/sec",
            "range": "stddev: 0.00011251919767538295",
            "extra": "mean: 482.93192999892653 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 846.0367585713483,
            "unit": "iter/sec",
            "range": "stddev: 0.0000453120410887764",
            "extra": "mean: 1.1819817399998556 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 702.547668281099,
            "unit": "iter/sec",
            "range": "stddev: 0.00011854031054131377",
            "extra": "mean: 1.4233909599994377 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 526.6800136512696,
            "unit": "iter/sec",
            "range": "stddev: 0.00018891573201716024",
            "extra": "mean: 1.898686059999477 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1776063126328,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 882908.4499752349,
            "unit": "iter/sec",
            "range": "stddev: 3.5401061856516394e-7",
            "extra": "mean: 1.1326202620759256 usec\nrounds: 22821"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 517639.28365265107,
            "unit": "iter/sec",
            "range": "stddev: 6.488701386668595e-7",
            "extra": "mean: 1.9318471985812906 usec\nrounds: 39391"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69763.11900324206,
            "unit": "iter/sec",
            "range": "stddev: 0.000003258199448627559",
            "extra": "mean: 14.334221495365304 usec\nrounds: 16050"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65427.654332130915,
            "unit": "iter/sec",
            "range": "stddev: 0.000002309406010756152",
            "extra": "mean: 15.284057027685757 usec\nrounds: 19587"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62495.168785545284,
            "unit": "iter/sec",
            "range": "stddev: 0.0000029317257205993922",
            "extra": "mean: 16.001236886511034 usec\nrounds: 20132"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 57732.879345168876,
            "unit": "iter/sec",
            "range": "stddev: 0.00000472576323055238",
            "extra": "mean: 17.321152371792813 usec\nrounds: 21756"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1423.374424208442,
            "unit": "iter/sec",
            "range": "stddev: 0.00004112958747172107",
            "extra": "mean: 702.5558299996248 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2075.2765907929615,
            "unit": "iter/sec",
            "range": "stddev: 0.00004636159171230342",
            "extra": "mean: 481.8634799990207 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1915.5939133229806,
            "unit": "iter/sec",
            "range": "stddev: 0.00003144609652747526",
            "extra": "mean: 522.0313099999885 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2888.2714919765644,
            "unit": "iter/sec",
            "range": "stddev: 0.00006540726369470548",
            "extra": "mean: 346.22783999978424 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2708.604972552954,
            "unit": "iter/sec",
            "range": "stddev: 0.000028558245855542196",
            "extra": "mean: 369.1937400002132 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1698.8803546010488,
            "unit": "iter/sec",
            "range": "stddev: 0.0014672164775970057",
            "extra": "mean: 588.6229700000456 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 319.55683551282664,
            "unit": "iter/sec",
            "range": "stddev: 0.00008658984386309681",
            "extra": "mean: 3.129333779999399 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2553.4072577128804,
            "unit": "iter/sec",
            "range": "stddev: 0.00002351079303081924",
            "extra": "mean: 391.6335699992146 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.86890028469823,
            "unit": "iter/sec",
            "range": "stddev: 0.00025394302937347015",
            "extra": "mean: 14.110561839999605 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1621.9944786960114,
            "unit": "iter/sec",
            "range": "stddev: 0.0000277719103916093",
            "extra": "mean: 616.5249100008907 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 544.3179097024828,
            "unit": "iter/sec",
            "range": "stddev: 0.000050436309060107065",
            "extra": "mean: 1.8371616700001425 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.96256037385484,
            "unit": "iter/sec",
            "range": "stddev: 0.0035032234576283443",
            "extra": "mean: 23.276080180001486 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1025.3960558941071,
            "unit": "iter/sec",
            "range": "stddev: 0.000031321982965375756",
            "extra": "mean: 975.2329299999474 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1559.1427758200882,
            "unit": "iter/sec",
            "range": "stddev: 0.00003879876185605261",
            "extra": "mean: 641.3780799991287 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2264.8582800064933,
            "unit": "iter/sec",
            "range": "stddev: 0.00003491812296107128",
            "extra": "mean: 441.5287299994475 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2055.8081184386137,
            "unit": "iter/sec",
            "range": "stddev: 0.0000987093108964542",
            "extra": "mean: 486.42671999928666 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 700.3596921316407,
            "unit": "iter/sec",
            "range": "stddev: 0.00015420762179645431",
            "extra": "mean: 1.427837739999518 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 583.2655151078283,
            "unit": "iter/sec",
            "range": "stddev: 0.00010442047604069964",
            "extra": "mean: 1.7144850399995448 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 472.3572788776218,
            "unit": "iter/sec",
            "range": "stddev: 0.00009058062919383304",
            "extra": "mean: 2.117041580000887 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1776149028286,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 883873.8151820845,
            "unit": "iter/sec",
            "range": "stddev: 3.060879506322813e-7",
            "extra": "mean: 1.1313832164990572 usec\nrounds: 18256"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 509863.5577396628,
            "unit": "iter/sec",
            "range": "stddev: 3.3120160873847976e-7",
            "extra": "mean: 1.9613090302692346 usec\nrounds: 30243"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 72873.89684961145,
            "unit": "iter/sec",
            "range": "stddev: 0.00000265158987760249",
            "extra": "mean: 13.72233465247072 usec\nrounds: 13644"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 69958.98170747988,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013541565251697607",
            "extra": "mean: 14.294090273945226 usec\nrounds: 15320"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 69394.19448601404,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012143780760147124",
            "extra": "mean: 14.410427376623613 usec\nrounds: 14947"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 64855.62658338378,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010940595040455868",
            "extra": "mean: 15.418862675149963 usec\nrounds: 18205"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1779.1060187947583,
            "unit": "iter/sec",
            "range": "stddev: 0.00004360569234896568",
            "extra": "mean: 562.0800500003043 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2697.9673325292238,
            "unit": "iter/sec",
            "range": "stddev: 0.00004091356170282643",
            "extra": "mean: 370.6494099995439 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2313.5497529523177,
            "unit": "iter/sec",
            "range": "stddev: 0.00006640850114460511",
            "extra": "mean: 432.2362200008456 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4199.4606044762195,
            "unit": "iter/sec",
            "range": "stddev: 0.000028799115767473648",
            "extra": "mean: 238.12582000033444 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3576.4147322109948,
            "unit": "iter/sec",
            "range": "stddev: 0.000024332272452173005",
            "extra": "mean: 279.60962999998173 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1773.9690583195188,
            "unit": "iter/sec",
            "range": "stddev: 0.0020822359904044134",
            "extra": "mean: 563.7076900018201 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 342.97859098819816,
            "unit": "iter/sec",
            "range": "stddev: 0.00009033745706229948",
            "extra": "mean: 2.915633880000428 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3231.9658487133834,
            "unit": "iter/sec",
            "range": "stddev: 0.00004676442253484904",
            "extra": "mean: 309.40921000080834 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 77.79714496209755,
            "unit": "iter/sec",
            "range": "stddev: 0.00017942457277445888",
            "extra": "mean: 12.853942140000072 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1961.2289743205808,
            "unit": "iter/sec",
            "range": "stddev: 0.00009468367981013366",
            "extra": "mean: 509.88437000142994 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 625.60138278955,
            "unit": "iter/sec",
            "range": "stddev: 0.00007271515198743242",
            "extra": "mean: 1.598461939999254 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 46.20139277480902,
            "unit": "iter/sec",
            "range": "stddev: 0.004380119333813468",
            "extra": "mean: 21.644369139997934 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1240.6811200398304,
            "unit": "iter/sec",
            "range": "stddev: 0.00005065727409881926",
            "extra": "mean: 806.0088799996379 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 2164.4740544498977,
            "unit": "iter/sec",
            "range": "stddev: 0.000020033194026029258",
            "extra": "mean: 462.0059999999171 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2573.9680556532703,
            "unit": "iter/sec",
            "range": "stddev: 0.00003552440164237592",
            "extra": "mean: 388.5052100019948 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2660.3497902428876,
            "unit": "iter/sec",
            "range": "stddev: 0.00010321278002027251",
            "extra": "mean: 375.89041999950723 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 869.9435142218516,
            "unit": "iter/sec",
            "range": "stddev: 0.00007044869619619127",
            "extra": "mean: 1.1494999199970835 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 693.7720059286553,
            "unit": "iter/sec",
            "range": "stddev: 0.00012126384000234972",
            "extra": "mean: 1.4413957199980132 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 545.2736811487991,
            "unit": "iter/sec",
            "range": "stddev: 0.00008486853468856346",
            "extra": "mean: 1.8339414399997622 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1776235452904,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 863484.7264153851,
            "unit": "iter/sec",
            "range": "stddev: 3.5219997667231367e-7",
            "extra": "mean: 1.1580980756328318 usec\nrounds: 19903"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 465783.6840030671,
            "unit": "iter/sec",
            "range": "stddev: 4.6003082029421603e-7",
            "extra": "mean: 2.146919341196621 usec\nrounds: 35458"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70261.03943192615,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018034583794466918",
            "extra": "mean: 14.232638857682577 usec\nrounds: 16038"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65246.76420522034,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015316288719749494",
            "extra": "mean: 15.326430546880529 usec\nrounds: 14463"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 65748.87227137397,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019001216693909813",
            "extra": "mean: 15.2093863431234 usec\nrounds: 17764"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 60714.406752012044,
            "unit": "iter/sec",
            "range": "stddev: 0.000002795526594354578",
            "extra": "mean: 16.470555400211673 usec\nrounds: 15740"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1781.4064631576452,
            "unit": "iter/sec",
            "range": "stddev: 0.000052463299970993184",
            "extra": "mean: 561.354199999613 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2520.050021993496,
            "unit": "iter/sec",
            "range": "stddev: 0.000041025810518880407",
            "extra": "mean: 396.817519998649 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2222.9841129803194,
            "unit": "iter/sec",
            "range": "stddev: 0.00006976806493833944",
            "extra": "mean: 449.84576999937076 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3908.376401016785,
            "unit": "iter/sec",
            "range": "stddev: 0.000014768570235441413",
            "extra": "mean: 255.86072000123752 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3329.6237994576795,
            "unit": "iter/sec",
            "range": "stddev: 0.000026653107941395822",
            "extra": "mean: 300.3342300000611 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1787.4228385191925,
            "unit": "iter/sec",
            "range": "stddev: 0.0017948369541158768",
            "extra": "mean: 559.4647100002703 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 323.10560212915567,
            "unit": "iter/sec",
            "range": "stddev: 0.0003908881784317633",
            "extra": "mean: 3.0949633599985304 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2451.2135578416965,
            "unit": "iter/sec",
            "range": "stddev: 0.000025623473306440622",
            "extra": "mean: 407.96118999949726 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 79.6018329054327,
            "unit": "iter/sec",
            "range": "stddev: 0.00039814389941495777",
            "extra": "mean: 12.562524800000574 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1922.1417271998055,
            "unit": "iter/sec",
            "range": "stddev: 0.00004007896289278902",
            "extra": "mean: 520.252999999542 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 636.7691575914689,
            "unit": "iter/sec",
            "range": "stddev: 0.0000446180504422709",
            "extra": "mean: 1.5704278200006172 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 47.7769400314272,
            "unit": "iter/sec",
            "range": "stddev: 0.003930068114884408",
            "extra": "mean: 20.930599560001326 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1135.3798426312558,
            "unit": "iter/sec",
            "range": "stddev: 0.000036303516225139385",
            "extra": "mean: 880.7625100006078 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1771.057456964528,
            "unit": "iter/sec",
            "range": "stddev: 0.00004064426570791055",
            "extra": "mean: 564.6344200000897 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2804.5725863689154,
            "unit": "iter/sec",
            "range": "stddev: 0.000021999740229817682",
            "extra": "mean: 356.5605699992602 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2307.257797809684,
            "unit": "iter/sec",
            "range": "stddev: 0.00009879827445978258",
            "extra": "mean: 433.41493999903946 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 832.3939628729696,
            "unit": "iter/sec",
            "range": "stddev: 0.000056426473128294536",
            "extra": "mean: 1.2013542200000416 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 706.4676705485325,
            "unit": "iter/sec",
            "range": "stddev: 0.00011334477065001852",
            "extra": "mean: 1.4154929400004335 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 524.4246974537492,
            "unit": "iter/sec",
            "range": "stddev: 0.00008492289515179366",
            "extra": "mean: 1.906851460000496 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1776321908421,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 1124638.0792227553,
            "unit": "iter/sec",
            "range": "stddev: 2.1304304611336834e-7",
            "extra": "mean: 889.1749430102051 nsec\nrounds: 22413"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 634012.0136523326,
            "unit": "iter/sec",
            "range": "stddev: 3.9203526215549553e-7",
            "extra": "mean: 1.5772571788337766 usec\nrounds: 45202"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 92869.6648648855,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012415146055614783",
            "extra": "mean: 10.767778708525361 usec\nrounds: 18505"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 86618.85982395003,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010450843095727206",
            "extra": "mean: 11.54482986768086 usec\nrounds: 26979"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 85304.70914729193,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014261994387450615",
            "extra": "mean: 11.72268225278564 usec\nrounds: 25835"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 80506.02928756354,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012633736811064655",
            "extra": "mean: 12.421429908411577 usec\nrounds: 14531"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 2316.4864922726288,
            "unit": "iter/sec",
            "range": "stddev: 0.000026350171636876454",
            "extra": "mean: 431.6882500009456 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 3125.042676369659,
            "unit": "iter/sec",
            "range": "stddev: 0.000048359812073499234",
            "extra": "mean: 319.99562999942555 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2797.357649535613,
            "unit": "iter/sec",
            "range": "stddev: 0.000022465421673790438",
            "extra": "mean: 357.4802099996077 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4700.5116036578065,
            "unit": "iter/sec",
            "range": "stddev: 0.000011071409239890124",
            "extra": "mean: 212.74280000113777 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 4337.259955956273,
            "unit": "iter/sec",
            "range": "stddev: 0.000017025277997487345",
            "extra": "mean: 230.56031000095345 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 2056.431186237374,
            "unit": "iter/sec",
            "range": "stddev: 0.001636545056419371",
            "extra": "mean: 486.27934000052164 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 430.9110007537726,
            "unit": "iter/sec",
            "range": "stddev: 0.00006538627439502076",
            "extra": "mean: 2.320664819999365 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3739.6215218814805,
            "unit": "iter/sec",
            "range": "stddev: 0.00004008358394577826",
            "extra": "mean: 267.4067399999558 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 102.0108201489687,
            "unit": "iter/sec",
            "range": "stddev: 0.0001264134258517692",
            "extra": "mean: 9.802881679999018 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 2436.792941671539,
            "unit": "iter/sec",
            "range": "stddev: 0.000035622246361005054",
            "extra": "mean: 410.3754500019363 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 792.8786305473029,
            "unit": "iter/sec",
            "range": "stddev: 0.000044161323904288935",
            "extra": "mean: 1.2612270800005376 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 60.709165299479096,
            "unit": "iter/sec",
            "range": "stddev: 0.0035152226745573975",
            "extra": "mean: 16.471977419998893 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1595.8149051907158,
            "unit": "iter/sec",
            "range": "stddev: 0.00002960193125563793",
            "extra": "mean: 626.6390900017882 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 2531.667425271669,
            "unit": "iter/sec",
            "range": "stddev: 0.000017082143354062982",
            "extra": "mean: 394.9965900014263 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 3352.685593372544,
            "unit": "iter/sec",
            "range": "stddev: 0.00003933324491572884",
            "extra": "mean: 298.268349998807 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 3021.7116630681426,
            "unit": "iter/sec",
            "range": "stddev: 0.00008093773417074915",
            "extra": "mean: 330.9382600008348 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 1078.6880030023078,
            "unit": "iter/sec",
            "range": "stddev: 0.00004302961386582742",
            "extra": "mean: 927.0521199982795 usec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 894.4780968988952,
            "unit": "iter/sec",
            "range": "stddev: 0.00008726831744546768",
            "extra": "mean: 1.117970359997571 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 699.4162448194667,
            "unit": "iter/sec",
            "range": "stddev: 0.00006964108476151132",
            "extra": "mean: 1.4297637600026292 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1776408288260,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 881816.9807668999,
            "unit": "iter/sec",
            "range": "stddev: 4.285334160896198e-7",
            "extra": "mean: 1.1340221631140723 usec\nrounds: 23327"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 525211.1043691456,
            "unit": "iter/sec",
            "range": "stddev: 4.959817543471562e-7",
            "extra": "mean: 1.9039963010704894 usec\nrounds: 41366"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68951.51807983122,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024449813894730082",
            "extra": "mean: 14.502943921295715 usec\nrounds: 17101"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63778.22301622289,
            "unit": "iter/sec",
            "range": "stddev: 0.000004421315530761169",
            "extra": "mean: 15.67933304986619 usec\nrounds: 23519"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 59984.598190900266,
            "unit": "iter/sec",
            "range": "stddev: 0.000010342228189297527",
            "extra": "mean: 16.670946045475073 usec\nrounds: 22241"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59782.295743075476,
            "unit": "iter/sec",
            "range": "stddev: 0.000002564307094523038",
            "extra": "mean: 16.727360292379352 usec\nrounds: 23542"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1419.5103492758346,
            "unit": "iter/sec",
            "range": "stddev: 0.00003756021468274917",
            "extra": "mean: 704.4682699989835 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2058.496331420862,
            "unit": "iter/sec",
            "range": "stddev: 0.00003267777394609732",
            "extra": "mean: 485.7914899997695 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1874.2802529626833,
            "unit": "iter/sec",
            "range": "stddev: 0.00002743964568359253",
            "extra": "mean: 533.5381399976313 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3031.577762867235,
            "unit": "iter/sec",
            "range": "stddev: 0.00002354063671574275",
            "extra": "mean: 329.8612399947842 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2655.25910709874,
            "unit": "iter/sec",
            "range": "stddev: 0.00002251708169675596",
            "extra": "mean: 376.6110799983835 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1727.8925820235356,
            "unit": "iter/sec",
            "range": "stddev: 0.001424015526800794",
            "extra": "mean: 578.739680003082 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 317.25642531609594,
            "unit": "iter/sec",
            "range": "stddev: 0.00007156260517238763",
            "extra": "mean: 3.152024420005546 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2490.546632160313,
            "unit": "iter/sec",
            "range": "stddev: 0.000019275877558707536",
            "extra": "mean: 401.5182799980721 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.89892988587421,
            "unit": "iter/sec",
            "range": "stddev: 0.00017632835845930194",
            "extra": "mean: 14.104585239998642 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1613.4212381191187,
            "unit": "iter/sec",
            "range": "stddev: 0.00002380993169758822",
            "extra": "mean: 619.8009399986404 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 538.7469064818398,
            "unit": "iter/sec",
            "range": "stddev: 0.000045243335703271476",
            "extra": "mean: 1.8561591499991437 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.407004115854484,
            "unit": "iter/sec",
            "range": "stddev: 0.0033140043946380776",
            "extra": "mean: 23.581010280000783 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1013.9850028407863,
            "unit": "iter/sec",
            "range": "stddev: 0.000025035088917569163",
            "extra": "mean: 986.207879996641 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1486.6038337728255,
            "unit": "iter/sec",
            "range": "stddev: 0.00004222408628542108",
            "extra": "mean: 672.674169998686 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2278.088754616149,
            "unit": "iter/sec",
            "range": "stddev: 0.000025463421695535922",
            "extra": "mean: 438.9644599990561 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2054.136057378798,
            "unit": "iter/sec",
            "range": "stddev: 0.00008027478149051227",
            "extra": "mean: 486.82267000174306 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 742.2264471761397,
            "unit": "iter/sec",
            "range": "stddev: 0.00004617673725241012",
            "extra": "mean: 1.347297719994458 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 572.9575627066115,
            "unit": "iter/sec",
            "range": "stddev: 0.0001071585086028549",
            "extra": "mean: 1.7453299599992533 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 463.1347430696394,
            "unit": "iter/sec",
            "range": "stddev: 0.00008779221623960122",
            "extra": "mean: 2.1591988400007267 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1776493940336,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 867952.024323638,
            "unit": "iter/sec",
            "range": "stddev: 3.285053088580089e-7",
            "extra": "mean: 1.1521374131009856 usec\nrounds: 19103"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 457761.9691659962,
            "unit": "iter/sec",
            "range": "stddev: 6.705170320785477e-7",
            "extra": "mean: 2.184541459007431 usec\nrounds: 36723"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70773.80638943968,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015558757262385148",
            "extra": "mean: 14.129521231307017 usec\nrounds: 15072"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65914.07787974906,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020141190190226962",
            "extra": "mean: 15.171265868641278 usec\nrounds: 20969"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 65664.86023419123,
            "unit": "iter/sec",
            "range": "stddev: 0.000001652566051710056",
            "extra": "mean: 15.228845328133463 usec\nrounds: 18633"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 61056.184099400096,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017918178136835303",
            "extra": "mean: 16.378357323674038 usec\nrounds: 13436"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1595.288742239023,
            "unit": "iter/sec",
            "range": "stddev: 0.00006612337425755015",
            "extra": "mean: 626.845769999278 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2527.036702509648,
            "unit": "iter/sec",
            "range": "stddev: 0.00004588094877991316",
            "extra": "mean: 395.72040999914293 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2325.1715162787564,
            "unit": "iter/sec",
            "range": "stddev: 0.00002767235698902298",
            "extra": "mean: 430.0757999996563 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3905.171196461363,
            "unit": "iter/sec",
            "range": "stddev: 0.00003494928804247679",
            "extra": "mean: 256.07071999971254 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2899.6710903076523,
            "unit": "iter/sec",
            "range": "stddev: 0.000030148458703045908",
            "extra": "mean: 344.86670000006825 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1870.3179512481306,
            "unit": "iter/sec",
            "range": "stddev: 0.001810512448669067",
            "extra": "mean: 534.6684499994581 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 340.36033799215966,
            "unit": "iter/sec",
            "range": "stddev: 0.00008028802546829818",
            "extra": "mean: 2.938062660000753 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2573.1189046919803,
            "unit": "iter/sec",
            "range": "stddev: 0.00005153983350624621",
            "extra": "mean: 388.63342000112766 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 79.8892332585307,
            "unit": "iter/sec",
            "range": "stddev: 0.00016019776245771984",
            "extra": "mean: 12.51733129999991 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1882.2926015224423,
            "unit": "iter/sec",
            "range": "stddev: 0.000053765919801516885",
            "extra": "mean: 531.267029999043 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 629.2388201193094,
            "unit": "iter/sec",
            "range": "stddev: 0.00012701848105297104",
            "extra": "mean: 1.5892217199987613 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 48.0653514822048,
            "unit": "iter/sec",
            "range": "stddev: 0.0037325953179043808",
            "extra": "mean: 20.805007539999565 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1218.1899093997172,
            "unit": "iter/sec",
            "range": "stddev: 0.00003574662406433982",
            "extra": "mean: 820.8900699996491 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1762.5081590925395,
            "unit": "iter/sec",
            "range": "stddev: 0.000054885393627216306",
            "extra": "mean: 567.3732599994707 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2806.5531331752413,
            "unit": "iter/sec",
            "range": "stddev: 0.00003500417153149158",
            "extra": "mean: 356.3089499996863 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2329.159146293843,
            "unit": "iter/sec",
            "range": "stddev: 0.00010269149391584218",
            "extra": "mean: 429.33949000058647 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 847.5316927688491,
            "unit": "iter/sec",
            "range": "stddev: 0.000058567839550107335",
            "extra": "mean: 1.1798968800010812 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 691.0385075955986,
            "unit": "iter/sec",
            "range": "stddev: 0.00011779580462460881",
            "extra": "mean: 1.4470973600001003 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 536.1231868686197,
            "unit": "iter/sec",
            "range": "stddev: 0.00014421471502064963",
            "extra": "mean: 1.8652429600010123 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1776580869140,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 877107.900050836,
            "unit": "iter/sec",
            "range": "stddev: 3.15532587713363e-7",
            "extra": "mean: 1.1401105838198942 usec\nrounds: 19804"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 491563.89815870184,
            "unit": "iter/sec",
            "range": "stddev: 6.14288237874079e-7",
            "extra": "mean: 2.0343235207992207 usec\nrounds: 31321"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69830.07348530856,
            "unit": "iter/sec",
            "range": "stddev: 0.0000025384593209916737",
            "extra": "mean: 14.320477554851612 usec\nrounds: 13121"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65658.93575679208,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016273062189892038",
            "extra": "mean: 15.230219443460218 usec\nrounds: 11037"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63948.373807507814,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027430036431699656",
            "extra": "mean: 15.637614226283825 usec\nrounds: 13215"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 60754.44039365111,
            "unit": "iter/sec",
            "range": "stddev: 0.000001554362711663092",
            "extra": "mean: 16.459702262429214 usec\nrounds: 15648"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1530.3589470692468,
            "unit": "iter/sec",
            "range": "stddev: 0.00007988725403777682",
            "extra": "mean: 653.4414699996205 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2472.6720898828235,
            "unit": "iter/sec",
            "range": "stddev: 0.00004903034941423114",
            "extra": "mean: 404.42078999944897 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2105.8305351376985,
            "unit": "iter/sec",
            "range": "stddev: 0.00005904408463334685",
            "extra": "mean: 474.87202000070283 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3490.573549087087,
            "unit": "iter/sec",
            "range": "stddev: 0.00003097442782683764",
            "extra": "mean: 286.4858699973638 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2901.824571554038,
            "unit": "iter/sec",
            "range": "stddev: 0.00003186755041452732",
            "extra": "mean: 344.610769997189 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1435.7134054162543,
            "unit": "iter/sec",
            "range": "stddev: 0.0029249493668065413",
            "extra": "mean: 696.5178400002969 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 318.78551186896135,
            "unit": "iter/sec",
            "range": "stddev: 0.00007580064878287142",
            "extra": "mean: 3.1369054200024493 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2873.6680907485807,
            "unit": "iter/sec",
            "range": "stddev: 0.0000361669092695904",
            "extra": "mean: 347.9873000014777 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 75.487558476526,
            "unit": "iter/sec",
            "range": "stddev: 0.0001670114551746108",
            "extra": "mean: 13.24721610000097 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1696.1383424631429,
            "unit": "iter/sec",
            "range": "stddev: 0.000042175144162960414",
            "extra": "mean: 589.5745500026806 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 611.234285686229,
            "unit": "iter/sec",
            "range": "stddev: 0.00004866618359988217",
            "extra": "mean: 1.6360338799995588 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 44.173034639555524,
            "unit": "iter/sec",
            "range": "stddev: 0.006266321264010557",
            "extra": "mean: 22.63824544000272 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1170.3685071409102,
            "unit": "iter/sec",
            "range": "stddev: 0.00004785987391969336",
            "extra": "mean: 854.4317400020418 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1951.534880219861,
            "unit": "iter/sec",
            "range": "stddev: 0.00002535327546384168",
            "extra": "mean: 512.4171800031263 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2683.5461000935725,
            "unit": "iter/sec",
            "range": "stddev: 0.00004258889527204554",
            "extra": "mean: 372.64125999740827 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2384.0646638242474,
            "unit": "iter/sec",
            "range": "stddev: 0.00013467613766429665",
            "extra": "mean: 419.4517100035 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 849.8520781442298,
            "unit": "iter/sec",
            "range": "stddev: 0.00006170116648934321",
            "extra": "mean: 1.1766753600034008 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 631.0477645723183,
            "unit": "iter/sec",
            "range": "stddev: 0.0001471426023523853",
            "extra": "mean: 1.5846661000023232 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 526.6888126671525,
            "unit": "iter/sec",
            "range": "stddev: 0.00014437026740130517",
            "extra": "mean: 1.898654340000121 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1776668003902,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 868682.7482149772,
            "unit": "iter/sec",
            "range": "stddev: 3.553804632849749e-7",
            "extra": "mean: 1.1511682510730892 usec\nrounds: 20725"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 485640.21032810037,
            "unit": "iter/sec",
            "range": "stddev: 4.4727747175519716e-7",
            "extra": "mean: 2.0591375646682883 usec\nrounds: 39327"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 71426.77861317106,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016082162344172306",
            "extra": "mean: 14.000351400638424 usec\nrounds: 15350"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66397.65971869015,
            "unit": "iter/sec",
            "range": "stddev: 0.000002488930104407152",
            "extra": "mean: 15.060771783775866 usec\nrounds: 21300"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 65488.494761080336,
            "unit": "iter/sec",
            "range": "stddev: 0.0000025175776810720843",
            "extra": "mean: 15.269857761249046 usec\nrounds: 20332"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 62356.79920474853,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018880572888842107",
            "extra": "mean: 16.03674359096753 usec\nrounds: 21571"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1570.8938256974607,
            "unit": "iter/sec",
            "range": "stddev: 0.00007194578319894452",
            "extra": "mean: 636.5802600032566 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2468.560841142216,
            "unit": "iter/sec",
            "range": "stddev: 0.00004836343324937384",
            "extra": "mean: 405.0943299972687 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1998.5504114062533,
            "unit": "iter/sec",
            "range": "stddev: 0.00005211026231938859",
            "extra": "mean: 500.36266000233815 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3587.5107414156464,
            "unit": "iter/sec",
            "range": "stddev: 0.000035661682203485065",
            "extra": "mean: 278.74481000310425 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2327.8800415370433,
            "unit": "iter/sec",
            "range": "stddev: 0.00018425941310534232",
            "extra": "mean: 429.57540000202243 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1401.013434278284,
            "unit": "iter/sec",
            "range": "stddev: 0.001834424837941629",
            "extra": "mean: 713.7690299987298 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 336.8650603121727,
            "unit": "iter/sec",
            "range": "stddev: 0.000078687517546221",
            "extra": "mean: 2.9685476999998173 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2672.3098010846766,
            "unit": "iter/sec",
            "range": "stddev: 0.00005144235781676838",
            "extra": "mean: 374.20811000060894 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 79.31892506751875,
            "unit": "iter/sec",
            "range": "stddev: 0.0007137237051052861",
            "extra": "mean: 12.607331719999593 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1755.239380767847,
            "unit": "iter/sec",
            "range": "stddev: 0.00007890749584125852",
            "extra": "mean: 569.7228600024573 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 642.50344838071,
            "unit": "iter/sec",
            "range": "stddev: 0.00004179579735818173",
            "extra": "mean: 1.5564118799989046 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 48.227979415178176,
            "unit": "iter/sec",
            "range": "stddev: 0.0032868844813194057",
            "extra": "mean: 20.734851680003885 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1137.3531724003265,
            "unit": "iter/sec",
            "range": "stddev: 0.00005641576141615142",
            "extra": "mean: 879.2343699974481 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1685.5906240580152,
            "unit": "iter/sec",
            "range": "stddev: 0.00006168122856839649",
            "extra": "mean: 593.2638599949769 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2822.1100696683193,
            "unit": "iter/sec",
            "range": "stddev: 0.00002434570477820466",
            "extra": "mean: 354.3447900023011 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2221.4964346507677,
            "unit": "iter/sec",
            "range": "stddev: 0.00017380244859816092",
            "extra": "mean: 450.1470200005997 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 826.2848891156376,
            "unit": "iter/sec",
            "range": "stddev: 0.00003910141361106182",
            "extra": "mean: 1.2102363399992555 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 705.2645445174453,
            "unit": "iter/sec",
            "range": "stddev: 0.00010756061063715031",
            "extra": "mean: 1.4179076600032658 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 528.5915876953272,
            "unit": "iter/sec",
            "range": "stddev: 0.0001215631479742386",
            "extra": "mean: 1.8918197400000736 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1776753910954,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 884232.9000777588,
            "unit": "iter/sec",
            "range": "stddev: 3.426074733387826e-7",
            "extra": "mean: 1.130923764442672 usec\nrounds: 25067"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 513753.66752307495,
            "unit": "iter/sec",
            "range": "stddev: 4.867993031106833e-7",
            "extra": "mean: 1.9464581242236785 usec\nrounds: 41026"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70715.75076818031,
            "unit": "iter/sec",
            "range": "stddev: 0.00000243854755467714",
            "extra": "mean: 14.141121166601062 usec\nrounds: 17216"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66343.08567226482,
            "unit": "iter/sec",
            "range": "stddev: 0.000002337784178741323",
            "extra": "mean: 15.073160825530563 usec\nrounds: 14923"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63973.18444266731,
            "unit": "iter/sec",
            "range": "stddev: 0.000003231697882528631",
            "extra": "mean: 15.631549511126787 usec\nrounds: 22904"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58995.728146457004,
            "unit": "iter/sec",
            "range": "stddev: 0.000004618517110624606",
            "extra": "mean: 16.950379822713572 usec\nrounds: 22471"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1392.961502041851,
            "unit": "iter/sec",
            "range": "stddev: 0.00004020133786486593",
            "extra": "mean: 717.894929999261 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2104.8635439954433,
            "unit": "iter/sec",
            "range": "stddev: 0.00003384741477278081",
            "extra": "mean: 475.09018000368997 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1897.4835194098894,
            "unit": "iter/sec",
            "range": "stddev: 0.000025773639318354684",
            "extra": "mean: 527.0137999991675 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3134.8803591698775,
            "unit": "iter/sec",
            "range": "stddev: 0.000012651199279878362",
            "extra": "mean: 318.99144000021806 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2651.418394823493,
            "unit": "iter/sec",
            "range": "stddev: 0.00003268331174145584",
            "extra": "mean: 377.1566200009602 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1721.5821236429472,
            "unit": "iter/sec",
            "range": "stddev: 0.0015645434544047656",
            "extra": "mean: 580.8610499997258 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 324.41689080913636,
            "unit": "iter/sec",
            "range": "stddev: 0.00007283829640928878",
            "extra": "mean: 3.0824535600038416 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2503.7303077824945,
            "unit": "iter/sec",
            "range": "stddev: 0.00003385347132073225",
            "extra": "mean: 399.40404000049057 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.67946212404843,
            "unit": "iter/sec",
            "range": "stddev: 0.0013961043553360124",
            "extra": "mean: 14.148381579997249 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1610.0708514946737,
            "unit": "iter/sec",
            "range": "stddev: 0.000033936206694155696",
            "extra": "mean: 621.090679998133 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 544.2862686245412,
            "unit": "iter/sec",
            "range": "stddev: 0.000037590573875799547",
            "extra": "mean: 1.8372684700040054 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 43.80628887446387,
            "unit": "iter/sec",
            "range": "stddev: 0.0033302127167470362",
            "extra": "mean: 22.827772579998964 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1052.4461379395748,
            "unit": "iter/sec",
            "range": "stddev: 0.000030404273713556925",
            "extra": "mean: 950.1673899984553 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1537.4634171999894,
            "unit": "iter/sec",
            "range": "stddev: 0.00003204141553225563",
            "extra": "mean: 650.421980004694 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2315.5177245148707,
            "unit": "iter/sec",
            "range": "stddev: 0.000025098172391663962",
            "extra": "mean: 431.868860001714 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2037.263173241576,
            "unit": "iter/sec",
            "range": "stddev: 0.00008199764830706367",
            "extra": "mean: 490.8546000018532 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 733.57852559829,
            "unit": "iter/sec",
            "range": "stddev: 0.00004196684671187041",
            "extra": "mean: 1.3631805799991525 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 587.5919638726281,
            "unit": "iter/sec",
            "range": "stddev: 0.0001032327227172923",
            "extra": "mean: 1.701861259996349 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 468.61722024014915,
            "unit": "iter/sec",
            "range": "stddev: 0.00007327752143346578",
            "extra": "mean: 2.1339377999970566 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1776840315838,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 825581.7323005012,
            "unit": "iter/sec",
            "range": "stddev: 4.003271919207725e-7",
            "extra": "mean: 1.211267111268897 usec\nrounds: 26839"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 488406.06802879204,
            "unit": "iter/sec",
            "range": "stddev: 5.491307568207903e-7",
            "extra": "mean: 2.0474766090355967 usec\nrounds: 45851"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68708.28934330182,
            "unit": "iter/sec",
            "range": "stddev: 0.000002223317577950046",
            "extra": "mean: 14.554284636654069 usec\nrounds: 17366"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63471.824222538475,
            "unit": "iter/sec",
            "range": "stddev: 0.000002274585976960398",
            "extra": "mean: 15.755022204717188 usec\nrounds: 24139"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 61089.54785371549,
            "unit": "iter/sec",
            "range": "stddev: 0.0000026255575176252063",
            "extra": "mean: 16.36941236485481 usec\nrounds: 22936"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 57334.55019046697,
            "unit": "iter/sec",
            "range": "stddev: 0.00000264890506354269",
            "extra": "mean: 17.441490282525496 usec\nrounds: 23823"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1392.0729270254085,
            "unit": "iter/sec",
            "range": "stddev: 0.00005952410917105731",
            "extra": "mean: 718.3531700000856 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2085.198152104847,
            "unit": "iter/sec",
            "range": "stddev: 0.00003165189312124182",
            "extra": "mean: 479.570730000205 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1856.5861465257817,
            "unit": "iter/sec",
            "range": "stddev: 0.00002833837055034066",
            "extra": "mean: 538.6229999999159 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2963.662123783821,
            "unit": "iter/sec",
            "range": "stddev: 0.000027809258392460942",
            "extra": "mean: 337.42038000042385 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2619.5751578288605,
            "unit": "iter/sec",
            "range": "stddev: 0.0000238175592197775",
            "extra": "mean: 381.74128999941104 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1751.600183105072,
            "unit": "iter/sec",
            "range": "stddev: 0.0013976681384578172",
            "extra": "mean: 570.9065400000668 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 316.49849160620585,
            "unit": "iter/sec",
            "range": "stddev: 0.00007405499387180776",
            "extra": "mean: 3.1595727199996304 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2270.31562994814,
            "unit": "iter/sec",
            "range": "stddev: 0.000019791373543490984",
            "extra": "mean: 440.4673900002365 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.33042853258624,
            "unit": "iter/sec",
            "range": "stddev: 0.00018978617262679833",
            "extra": "mean: 14.423681219999764 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1594.9555765803982,
            "unit": "iter/sec",
            "range": "stddev: 0.000033545097786397244",
            "extra": "mean: 626.976709999667 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 522.8287719722811,
            "unit": "iter/sec",
            "range": "stddev: 0.000168740219514162",
            "extra": "mean: 1.9126720899993188 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.1164648962282,
            "unit": "iter/sec",
            "range": "stddev: 0.003011781207920298",
            "extra": "mean: 23.743683200000874 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1016.9642553237727,
            "unit": "iter/sec",
            "range": "stddev: 0.00003392496193215497",
            "extra": "mean: 983.3187299996382 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1536.711271608235,
            "unit": "iter/sec",
            "range": "stddev: 0.00001726961301281459",
            "extra": "mean: 650.7403299993086 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2282.9160828586814,
            "unit": "iter/sec",
            "range": "stddev: 0.000030557844957863144",
            "extra": "mean: 438.0362499999535 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2041.4631787215187,
            "unit": "iter/sec",
            "range": "stddev: 0.00007742110982749933",
            "extra": "mean: 489.8447399997963 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 713.3532901994434,
            "unit": "iter/sec",
            "range": "stddev: 0.00002631531715573294",
            "extra": "mean: 1.401829940001278 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 577.1175921877102,
            "unit": "iter/sec",
            "range": "stddev: 0.0000942827550960716",
            "extra": "mean: 1.732749120000392 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 466.73295519257096,
            "unit": "iter/sec",
            "range": "stddev: 0.0000919818332394964",
            "extra": "mean: 2.1425527999997485 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1776926738297,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 850709.56747211,
            "unit": "iter/sec",
            "range": "stddev: 3.2479507543899957e-7",
            "extra": "mean: 1.1754893070869152 usec\nrounds: 22211"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 518498.43771488295,
            "unit": "iter/sec",
            "range": "stddev: 5.754203142743928e-7",
            "extra": "mean: 1.9286461197591687 usec\nrounds: 38838"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69381.55445972554,
            "unit": "iter/sec",
            "range": "stddev: 0.000002381109822789547",
            "extra": "mean: 14.413052687951494 usec\nrounds: 15829"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66174.4867378784,
            "unit": "iter/sec",
            "range": "stddev: 0.000002482477782470635",
            "extra": "mean: 15.111564128348551 usec\nrounds: 18962"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62444.20773803415,
            "unit": "iter/sec",
            "range": "stddev: 0.000004475784529423855",
            "extra": "mean: 16.01429558038751 usec\nrounds: 12511"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58519.679574094225,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027797208935037713",
            "extra": "mean: 17.088268549622832 usec\nrounds: 17561"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1370.7532897969973,
            "unit": "iter/sec",
            "range": "stddev: 0.000044302611564013925",
            "extra": "mean: 729.5258799985049 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 1929.7910744556054,
            "unit": "iter/sec",
            "range": "stddev: 0.00016534350644913193",
            "extra": "mean: 518.1908099984867 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1918.515836147843,
            "unit": "iter/sec",
            "range": "stddev: 0.000037532797355757205",
            "extra": "mean: 521.2362500003564 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2910.9222284756024,
            "unit": "iter/sec",
            "range": "stddev: 0.0000309618178276249",
            "extra": "mean: 343.5337400009075 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2592.13336257418,
            "unit": "iter/sec",
            "range": "stddev: 0.000025787514442062434",
            "extra": "mean: 385.78261999873575 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1631.5152624723628,
            "unit": "iter/sec",
            "range": "stddev: 0.0017404162556961876",
            "extra": "mean: 612.9271499946753 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 315.28215814172694,
            "unit": "iter/sec",
            "range": "stddev: 0.00008499538861311725",
            "extra": "mean: 3.171762099999569 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2350.3537411622906,
            "unit": "iter/sec",
            "range": "stddev: 0.000030368675520971203",
            "extra": "mean: 425.4678700004888 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 68.89065685276869,
            "unit": "iter/sec",
            "range": "stddev: 0.00019079389688344878",
            "extra": "mean: 14.515756500002226 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1509.6135664047633,
            "unit": "iter/sec",
            "range": "stddev: 0.00004687484643394136",
            "extra": "mean: 662.4211799987734 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 527.340008666991,
            "unit": "iter/sec",
            "range": "stddev: 0.00006467878209430191",
            "extra": "mean: 1.896309749999432 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 40.58838622895739,
            "unit": "iter/sec",
            "range": "stddev: 0.004770179115694813",
            "extra": "mean: 24.637589539999 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 974.4859598737448,
            "unit": "iter/sec",
            "range": "stddev: 0.00012222615957548221",
            "extra": "mean: 1.026182050000557 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1513.9600744460747,
            "unit": "iter/sec",
            "range": "stddev: 0.00003997190510259467",
            "extra": "mean: 660.519400001931 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2258.508116263901,
            "unit": "iter/sec",
            "range": "stddev: 0.00003341260533784698",
            "extra": "mean: 442.7701600002365 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1989.7939884782413,
            "unit": "iter/sec",
            "range": "stddev: 0.00010314880844373169",
            "extra": "mean: 502.5645899979736 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 712.3746471709053,
            "unit": "iter/sec",
            "range": "stddev: 0.00005347900560382976",
            "extra": "mean: 1.4037557400047262 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 574.6754152806467,
            "unit": "iter/sec",
            "range": "stddev: 0.00012213426884045294",
            "extra": "mean: 1.7401127199980237 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 455.6859660949402,
            "unit": "iter/sec",
            "range": "stddev: 0.0001346391701456275",
            "extra": "mean: 2.1944937399973696 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1777013193666,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 851574.4994473939,
            "unit": "iter/sec",
            "range": "stddev: 3.744155682855139e-7",
            "extra": "mean: 1.1742953794987083 usec\nrounds: 29975"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 508360.4781973188,
            "unit": "iter/sec",
            "range": "stddev: 5.130260465395305e-7",
            "extra": "mean: 1.9671080717094074 usec\nrounds: 44600"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68864.48543267472,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024364369404016565",
            "extra": "mean: 14.521273102049806 usec\nrounds: 17953"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64507.54697658812,
            "unit": "iter/sec",
            "range": "stddev: 0.000002651932203792537",
            "extra": "mean: 15.502062113180841 usec\nrounds: 23908"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64661.229913529736,
            "unit": "iter/sec",
            "range": "stddev: 0.000002397274219705242",
            "extra": "mean: 15.465217740789674 usec\nrounds: 23133"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 60393.61602988541,
            "unit": "iter/sec",
            "range": "stddev: 0.000002561590089524922",
            "extra": "mean: 16.55804149076214 usec\nrounds: 24174"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1412.6212196713686,
            "unit": "iter/sec",
            "range": "stddev: 0.00004087623159920317",
            "extra": "mean: 707.9038500020829 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2071.4109392852206,
            "unit": "iter/sec",
            "range": "stddev: 0.00002879043648049073",
            "extra": "mean: 482.76272999942194 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1906.8487600531075,
            "unit": "iter/sec",
            "range": "stddev: 0.000031434721198371847",
            "extra": "mean: 524.4254399977422 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2956.0953622095644,
            "unit": "iter/sec",
            "range": "stddev: 0.000017277149737451026",
            "extra": "mean: 338.2840800009035 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2704.197319883686,
            "unit": "iter/sec",
            "range": "stddev: 0.000021341564512566752",
            "extra": "mean: 369.79549999813344 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1773.806091914964,
            "unit": "iter/sec",
            "range": "stddev: 0.0013901276117698172",
            "extra": "mean: 563.7594800006696 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 329.0367884979564,
            "unit": "iter/sec",
            "range": "stddev: 0.00006608642672498493",
            "extra": "mean: 3.0391738399981705 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2493.7183235482103,
            "unit": "iter/sec",
            "range": "stddev: 0.0000235392683574883",
            "extra": "mean: 401.00759999916136 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.36290176010243,
            "unit": "iter/sec",
            "range": "stddev: 0.00024753572684527186",
            "extra": "mean: 14.212034679999874 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1684.1515278264426,
            "unit": "iter/sec",
            "range": "stddev: 0.000028715029606493254",
            "extra": "mean: 593.7708000007547 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 550.3878115076276,
            "unit": "iter/sec",
            "range": "stddev: 0.00007978819630758874",
            "extra": "mean: 1.8169007000005877 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.7470503814942,
            "unit": "iter/sec",
            "range": "stddev: 0.0029946864738107917",
            "extra": "mean: 23.39342694000038 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1027.848855524187,
            "unit": "iter/sec",
            "range": "stddev: 0.00002723768685733987",
            "extra": "mean: 972.9056900005162 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1519.0223754229523,
            "unit": "iter/sec",
            "range": "stddev: 0.000018867671177305144",
            "extra": "mean: 658.3181500019464 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2227.1925736496732,
            "unit": "iter/sec",
            "range": "stddev: 0.000031951042434714365",
            "extra": "mean: 448.9957499998809 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2023.9259212342745,
            "unit": "iter/sec",
            "range": "stddev: 0.0000759507374424017",
            "extra": "mean: 494.0892300001565 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 735.8599073453711,
            "unit": "iter/sec",
            "range": "stddev: 0.000025778872790400502",
            "extra": "mean: 1.358954319997565 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 585.9330597260216,
            "unit": "iter/sec",
            "range": "stddev: 0.00009704921866583385",
            "extra": "mean: 1.7066796000000295 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 462.1032199220734,
            "unit": "iter/sec",
            "range": "stddev: 0.0000864660534328742",
            "extra": "mean: 2.1640186800010497 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1777099051480,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 852239.7618320318,
            "unit": "iter/sec",
            "range": "stddev: 4.897369711945367e-7",
            "extra": "mean: 1.1733787189773133 usec\nrounds: 36737"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 508127.82606633747,
            "unit": "iter/sec",
            "range": "stddev: 6.49470034348735e-7",
            "extra": "mean: 1.9680087346160162 usec\nrounds: 30339"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69586.83335236956,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024625470155787286",
            "extra": "mean: 14.370534651810653 usec\nrounds: 18152"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63356.79116571076,
            "unit": "iter/sec",
            "range": "stddev: 0.000003204064449068322",
            "extra": "mean: 15.78362763645152 usec\nrounds: 24417"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 61345.731347498004,
            "unit": "iter/sec",
            "range": "stddev: 0.000002642430128472398",
            "extra": "mean: 16.301052706266013 usec\nrounds: 23299"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 57859.93588008956,
            "unit": "iter/sec",
            "range": "stddev: 0.000003739901924020893",
            "extra": "mean: 17.28311628399358 usec\nrounds: 23305"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1365.271269776338,
            "unit": "iter/sec",
            "range": "stddev: 0.00003858738692316117",
            "extra": "mean: 732.4551699998949 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2041.268196654181,
            "unit": "iter/sec",
            "range": "stddev: 0.000037471890318081006",
            "extra": "mean: 489.8915300003637 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1844.1379253645673,
            "unit": "iter/sec",
            "range": "stddev: 0.00003976636566454518",
            "extra": "mean: 542.2587899992948 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2947.045077470152,
            "unit": "iter/sec",
            "range": "stddev: 0.00001689171342822791",
            "extra": "mean: 339.3229400001019 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2587.8485964708048,
            "unit": "iter/sec",
            "range": "stddev: 0.000030599233899797794",
            "extra": "mean: 386.421369999681 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1655.5717148571857,
            "unit": "iter/sec",
            "range": "stddev: 0.0017353139457850495",
            "extra": "mean: 604.0209499992955 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 310.296040916651,
            "unit": "iter/sec",
            "range": "stddev: 0.0005715044225825719",
            "extra": "mean: 3.2227288400002863 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2452.9556828173945,
            "unit": "iter/sec",
            "range": "stddev: 0.00001726909733138615",
            "extra": "mean: 407.6714500000378 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 71.63671405034675,
            "unit": "iter/sec",
            "range": "stddev: 0.00022060309550320155",
            "extra": "mean: 13.959322579999878 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1608.6937930856725,
            "unit": "iter/sec",
            "range": "stddev: 0.00001748719387538429",
            "extra": "mean: 621.622339999135 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 540.1027274308593,
            "unit": "iter/sec",
            "range": "stddev: 0.00004326945268277176",
            "extra": "mean: 1.85149962999958 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 43.06786460368496,
            "unit": "iter/sec",
            "range": "stddev: 0.003334658811694135",
            "extra": "mean: 23.219168379999928 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 998.6490874332228,
            "unit": "iter/sec",
            "range": "stddev: 0.0000382188519467477",
            "extra": "mean: 1.001352740000243 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1509.683510100154,
            "unit": "iter/sec",
            "range": "stddev: 0.000029728982434934935",
            "extra": "mean: 662.3904899998934 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2279.065976764544,
            "unit": "iter/sec",
            "range": "stddev: 0.00003054171334278151",
            "extra": "mean: 438.7762400014594 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2014.526184249791,
            "unit": "iter/sec",
            "range": "stddev: 0.00007198853445719129",
            "extra": "mean: 496.39463999938016 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 730.6645091215045,
            "unit": "iter/sec",
            "range": "stddev: 0.00004465838899064919",
            "extra": "mean: 1.368617180000058 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 582.0517814217955,
            "unit": "iter/sec",
            "range": "stddev: 0.00009577557870497475",
            "extra": "mean: 1.7180602000001954 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 460.3838033772335,
            "unit": "iter/sec",
            "range": "stddev: 0.00009754908839831292",
            "extra": "mean: 2.1721007400006442 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1777185873045,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 872229.4951477405,
            "unit": "iter/sec",
            "range": "stddev: 5.371185397176449e-7",
            "extra": "mean: 1.1464872554334078 usec\nrounds: 14516"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 480474.3369228356,
            "unit": "iter/sec",
            "range": "stddev: 4.926026761589355e-7",
            "extra": "mean: 2.0812766117841597 usec\nrounds: 29395"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67729.92681124258,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028617314763313986",
            "extra": "mean: 14.764522081751442 usec\nrounds: 11548"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65890.53385682333,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016235538999938138",
            "extra": "mean: 15.176686869360438 usec\nrounds: 18034"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64564.106154121204,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019763958405946633",
            "extra": "mean: 15.48848206173406 usec\nrounds: 19344"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 60549.128941664916,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014853981216917835",
            "extra": "mean: 16.515514219262077 usec\nrounds: 21098"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1669.0270603670594,
            "unit": "iter/sec",
            "range": "stddev: 0.0000330220227514527",
            "extra": "mean: 599.1514600009396 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2551.6814368576793,
            "unit": "iter/sec",
            "range": "stddev: 0.000042704657294476907",
            "extra": "mean: 391.89845000066725 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2271.8660805808317,
            "unit": "iter/sec",
            "range": "stddev: 0.0000342243320788303",
            "extra": "mean: 440.16679000037584 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3922.091265324288,
            "unit": "iter/sec",
            "range": "stddev: 0.000035537847683171834",
            "extra": "mean: 254.96602000089294 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3071.681276457039,
            "unit": "iter/sec",
            "range": "stddev: 0.000027756592107466593",
            "extra": "mean: 325.5546099995854 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1887.7145479590479,
            "unit": "iter/sec",
            "range": "stddev: 0.001846012532044418",
            "extra": "mean: 529.7411100005434 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 333.8032660221429,
            "unit": "iter/sec",
            "range": "stddev: 0.00010297517038688217",
            "extra": "mean: 2.995776559998262 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3088.2282729131207,
            "unit": "iter/sec",
            "range": "stddev: 0.000027434835408860624",
            "extra": "mean: 323.81026000280144 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 79.8095042903889,
            "unit": "iter/sec",
            "range": "stddev: 0.00016211101813992865",
            "extra": "mean: 12.529836000001637 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1898.198332645828,
            "unit": "iter/sec",
            "range": "stddev: 0.00004810683105782417",
            "extra": "mean: 526.815339999871 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 628.8443297624827,
            "unit": "iter/sec",
            "range": "stddev: 0.00006197061763160557",
            "extra": "mean: 1.5902186799993956 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 47.51287760526782,
            "unit": "iter/sec",
            "range": "stddev: 0.004239840470603596",
            "extra": "mean: 21.046925600000463 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1113.7574234997437,
            "unit": "iter/sec",
            "range": "stddev: 0.0000370096052954256",
            "extra": "mean: 897.8615799998124 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1942.1648554217138,
            "unit": "iter/sec",
            "range": "stddev: 0.00003444559733453667",
            "extra": "mean: 514.8893499995211 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2812.103563689347,
            "unit": "iter/sec",
            "range": "stddev: 0.000023928678265673676",
            "extra": "mean: 355.6056800013607 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2292.4097990647733,
            "unit": "iter/sec",
            "range": "stddev: 0.0001040238713678123",
            "extra": "mean: 436.2221799993904 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 838.1449137440438,
            "unit": "iter/sec",
            "range": "stddev: 0.00004511581206030284",
            "extra": "mean: 1.1931111000041028 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 656.0806823883364,
            "unit": "iter/sec",
            "range": "stddev: 0.0001323987042476378",
            "extra": "mean: 1.5242027799990865 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 528.0960791813282,
            "unit": "iter/sec",
            "range": "stddev: 0.00010700363247492521",
            "extra": "mean: 1.893594819999862 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1777273282146,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 882662.8824582455,
            "unit": "iter/sec",
            "range": "stddev: 3.654828636795499e-7",
            "extra": "mean: 1.1329353707668854 usec\nrounds: 35108"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 516742.8485952376,
            "unit": "iter/sec",
            "range": "stddev: 5.869313512824449e-7",
            "extra": "mean: 1.9351985280850894 usec\nrounds: 47827"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69892.7328285615,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020626840027971084",
            "extra": "mean: 14.307639142582682 usec\nrounds: 18057"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64906.97813402496,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022158447039834964",
            "extra": "mean: 15.406663948137018 usec\nrounds: 25136"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63967.25714115742,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021634370057365563",
            "extra": "mean: 15.632997953832637 usec\nrounds: 23948"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59642.30999833754,
            "unit": "iter/sec",
            "range": "stddev: 0.000002394154835179342",
            "extra": "mean: 16.766620877492404 usec\nrounds: 23681"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1497.6667550088932,
            "unit": "iter/sec",
            "range": "stddev: 0.000035455163673977236",
            "extra": "mean: 667.7052800000638 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2031.606102455482,
            "unit": "iter/sec",
            "range": "stddev: 0.000036999895241634076",
            "extra": "mean: 492.22140000040326 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1971.6900017444632,
            "unit": "iter/sec",
            "range": "stddev: 0.000038918502098985485",
            "extra": "mean: 507.17912000123994 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3125.4286720638834,
            "unit": "iter/sec",
            "range": "stddev: 0.000013164509991563179",
            "extra": "mean: 319.95611000127155 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2673.3937094361613,
            "unit": "iter/sec",
            "range": "stddev: 0.00002922991405889067",
            "extra": "mean: 374.0563899998506 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1703.39135850941,
            "unit": "iter/sec",
            "range": "stddev: 0.001621429119435742",
            "extra": "mean: 587.0641499996054 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 323.5065857112154,
            "unit": "iter/sec",
            "range": "stddev: 0.000050778958425953816",
            "extra": "mean: 3.091127179997102 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2552.852535726467,
            "unit": "iter/sec",
            "range": "stddev: 0.000022529496309515923",
            "extra": "mean: 391.7186699996478 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.85367804546158,
            "unit": "iter/sec",
            "range": "stddev: 0.0001664371143771466",
            "extra": "mean: 14.315638459999036 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1667.7157154434237,
            "unit": "iter/sec",
            "range": "stddev: 0.0000299922630150495",
            "extra": "mean: 599.6225799995614 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 538.6178233948543,
            "unit": "iter/sec",
            "range": "stddev: 0.00003879789189004147",
            "extra": "mean: 1.8566039899999964 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.8090326229975,
            "unit": "iter/sec",
            "range": "stddev: 0.0034253294240914737",
            "extra": "mean: 23.359556120004186 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1031.0619368808004,
            "unit": "iter/sec",
            "range": "stddev: 0.00002905635607124194",
            "extra": "mean: 969.8738399995932 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1576.8206108734182,
            "unit": "iter/sec",
            "range": "stddev: 0.000025447852043297593",
            "extra": "mean: 634.1875500004335 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2365.7898087476938,
            "unit": "iter/sec",
            "range": "stddev: 0.000029038554557827792",
            "extra": "mean: 422.69182000126193 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2140.056557842829,
            "unit": "iter/sec",
            "range": "stddev: 0.00007466061766277354",
            "extra": "mean: 467.2773699999766 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 723.3167998537963,
            "unit": "iter/sec",
            "range": "stddev: 0.00002746069625731951",
            "extra": "mean: 1.3825200800010862 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 598.0731971498562,
            "unit": "iter/sec",
            "range": "stddev: 0.00009884729508291121",
            "extra": "mean: 1.6720361400001593 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 480.28581847489096,
            "unit": "iter/sec",
            "range": "stddev: 0.00008685977217590184",
            "extra": "mean: 2.0820935399996188 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1777359744858,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 860850.7930274102,
            "unit": "iter/sec",
            "range": "stddev: 3.6164727012281486e-7",
            "extra": "mean: 1.1616414924626308 usec\nrounds: 19001"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 468788.13607143296,
            "unit": "iter/sec",
            "range": "stddev: 5.188468136177014e-7",
            "extra": "mean: 2.1331597859541866 usec\nrounds: 39434"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 70466.96827023927,
            "unit": "iter/sec",
            "range": "stddev: 0.000001524612723516961",
            "extra": "mean: 14.19104616740459 usec\nrounds: 15877"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65977.55141110736,
            "unit": "iter/sec",
            "range": "stddev: 0.000001672526404148289",
            "extra": "mean: 15.156670391857697 usec\nrounds: 21744"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64717.1788892719,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016073027658957964",
            "extra": "mean: 15.451847827158131 usec\nrounds: 20043"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 61228.01217813648,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016554813564543372",
            "extra": "mean: 16.332393694092254 usec\nrounds: 21250"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1477.5910171686446,
            "unit": "iter/sec",
            "range": "stddev: 0.00013230049880386948",
            "extra": "mean: 676.7772599999944 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2503.5988607769214,
            "unit": "iter/sec",
            "range": "stddev: 0.00004509048587349702",
            "extra": "mean: 399.4250099992769 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2277.7040560890737,
            "unit": "iter/sec",
            "range": "stddev: 0.00002947242797957895",
            "extra": "mean: 439.0386000001456 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3273.1093219385916,
            "unit": "iter/sec",
            "range": "stddev: 0.000033737089909445515",
            "extra": "mean: 305.51989000102253 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3057.604940748845,
            "unit": "iter/sec",
            "range": "stddev: 0.00003044915806123026",
            "extra": "mean: 327.0533699998168 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1940.2836194043457,
            "unit": "iter/sec",
            "range": "stddev: 0.0015713009709744886",
            "extra": "mean: 515.3885700003968 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 342.2500304175012,
            "unit": "iter/sec",
            "range": "stddev: 0.00006545201746647961",
            "extra": "mean: 2.921840499999746 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2464.6271778159467,
            "unit": "iter/sec",
            "range": "stddev: 0.000026222241999046233",
            "extra": "mean: 405.7408800004225 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 80.523508840814,
            "unit": "iter/sec",
            "range": "stddev: 0.00017641533303863123",
            "extra": "mean: 12.418733540001199 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1874.3882465365689,
            "unit": "iter/sec",
            "range": "stddev: 0.000036229204943384266",
            "extra": "mean: 533.5073999998485 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 614.0747467136774,
            "unit": "iter/sec",
            "range": "stddev: 0.0001214948887764839",
            "extra": "mean: 1.6284662499991498 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 48.10503117041681,
            "unit": "iter/sec",
            "range": "stddev: 0.0034268620399262296",
            "extra": "mean: 20.7878464200013 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1195.6671366479204,
            "unit": "iter/sec",
            "range": "stddev: 0.000038069666938790515",
            "extra": "mean: 836.3531699997395 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1963.7150236337945,
            "unit": "iter/sec",
            "range": "stddev: 0.000019374080974316222",
            "extra": "mean: 509.2388599999254 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2278.79840600176,
            "unit": "iter/sec",
            "range": "stddev: 0.000036939748403991666",
            "extra": "mean: 438.82776000117474 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2292.794908053031,
            "unit": "iter/sec",
            "range": "stddev: 0.00010214246999260514",
            "extra": "mean: 436.1489099996163 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 846.4199306299511,
            "unit": "iter/sec",
            "range": "stddev: 0.000037936786722983076",
            "extra": "mean: 1.1814466599997786 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 672.8410599374472,
            "unit": "iter/sec",
            "range": "stddev: 0.00013166544713308603",
            "extra": "mean: 1.4862350999996465 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 547.617175289643,
            "unit": "iter/sec",
            "range": "stddev: 0.0001080556493561618",
            "extra": "mean: 1.8260932000006846 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1777445804819,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 947973.5382346716,
            "unit": "iter/sec",
            "range": "stddev: 2.0116875924844926e-7",
            "extra": "mean: 1.0548817658583727 usec\nrounds: 24646"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 516483.3691108015,
            "unit": "iter/sec",
            "range": "stddev: 3.4168638819553974e-7",
            "extra": "mean: 1.936170765230331 usec\nrounds: 37250"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 76451.95094418118,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011687199851089074",
            "extra": "mean: 13.080110940924403 usec\nrounds: 16324"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 70868.02894658982,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010149926913112034",
            "extra": "mean: 14.110735332481969 usec\nrounds: 17607"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 70988.26255824757,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012432313164090757",
            "extra": "mean: 14.08683582274571 usec\nrounds: 16470"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 65355.902809727944,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013264716032421802",
            "extra": "mean: 15.300836757030526 usec\nrounds: 13777"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1667.823691554906,
            "unit": "iter/sec",
            "range": "stddev: 0.00004238150861232938",
            "extra": "mean: 599.5837600002574 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2482.4881561662955,
            "unit": "iter/sec",
            "range": "stddev: 0.000049780730961679864",
            "extra": "mean: 402.8216600011092 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2174.600122583049,
            "unit": "iter/sec",
            "range": "stddev: 0.00005678745612538291",
            "extra": "mean: 459.8546599970632 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4112.392678897262,
            "unit": "iter/sec",
            "range": "stddev: 0.00002849619294781128",
            "extra": "mean: 243.16743999946766 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3579.624248978694,
            "unit": "iter/sec",
            "range": "stddev: 0.000022125294601852647",
            "extra": "mean: 279.3589300009103 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1949.9356365227866,
            "unit": "iter/sec",
            "range": "stddev: 0.0017638635501432715",
            "extra": "mean: 512.8374400004532 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 347.71716621770713,
            "unit": "iter/sec",
            "range": "stddev: 0.00006892535332729403",
            "extra": "mean: 2.8759005799958004 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2788.4679894871024,
            "unit": "iter/sec",
            "range": "stddev: 0.00005889858773335252",
            "extra": "mean: 358.61985999844137 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 76.80228040594554,
            "unit": "iter/sec",
            "range": "stddev: 0.0007811432982356393",
            "extra": "mean: 13.020446719998517 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1901.0298391883675,
            "unit": "iter/sec",
            "range": "stddev: 0.000041548953749031015",
            "extra": "mean: 526.030670000921 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 621.0509890626249,
            "unit": "iter/sec",
            "range": "stddev: 0.00005728603957591654",
            "extra": "mean: 1.610173749999717 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 46.64954688007743,
            "unit": "iter/sec",
            "range": "stddev: 0.003591108259489489",
            "extra": "mean: 21.436435439999286 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1211.8474961651348,
            "unit": "iter/sec",
            "range": "stddev: 0.00004772188078728752",
            "extra": "mean: 825.1863400010961 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1962.491604461567,
            "unit": "iter/sec",
            "range": "stddev: 0.00006561991786647396",
            "extra": "mean: 509.556319999831 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2850.975464097827,
            "unit": "iter/sec",
            "range": "stddev: 0.00002029289754566452",
            "extra": "mean: 350.7571400010079 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2223.085421590381,
            "unit": "iter/sec",
            "range": "stddev: 0.00009374859398872973",
            "extra": "mean: 449.8252700000194 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 848.7788737167571,
            "unit": "iter/sec",
            "range": "stddev: 0.000052147972256086344",
            "extra": "mean: 1.1781631600007358 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 688.3861586413653,
            "unit": "iter/sec",
            "range": "stddev: 0.00011778877194668755",
            "extra": "mean: 1.4526730200003612 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 535.5507705876565,
            "unit": "iter/sec",
            "range": "stddev: 0.00009933262933766429",
            "extra": "mean: 1.8672366000009788 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1777532375396,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 896557.6377681276,
            "unit": "iter/sec",
            "range": "stddev: 3.6214217270739933e-7",
            "extra": "mean: 1.1153772583872907 usec\nrounds: 26955"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 523527.4373103346,
            "unit": "iter/sec",
            "range": "stddev: 5.700210628104172e-7",
            "extra": "mean: 1.9101195634322101 usec\nrounds: 43893"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69168.99995296178,
            "unit": "iter/sec",
            "range": "stddev: 0.0000034993116557683264",
            "extra": "mean: 14.457343617517209 usec\nrounds: 17924"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64438.994486741765,
            "unit": "iter/sec",
            "range": "stddev: 0.000004766990106652198",
            "extra": "mean: 15.5185537571625 usec\nrounds: 24034"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63921.5643404718,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024634134977749663",
            "extra": "mean: 15.644172828336933 usec\nrounds: 23208"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58390.3276088595,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024826630221773766",
            "extra": "mean: 17.126124153622168 usec\nrounds: 23777"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1392.7372540441802,
            "unit": "iter/sec",
            "range": "stddev: 0.00004188737066029405",
            "extra": "mean: 718.0105200002629 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2074.8320547958583,
            "unit": "iter/sec",
            "range": "stddev: 0.00003579246736392667",
            "extra": "mean: 481.9667199996047 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1912.202704350596,
            "unit": "iter/sec",
            "range": "stddev: 0.00002691664664147096",
            "extra": "mean: 522.9571099992825 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2825.653771513451,
            "unit": "iter/sec",
            "range": "stddev: 0.000038516225142643334",
            "extra": "mean: 353.9003999999579 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2603.3649116309093,
            "unit": "iter/sec",
            "range": "stddev: 0.000023203079579492313",
            "extra": "mean: 384.11825999972393 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1706.6124045841073,
            "unit": "iter/sec",
            "range": "stddev: 0.0016329896976963372",
            "extra": "mean: 585.9561299999427 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 324.6587101603672,
            "unit": "iter/sec",
            "range": "stddev: 0.00006753717056337292",
            "extra": "mean: 3.0801576200005343 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2472.732315310546,
            "unit": "iter/sec",
            "range": "stddev: 0.000020555901742861485",
            "extra": "mean: 404.41093999874056 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.95859028248603,
            "unit": "iter/sec",
            "range": "stddev: 0.00019217586932627253",
            "extra": "mean: 14.092726420000758 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1594.6859705308445,
            "unit": "iter/sec",
            "range": "stddev: 0.00002766181055699155",
            "extra": "mean: 627.0827100003373 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 546.6845867682883,
            "unit": "iter/sec",
            "range": "stddev: 0.000052717498075241455",
            "extra": "mean: 1.829208330001535 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 43.273550147764986,
            "unit": "iter/sec",
            "range": "stddev: 0.0033978195796179494",
            "extra": "mean: 23.108804260000113 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1018.7934899375359,
            "unit": "iter/sec",
            "range": "stddev: 0.00003430277964557116",
            "extra": "mean: 981.5531900005681 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1522.2837373672053,
            "unit": "iter/sec",
            "range": "stddev: 0.00003563573834701925",
            "extra": "mean: 656.9077600011042 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2271.7892819144236,
            "unit": "iter/sec",
            "range": "stddev: 0.000029961912531616084",
            "extra": "mean: 440.1816699994754 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1986.8150581749403,
            "unit": "iter/sec",
            "range": "stddev: 0.00008770541626472148",
            "extra": "mean: 503.318109999924 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 749.6210740425724,
            "unit": "iter/sec",
            "range": "stddev: 0.000037455688177549444",
            "extra": "mean: 1.3340073200012625 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 592.8663475308879,
            "unit": "iter/sec",
            "range": "stddev: 0.00010391383101022489",
            "extra": "mean: 1.6867207999993639 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 475.6424590686634,
            "unit": "iter/sec",
            "range": "stddev: 0.00008628474605575262",
            "extra": "mean: 2.102419540000824 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1777618903609,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 852508.1097066083,
            "unit": "iter/sec",
            "range": "stddev: 5.136711760112649e-7",
            "extra": "mean: 1.1730093691943309 usec\nrounds: 23908"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 522686.244276792,
            "unit": "iter/sec",
            "range": "stddev: 5.26917168174593e-7",
            "extra": "mean: 1.9131936433177748 usec\nrounds: 43136"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68981.21127614868,
            "unit": "iter/sec",
            "range": "stddev: 0.0000039928200587111196",
            "extra": "mean: 14.496701079903556 usec\nrounds: 12408"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 62697.44173889608,
            "unit": "iter/sec",
            "range": "stddev: 0.000003114262260049674",
            "extra": "mean: 15.94961408735793 usec\nrounds: 23127"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 61484.298638218155,
            "unit": "iter/sec",
            "range": "stddev: 0.0000025502395990956194",
            "extra": "mean: 16.264314990142992 usec\nrounds: 14156"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59748.845388925605,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024161019194119357",
            "extra": "mean: 16.736725094696958 usec\nrounds: 11102"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1406.3063643200503,
            "unit": "iter/sec",
            "range": "stddev: 0.00004007071039853663",
            "extra": "mean: 711.082609999778 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2080.748480177786,
            "unit": "iter/sec",
            "range": "stddev: 0.00003180928224753784",
            "extra": "mean: 480.5962900016425 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1883.978144954367,
            "unit": "iter/sec",
            "range": "stddev: 0.00003494190577057545",
            "extra": "mean: 530.7917199985468 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2955.191902761686,
            "unit": "iter/sec",
            "range": "stddev: 0.000019600677566694617",
            "extra": "mean: 338.38750000143136 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2244.602606131769,
            "unit": "iter/sec",
            "range": "stddev: 0.00020876575254792607",
            "extra": "mean: 445.5131599991091 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1734.847684189228,
            "unit": "iter/sec",
            "range": "stddev: 0.001461352596157216",
            "extra": "mean: 576.4194800002542 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 324.85130759746795,
            "unit": "iter/sec",
            "range": "stddev: 0.00008998140755451113",
            "extra": "mean: 3.0783314600017775 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2374.316618259108,
            "unit": "iter/sec",
            "range": "stddev: 0.00002525152983709571",
            "extra": "mean: 421.1738199992965 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.54072899245834,
            "unit": "iter/sec",
            "range": "stddev: 0.0005269933207158099",
            "extra": "mean: 14.380062079999902 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1532.5617416261534,
            "unit": "iter/sec",
            "range": "stddev: 0.00005547695389013587",
            "extra": "mean: 652.5022599996078 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 531.8834304489708,
            "unit": "iter/sec",
            "range": "stddev: 0.00003985243062415405",
            "extra": "mean: 1.8801112099993134 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.45235597984316,
            "unit": "iter/sec",
            "range": "stddev: 0.003066240961839812",
            "extra": "mean: 23.555818680000016 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1004.2915991188414,
            "unit": "iter/sec",
            "range": "stddev: 0.00005719436009788431",
            "extra": "mean: 995.7267400000092 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1506.6552124679606,
            "unit": "iter/sec",
            "range": "stddev: 0.000028010749820340517",
            "extra": "mean: 663.7218600013739 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2247.0995618566685,
            "unit": "iter/sec",
            "range": "stddev: 0.000022922645598135988",
            "extra": "mean: 445.0181100003192 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1975.279846776582,
            "unit": "iter/sec",
            "range": "stddev: 0.00009174401706046903",
            "extra": "mean: 506.25738000206866 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 702.9084284227705,
            "unit": "iter/sec",
            "range": "stddev: 0.00005683911189026317",
            "extra": "mean: 1.4226604199978965 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 583.4917737173137,
            "unit": "iter/sec",
            "range": "stddev: 0.00009437841668951359",
            "extra": "mean: 1.7138202199993202 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 467.02610303205233,
            "unit": "iter/sec",
            "range": "stddev: 0.00007625245086534114",
            "extra": "mean: 2.1412079400010953 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1777704352355,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 863853.2695999627,
            "unit": "iter/sec",
            "range": "stddev: 3.366736967810787e-7",
            "extra": "mean: 1.157603999650409 usec\nrounds: 23553"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 513223.1021070963,
            "unit": "iter/sec",
            "range": "stddev: 5.252193963985758e-7",
            "extra": "mean: 1.9484703550841445 usec\nrounds: 40378"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68565.18272056499,
            "unit": "iter/sec",
            "range": "stddev: 0.000002249126373436163",
            "extra": "mean: 14.584661781993129 usec\nrounds: 16105"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 63021.51142385751,
            "unit": "iter/sec",
            "range": "stddev: 0.000002745419433173481",
            "extra": "mean: 15.867597863123269 usec\nrounds: 21995"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 60370.85739899942,
            "unit": "iter/sec",
            "range": "stddev: 0.000004242262812776769",
            "extra": "mean: 16.564283548117604 usec\nrounds: 18399"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 56896.042700333404,
            "unit": "iter/sec",
            "range": "stddev: 0.000004078376005238201",
            "extra": "mean: 17.575914818310203 usec\nrounds: 22857"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1421.6496803001103,
            "unit": "iter/sec",
            "range": "stddev: 0.000027505885197034442",
            "extra": "mean: 703.4081699993067 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2134.841727107168,
            "unit": "iter/sec",
            "range": "stddev: 0.000026314619197702524",
            "extra": "mean: 468.4187999993128 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1875.9745218586058,
            "unit": "iter/sec",
            "range": "stddev: 0.000037836430079559776",
            "extra": "mean: 533.0562800017447 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2995.4669299443112,
            "unit": "iter/sec",
            "range": "stddev: 0.000016552122730776297",
            "extra": "mean: 333.8377699995476 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2616.1928418878533,
            "unit": "iter/sec",
            "range": "stddev: 0.000033103339863378385",
            "extra": "mean: 382.2348199983594 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1670.0186724813627,
            "unit": "iter/sec",
            "range": "stddev: 0.001753707636137504",
            "extra": "mean: 598.7956999990729 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 325.21699469770783,
            "unit": "iter/sec",
            "range": "stddev: 0.00015748123503673414",
            "extra": "mean: 3.0748700600025813 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2406.4831618970534,
            "unit": "iter/sec",
            "range": "stddev: 0.000038616842988922785",
            "extra": "mean: 415.5441500000734 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 67.44098612253082,
            "unit": "iter/sec",
            "range": "stddev: 0.0003215196386981653",
            "extra": "mean: 14.827778439999975 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1521.0381633026857,
            "unit": "iter/sec",
            "range": "stddev: 0.000040539937233773",
            "extra": "mean: 657.4457000004941 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 515.6971588437854,
            "unit": "iter/sec",
            "range": "stddev: 0.000059082312100066095",
            "extra": "mean: 1.9391225700022119 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 41.3937011819245,
            "unit": "iter/sec",
            "range": "stddev: 0.003802974785507642",
            "extra": "mean: 24.158264939997025 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1005.0553985032763,
            "unit": "iter/sec",
            "range": "stddev: 0.000048021305832240514",
            "extra": "mean: 994.9700299995355 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1506.998289071413,
            "unit": "iter/sec",
            "range": "stddev: 0.00003664407304204929",
            "extra": "mean: 663.5707600014484 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2259.1288062915255,
            "unit": "iter/sec",
            "range": "stddev: 0.00003656767786106132",
            "extra": "mean: 442.6485099986621 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2027.1208087569614,
            "unit": "iter/sec",
            "range": "stddev: 0.00008782591439047227",
            "extra": "mean: 493.3105100002422 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 726.1881982079849,
            "unit": "iter/sec",
            "range": "stddev: 0.000031717501643014666",
            "extra": "mean: 1.377053499998624 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 589.5811135860815,
            "unit": "iter/sec",
            "range": "stddev: 0.00011473626841598881",
            "extra": "mean: 1.6961194599969076 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 460.9497988611648,
            "unit": "iter/sec",
            "range": "stddev: 0.00011226043736349876",
            "extra": "mean: 2.1694336399986014 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1777791463703,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 812011.6012215016,
            "unit": "iter/sec",
            "range": "stddev: 5.360772088455285e-7",
            "extra": "mean: 1.231509498750645 usec\nrounds: 21845"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 493460.2545411097,
            "unit": "iter/sec",
            "range": "stddev: 5.105215382056812e-7",
            "extra": "mean: 2.026505662406274 usec\nrounds: 37175"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 71875.70545966759,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015794865986170573",
            "extra": "mean: 13.912906921812978 usec\nrounds: 15675"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66719.03988471886,
            "unit": "iter/sec",
            "range": "stddev: 0.0000025854004059405915",
            "extra": "mean: 14.988225276140957 usec\nrounds: 21902"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64448.96203473338,
            "unit": "iter/sec",
            "range": "stddev: 0.00000570762012576231",
            "extra": "mean: 15.516153688574093 usec\nrounds: 20483"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 62019.263159805625,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015079836415196588",
            "extra": "mean: 16.124022586712947 usec\nrounds: 14212"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1512.5966477407164,
            "unit": "iter/sec",
            "range": "stddev: 0.000046595462104886254",
            "extra": "mean: 661.1147800001049 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2302.7044549955567,
            "unit": "iter/sec",
            "range": "stddev: 0.00004784366439938455",
            "extra": "mean: 434.27197000056594 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1963.988387479891,
            "unit": "iter/sec",
            "range": "stddev: 0.000029610985503840846",
            "extra": "mean: 509.1679800017345 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3529.030670912757,
            "unit": "iter/sec",
            "range": "stddev: 0.0000330327366608279",
            "extra": "mean: 283.36392999989357 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3117.588809429631,
            "unit": "iter/sec",
            "range": "stddev: 0.0000531618515394211",
            "extra": "mean: 320.76070999977446 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1899.265322383427,
            "unit": "iter/sec",
            "range": "stddev: 0.0015420256857861456",
            "extra": "mean: 526.5193800016732 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 341.5146374980437,
            "unit": "iter/sec",
            "range": "stddev: 0.00008552139441341242",
            "extra": "mean: 2.9281321800027627 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2630.0726770718798,
            "unit": "iter/sec",
            "range": "stddev: 0.00002525547266424272",
            "extra": "mean: 380.2176299984694 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 80.6272175730056,
            "unit": "iter/sec",
            "range": "stddev: 0.00015833589189030234",
            "extra": "mean: 12.40275964000034 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1860.5597538637812,
            "unit": "iter/sec",
            "range": "stddev: 0.000055974225590669656",
            "extra": "mean: 537.4726600010149 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 647.3285169632759,
            "unit": "iter/sec",
            "range": "stddev: 0.000030487063166849326",
            "extra": "mean: 1.5448106699997766 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 48.401761680474905,
            "unit": "iter/sec",
            "range": "stddev: 0.0035617846322449818",
            "extra": "mean: 20.66040501999737 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1169.228825071059,
            "unit": "iter/sec",
            "range": "stddev: 0.00004041396727687287",
            "extra": "mean: 855.2645800014602 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1793.8592395295689,
            "unit": "iter/sec",
            "range": "stddev: 0.00007319300802684883",
            "extra": "mean: 557.4573399985638 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2348.032958870184,
            "unit": "iter/sec",
            "range": "stddev: 0.0000337211798919467",
            "extra": "mean: 425.888399999792 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2040.5792028941298,
            "unit": "iter/sec",
            "range": "stddev: 0.00009755858700568452",
            "extra": "mean: 490.0569400010113 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 876.2766737744996,
            "unit": "iter/sec",
            "range": "stddev: 0.000036603098270047476",
            "extra": "mean: 1.1411920799997688 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 684.0012089852711,
            "unit": "iter/sec",
            "range": "stddev: 0.00011174971097946225",
            "extra": "mean: 1.4619857200011666 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 537.8000799413146,
            "unit": "iter/sec",
            "range": "stddev: 0.00010657155047036582",
            "extra": "mean: 1.8594270199980656 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1777878622286,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 872964.7365044287,
            "unit": "iter/sec",
            "range": "stddev: 3.161143125773948e-7",
            "extra": "mean: 1.145521643868746 usec\nrounds: 20537"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 495765.4653605137,
            "unit": "iter/sec",
            "range": "stddev: 4.163145168016117e-7",
            "extra": "mean: 2.017082814093987 usec\nrounds: 24235"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69684.50988068178,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015812658172327026",
            "extra": "mean: 14.350391524777358 usec\nrounds: 15787"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65022.30152047867,
            "unit": "iter/sec",
            "range": "stddev: 0.000001582307598728926",
            "extra": "mean: 15.379338728652224 usec\nrounds: 21994"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63800.06630552646,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018554897279561576",
            "extra": "mean: 15.673964901716385 usec\nrounds: 19887"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59623.46547940198,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015217318503458869",
            "extra": "mean: 16.771920115000164 usec\nrounds: 21218"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1658.9767839304175,
            "unit": "iter/sec",
            "range": "stddev: 0.000057430377612371457",
            "extra": "mean: 602.7811900000302 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2507.8835947736225,
            "unit": "iter/sec",
            "range": "stddev: 0.00003962219353741106",
            "extra": "mean: 398.7425900005803 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2119.951296236014,
            "unit": "iter/sec",
            "range": "stddev: 0.00004117448356760741",
            "extra": "mean: 471.7089500006466 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3546.179897208124,
            "unit": "iter/sec",
            "range": "stddev: 0.000014903939582101822",
            "extra": "mean: 281.9935900001269 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3158.641905272071,
            "unit": "iter/sec",
            "range": "stddev: 0.000036755756655079694",
            "extra": "mean: 316.5917600000512 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1959.207996437291,
            "unit": "iter/sec",
            "range": "stddev: 0.0016132962110832051",
            "extra": "mean: 510.41032999989966 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 332.42000935755476,
            "unit": "iter/sec",
            "range": "stddev: 0.00007272811347308554",
            "extra": "mean: 3.0082425000006197 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3007.8467201320213,
            "unit": "iter/sec",
            "range": "stddev: 0.000026071262494438178",
            "extra": "mean: 332.4637499999028 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 80.89377054967119,
            "unit": "iter/sec",
            "range": "stddev: 0.0001445775450655153",
            "extra": "mean: 12.361891319999359 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1966.8142190375547,
            "unit": "iter/sec",
            "range": "stddev: 0.000026635284924299125",
            "extra": "mean: 508.436429999648 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 639.3915815697889,
            "unit": "iter/sec",
            "range": "stddev: 0.000039203168537082745",
            "extra": "mean: 1.5639868099997045 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 47.81746358840522,
            "unit": "iter/sec",
            "range": "stddev: 0.004064622703377792",
            "extra": "mean: 20.912861639998823 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1189.4989321394228,
            "unit": "iter/sec",
            "range": "stddev: 0.000041318272654035634",
            "extra": "mean: 840.6901199998629 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1949.755844747369,
            "unit": "iter/sec",
            "range": "stddev: 0.0000312844697949337",
            "extra": "mean: 512.8847300004225 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2373.7172906533096,
            "unit": "iter/sec",
            "range": "stddev: 0.00003780298369744325",
            "extra": "mean: 421.2801599994975 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2396.033644243349,
            "unit": "iter/sec",
            "range": "stddev: 0.00010485365138805306",
            "extra": "mean: 417.35640999974066 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 873.4674598522215,
            "unit": "iter/sec",
            "range": "stddev: 0.000034492032998305465",
            "extra": "mean: 1.1448623399996904 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 697.3997242063716,
            "unit": "iter/sec",
            "range": "stddev: 0.00010859370252314532",
            "extra": "mean: 1.433897899999863 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 528.9348857245782,
            "unit": "iter/sec",
            "range": "stddev: 0.00009268926193042922",
            "extra": "mean: 1.890591880000727 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1777964032522,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 876268.4832193938,
            "unit": "iter/sec",
            "range": "stddev: 3.4465189426602927e-7",
            "extra": "mean: 1.1412027468179833 usec\nrounds: 23009"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 513604.983947246,
            "unit": "iter/sec",
            "range": "stddev: 5.510165213015623e-7",
            "extra": "mean: 1.9470216046476552 usec\nrounds: 44759"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68477.45124146607,
            "unit": "iter/sec",
            "range": "stddev: 0.0000025051958188529592",
            "extra": "mean: 14.603347260600968 usec\nrounds: 13762"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64324.96785641209,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021650485823899743",
            "extra": "mean: 15.546062956956725 usec\nrounds: 23794"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 62860.95680949462,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023823644637703347",
            "extra": "mean: 15.908125659470688 usec\nrounds: 22370"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 57681.54506027524,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024169403986729955",
            "extra": "mean: 17.336567509678083 usec\nrounds: 22893"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1473.9949193463187,
            "unit": "iter/sec",
            "range": "stddev: 0.000032984088316509855",
            "extra": "mean: 678.4283899997945 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2074.591222029689,
            "unit": "iter/sec",
            "range": "stddev: 0.00003091698793830301",
            "extra": "mean: 482.0226699993668 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1910.7909780444782,
            "unit": "iter/sec",
            "range": "stddev: 0.000028008925402553977",
            "extra": "mean: 523.3434799987435 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3097.6683045316713,
            "unit": "iter/sec",
            "range": "stddev: 0.000030811419168920724",
            "extra": "mean: 322.82345999959716 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2681.988905044356,
            "unit": "iter/sec",
            "range": "stddev: 0.000022013921899503986",
            "extra": "mean: 372.8576199995359 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1754.4979141924669,
            "unit": "iter/sec",
            "range": "stddev: 0.0015187226691019738",
            "extra": "mean: 569.9636299996769 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 320.72163085348086,
            "unit": "iter/sec",
            "range": "stddev: 0.00007104961629698732",
            "extra": "mean: 3.117968680001013 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2498.74257027195,
            "unit": "iter/sec",
            "range": "stddev: 0.000020762207790342806",
            "extra": "mean: 400.20128999969984 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 70.28522866137533,
            "unit": "iter/sec",
            "range": "stddev: 0.00022703981449072002",
            "extra": "mean: 14.22774057999959 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1635.6384686133156,
            "unit": "iter/sec",
            "range": "stddev: 0.000033581821444393486",
            "extra": "mean: 611.3820500002021 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 542.1057904278531,
            "unit": "iter/sec",
            "range": "stddev: 0.00006558968021954966",
            "extra": "mean: 1.8446583999974564 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.14112900258631,
            "unit": "iter/sec",
            "range": "stddev: 0.0033727837218643156",
            "extra": "mean: 23.729786639997883 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1026.3567068055368,
            "unit": "iter/sec",
            "range": "stddev: 0.000038988247512857046",
            "extra": "mean: 974.3201299988868 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1534.9641816091053,
            "unit": "iter/sec",
            "range": "stddev: 0.000020463318512976872",
            "extra": "mean: 651.4810000007287 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2302.8048347135955,
            "unit": "iter/sec",
            "range": "stddev: 0.00002610136996132571",
            "extra": "mean: 434.2530399995326 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2035.5470844231147,
            "unit": "iter/sec",
            "range": "stddev: 0.00008473775882541228",
            "extra": "mean: 491.2684199999262 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 741.7943964916973,
            "unit": "iter/sec",
            "range": "stddev: 0.00003403881762424067",
            "extra": "mean: 1.3480824399988478 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 593.9938901786286,
            "unit": "iter/sec",
            "range": "stddev: 0.0000968298168037111",
            "extra": "mean: 1.683519000000615 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 467.9417330181286,
            "unit": "iter/sec",
            "range": "stddev: 0.00010858011627099954",
            "extra": "mean: 2.1370182000015348 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1778051218196,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 1126940.2235196473,
            "unit": "iter/sec",
            "range": "stddev: 2.3461308785913706e-7",
            "extra": "mean: 887.3585121283639 nsec\nrounds: 22797"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 624986.5263243234,
            "unit": "iter/sec",
            "range": "stddev: 3.2072501766183943e-7",
            "extra": "mean: 1.6000344933533355 usec\nrounds: 42327"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 89621.18455049036,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011308872510003287",
            "extra": "mean: 11.158076129161458 usec\nrounds: 18311"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 84893.47635075224,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015497437302946501",
            "extra": "mean: 11.779468140382484 usec\nrounds: 22348"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 83184.16989563742,
            "unit": "iter/sec",
            "range": "stddev: 0.000001159401384887713",
            "extra": "mean: 12.021518051506634 usec\nrounds: 19749"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 76975.63217572425,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017808001131693442",
            "extra": "mean: 12.991124226393419 usec\nrounds: 22459"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1890.4729182474657,
            "unit": "iter/sec",
            "range": "stddev: 0.00004224870022758197",
            "extra": "mean: 528.9681700000415 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 3234.82346985864,
            "unit": "iter/sec",
            "range": "stddev: 0.000028202785823346117",
            "extra": "mean: 309.1358800001842 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2688.9337630095356,
            "unit": "iter/sec",
            "range": "stddev: 0.00003587173101275667",
            "extra": "mean: 371.8946200001483 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4585.31531676867,
            "unit": "iter/sec",
            "range": "stddev: 0.000010366270692286344",
            "extra": "mean: 218.08751000023108 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3891.466682909513,
            "unit": "iter/sec",
            "range": "stddev: 0.00002594790317461986",
            "extra": "mean: 256.9725199991524 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 2291.5286927673174,
            "unit": "iter/sec",
            "range": "stddev: 0.0015755304914510978",
            "extra": "mean: 436.3899100003721 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 431.86940545574066,
            "unit": "iter/sec",
            "range": "stddev: 0.00005951921769618057",
            "extra": "mean: 2.3155148000000736 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3870.865301350666,
            "unit": "iter/sec",
            "range": "stddev: 0.00003588242077632965",
            "extra": "mean: 258.34017000050835 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 104.02483249177223,
            "unit": "iter/sec",
            "range": "stddev: 0.00015777189363578832",
            "extra": "mean: 9.613089260000436 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 2177.677822363585,
            "unit": "iter/sec",
            "range": "stddev: 0.000019920000296068202",
            "extra": "mean: 459.2047500004526 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 784.9338725002162,
            "unit": "iter/sec",
            "range": "stddev: 0.00004386931826549707",
            "extra": "mean: 1.2739926700000126 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 61.194630113444205,
            "unit": "iter/sec",
            "range": "stddev: 0.0035216894927680075",
            "extra": "mean: 16.341303119998827 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1566.5029044511803,
            "unit": "iter/sec",
            "range": "stddev: 0.000029839311421644305",
            "extra": "mean: 638.3646000007559 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 2289.8939309663024,
            "unit": "iter/sec",
            "range": "stddev: 0.000024282688694710176",
            "extra": "mean: 436.7014500003563 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2971.6664677602207,
            "unit": "iter/sec",
            "range": "stddev: 0.00003332595145784764",
            "extra": "mean: 336.5115200003288 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2959.6852978505663,
            "unit": "iter/sec",
            "range": "stddev: 0.00008081447546514481",
            "extra": "mean: 337.8737599994963 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 1051.4208070162997,
            "unit": "iter/sec",
            "range": "stddev: 0.0000427352512994539",
            "extra": "mean: 951.0939800000529 usec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 912.0131650922257,
            "unit": "iter/sec",
            "range": "stddev: 0.0000887085589295697",
            "extra": "mean: 1.0964754000002586 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 704.2316406037113,
            "unit": "iter/sec",
            "range": "stddev: 0.00009885141599268898",
            "extra": "mean: 1.4199873199999047 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1778137683767,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 1062943.6849350368,
            "unit": "iter/sec",
            "range": "stddev: 2.058803068481663e-7",
            "extra": "mean: 940.7836126907479 nsec\nrounds: 21651"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 600686.2010868749,
            "unit": "iter/sec",
            "range": "stddev: 3.2460413352828634e-7",
            "extra": "mean: 1.6647627300087986 usec\nrounds: 47663"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 91138.25129423806,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011656283143833331",
            "extra": "mean: 10.97234131442263 usec\nrounds: 18335"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 84121.82112326345,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010023014956523862",
            "extra": "mean: 11.88752200852503 usec\nrounds: 21787"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 83593.23708262028,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010250843450437315",
            "extra": "mean: 11.96269022351221 usec\nrounds: 23843"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 77727.18611653698,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010456645664005799",
            "extra": "mean: 12.865511411936259 usec\nrounds: 23791"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 2262.5986982273257,
            "unit": "iter/sec",
            "range": "stddev: 0.000052750208938276824",
            "extra": "mean: 441.96967000090126 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 3263.831137201646,
            "unit": "iter/sec",
            "range": "stddev: 0.000025526447167619288",
            "extra": "mean: 306.3884000007988 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2779.98779085103,
            "unit": "iter/sec",
            "range": "stddev: 0.00003392051202174199",
            "extra": "mean: 359.7138099998176 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4690.025652100944,
            "unit": "iter/sec",
            "range": "stddev: 0.000010560069614059696",
            "extra": "mean: 213.2184499997436 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 4342.907272412961,
            "unit": "iter/sec",
            "range": "stddev: 0.000018298655924153225",
            "extra": "mean: 230.26050000012788 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 2252.44822539296,
            "unit": "iter/sec",
            "range": "stddev: 0.0016765124717776924",
            "extra": "mean: 443.96137000020985 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 442.62882820487056,
            "unit": "iter/sec",
            "range": "stddev: 0.000056404274113694285",
            "extra": "mean: 2.2592292600000974 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3760.805405062731,
            "unit": "iter/sec",
            "range": "stddev: 0.000022926248366726227",
            "extra": "mean: 265.90048999977967 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 102.8969305483486,
            "unit": "iter/sec",
            "range": "stddev: 0.0001414017609599846",
            "extra": "mean: 9.718462879999379 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 2437.080847981885,
            "unit": "iter/sec",
            "range": "stddev: 0.0000450338293753474",
            "extra": "mean: 410.32697000105145 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 818.7013794741889,
            "unit": "iter/sec",
            "range": "stddev: 0.000037582402257750445",
            "extra": "mean: 1.221446579999963 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 61.96495591994758,
            "unit": "iter/sec",
            "range": "stddev: 0.003471608045781966",
            "extra": "mean: 16.138153979999572 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1519.3940316256992,
            "unit": "iter/sec",
            "range": "stddev: 0.00008019906337955876",
            "extra": "mean: 658.1571200000269 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 2352.517778626104,
            "unit": "iter/sec",
            "range": "stddev: 0.00006263518249668504",
            "extra": "mean: 425.0764899995829 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 3411.317530322511,
            "unit": "iter/sec",
            "range": "stddev: 0.00002531936252607636",
            "extra": "mean: 293.1418699992605 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2992.8117151898296,
            "unit": "iter/sec",
            "range": "stddev: 0.00007661520925054624",
            "extra": "mean: 334.1339499991136 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 1092.1865997311731,
            "unit": "iter/sec",
            "range": "stddev: 0.00003844064616642799",
            "extra": "mean: 915.5944599999088 usec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 893.594118649538,
            "unit": "iter/sec",
            "range": "stddev: 0.00007909709256057256",
            "extra": "mean: 1.1190762999999038 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 698.1319970456121,
            "unit": "iter/sec",
            "range": "stddev: 0.00007851265458835913",
            "extra": "mean: 1.4323938799995517 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1778222589440,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 894027.6764360575,
            "unit": "iter/sec",
            "range": "stddev: 3.429786697571013e-7",
            "extra": "mean: 1.1185336051187917 usec\nrounds: 23553"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 521115.9532464821,
            "unit": "iter/sec",
            "range": "stddev: 5.369880558786159e-7",
            "extra": "mean: 1.9189587149848992 usec\nrounds: 38658"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68889.85341180276,
            "unit": "iter/sec",
            "range": "stddev: 0.0000026357220469190216",
            "extra": "mean: 14.515925792762275 usec\nrounds: 15012"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64324.618206437015,
            "unit": "iter/sec",
            "range": "stddev: 0.000002650526512901459",
            "extra": "mean: 15.546147460847722 usec\nrounds: 17408"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 63309.08218058111,
            "unit": "iter/sec",
            "range": "stddev: 0.000002559264759986914",
            "extra": "mean: 15.79552199394752 usec\nrounds: 17914"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 58467.95767193756,
            "unit": "iter/sec",
            "range": "stddev: 0.000002765162097249385",
            "extra": "mean: 17.103385167153917 usec\nrounds: 22315"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1330.3144419001421,
            "unit": "iter/sec",
            "range": "stddev: 0.00006647099896109839",
            "extra": "mean: 751.7019800008029 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2018.4289832750846,
            "unit": "iter/sec",
            "range": "stddev: 0.00004130595877018025",
            "extra": "mean: 495.43481999421596 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1847.9679707254304,
            "unit": "iter/sec",
            "range": "stddev: 0.00004838610950395067",
            "extra": "mean: 541.134919999422 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2948.141107122902,
            "unit": "iter/sec",
            "range": "stddev: 0.000021678783738326196",
            "extra": "mean: 339.19678999893677 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2569.2955056003807,
            "unit": "iter/sec",
            "range": "stddev: 0.00003452340264927357",
            "extra": "mean: 389.21174999927644 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1620.1806592324126,
            "unit": "iter/sec",
            "range": "stddev: 0.001742602993931706",
            "extra": "mean: 617.2151199939435 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 315.8715258019254,
            "unit": "iter/sec",
            "range": "stddev: 0.00007669093664258002",
            "extra": "mean: 3.1658440799981236 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2402.2383287924595,
            "unit": "iter/sec",
            "range": "stddev: 0.00004489355884528855",
            "extra": "mean: 416.27843000185294 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 68.22650775387206,
            "unit": "iter/sec",
            "range": "stddev: 0.00029320045317531615",
            "extra": "mean: 14.657059739998886 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1557.363741379435,
            "unit": "iter/sec",
            "range": "stddev: 0.000036898561136654244",
            "extra": "mean: 642.1107500000289 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 523.656090579809,
            "unit": "iter/sec",
            "range": "stddev: 0.00014555714313353586",
            "extra": "mean: 1.909650280001074 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 40.83224654022609,
            "unit": "iter/sec",
            "range": "stddev: 0.004466496811399513",
            "extra": "mean: 24.490447739995034 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 998.5992049764835,
            "unit": "iter/sec",
            "range": "stddev: 0.000046186928638795914",
            "extra": "mean: 1.0014027600027475 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1488.5608785512493,
            "unit": "iter/sec",
            "range": "stddev: 0.00003991549136785067",
            "extra": "mean: 671.7897899972058 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2192.474340599865,
            "unit": "iter/sec",
            "range": "stddev: 0.000029128003516059652",
            "extra": "mean: 456.10567999915475 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1896.054572086466,
            "unit": "iter/sec",
            "range": "stddev: 0.00011759745997974732",
            "extra": "mean: 527.4109800012639 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 707.8324162549424,
            "unit": "iter/sec",
            "range": "stddev: 0.00005236980565110563",
            "extra": "mean: 1.4127637800072534 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 558.000446914158,
            "unit": "iter/sec",
            "range": "stddev: 0.0001229841800361193",
            "extra": "mean: 1.7921132599985867 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 461.28359596433563,
            "unit": "iter/sec",
            "range": "stddev: 0.00009975226049685331",
            "extra": "mean: 2.167863780001653 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1778309383427,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 863434.7281948028,
            "unit": "iter/sec",
            "range": "stddev: 3.583450376886225e-7",
            "extra": "mean: 1.1581651366869579 usec\nrounds: 21679"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 489152.11338586,
            "unit": "iter/sec",
            "range": "stddev: 4.772814787506103e-7",
            "extra": "mean: 2.0443538372513697 usec\nrounds: 38009"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 69586.81326639581,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022514734771371492",
            "extra": "mean: 14.370538799811808 usec\nrounds: 15915"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 67438.18472054251,
            "unit": "iter/sec",
            "range": "stddev: 0.000001503984478415139",
            "extra": "mean: 14.828394390268745 usec\nrounds: 20964"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 66264.9629430423,
            "unit": "iter/sec",
            "range": "stddev: 0.000001538063085789758",
            "extra": "mean: 15.090931249136062 usec\nrounds: 20407"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 61424.127880134685,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015936463305455458",
            "extra": "mean: 16.280247429014167 usec\nrounds: 20907"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1691.0471415378152,
            "unit": "iter/sec",
            "range": "stddev: 0.0000611850609783142",
            "extra": "mean: 591.349570001114 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2173.6276839686875,
            "unit": "iter/sec",
            "range": "stddev: 0.00004569788522045946",
            "extra": "mean: 460.0603899993416 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2152.4249176019043,
            "unit": "iter/sec",
            "range": "stddev: 0.00003261047487368393",
            "extra": "mean: 464.59228000117037 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3858.1607391617704,
            "unit": "iter/sec",
            "range": "stddev: 0.000014778821913980397",
            "extra": "mean: 259.1908599995918 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3116.3410516071904,
            "unit": "iter/sec",
            "range": "stddev: 0.000030524351452126144",
            "extra": "mean: 320.8891400009861 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1980.8370653007914,
            "unit": "iter/sec",
            "range": "stddev: 0.0015800494948683115",
            "extra": "mean: 504.8370799988788 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 343.6058517615903,
            "unit": "iter/sec",
            "range": "stddev: 0.00007010199890550398",
            "extra": "mean: 2.9103113200000053 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 3051.3093534482387,
            "unit": "iter/sec",
            "range": "stddev: 0.00003067582614610286",
            "extra": "mean: 327.7281600011861 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 80.18955810771625,
            "unit": "iter/sec",
            "range": "stddev: 0.0006398525666617753",
            "extra": "mean: 12.470451559998992 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1878.6373236525055,
            "unit": "iter/sec",
            "range": "stddev: 0.00004119433621385118",
            "extra": "mean: 532.3007200004781 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 610.3918392711454,
            "unit": "iter/sec",
            "range": "stddev: 0.00006265689213925371",
            "extra": "mean: 1.6382918899998344 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 47.94407971305511,
            "unit": "iter/sec",
            "range": "stddev: 0.0033988836971170187",
            "extra": "mean: 20.857632599999647 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1213.685866516964,
            "unit": "iter/sec",
            "range": "stddev: 0.00003043574752643122",
            "extra": "mean: 823.9364300004581 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1767.8931336936703,
            "unit": "iter/sec",
            "range": "stddev: 0.00004154348388787212",
            "extra": "mean: 565.6450499984089 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2393.4856978498715,
            "unit": "iter/sec",
            "range": "stddev: 0.00002144862699468132",
            "extra": "mean: 417.80069999930447 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2211.904914634152,
            "unit": "iter/sec",
            "range": "stddev: 0.00010683568737496778",
            "extra": "mean: 452.098999999464 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 871.4584191271159,
            "unit": "iter/sec",
            "range": "stddev: 0.00004902623298637501",
            "extra": "mean: 1.1475016800017102 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 689.1222860310826,
            "unit": "iter/sec",
            "range": "stddev: 0.00011146782519800896",
            "extra": "mean: 1.4511212600007184 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 546.6981824307655,
            "unit": "iter/sec",
            "range": "stddev: 0.00008212248788951412",
            "extra": "mean: 1.8291628400038462 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1778396469239,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 870272.6520498359,
            "unit": "iter/sec",
            "range": "stddev: 3.6497820718934584e-7",
            "extra": "mean: 1.1490651781882435 usec\nrounds: 24410"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 511616.39479084325,
            "unit": "iter/sec",
            "range": "stddev: 5.161620009162455e-7",
            "extra": "mean: 1.9545894349394641 usec\nrounds: 35892"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68760.84736317396,
            "unit": "iter/sec",
            "range": "stddev: 0.000002556214942215739",
            "extra": "mean: 14.54315992818272 usec\nrounds: 16151"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65005.26900810331,
            "unit": "iter/sec",
            "range": "stddev: 0.00000262068307576135",
            "extra": "mean: 15.383368383189735 usec\nrounds: 11127"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64299.536610837604,
            "unit": "iter/sec",
            "range": "stddev: 0.000002584150575561507",
            "extra": "mean: 15.552211613161939 usec\nrounds: 20873"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 60517.16333288263,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028387192339813637",
            "extra": "mean: 16.52423783480016 usec\nrounds: 19564"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1356.3184093102896,
            "unit": "iter/sec",
            "range": "stddev: 0.000043203636916596564",
            "extra": "mean: 737.2899999997173 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2062.3666267494414,
            "unit": "iter/sec",
            "range": "stddev: 0.000032473518122338645",
            "extra": "mean: 484.8798400001897 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1863.4001014426917,
            "unit": "iter/sec",
            "range": "stddev: 0.00004795138926019287",
            "extra": "mean: 536.6534000002332 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2960.1367559510077,
            "unit": "iter/sec",
            "range": "stddev: 0.00003179567265495425",
            "extra": "mean: 337.82222999988676 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2544.288040272002,
            "unit": "iter/sec",
            "range": "stddev: 0.000028317364538243213",
            "extra": "mean: 393.03726000028405 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1594.7134865192195,
            "unit": "iter/sec",
            "range": "stddev: 0.0018567766443928903",
            "extra": "mean: 627.0718899999395 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 321.7775734532756,
            "unit": "iter/sec",
            "range": "stddev: 0.00007772751744192725",
            "extra": "mean: 3.107736780000323 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2395.8682581109506,
            "unit": "iter/sec",
            "range": "stddev: 0.000027881334337464872",
            "extra": "mean: 417.38521999889144 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 69.70246243688149,
            "unit": "iter/sec",
            "range": "stddev: 0.000702763603457705",
            "extra": "mean: 14.346695440000303 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1605.3586615281504,
            "unit": "iter/sec",
            "range": "stddev: 0.000029347775331475582",
            "extra": "mean: 622.9137599993351 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 540.1399523140623,
            "unit": "iter/sec",
            "range": "stddev: 0.00012949668792486068",
            "extra": "mean: 1.851372030000391 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 42.531204087537695,
            "unit": "iter/sec",
            "range": "stddev: 0.0038379493618198673",
            "extra": "mean: 23.512148820000505 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1017.0314734825636,
            "unit": "iter/sec",
            "range": "stddev: 0.0000402171444058189",
            "extra": "mean: 983.2537400005492 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1473.22020819221,
            "unit": "iter/sec",
            "range": "stddev: 0.000044260888340214424",
            "extra": "mean: 678.7851499994701 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2265.939804534359,
            "unit": "iter/sec",
            "range": "stddev: 0.00003480711358490549",
            "extra": "mean: 441.31799000084015 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 1987.9435596553865,
            "unit": "iter/sec",
            "range": "stddev: 0.00009819253149960222",
            "extra": "mean: 503.0323900007261 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 717.7836895401557,
            "unit": "iter/sec",
            "range": "stddev: 0.000051811238252117866",
            "extra": "mean: 1.3931773799995995 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 584.2783002617265,
            "unit": "iter/sec",
            "range": "stddev: 0.0001224250072583831",
            "extra": "mean: 1.711513159999356 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 459.07118276028444,
            "unit": "iter/sec",
            "range": "stddev: 0.00011244366712830898",
            "extra": "mean: 2.178311420000796 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1778484087589,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 880021.0136505897,
            "unit": "iter/sec",
            "range": "stddev: 3.7906983565207847e-7",
            "extra": "mean: 1.136336501615685 usec\nrounds: 20095"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 491837.3341167398,
            "unit": "iter/sec",
            "range": "stddev: 4.77678081557256e-7",
            "extra": "mean: 2.033192542806532 usec\nrounds: 40739"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 71589.2671831659,
            "unit": "iter/sec",
            "range": "stddev: 0.00000193908082646979",
            "extra": "mean: 13.968574331700221 usec\nrounds: 15747"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 66685.17471274144,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021595126754142145",
            "extra": "mean: 14.995836845411029 usec\nrounds: 22304"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 66577.40515814367,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014946440419144094",
            "extra": "mean: 15.020110766177574 usec\nrounds: 20295"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 61623.233820949055,
            "unit": "iter/sec",
            "range": "stddev: 0.0000026021045025927715",
            "extra": "mean: 16.227645613431704 usec\nrounds: 21897"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1769.007588506705,
            "unit": "iter/sec",
            "range": "stddev: 0.00006021102043592887",
            "extra": "mean: 565.2887000016449 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2396.514490151839,
            "unit": "iter/sec",
            "range": "stddev: 0.000047229584947749944",
            "extra": "mean: 417.2726700002727 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 2078.491401017212,
            "unit": "iter/sec",
            "range": "stddev: 0.00004890403522691908",
            "extra": "mean: 481.118179998532 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 4006.4622633800386,
            "unit": "iter/sec",
            "range": "stddev: 0.000010858498900942567",
            "extra": "mean: 249.5967599995197 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3209.7291255014748,
            "unit": "iter/sec",
            "range": "stddev: 0.00007043232950948868",
            "extra": "mean: 311.5527700001053 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 2026.0983347403048,
            "unit": "iter/sec",
            "range": "stddev: 0.0015330339012009097",
            "extra": "mean: 493.55945999934653 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 342.85426601597453,
            "unit": "iter/sec",
            "range": "stddev: 0.000054318604828049864",
            "extra": "mean: 2.9166911400000117 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2662.0435843135897,
            "unit": "iter/sec",
            "range": "stddev: 0.000033903393027405614",
            "extra": "mean: 375.65124999929367 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 80.94570669362733,
            "unit": "iter/sec",
            "range": "stddev: 0.00012227527796080206",
            "extra": "mean: 12.35395971999992 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1910.6190621708965,
            "unit": "iter/sec",
            "range": "stddev: 0.00002469699099662887",
            "extra": "mean: 523.3905699986963 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 627.1745552981183,
            "unit": "iter/sec",
            "range": "stddev: 0.00004846796002596637",
            "extra": "mean: 1.5944524399984061 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 48.41642716464647,
            "unit": "iter/sec",
            "range": "stddev: 0.003261571155742518",
            "extra": "mean: 20.654146919998198 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1095.4589381954913,
            "unit": "iter/sec",
            "range": "stddev: 0.00003577419769646137",
            "extra": "mean: 912.859409999669 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1920.1483644890259,
            "unit": "iter/sec",
            "range": "stddev: 0.00004391990704512016",
            "extra": "mean: 520.7930899996427 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2408.613297510357,
            "unit": "iter/sec",
            "range": "stddev: 0.000021856139264813557",
            "extra": "mean: 415.17664999759063 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2436.672110191128,
            "unit": "iter/sec",
            "range": "stddev: 0.00010136883613079275",
            "extra": "mean: 410.39580000017395 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 881.0805416690451,
            "unit": "iter/sec",
            "range": "stddev: 0.000056883750389927195",
            "extra": "mean: 1.1349700200003099 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 672.3599869161535,
            "unit": "iter/sec",
            "range": "stddev: 0.0001125999734741419",
            "extra": "mean: 1.4872984999993832 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 535.032127395183,
            "unit": "iter/sec",
            "range": "stddev: 0.000150261603581624",
            "extra": "mean: 1.869046639999965 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1778569578362,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 892113.0200531672,
            "unit": "iter/sec",
            "range": "stddev: 3.5062255506673413e-7",
            "extra": "mean: 1.120934206229165 usec\nrounds: 33529"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 527030.14324169,
            "unit": "iter/sec",
            "range": "stddev: 5.142663293225209e-7",
            "extra": "mean: 1.8974246783099302 usec\nrounds: 45538"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 67893.86082128991,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024124851278125097",
            "extra": "mean: 14.728872211762976 usec\nrounds: 10087"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 65372.82624055638,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023935940190659613",
            "extra": "mean: 15.296875743450942 usec\nrounds: 23202"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64259.05495942246,
            "unit": "iter/sec",
            "range": "stddev: 0.000002397366528211232",
            "extra": "mean: 15.562009130564835 usec\nrounds: 22671"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59452.12428239516,
            "unit": "iter/sec",
            "range": "stddev: 0.0000026994014466136113",
            "extra": "mean: 16.820256838091115 usec\nrounds: 20437"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1405.0695132845854,
            "unit": "iter/sec",
            "range": "stddev: 0.0000334639071452926",
            "extra": "mean: 711.7085600002326 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2058.220470813794,
            "unit": "iter/sec",
            "range": "stddev: 0.000026793373077791665",
            "extra": "mean: 485.8566000000053 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1897.4603328343485,
            "unit": "iter/sec",
            "range": "stddev: 0.000041720748687957056",
            "extra": "mean: 527.0202399995583 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 2973.5687797201663,
            "unit": "iter/sec",
            "range": "stddev: 0.00001993185433213184",
            "extra": "mean: 336.2962399995695 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2602.9603572277356,
            "unit": "iter/sec",
            "range": "stddev: 0.000025420589355596376",
            "extra": "mean: 384.1779599997608 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1689.2666043996603,
            "unit": "iter/sec",
            "range": "stddev: 0.0016615706653859573",
            "extra": "mean: 591.9728699990401 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 311.0111488103604,
            "unit": "iter/sec",
            "range": "stddev: 0.0004222852654644546",
            "extra": "mean: 3.215318820000732 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2477.368986574314,
            "unit": "iter/sec",
            "range": "stddev: 0.000022331972798933743",
            "extra": "mean: 403.65403999942373 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 72.03679870196123,
            "unit": "iter/sec",
            "range": "stddev: 0.0001745100590152717",
            "extra": "mean: 13.881793999998706 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1645.1470465303278,
            "unit": "iter/sec",
            "range": "stddev: 0.00002858604337038633",
            "extra": "mean: 607.8484000011031 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 547.8652111544412,
            "unit": "iter/sec",
            "range": "stddev: 0.00003133009931485065",
            "extra": "mean: 1.8252664700005994 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 43.16224023303993,
            "unit": "iter/sec",
            "range": "stddev: 0.0030063490724366016",
            "extra": "mean: 23.168398920001323 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1008.3009891382253,
            "unit": "iter/sec",
            "range": "stddev: 0.00003088835303623005",
            "extra": "mean: 991.7673500000035 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1515.5727984624325,
            "unit": "iter/sec",
            "range": "stddev: 0.000016364376539755157",
            "extra": "mean: 659.8165400002642 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2294.261208426412,
            "unit": "iter/sec",
            "range": "stddev: 0.000033135080218564715",
            "extra": "mean: 435.8701600006043 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2034.1155762106737,
            "unit": "iter/sec",
            "range": "stddev: 0.00007900660880427783",
            "extra": "mean: 491.6141499997195 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 739.9001155562075,
            "unit": "iter/sec",
            "range": "stddev: 0.00005045263850166535",
            "extra": "mean: 1.3515337799998406 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 588.0505009770953,
            "unit": "iter/sec",
            "range": "stddev: 0.00010941050094035307",
            "extra": "mean: 1.7005342200005202 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 466.56569251980267,
            "unit": "iter/sec",
            "range": "stddev: 0.00008891271409088896",
            "extra": "mean: 2.143320899998571 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1778656217025,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 859979.3756158984,
            "unit": "iter/sec",
            "range": "stddev: 2.9457236974643946e-7",
            "extra": "mean: 1.1628185842059549 usec\nrounds: 20781"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 487135.3466553011,
            "unit": "iter/sec",
            "range": "stddev: 4.904870345355089e-7",
            "extra": "mean: 2.052817572910808 usec\nrounds: 40312"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 68406.04541938326,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017203466674705823",
            "extra": "mean: 14.618591001266156 usec\nrounds: 12335"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 64712.53869189136,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016715419878225284",
            "extra": "mean: 15.45295579827565 usec\nrounds: 19773"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 64258.713414702375,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015634216130554814",
            "extra": "mean: 15.562091844982385 usec\nrounds: 20785"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 59586.68308381932,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017115973757546832",
            "extra": "mean: 16.782273290717008 usec\nrounds: 20491"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1551.922484324278,
            "unit": "iter/sec",
            "range": "stddev: 0.00003959763660164723",
            "extra": "mean: 644.362080001315 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2376.891461886406,
            "unit": "iter/sec",
            "range": "stddev: 0.00005751863694461739",
            "extra": "mean: 420.7175700005905 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1954.3290117151678,
            "unit": "iter/sec",
            "range": "stddev: 0.00007146908425784827",
            "extra": "mean: 511.684570001023 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3928.60637912793,
            "unit": "iter/sec",
            "range": "stddev: 0.000025658878446156742",
            "extra": "mean: 254.54319000061787 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 2956.9225178515408,
            "unit": "iter/sec",
            "range": "stddev: 0.000024514413462866747",
            "extra": "mean: 338.1894499983673 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1836.0933427257714,
            "unit": "iter/sec",
            "range": "stddev: 0.001706060676634512",
            "extra": "mean: 544.6346200000107 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 339.8244562008904,
            "unit": "iter/sec",
            "range": "stddev: 0.0000720963677717798",
            "extra": "mean: 2.9426958000010472 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2631.375431270906,
            "unit": "iter/sec",
            "range": "stddev: 0.00004975975804428895",
            "extra": "mean: 380.02938999738944 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 80.25957770927549,
            "unit": "iter/sec",
            "range": "stddev: 0.0003146352831928007",
            "extra": "mean: 12.459572160001926 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1627.6348437709307,
            "unit": "iter/sec",
            "range": "stddev: 0.00003516453417254586",
            "extra": "mean: 614.3884199991589 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 636.4386400796416,
            "unit": "iter/sec",
            "range": "stddev: 0.00003872617653487013",
            "extra": "mean: 1.5712433799978953 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 48.351185787014,
            "unit": "iter/sec",
            "range": "stddev: 0.003484296398964629",
            "extra": "mean: 20.682016039999098 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1128.6096902126508,
            "unit": "iter/sec",
            "range": "stddev: 0.00007367871829916493",
            "extra": "mean: 886.0459100006324 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1695.3488612598187,
            "unit": "iter/sec",
            "range": "stddev: 0.00002094008154926769",
            "extra": "mean: 589.849099999924 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2851.2971277647953,
            "unit": "iter/sec",
            "range": "stddev: 0.0000212125839957587",
            "extra": "mean: 350.7175700008247 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2405.421762915881,
            "unit": "iter/sec",
            "range": "stddev: 0.0001022101652792866",
            "extra": "mean: 415.727510001318 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 798.4919744461766,
            "unit": "iter/sec",
            "range": "stddev: 0.00004207023613799817",
            "extra": "mean: 1.252360739998153 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 693.6765541321845,
            "unit": "iter/sec",
            "range": "stddev: 0.00010498262154809226",
            "extra": "mean: 1.4415940600025579 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 539.3760247868295,
            "unit": "iter/sec",
            "range": "stddev: 0.00009441952087048182",
            "extra": "mean: 1.8539941600022303 msec\nrounds: 50"
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
          "id": "bbf17a95b4e01b0301616dc300284b9d7801bae5",
          "message": "Document 1.1 timestamp normalization behavior (#815)\n\n* Document 1.1 timestamp normalization\n\n* Fix spelling in 1.1 docs",
          "timestamp": "2026-03-13T19:14:44Z",
          "url": "https://github.com/redis/redis-om-python/commit/bbf17a95b4e01b0301616dc300284b9d7801bae5"
        },
        "date": 1778742515697,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_simple_instantiation",
            "value": 874143.1176964085,
            "unit": "iter/sec",
            "range": "stddev: 2.892353826331668e-7",
            "extra": "mean: 1.143977433163641 usec\nrounds: 20960"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_pydantic_complex_instantiation",
            "value": 496209.14693639835,
            "unit": "iter/sec",
            "range": "stddev: 4.2168566161945663e-7",
            "extra": "mean: 2.0152792550762375 usec\nrounds: 39036"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_simple_instantiation",
            "value": 72186.06018518723,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016638757618087487",
            "extra": "mean: 13.853090159437771 usec\nrounds: 14674"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_hashmodel_complex_instantiation",
            "value": 67714.28694784318,
            "unit": "iter/sec",
            "range": "stddev: 0.000001602978925146517",
            "extra": "mean: 14.767932220422678 usec\nrounds: 18929"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_simple_instantiation",
            "value": 66524.26487697766,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015231074215558273",
            "extra": "mean: 15.032108988341099 usec\nrounds: 17745"
          },
          {
            "name": "tests/test_benchmarks.py::TestInstantiationBenchmarks::test_jsonmodel_complex_instantiation",
            "value": 62193.754433387985,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016001910988490112",
            "extra": "mean: 16.078784905501085 usec\nrounds: 18192"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_hashmodel_save",
            "value": 1805.3171283244785,
            "unit": "iter/sec",
            "range": "stddev: 0.00003511081421098666",
            "extra": "mean: 553.919300000274 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_save",
            "value": 2563.290198288614,
            "unit": "iter/sec",
            "range": "stddev: 0.00003745148661724227",
            "extra": "mean: 390.12359999958335 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestSaveBenchmarks::test_jsonmodel_with_embedded_save",
            "value": 1934.3874352095197,
            "unit": "iter/sec",
            "range": "stddev: 0.00005722954413449378",
            "extra": "mean: 516.9595200000288 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_hashmodel_get",
            "value": 3623.411193058569,
            "unit": "iter/sec",
            "range": "stddev: 0.000020712916241995267",
            "extra": "mean: 275.9830300010435 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_get",
            "value": 3072.8205305898186,
            "unit": "iter/sec",
            "range": "stddev: 0.000022810437883065033",
            "extra": "mean: 325.43391000061206 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestGetBenchmarks::test_jsonmodel_with_embedded_get",
            "value": 1726.4594236280443,
            "unit": "iter/sec",
            "range": "stddev: 0.002052958031601502",
            "extra": "mean: 579.2201000001285 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_all",
            "value": 341.43205151864976,
            "unit": "iter/sec",
            "range": "stddev: 0.0000751963430738323",
            "extra": "mean: 2.9288404400000445 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_hashmodel_find_by_field",
            "value": 2561.0883601175756,
            "unit": "iter/sec",
            "range": "stddev: 0.0000365613998468339",
            "extra": "mean: 390.45899999877065 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_all",
            "value": 81.32999632671205,
            "unit": "iter/sec",
            "range": "stddev: 0.00015822902767296854",
            "extra": "mean: 12.295586440000363 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_field",
            "value": 1723.4724329567634,
            "unit": "iter/sec",
            "range": "stddev: 0.00002498869794147943",
            "extra": "mean: 580.2239599994152 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_by_embedded_field",
            "value": 629.8320716535173,
            "unit": "iter/sec",
            "range": "stddev: 0.00005798295600404163",
            "extra": "mean: 1.5877248000005295 msec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_sort",
            "value": 47.57088454495035,
            "unit": "iter/sec",
            "range": "stddev: 0.0040776737695275",
            "extra": "mean: 21.021261419999178 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestQueryBenchmarks::test_jsonmodel_find_with_pagination",
            "value": 1174.9090373677473,
            "unit": "iter/sec",
            "range": "stddev: 0.00007119969905195217",
            "extra": "mean: 851.1297199997614 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_hashmodel_update",
            "value": 1698.952916626053,
            "unit": "iter/sec",
            "range": "stddev: 0.00002349086751846616",
            "extra": "mean: 588.5978300010208 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update",
            "value": 2778.829178672816,
            "unit": "iter/sec",
            "range": "stddev: 0.00002899325809025374",
            "extra": "mean: 359.86379000007673 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestUpdateBenchmarks::test_jsonmodel_update_embedded",
            "value": 2054.1360573841944,
            "unit": "iter/sec",
            "range": "stddev: 0.00011386652535887341",
            "extra": "mean: 486.8226700004641 usec\nrounds: 100"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_hashmodel_add_many",
            "value": 798.0509552660185,
            "unit": "iter/sec",
            "range": "stddev: 0.0000669332825030345",
            "extra": "mean: 1.2530528200002777 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_add_many",
            "value": 689.3100515090542,
            "unit": "iter/sec",
            "range": "stddev: 0.00012767677195082557",
            "extra": "mean: 1.450725980000982 msec\nrounds: 50"
          },
          {
            "name": "tests/test_benchmarks.py::TestBatchBenchmarks::test_jsonmodel_with_embedded_add_many",
            "value": 543.1259256358614,
            "unit": "iter/sec",
            "range": "stddev: 0.00011213550946107564",
            "extra": "mean: 1.841193640000256 msec\nrounds: 50"
          }
        ]
      }
    ]
  }
}