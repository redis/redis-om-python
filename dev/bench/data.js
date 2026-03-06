window.BENCHMARK_DATA = {
  "lastUpdate": 1772835213341,
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
      }
    ]
  }
}