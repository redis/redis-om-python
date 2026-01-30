window.BENCHMARK_DATA = {
  "lastUpdate": 1769809327242,
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
      }
    ]
  }
}