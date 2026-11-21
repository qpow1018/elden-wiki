// Development samples from https://edring.lsdl.kr/map (base game, checked 2026-11-16; patch unspecified).
// Coordinates include neighboring areas visible in the Limgrave image.
// Limgrave alignment checked 2026-11-20 against LSDL zoom-5 tiles (3,797 terrain matches).
// For LSDL coordinates sx/sy: u = 32 * sx - 2560, v = -32 * sy - 5120.
// Image pixels: x = 3.586294620678 * u - 0.000104562378 * v - 641.123402051025;
// y = -0.000000978179 * u + 3.586309333844 * v - 433.661175724454.
// Normalize x/y by the Limgrave image dimensions, 5100/4860; round to six decimals.
// Categories follow the source filter codes. An empty list means no filter code matched.
// Loot lists summarize the source marker descriptions.
const LIMGRAVE_MARKERS = [
  { id: 'LSDL-1435', categories: ['기도'], name: '기도: 불이여, 힘을!', x: 0.998691, y: 0.370856 },
  { id: 'LSDL-1100', categories: ['마술스크롤'], name: '왕가의 스크롤', x: 0.660448, y: 0.800717 },
  { id: 'LSDL-1099', categories: ['무기'], name: '라지 클럽', x: 0.57957, y: 0.965256 },
  { id: 'LSDL-1102', categories: ['무기'], name: '그레이트 에페', x: 0.651987, y: 0.801071 },
  { id: 'LSDL-1232', categories: ['무기'], name: '랜스', x: 0.36852, y: 0.23189 },
  { id: 'LSDL-1233', categories: ['무기'], name: '짐승 문양 히터 실드', x: 0.375541, y: 0.222303 },
  { id: 'LSDL-1272', categories: ['무기'], name: '금장 철제 방패', x: 0.377052, y: 0.902161 },
  {
    id: 'LSDL-1862',
    categories: ['무기'],
    name: '트윈 블레이드',
    x: 0.456513,
    y: 0.71252,
    isLabelPriority: true,
  },
  { id: 'LSDL-1103', categories: ['물방울 유생'], name: '물방울 유생', x: 0.626335, y: 0.807352 },
  {
    id: 'LSDL-1094',
    categories: ['방어구'],
    name: '기도 스카라베(그림 : 귀소)',
    x: 0.398502,
    y: 0.721753,
  },
  { id: 'LSDL-1354', categories: ['방어구'], name: '전회 스카라베', x: 0.224356, y: 0.195124 },
  { id: 'LSDL-925', categories: ['색단석'], name: '색 잃은 단석[1]', x: 0.10467, y: 0.886127 },
  { id: 'LSDL-1072', categories: ['색단석'], name: '색 잃은 단석 [1]', x: 0.534216, y: 0.60404 },
  { id: 'LSDL-1112', categories: ['색단석'], name: '색 잃은 단석[1]', x: 0.553912, y: 0.375673 },
  { id: 'LSDL-1234', categories: ['색단석'], name: '색 잃은 단석[1]', x: 0.368521, y: 0.17654 },
  { id: 'LSDL-1377', categories: ['색단석'], name: '사자', x: 0.027575, y: 0.31331 },
  {
    id: 'LSDL-425',
    categories: ['성배병'],
    name: '작은 황금 나무',
    x: 0.794074,
    y: 0.531003,
    loot: [
      { id: 'LSDL-425-1', name: '넘친 초록 결정 물방울' },
      { id: 'LSDL-425-2', name: '큰 가시 깨진 물방울' },
    ],
  },
  { id: 'LSDL-1188', categories: ['성배병'], name: '성배의 물방울', x: 0.846442, y: 0.319567 },
  { id: 'LSDL-1189', categories: ['성배병'], name: '성배의 물방울', x: 0.387583, y: 0.893684 },
  { id: 'LSDL-1207', categories: ['성배병'], name: '황금 종자', x: 0.186846, y: 0.395532 },
  { id: 'LSDL-1208', categories: ['성배병'], name: '황금 종자', x: 0.168564, y: 0.345353 },
  {
    id: 'LSDL-1225',
    categories: ['성배병'],
    name: '근력의 혹 결정 물방울',
    x: 0.254357,
    y: 0.242965,
  },
  {
    id: 'LSDL-1270',
    categories: ['성배병'],
    name: '신앙의 혹 결정 물방울',
    x: 0.46706,
    y: 0.947192,
  },
  { id: 'LSDL-2230', categories: ['성배병'], name: '황금 종자', x: 0.876315, y: 0.689284 },
  { id: 'LSDL-1273', categories: ['영체'], name: '전쟁매의 뼛가루', x: 0.381261, y: 0.875596 },
  { id: 'LSDL-1324', categories: ['영체'], name: '고드릭 병사의 뼛가루', x: 0.123441, y: 0.416997 },
  { id: 'LSDL-926', categories: ['일반단석'], name: '단석 [2]', x: 0.127327, y: 0.891676 },
  { id: 'LSDL-1093', categories: ['일반단석'], name: '단석[1]', x: 0.364051, y: 0.716204 },
  { id: 'LSDL-1104', categories: ['일반단석'], name: '단석[1]', x: 0.506787, y: 0.572681 },
  { id: 'LSDL-1113', categories: ['일반단석'], name: '단석[1]', x: 0.578867, y: 0.36533 },
  { id: 'LSDL-1114', categories: ['일반단석'], name: '단석[1]', x: 0.441402, y: 0.311822 },
  {
    id: 'LSDL-1218',
    categories: ['일반단석'],
    name: '빛나는 석상',
    x: 0.358435,
    y: 0.3518,
    loot: [
      { id: 'LSDL-1218-1', name: '단석 [1]', quantity: 5 },
      { id: 'LSDL-1218-2', name: '단석 [2]' },
    ],
  },
  { id: 'LSDL-1222', categories: ['일반단석'], name: '단석[1]', x: 0.211576, y: 0.383277 },
  { id: 'LSDL-1237', categories: ['일반단석'], name: '단석[1]', x: 0.502814, y: 0.190566 },
  { id: 'LSDL-1241', categories: ['일반단석'], name: '단석[1]', x: 0.731371, y: 0.143575 },
  { id: 'LSDL-1254', categories: ['일반단석'], name: '단석[2]', x: 0.751058, y: 0.239021 },
  { id: 'LSDL-1276', categories: ['일반단석'], name: '단석[1]', x: 0.678019, y: 0.936353 },
  { id: 'LSDL-1323', categories: ['일반단석'], name: '단석[1]', x: 0.030269, y: 0.381199 },
  {
    id: 'LSDL-429',
    categories: ['전회'],
    name: '전회 : 파고들어 회전 베기',
    x: 0.134978,
    y: 0.557167,
  },
  { id: 'LSDL-1098', categories: ['전회'], name: '전회 : 그라비타스', x: 0.411506, y: 0.792948 },
  { id: 'LSDL-1108', categories: ['전회'], name: '전회 : 거합', x: 0.548276, y: 0.732804 },
  { id: 'LSDL-1119', categories: ['전회'], name: '전회 : 디터미네이션', x: 0.478322, y: 0.561984 },
  { id: 'LSDL-1227', categories: ['전회'], name: '전회 : 난격', x: 0.119693, y: 0.274678 },
  {
    id: 'LSDL-1235',
    categories: ['전회'],
    name: '전회 : 황금 나무에 맹세코',
    x: 0.374844,
    y: 0.202373,
  },
  { id: 'LSDL-1257', categories: ['전회'], name: '전회 : 신성한 칼날', x: 0.850314, y: 0.262753 },
  { id: 'LSDL-1317', categories: ['전회'], name: '전회 : 폭풍의 벽', x: 0.021602, y: 0.164237 },
  { id: 'LSDL-1360', categories: ['전회'], name: '전회 : 드롭어택', x: 0.760658, y: 0.543896 },
  {
    id: 'LSDL-1118',
    categories: ['제작서'],
    name: '무구 장인의 제작서[1]',
    x: 0.478326,
    y: 0.416241,
  },
  {
    id: 'LSDL-1123',
    categories: ['제작서'],
    name: '방랑 전사의 제작서 [4]',
    x: 0.760659,
    y: 0.488569,
  },
  {
    id: 'LSDL-1318',
    categories: ['제작서'],
    name: '방랑 전사의 제작서 [7]',
    x: 0.059224,
    y: 0.148015,
  },
  { id: 'LSDL-1644', categories: ['제작서'], name: '파리스의 제작서[1]', x: 0.711429, y: 0.303722 },
  { id: 'LSDL-1101', categories: ['중요아이템'], name: '별빛 조각', x: 0.675209, y: 0.83243 },
  { id: 'LSDL-1223', categories: ['중요아이템'], name: '작은 붉은 우상', x: 0.280026, y: 0.109525 },
  { id: 'LSDL-1226', categories: ['중요아이템'], name: '석검 열쇠', x: 0.176301, y: 0.335199 },
  {
    id: 'LSDL-1228',
    categories: ['중요아이템'],
    name: '제스처 : 책상다리',
    x: 0.183562,
    y: 0.499998,
  },
  {
    id: 'LSDL-1263',
    categories: ['중요아이템'],
    name: '투사의 갈고리 손가락',
    x: 0.280731,
    y: 0.11701,
  },
  { id: 'LSDL-1264', categories: ['중요아이템'], name: '석검 열쇠', x: 0.72795, y: 0.98665 },
  { id: 'LSDL-1275', categories: ['중요아이템'], name: '석검 열쇠', x: 0.680471, y: 0.946318 },
  { id: 'LSDL-1853', categories: ['중요아이템'], name: '별빛 조각', x: 0.142189, y: 0.517354 },
  {
    id: 'LSDL-1861',
    categories: ['중요아이템'],
    name: '숫돌 소도 + 전회 : 남각',
    x: 0.360187,
    y: 0.473055,
  },
  {
    id: 'LSDL-1864',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.451248,
    y: 0.691126,
    isLabelPriority: true,
  },
  {
    id: 'LSDL-2187',
    categories: ['중요아이템'],
    name: '새 다리 황금 절임',
    x: 0.305323,
    y: 0.766761,
  },
  { id: 'LSDL-2311', categories: ['중요아이템'], name: '유혹의 나뭇가지', x: 0.361571, y: 0.86896 },
  { id: 'LSDL-3012', categories: ['중요아이템'], name: '그림: 귀소', x: 0.588026, y: 0.352059 },
  {
    id: 'LSDL-1058',
    categories: ['지도조각'],
    name: '지도 조각 (림그레이브 동부)',
    x: 0.768377,
    y: 0.504438,
    isLabelPriority: true,
  },
  {
    id: 'LSDL-1150',
    categories: ['지도조각'],
    name: '지도 조각 (림그레이브 서부)',
    x: 0.353145,
    y: 0.445758,
    isLabelPriority: true,
  },
  {
    id: 'LSDL-1097',
    categories: ['탈리스만'],
    name: '성룡 표식의 탈리스만',
    x: 0.385832,
    y: 0.757174,
  },
  { id: 'LSDL-1186', categories: ['탈리스만'], name: '망치의 탈리스만', x: 0.270184, y: 0.109265 },
  {
    id: 'LSDL-1231',
    categories: ['탈리스만'],
    name: '먼 화살의 탈리스만',
    x: 0.303107,
    y: 0.435061,
  },
  { id: 'LSDL-1236', categories: ['탈리스만'], name: '랜스의 탈리스만', x: 0.46416, y: 0.03559 },
  {
    id: 'LSDL-1242',
    categories: ['탈리스만'],
    name: '녹색 거북 탈리스만',
    x: 0.762648,
    y: 0.183057,
  },
  { id: 'LSDL-1248', categories: ['탈리스만'], name: '희생의 가는 가지', x: 0.677916, y: 0.583519 },
  {
    id: 'LSDL-1353',
    categories: ['탈리스만'],
    name: '뇌룡 표식의 탈리스만',
    x: 0.066955,
    y: 0.266437,
  },
  {
    id: 'LSDL-3',
    categories: ['축복', '던전', '보스'],
    name: '폭풍 기슭의 지하 묘지 ( 임프 )',
    x: 0.181921,
    y: 0.512915,
    loot: [
      { id: 'LSDL-3-1', name: '말하는 머리 “안녕”' },
      { id: 'LSDL-3-2', name: '묘 은방울꽃 [1]', quantity: 4 },
      { id: 'LSDL-3-3', name: '영혼 묘 은방울꽃 [1]', quantity: 1 },
      { id: 'LSDL-3-4', name: '헤매는 귀인의 뼛가루' },
      { id: 'LSDL-3-5', name: '귀인 마술사의 뼛가루' },
    ],
  },
  { id: 'LSDL-6', categories: ['NPC'], name: '마술사 셀렌', x: 0.617653, y: 0.642317 },
  { id: 'LSDL-70', categories: ['NPC'], name: '백면 바레[1]', x: 0.293586, y: 0.687679 },
  {
    id: 'LSDL-71',
    categories: ['축복', '던전', '보스'],
    name: '배움의 동굴',
    x: 0.326787,
    y: 0.71245,
    loot: [
      { id: 'LSDL-71-1', name: '붉은 물방울의 성배병' },
      { id: 'LSDL-71-2', name: '푸른 물방울의 성배병' },
      { id: 'LSDL-71-3', name: '손가락 끊기' },
      { id: 'LSDL-71-4', name: '빛바랜 자의 갈고리 손가락' },
    ],
  },
  {
    id: 'LSDL-72',
    categories: ['축복', '던전', '보스'],
    name: '해안동굴',
    x: 0.181874,
    y: 0.685743,
    loot: [
      { id: 'LSDL-72-1', name: '재봉 도구' },
      { id: 'LSDL-72-2', name: '재봉 바늘' },
    ],
  },
  {
    id: 'LSDL-74',
    categories: ['축복', '던전', '보스'],
    name: '림그레이브 갱도',
    x: 0.382126,
    y: 0.520424,
    loot: [
      { id: 'LSDL-74-1', name: '단석 [1]', quantity: 9 },
      { id: 'LSDL-74-2', name: '색 잃은 단석 [1]', quantity: 1 },
      { id: 'LSDL-74-3', name: '포효의 메달리온' },
    ],
  },
  {
    id: 'LSDL-77',
    categories: ['축복', '던전', '보스'],
    name: '숲 옆 동굴',
    x: 0.264608,
    y: 0.514851,
    loot: [
      { id: 'LSDL-77-1', name: '금 간 항아리', quantity: 1 },
      { id: 'LSDL-77-2', name: '황금의 룬 [1]', quantity: 1 },
      { id: 'LSDL-77-3', name: '염룡 표식의 탈리스만' },
    ],
  },
  { id: 'LSDL-300', categories: ['장소'], name: '폭풍의 관문', x: 0.274622, y: 0.425238 },
  {
    id: 'LSDL-306',
    categories: ['장소'],
    name: '역참터',
    x: 0.616079,
    y: 0.623119,
    loot: [{ id: 'LSDL-306-1', name: '트리나의 수련', quantity: 4 }],
  },
  {
    id: 'LSDL-307',
    categories: ['장소'],
    name: '안개 낀 숲 폐허',
    x: 0.71752,
    y: 0.577474,
    loot: [
      { id: 'LSDL-307-1', name: '도끼의 탈리스만' },
      { id: 'LSDL-307-2', name: '단석 [2]' },
      { id: 'LSDL-307-3', name: '트리나의 수련', quantity: 5 },
    ],
  },
  { id: 'LSDL-308', categories: ['장소'], name: '제물 이송용 대교', x: 0.689583, y: 0.984926 },
  { id: 'LSDL-315', categories: ['장소'], name: '이름 없는 마커', x: 0.391116, y: 0.899469 },
  { id: 'LSDL-331', categories: ['장소'], name: '엘레의 교회', x: 0.279311, y: 0.583756 },
  {
    id: 'LSDL-333',
    categories: ['장소'],
    name: '용이 불태운 폐허',
    x: 0.442855,
    y: 0.654596,
    loot: [
      { id: 'LSDL-333-1', name: '석검 열쇠' },
      { id: 'LSDL-333-2', name: '트윈 블레이드' },
    ],
  },
  {
    id: 'LSDL-345',
    categories: ['장소'],
    name: '하이트 요새',
    x: 0.893192,
    y: 0.672306,
    loot: [
      { id: 'LSDL-345-1', name: '전회: 피의 참격' },
      { id: 'LSDL-345-2', name: '피의 장미', quantity: 9 },
      { id: 'LSDL-345-3', name: '단석 [1]' },
      { id: 'LSDL-345-4', name: '덱타스의 부절(좌)' },
      { id: 'LSDL-345-5', name: '방랑 전사의 제작서 [6]' },
    ],
  },
  {
    id: 'LSDL-346',
    categories: ['축복', '던전', '보스'],
    name: '게르 갱도',
    x: 0.942914,
    y: 0.166315,
    loot: [
      { id: 'LSDL-346-1', name: '색 잃은 단석 [1]' },
      { id: 'LSDL-346-2', name: '십문자치도' },
      { id: 'LSDL-346-3', name: '색 잃은 단석 [2]' },
      { id: 'LSDL-346-4', name: '색 잃은 단석 [4]' },
      { id: 'LSDL-346-5', name: '단석 [4]', quantity: 7 },
      { id: 'LSDL-346-6', name: '명도 월은' },
      { id: 'LSDL-346-7', name: '용의 심장', quantity: 1 },
    ],
  },
  {
    id: 'LSDL-349',
    categories: ['장소'],
    name: '썩어가는 자의 오두막',
    x: 0.948722,
    y: 0.080645,
    loot: [
      { id: 'LSDL-349-1', name: '유생나비', quantity: 2 },
      { id: 'LSDL-349-2', name: '황금의 룬 [3]', quantity: 1 },
      { id: 'LSDL-349-3', name: '부패 이끼약', quantity: 5 },
    ],
  },
  {
    id: 'LSDL-377',
    categories: ['장소'],
    name: '제 3 마리카 교회',
    x: 0.8448,
    y: 0.302046,
    loot: [
      { id: 'LSDL-377-1', name: '붉은 결정 물방울' },
      { id: 'LSDL-377-2', name: '영약의 성배병' },
    ],
  },
  { id: 'LSDL-379', categories: ['장소'], name: '이름 없는 마커', x: 0.588723, y: 0.363347 },
  { id: 'LSDL-381', categories: ['장소'], name: '마중물 마을', x: 0.729975, y: 0.174202 },
  { id: 'LSDL-390', categories: ['장소'], name: '이름 없는 마커', x: 0.303716, y: 0.29286 },
  {
    id: 'LSDL-392',
    categories: ['던전', '보스'],
    name: '변경의 영웅 묘지',
    x: 0.337972,
    y: 0.66671,
    loot: [
      { id: 'LSDL-392-1', name: '석검 열쇠', quantity: 1 },
      { id: 'LSDL-392-2', name: '황금의 룬 [5]', quantity: 1 },
      { id: 'LSDL-392-3', name: '묘 은방울꽃 [1]', quantity: 1 },
      { id: 'LSDL-392-4', name: '황금 나무의 은총' },
      { id: 'LSDL-392-5', name: '황금 나무의 대궁' },
      { id: 'LSDL-392-6', name: '용찬의 표식' },
      { id: 'LSDL-392-7', name: '황금 종자' },
      { id: 'LSDL-392-8', name: '땅 잃은 기사 오레그의 뼛가루' },
    ],
  },
  { id: 'LSDL-427', categories: ['NPC'], name: '방랑 상인 칼레', x: 0.268059, y: 0.607369 },
  { id: 'LSDL-430', categories: ['NPC'], name: '재봉사 아인 보크[1]', x: 0.423216, y: 0.482028 },
  { id: 'LSDL-432', categories: ['NPC'], name: '방랑 민족 상인 [3]', x: 0.219811, y: 0.729428 },
  { id: 'LSDL-508', categories: ['축복'], name: '용찬 교회', x: 0.126012, y: 0.842702 },
  { id: 'LSDL-517', categories: ['축복'], name: '끔찍한 흉조 멀기트', x: 0.077546, y: 0.376405 },
  { id: 'LSDL-519', categories: ['축복'], name: '스톰빌 정문', x: 0.024853, y: 0.350926 },
  {
    id: 'LSDL-520',
    categories: ['축복'],
    name: '성문 옆 작은 방',
    x: 0.00193,
    y: 0.364291,
    loot: [
      { id: 'LSDL-520-1', name: '황금의 룬 [5]' },
      { id: 'LSDL-520-2', name: '시민의 옷' },
    ],
  },
  { id: 'LSDL-539', categories: ['축복'], name: '성으로 향하는 굴', x: 0.099151, y: 0.363465 },
  {
    id: 'LSDL-540',
    categories: ['축복'],
    name: '폭풍 언덕의 낡은 집',
    x: 0.168182,
    y: 0.334515,
    loot: [{ id: 'LSDL-540-1', name: '석검 열쇠' }],
  },
  {
    id: 'LSDL-541',
    categories: ['축복'],
    name: '림그레이브 신수탑 교량',
    x: 0.043298,
    y: 0.284973,
  },
  {
    id: 'LSDL-568',
    categories: ['축복'],
    name: '인도의 시작',
    x: 0.295692,
    y: 0.694645,
    loot: [{ id: 'LSDL-568-1', name: '작은 금 우상' }],
  },
  { id: 'LSDL-569', categories: ['축복'], name: '표류 묘지', x: 0.311501, y: 0.720242 },
  { id: 'LSDL-573', categories: ['축복'], name: '바다에 면한 옛 유적', x: 0.450075, y: 0.792618 },
  { id: 'LSDL-575', categories: ['축복'], name: '아길 호수 북쪽', x: 0.408995, y: 0.472559 },
  { id: 'LSDL-578', categories: ['축복'], name: '관문 앞', x: 0.317306, y: 0.43525 },
  { id: 'LSDL-579', categories: ['축복'], name: '아길 호수 남쪽', x: 0.588149, y: 0.789264 },
  { id: 'LSDL-580', categories: ['축복'], name: '하이트 요새 서쪽', x: 0.831063, y: 0.692425 },
  { id: 'LSDL-581', categories: ['축복'], name: '안개 숲 변두리', x: 0.676682, y: 0.436926 },
  { id: 'LSDL-721', categories: ['축복'], name: '제물 이송 대교', x: 0.677184, y: 0.994655 },
  {
    id: 'LSDL-804',
    categories: ['축복', '던전', '보스'],
    name: '흐린 강 동굴',
    x: 0.502267,
    y: 0.470883,
    loot: [
      { id: 'LSDL-804-1', name: '천 옷' },
      { id: 'LSDL-804-2', name: '천 바지' },
    ],
  },
  { id: 'LSDL-816', categories: ['축복'], name: '순례 교회', x: 0.386323, y: 0.899469 },
  { id: 'LSDL-848', categories: ['축복'], name: '게르 갱도 뒷문', x: 0.89125, y: 0.133492 },
  { id: 'LSDL-851', categories: ['축복'], name: '부패를 향한 노대', x: 0.982408, y: 0.062274 },
  { id: 'LSDL-876', categories: ['축복'], name: '게르 요새 북쪽', x: 0.981323, y: 0.240863 },
  { id: 'LSDL-878', categories: ['축복'], name: '제3 마리카 교회', x: 0.846375, y: 0.302778 },
  { id: 'LSDL-880', categories: ['축복'], name: '화가의 낡은 집', x: 0.589758, y: 0.364008 },
  { id: 'LSDL-883', categories: ['축복'], name: '성인 다리', x: 0.468589, y: 0.187331 },
  {
    id: 'LSDL-885',
    categories: ['축복', '던전', '보스'],
    name: '죽음에 닿은 지하 묘지 (해골)',
    x: 0.398427,
    y: 0.168086,
    loot: [
      { id: 'LSDL-885-1', name: '묘 은방울꽃 [1]', quantity: 4 },
      { id: 'LSDL-885-2', name: '타도' },
      { id: 'LSDL-885-3', name: '피의 장미', quantity: 3 },
      { id: 'LSDL-885-4', name: '붉은 흉악한 칼날' },
      { id: 'LSDL-885-5', name: '사근' },
    ],
  },
  {
    id: 'LSDL-887',
    categories: ['축복', '던전', '보스'],
    name: '높은 길 아래 동굴',
    x: 0.479188,
    y: 0.137577,
    loot: [
      { id: 'LSDL-887-1', name: '단석 [1]', quantity: 3 },
      { id: 'LSDL-887-2', name: '단석 [2]', quantity: 1 },
      { id: 'LSDL-887-3', name: '황금의 룬 [4]', quantity: 1 },
      { id: 'LSDL-887-4', name: '샴시르' },
      { id: 'LSDL-887-5', name: '푸른 무희' },
    ],
  },
  { id: 'LSDL-891', categories: ['축복'], name: '전쟁 배움의 낡은 집', x: 0.301081, y: 0.293876 },
  { id: 'LSDL-934', categories: ['축복'], name: '마중물 마을 변두리', x: 0.679434, y: 0.209622 },
  { id: 'LSDL-935', categories: ['장소'], name: '이름 없는 마커', x: 0.855947, y: 0.026617 },
  {
    id: 'LSDL-936',
    categories: ['축복'],
    name: '그을림 교회',
    x: 0.855947,
    y: 0.026617,
    loot: [
      { id: 'LSDL-936-1', name: '방랑 전사의 제작서 [14]' },
      { id: 'LSDL-936-2', name: '선교사의 제작서 [3]' },
    ],
  },
  {
    id: 'LSDL-999',
    categories: ['NPC'],
    name: '알렉산더[1]',
    x: 0.449484,
    y: 0.199303,
    loot: [{ id: 'LSDL-999-1', name: '용사의 고기' }],
  },
  { id: 'LSDL-1000', categories: ['NPC'], name: '알렉산더[2]', x: 0.900948, y: 0.139891 },
  { id: 'LSDL-1036', categories: ['NPC'], name: '반 늑대 블라이드[1]', x: 0.706854, y: 0.568619 },
  { id: 'LSDL-1053', categories: ['NPC'], name: '케네스 하이트[2]', x: 0.909372, y: 0.656816 },
  {
    id: 'LSDL-1054',
    categories: ['NPC'],
    name: '케네스 하이트[1]',
    x: 0.705105,
    y: 0.363866,
    loot: [{ id: 'LSDL-1054-1', name: '황동 단도' }],
  },
  { id: 'LSDL-1057', categories: ['NPC'], name: '방랑 민족 상인 [2]', x: 0.786308, y: 0.622128 },
  { id: 'LSDL-1068', categories: ['NPC'], name: '방랑 민족 상인 [1]', x: 0.547593, y: 0.206316 },
  {
    id: 'LSDL-1081',
    categories: ['NPC'],
    name: '마음이 꺾인 아가씨(로데리카 [1])',
    x: 0.1763,
    y: 0.349084,
    loot: [{ id: 'LSDL-1081-1', name: '영해파리의 뼛가루' }],
  },
  {
    id: 'LSDL-1095',
    categories: ['NPC'],
    name: '피 묻은 손가락 사냥꾼 유라[1]',
    x: 0.468325,
    y: 0.7712,
  },
  {
    id: 'LSDL-1096',
    categories: ['보스'],
    name: '비룡 아길',
    x: 0.412568,
    y: 0.627299,
    loot: [{ id: 'LSDL-1096-1', name: '용의 심장' }],
  },
  {
    id: 'LSDL-1105',
    categories: ['NPC'],
    name: '피 묻은 손가락 사냥꾼 유라 소환 사인',
    x: 0.406244,
    y: 0.666025,
  },
  {
    id: 'LSDL-1109',
    categories: ['암령'],
    name: '피 묻은 손가락 네리우스',
    x: 0.519458,
    y: 0.465688,
    loot: [{ id: 'LSDL-1109-1', name: '레두비아' }],
  },
  {
    id: 'LSDL-1110',
    categories: ['NPC'],
    name: '피 묻은 손가락 사냥꾼 유라[2]',
    x: 0.538093,
    y: 0.367904,
  },
  { id: 'LSDL-1111', categories: ['축복'], name: '흐린 강 기슭', x: 0.516986, y: 0.367172 },
  {
    id: 'LSDL-1116',
    categories: ['축복', '던전', '보스'],
    name: '흐린 강의 지하 묘지 ( 임프 )',
    x: 0.508212,
    y: 0.304454,
    loot: [
      { id: 'LSDL-1116-1', name: '묘 은방울꽃 [1]', quantity: 3 },
      { id: 'LSDL-1116-2', name: '땅 잃은 기사 잉바르' },
    ],
  },
  { id: 'LSDL-1117', categories: ['NPC'], name: '건달 패치[1]', x: 0.493085, y: 0.474921 },
  {
    id: 'LSDL-1120',
    categories: ['보스'],
    name: '밤 기병 - 아길 호수',
    x: 0.507507,
    y: 0.561606,
    loot: [{ id: 'LSDL-1120-1', name: '전회: 연속 찌르기' }],
  },
  { id: 'LSDL-1121', categories: [], name: '그레이트 액스', x: 0.565516, y: 0.619176 },
  {
    id: 'LSDL-1135',
    categories: ['보스'],
    name: '끔찍한 흉조 멀기트',
    x: 0.058514,
    y: 0.374185,
    loot: [{ id: 'LSDL-1135-1', name: '부적 주머니' }],
  },
  {
    id: 'LSDL-1185',
    categories: ['암령'],
    name: '침입 : 배율자 헨릭스',
    x: 0.26983,
    y: 0.11923,
    loot: [{ id: 'LSDL-1185-1', name: '망치의 탈리스만' }],
  },
  {
    id: 'LSDL-1219',
    categories: ['보스'],
    name: '죽음의 새 - 전쟁 배움 집',
    x: 0.377406,
    y: 0.298669,
    loot: [{ id: 'LSDL-1219-1', name: '푸른 날개 칠지인' }],
  },
  {
    id: 'LSDL-1220',
    categories: ['보스'],
    name: '방울 사냥꾼 - 전쟁 배움 집',
    x: 0.302524,
    y: 0.285398,
    loot: [{ id: 'LSDL-1220-1', name: '뼈 장사꾼의 방울' }],
  },
  { id: 'LSDL-1221', categories: ['NPC'], name: '전사 베르나르', x: 0.315885, y: 0.296095 },
  {
    id: 'LSDL-1238',
    categories: ['NPC'],
    name: '죽음을 사냥하는 자 D [1]',
    x: 0.635735,
    y: 0.180483,
  },
  {
    id: 'LSDL-1239',
    categories: ['NPC'],
    name: '죽음을 사냥하는 자 D [2]',
    x: 0.706054,
    y: 0.200413,
  },
  { id: 'LSDL-1240', categories: [], name: '전송문 : 짐승의 신전', x: 0.870949, y: 0.26535 },
  {
    id: 'LSDL-1243',
    categories: ['보스'],
    name: '티비아의 배 - 림그레이브',
    x: 0.743319,
    y: 0.168676,
    loot: [
      { id: 'LSDL-1243-1', name: '사근' },
      { id: 'LSDL-1243-2', name: '민병 스켈레톤의 뼛가루' },
    ],
  },
  {
    id: 'LSDL-1244',
    categories: ['암령'],
    name: '빛바랜 자를 먹는 아나스타시아[1]',
    x: 0.857229,
    y: 0.048389,
    loot: [{ id: 'LSDL-1244-1', name: '신성한 전갈' }],
  },
  {
    id: 'LSDL-1250',
    categories: ['보스'],
    name: '주인 잃은 사냥개의 봉인 감옥',
    x: 0.604415,
    y: 0.892338,
    loot: [{ id: 'LSDL-1250-1', name: '사냥개의 긴 이빨' }],
  },
  {
    id: 'LSDL-1251',
    categories: ['NPC'],
    name: '반 늑대 블라이드 [2]',
    x: 0.585895,
    y: 0.897367,
    loot: [{ id: 'LSDL-1251-1', name: '색 잃은 단석 [2]' }],
  },
  { id: 'LSDL-1261', categories: ['장소'], name: '시프라 강 우물', x: 0.813742, y: 0.498156 },
  {
    id: 'LSDL-1269',
    categories: ['보스'],
    name: '아인 여왕',
    x: 0.471964,
    y: 0.986296,
    loot: [
      { id: 'LSDL-1269-1', name: '아인 여왕의 지팡이' },
      { id: 'LSDL-1269-2', name: '마술: 결정 산탄' },
    ],
  },
  { id: 'LSDL-1295', categories: [], name: '이름 없는 마커', x: 0.636639, y: 0.848794 },
  { id: 'LSDL-1307', categories: [], name: '영기류', x: 0.434008, y: 0.799465 },
  { id: 'LSDL-1308', categories: [], name: '영기류', x: 0.294309, y: 0.757788 },
  { id: 'LSDL-1309', categories: [], name: '영기류', x: 0.668869, y: 0.619554 },
  { id: 'LSDL-1310', categories: [], name: '이름 없는 마커', x: 0.552855, y: 0.333712 },
  { id: 'LSDL-1311', categories: [], name: '이름 없는 마커', x: 0.438949, y: 0.331516 },
  { id: 'LSDL-1312', categories: [], name: '영기류', x: 0.492396, y: 0.200885 },
  { id: 'LSDL-1313', categories: [], name: '영기류', x: 0.854996, y: 0.230402 },
  { id: 'LSDL-1314', categories: [], name: '영기류', x: 0.85394, y: 0.179491 },
  { id: 'LSDL-1316', categories: [], name: '영기류', x: 0.597842, y: 0.961195 },
  { id: 'LSDL-1326', categories: ['NPC'], name: '고스토크[1]', x: 0.011869, y: 0.361151 },
  {
    id: 'LSDL-1327',
    categories: ['NPC'],
    name: '마술사 로지에르 소환 사인',
    x: 0.091212,
    y: 0.373453,
  },
  { id: 'LSDL-1340', categories: [], name: '영기류', x: 0.309192, y: 0.753844 },
  { id: 'LSDL-1346', categories: ['축복'], name: '역참터 지하실', x: 0.605952, y: 0.641325 },
  { id: 'LSDL-1347', categories: ['보스'], name: '호박머리 광병', x: 0.606987, y: 0.651645 },
  { id: 'LSDL-1355', categories: [], name: '전송문 : 림그레이브 신수탑', x: 0.2124, y: 0.200271 },
  { id: 'LSDL-1356', categories: [], name: '트리나의 수련', x: 0.647097, y: 0.269034 },
  { id: 'LSDL-1357', categories: [], name: '트리나의 수련', x: 0.708981, y: 0.152076 },
  { id: 'LSDL-1358', categories: [], name: '트리나의 수련', x: 0.862625, y: 0.182703 },
  { id: 'LSDL-1359', categories: [], name: '트리나의 수련', x: 0.738164, y: 0.232126 },
  { id: 'LSDL-1361', categories: [], name: '트리나의 수련', x: 0.226219, y: 0.585598 },
  { id: 'LSDL-1362', categories: [], name: '트리나의 수련', x: 0.370715, y: 0.603308 },
  { id: 'LSDL-1364', categories: [], name: '트리나의 수련', x: 0.570453, y: 0.307406 },
  { id: 'LSDL-1367', categories: [], name: '트리나의 수련', x: 0.739538, y: 0.989248 },
  { id: 'LSDL-1371', categories: [], name: '트리나의 수련', x: 0.012454, y: 0.379357 },
  { id: 'LSDL-1372', categories: ['장소'], name: '스톰빌 성', x: 0.038544, y: 0.339497 },
  { id: 'LSDL-1431', categories: ['기타'], name: '새의 망원경', x: 0.446325, y: 0.517708 },
  {
    id: 'LSDL-1438',
    categories: ['장소'],
    name: '게르 요새',
    x: 0.986743,
    y: 0.357207,
    loot: [
      { id: 'LSDL-1438-1', name: '전회: 사자베기' },
      { id: 'LSDL-1438-2', name: '룬의 호', quantity: 1 },
      { id: 'LSDL-1438-3', name: '따스함의 돌', quantity: 2 },
      { id: 'LSDL-1438-4', name: '별 부수기의 전승' },
      { id: 'LSDL-1438-5', name: '버섯', quantity: 10 },
      { id: 'LSDL-1438-6', name: '카타르' },
    ],
  },
  { id: 'LSDL-1439', categories: [], name: '전송문 : 적사자성', x: 0.985685, y: 0.383418 },
  { id: 'LSDL-1440', categories: [], name: '트리나의 수련', x: 0.443837, y: 0.97116 },
  { id: 'LSDL-1441', categories: [], name: '트리나의 수련', x: 0.431551, y: 0.966744 },
  {
    id: 'LSDL-1578',
    categories: ['장소'],
    name: '림그레이브 콜로세움 마리카 동상',
    x: 0.282489,
    y: 0.096726,
  },
  { id: 'LSDL-1600', categories: [], name: '전송문', x: 0.580654, y: 0.016652 },
  { id: 'LSDL-1609', categories: [], name: '보물상자(전송함정)', x: 0.436824, y: 0.69703 },
  { id: 'LSDL-1667', categories: ['장소'], name: '용찬 교회', x: 0.111239, y: 0.857531 },
  { id: 'LSDL-1668', categories: ['기타'], name: '힌트 메시지', x: 0.129875, y: 0.86896 },
  { id: 'LSDL-1671', categories: ['기타'], name: '주의 사항', x: 0.099292, y: 0.619176 },
  {
    id: 'LSDL-1675',
    categories: ['기타'],
    name: '다른 사람에게 받을 수 없는 아이템',
    x: 0.07679,
    y: 0.619176,
  },
  {
    id: 'LSDL-1676',
    categories: ['기타'],
    name: '글이나 2차원 지도로 표현하기 어려운 것들',
    x: 0.099292,
    y: 0.64279,
  },
  {
    id: 'LSDL-1827',
    categories: ['보스'],
    name: '트리 가드',
    x: 0.288449,
    y: 0.664939,
    loot: [{ id: 'LSDL-1827-1', name: '황금 할버드' }],
  },
  {
    id: 'LSDL-1851',
    categories: ['NPC'],
    name: '마녀 레나',
    x: 0.28353,
    y: 0.608101,
    loot: [
      { id: 'LSDL-1851-1', name: '환혼의 종' },
      { id: 'LSDL-1851-2', name: '낙오된 늑대의 뼛가루' },
    ],
  },
  { id: 'LSDL-1858', categories: [], name: '군주군의 대검', x: 0.340836, y: 0.441696 },
  {
    id: 'LSDL-1859',
    categories: ['장소'],
    name: '관문 앞 폐허',
    x: 0.369684,
    y: 0.428803,
    loot: [
      { id: 'LSDL-1859-1', name: '철퇴' },
      { id: 'LSDL-1859-2', name: '군주군의 대검' },
      { id: 'LSDL-1859-3', name: '전회: 남각' },
      { id: 'LSDL-1859-4', name: '숫돌 소도' },
    ],
  },
  { id: 'LSDL-1860', categories: [], name: '철퇴', x: 0.383028, y: 0.446136 },
  { id: 'LSDL-1863', categories: [], name: '트리나의 수련', x: 0.430838, y: 0.684491 },
  {
    id: 'LSDL-1882',
    categories: ['암령'],
    name: '화산관 암살 퀘스트 1 : 옛 기사 이슈트반',
    x: 0.257877,
    y: 0.122913,
    loot: [
      { id: 'LSDL-1882-1', name: '룬의 호' },
      { id: 'LSDL-1882-2', name: '갈고리 손가락약' },
      { id: 'LSDL-1882-3', name: '비늘 투구' },
      { id: 'LSDL-1882-4', name: '비늘 갑옷' },
      { id: 'LSDL-1882-5', name: '비늘 장갑' },
      { id: 'LSDL-1882-6', name: '비늘 각반' },
    ],
  },
  {
    id: 'LSDL-1931',
    categories: [],
    name: '석관 묘지 ( 림그레이브 역참터 )',
    x: 0.639344,
    y: 0.685577,
    loot: [
      { id: 'LSDL-1931-1', name: '황금의 룬 [1]', quantity: 3 },
      { id: 'LSDL-1931-2', name: '황금의 룬 [2]' },
      { id: 'LSDL-1931-3', name: '황금의 룬 [3]' },
    ],
  },
  {
    id: 'LSDL-1932',
    categories: [],
    name: '석관 묘지 ( 게르 갱도 )',
    x: 0.940328,
    y: 0.111862,
    loot: [
      { id: 'LSDL-1932-1', name: '황금의 룬 [1]' },
      { id: 'LSDL-1932-2', name: '황금의 룬 [2]' },
      { id: 'LSDL-1932-3', name: '황금의 룬 [3]' },
    ],
  },
  {
    id: 'LSDL-1940',
    categories: [],
    name: '석관 묘지 ( 하이트 요새 남쪽 )',
    x: 0.731467,
    y: 0.750514,
    loot: [
      { id: 'LSDL-1940-1', name: '황금의 룬 [1]', quantity: 4 },
      { id: 'LSDL-1940-2', name: '황금의 룬 [2]', quantity: 2 },
      { id: 'LSDL-1940-3', name: '황금의 룬 [3]' },
      { id: 'LSDL-1940-4', name: '황금의 룬 [4]' },
    ],
  },
  {
    id: 'LSDL-2174',
    categories: [],
    name: '석관 묘지 ( 폭풍의 언덕 )',
    x: 0.285646,
    y: 0.330642,
    loot: [
      { id: 'LSDL-2174-1', name: '황금의 룬 [1]', quantity: 4 },
      { id: 'LSDL-2174-2', name: '황금의 룬 [2]' },
      { id: 'LSDL-2174-3', name: '황금의 룬 [3]' },
      { id: 'LSDL-2174-4', name: '황금의 룬 [5]' },
    ],
  },
  { id: 'LSDL-2243', categories: [], name: '트리나의 수련', x: 0.522976, y: 0.201499 },
  {
    id: 'LSDL-2244',
    categories: [],
    name: '석관 묘지 ( 마중물 마을 남동쪽 )',
    x: 0.783169,
    y: 0.235078,
    loot: [
      { id: 'LSDL-2244-1', name: '황금의 룬 [1]', quantity: 5 },
      { id: 'LSDL-2244-2', name: '황금의 룬 [2]' },
      { id: 'LSDL-2244-3', name: '황금의 룬 [5]' },
    ],
  },
  { id: 'LSDL-2266', categories: [], name: '잠알', x: 0.483221, y: 0.766029 },
  {
    id: 'LSDL-2281',
    categories: [],
    name: '게 파밍 위치 1',
    x: 0.549334,
    y: 0.720714,
    loot: [
      { id: 'LSDL-2281-1', name: '게알' },
      { id: 'LSDL-2281-2', name: '흰 저민 고기' },
      { id: 'LSDL-2281-3', name: '큰 잠자리 머리' },
    ],
  },
  { id: 'LSDL-2282', categories: [], name: '뿌리 기름 파밍 위치 1', x: 0.313073, y: 0.277889 },
  { id: 'LSDL-2283', categories: [], name: '뿌리 기름 파밍 위치 2', x: 0.315185, y: 0.231016 },
  { id: 'LSDL-2284', categories: [], name: '연기 나비 파밍 위치 1', x: 0.336276, y: 0.165347 },
  {
    id: 'LSDL-2287',
    categories: [],
    name: '문어 파밍 위치 - 림그레이브 북쪽',
    x: 0.510668,
    y: 0.159821,
    loot: [
      { id: 'LSDL-2287-1', name: '문어 알' },
      { id: 'LSDL-2287-2', name: '흰 저민 고기' },
    ],
  },
  {
    id: 'LSDL-2294',
    categories: [],
    name: '산양 파밍 위치 1',
    x: 0.578519,
    y: 0.760857,
    loot: [
      { id: 'LSDL-2294-1', name: '가는 짐승 뼈' },
      { id: 'LSDL-2294-2', name: '저민 고기' },
      { id: 'LSDL-2294-3', name: '짐승 간' },
      { id: 'LSDL-2294-4', name: '뿔의 싹' },
    ],
  },
  { id: 'LSDL-2313', categories: [], name: '아르테리아의 잎', x: 0.473742, y: 0.976331 },
  {
    id: 'LSDL-2317',
    categories: [],
    name: '산양 파밍 위치 2',
    x: 0.361231,
    y: 0.973379,
    loot: [
      { id: 'LSDL-2317-1', name: '가는 짐승 뼈' },
      { id: 'LSDL-2317-2', name: '저민 고기' },
      { id: 'LSDL-2317-3', name: '짐승 간' },
      { id: 'LSDL-2317-4', name: '뿔의 싹' },
    ],
  },
  {
    id: 'LSDL-2330',
    categories: [],
    name: '석관 묘지 ( 마중물 마을 남서쪽 )',
    x: 0.723378,
    y: 0.294489,
    loot: [
      { id: 'LSDL-2330-1', name: '황금의 룬 [1]', quantity: 3 },
      { id: 'LSDL-2330-2', name: '황금의 룬 [2]' },
      { id: 'LSDL-2330-3', name: '황금의 룬 [4]', quantity: 2 },
      { id: 'LSDL-2330-4', name: '황금의 룬 [6]' },
    ],
  },
  { id: 'LSDL-2332', categories: [], name: '황금의 룬 [5]', x: 0.002259, y: 0.352059 },
  { id: 'LSDL-2333', categories: [], name: '트리나의 수련', x: 0.000854, y: 0.289696 },
  {
    id: 'LSDL-2382',
    categories: [],
    name: '룬',
    x: 0.014916,
    y: 0.348352,
    loot: [
      { id: 'LSDL-2382-1', name: '황금의 룬 [1]' },
      { id: 'LSDL-2382-2', name: '황금의 룬 [2]' },
      { id: 'LSDL-2382-3', name: '발리스타 볼트', quantity: 5 },
    ],
  },
  { id: 'LSDL-2438', categories: ['기타'], name: '작업대', x: 0.258566, y: 0.605527 },
  { id: 'LSDL-2444', categories: [], name: '황금의 룬 [1]', x: 0.657971, y: 0.864167 },
  {
    id: 'LSDL-2495',
    categories: ['보스'],
    name: '폭풍 언덕의 봉인감옥',
    x: 0.274744,
    y: 0.484508,
    loot: [{ id: 'LSDL-2495-1', name: '기도: 도가니의 모습/꼬리' }],
  },
  { id: 'LSDL-2615', categories: [], name: '황금의 룬 [2]', x: 0.584142, y: 0.825417 },
  { id: 'LSDL-2616', categories: [], name: '황금의 룬 [1]', x: 0.605956, y: 0.498888 },
  { id: 'LSDL-2788', categories: [], name: '노크론으로 가는 길', x: 0.719499, y: 0.630983 },
  {
    id: 'LSDL-2974',
    categories: [],
    name: '흐린강 동굴의 전송함정 전송지',
    x: 0.731811,
    y: 0.489679,
  },
];

// Weeping Peninsula: LSDL base-game map, checked 2026-11-20; patch unspecified.
// Source, terrain alignment, description review and legacy CSV mapping:
// reference-data/maps/weeping-peninsula/{source.json,review.json,README.md}.
// Regenerate with node reference-data/maps/generate.mjs weeping-peninsula.
const WEEPING_PENINSULA_MARKERS = [
  {
    id: 'LSDL-308',
    categories: ['장소'],
    name: '제물 이송용 대교',
    x: 0.812562,
    y: 0.188623,
  },
  {
    id: 'LSDL-309',
    categories: ['장소'],
    name: '카르의 세례 교회',
    x: 0.643317,
    y: 0.405349,
    loot: [
      {
        id: 'LSDL-309-1',
        name: '성배의 물방울',
      },
      {
        id: 'LSDL-309-2',
        name: '미친 불',
      },
    ],
  },
  {
    id: 'LSDL-310',
    categories: ['장소'],
    name: '병자 마을',
    x: 0.632852,
    y: 0.374638,
  },
  {
    id: 'LSDL-314',
    categories: ['장소'],
    name: '몬 성',
    x: 0.519293,
    y: 0.721722,
    loot: [
      {
        id: 'LSDL-314-1',
        name: '채찍',
      },
      {
        id: 'LSDL-314-2',
        name: '석검 열쇠',
      },
      {
        id: 'LSDL-314-3',
        name: '단석 [2]',
        quantity: 4,
      },
      {
        id: 'LSDL-314-4',
        name: '단석 [1]',
        quantity: 2,
      },
      {
        id: 'LSDL-314-5',
        name: '색 잃은 단석 [1]',
      },
      {
        id: 'LSDL-314-6',
        name: '희생의 가는 가지',
      },
    ],
  },
  {
    id: 'LSDL-315',
    categories: ['장소'],
    name: '순례교회',
    x: 0.450135,
    y: 0.08974,
  },
  {
    id: 'LSDL-318',
    categories: ['장소'],
    name: '아인 숲 폐허',
    x: 0.544185,
    y: 0.221382,
    loot: [
      {
        id: 'LSDL-318-1',
        name: '죄인의 방패',
      },
    ],
  },
  {
    id: 'LSDL-321',
    categories: ['장소'],
    name: '오리티스의 마술사탑',
    x: 0.848876,
    y: 0.406224,
    loot: [
      {
        id: 'LSDL-321-1',
        name: '메모리 스톤',
      },
    ],
  },
  {
    id: 'LSDL-324',
    categories: ['장소'],
    name: '은둔 상인의 오두막',
    x: 0.169788,
    y: 0.476715,
  },
  {
    id: 'LSDL-370',
    categories: ['장소'],
    name: '제4 마리카 교회',
    x: 0.198052,
    y: 0.315291,
  },
  {
    id: 'LSDL-508',
    categories: ['축복'],
    name: '용찬 교회',
    x: 0.128222,
    y: 0.024054,
  },
  {
    id: 'LSDL-721',
    categories: ['축복'],
    name: '제물 이송 대교',
    x: 0.797506,
    y: 0.19988,
  },
  {
    id: 'LSDL-722',
    categories: ['축복', '던전', '보스'],
    name: '꼬챙이의 지하 묘지 ( 임프 )',
    x: 0.878768,
    y: 0.21794,
    loot: [
      {
        id: 'LSDL-722-1',
        name: '말하는 머리 「도와줘」',
      },
      {
        id: 'LSDL-722-2',
        name: '묘 은방울꽃 [1]',
        quantity: 3,
      },
      {
        id: 'LSDL-722-3',
        name: '묘 은방울꽃 [2]',
        quantity: 3,
      },
      {
        id: 'LSDL-722-4',
        name: '아인단의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-723',
    categories: ['축복'],
    name: '구멍난 땅 옆',
    x: 0.843329,
    y: 0.321686,
  },
  {
    id: 'LSDL-724',
    categories: ['축복'],
    name: '감시탑 남쪽',
    x: 0.699632,
    y: 0.305483,
  },
  {
    id: 'LSDL-725',
    categories: ['축복'],
    name: '격리 마을 변두리',
    x: 0.66411,
    y: 0.3245,
  },
  {
    id: 'LSDL-726',
    categories: ['축복'],
    name: '몬 성문 앞',
    x: 0.777669,
    y: 0.421169,
  },
  {
    id: 'LSDL-728',
    categories: ['축복'],
    name: '몬 성 승강기 앞',
    x: 0.610993,
    y: 0.737351,
  },
  {
    id: 'LSDL-729',
    categories: ['축복'],
    name: '성 뒤편',
    x: 0.552464,
    y: 0.8185,
  },
  {
    id: 'LSDL-730',
    categories: ['축복'],
    name: '성벽 감옥 옆',
    x: 0.528146,
    y: 0.841042,
  },
  {
    id: 'LSDL-731',
    categories: ['축복'],
    name: '몬의 한탄묘',
    x: 0.500303,
    y: 0.937984,
  },
  {
    id: 'LSDL-732',
    categories: ['축복'],
    name: '은둔 상인의 오두막',
    x: 0.170455,
    y: 0.476196,
  },
  {
    id: 'LSDL-733',
    categories: ['축복'],
    name: '영묘 들판',
    x: 0.389285,
    y: 0.404364,
  },
  {
    id: 'LSDL-734',
    categories: ['축복', '던전', '보스'],
    name: '영묘 들판 동굴',
    x: 0.258435,
    y: 0.356084,
    loot: [
      {
        id: 'LSDL-734-1',
        name: '독꽃',
      },
      {
        id: 'LSDL-734-2',
        name: '아르테리아의 잎',
      },
      {
        id: 'LSDL-734-3',
        name: '황금의 룬 [2]',
      },
      {
        id: 'LSDL-734-4',
        name: '면역의 흰 육포',
      },
      {
        id: 'LSDL-734-5',
        name: '방랑 전사의 제작서 [8]',
      },
      {
        id: 'LSDL-734-6',
        name: '녹색 호박 메달리온',
      },
    ],
  },
  {
    id: 'LSDL-736',
    categories: ['축복', '던전', '보스'],
    name: '영묘 들판 지하 묘지 ( 해골 )',
    x: 0.449425,
    y: 0.292641,
    loot: [
      {
        id: 'LSDL-736-1',
        name: '묘 은방울꽃 [1]',
        quantity: 4,
      },
      {
        id: 'LSDL-736-2',
        name: '묘 은방울꽃 [2]',
        quantity: 3,
      },
      {
        id: 'LSDL-736-3',
        name: '황금의 룬 [2]',
      },
      {
        id: 'LSDL-736-4',
        name: '방랑 전사의 제작서 [9]',
      },
      {
        id: 'LSDL-736-5',
        name: '말하는 머리 「고마워」',
      },
      {
        id: 'LSDL-736-6',
        name: '목 없는 기사 루텔',
      },
    ],
  },
  {
    id: 'LSDL-813',
    categories: ['축복', '던전', '보스'],
    name: '몬 갱도',
    x: 0.560771,
    y: 0.41136,
    loot: [
      {
        id: 'LSDL-813-1',
        name: '단석 [1]',
        quantity: 9,
      },
      {
        id: 'LSDL-813-2',
        name: '색 잃은 단석 [1]',
        quantity: 3,
      },
      {
        id: 'LSDL-813-3',
        name: '황금의 룬 [2]',
      },
      {
        id: 'LSDL-813-4',
        name: '황금의 룬 [4]',
      },
      {
        id: 'LSDL-813-5',
        name: '용사의 고깃덩어리',
      },
      {
        id: 'LSDL-813-6',
        name: '출혈 이끼약',
      },
      {
        id: 'LSDL-813-7',
        name: '아르테리아의 잎',
        quantity: 2,
      },
      {
        id: 'LSDL-813-8',
        name: '녹슨 닻',
      },
    ],
  },
  {
    id: 'LSDL-816',
    categories: ['축복'],
    name: '순례 교회',
    x: 0.444315,
    y: 0.08974,
  },
  {
    id: 'LSDL-819',
    categories: ['축복', '던전', '보스'],
    name: '구멍을 내려가는 동굴',
    x: 0.638398,
    y: 0.208978,
    loot: [
      {
        id: 'LSDL-819-1',
        name: '연기나비',
        quantity: 5,
      },
      {
        id: 'LSDL-819-2',
        name: '트리나의 수련',
      },
      {
        id: 'LSDL-819-3',
        name: '황금의 룬 [1]',
      },
      {
        id: 'LSDL-819-4',
        name: '황금의 룬 [3]',
      },
      {
        id: 'LSDL-819-5',
        name: '마력 용 표식의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-871',
    categories: ['축복'],
    name: '제4 마리카 교회',
    x: 0.199973,
    y: 0.332149,
  },
  {
    id: 'LSDL-925',
    categories: ['색단석'],
    name: '색 잃은 단석[1]',
    x: 0.102308,
    y: 0.074301,
    loot: [
      {
        id: 'LSDL-925-1',
        name: '색 잃은 단석[1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-926',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.129821,
    y: 0.080722,
    loot: [
      {
        id: 'LSDL-926-1',
        name: '단석 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1059',
    categories: ['장소'],
    name: '작은 황금 나무',
    x: 0.485985,
    y: 0.384036,
  },
  {
    id: 'LSDL-1060',
    categories: ['지도조각'],
    name: '지도 조각 (흐느낌의 반도)',
    x: 0.696462,
    y: 0.565462,
  },
  {
    id: 'LSDL-1061',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.674275,
    y: 0.553522,
  },
  {
    id: 'LSDL-1062',
    categories: ['기도'],
    name: '기도 : 독안개',
    x: 0.786987,
    y: 0.586392,
  },
  {
    id: 'LSDL-1064',
    categories: ['NPC'],
    name: '성주 에드거 [1]',
    x: 0.601265,
    y: 0.770822,
  },
  {
    id: 'LSDL-1065',
    categories: ['NPC'],
    name: '일레나',
    x: 0.821989,
    y: 0.219662,
  },
  {
    id: 'LSDL-1099',
    categories: ['무기'],
    name: '라지 클럽',
    x: 0.678975,
    y: 0.165862,
  },
  {
    id: 'LSDL-1101',
    categories: ['중요아이템'],
    name: '별빛 조각',
    x: 0.795102,
    y: 0.01217,
    loot: [
      {
        id: 'LSDL-1101-1',
        name: '별빛 조각',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1146',
    categories: [],
    name: '걷는 영묘 [종]',
    x: 0.319912,
    y: 0.408791,
  },
  {
    id: 'LSDL-1147',
    categories: ['장소'],
    name: '영묘 들판 폐허',
    x: 0.339978,
    y: 0.261492,
    loot: [
      {
        id: 'LSDL-1147-1',
        name: '트리나의 수련',
        quantity: 4,
      },
      {
        id: 'LSDL-1147-2',
        name: '날개낫',
      },
    ],
  },
  {
    id: 'LSDL-1148',
    categories: ['장소'],
    name: '마녀 봉인의 폐허',
    x: 0.201224,
    y: 0.38103,
    loot: [
      {
        id: 'LSDL-1148-1',
        name: '독꽃',
        quantity: 5,
      },
      {
        id: 'LSDL-1148-2',
        name: '큰 잠자리 머리',
      },
      {
        id: 'LSDL-1148-3',
        name: '기적의 돌팔매',
      },
    ],
  },
  {
    id: 'LSDL-1189',
    categories: ['성배병'],
    name: '성배의 물방울',
    x: 0.445845,
    y: 0.083045,
  },
  {
    id: 'LSDL-1190',
    categories: ['성배병'],
    name: '성배의 물방울',
    x: 0.226411,
    y: 0.318706,
  },
  {
    id: 'LSDL-1250',
    categories: ['보스'],
    name: '주인 잃은 사냥개의 봉인 감옥',
    x: 0.70914,
    y: 0.081489,
    loot: [
      {
        id: 'LSDL-1250-1',
        name: '사냥개의 긴 이빨',
      },
    ],
  },
  {
    id: 'LSDL-1251',
    categories: ['NPC'],
    name: '반 늑대 블라이드 [2]',
    x: 0.686653,
    y: 0.087308,
  },
  {
    id: 'LSDL-1264',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.859149,
    y: 0.190617,
    loot: [
      {
        id: 'LSDL-1264-1',
        name: '석검 열쇠',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1266',
    categories: ['장소'],
    name: '숲 감시탑',
    x: 0.713977,
    y: 0.224361,
    loot: [
      {
        id: 'LSDL-1266-1',
        name: '핸디 발리스타',
      },
      {
        id: 'LSDL-1266-2',
        name: '발리스타 볼트',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-1269',
    categories: ['보스'],
    name: '아인 여왕',
    x: 0.548311,
    y: 0.190207,
    loot: [
      {
        id: 'LSDL-1269-1',
        name: '아인 여왕의 지팡이',
      },
      {
        id: 'LSDL-1269-2',
        name: '결정 산탄',
      },
    ],
  },
  {
    id: 'LSDL-1270',
    categories: ['성배병'],
    name: '신앙의 혹 결정 물방울',
    x: 0.542354,
    y: 0.14496,
  },
  {
    id: 'LSDL-1271',
    categories: ['보스'],
    name: '황금나무의 화신',
    x: 0.505194,
    y: 0.375047,
    loot: [
      {
        id: 'LSDL-1271-1',
        name: '진주색 거품 물방울',
      },
      {
        id: 'LSDL-1271-2',
        name: '샘솟는 붉은 결정 물방울',
      },
    ],
  },
  {
    id: 'LSDL-1272',
    categories: ['무기'],
    name: '금장 철제 방패',
    x: 0.433058,
    y: 0.092854,
  },
  {
    id: 'LSDL-1273',
    categories: ['영체'],
    name: '전쟁매의 뼛가루',
    x: 0.438167,
    y: 0.062116,
  },
  {
    id: 'LSDL-1274',
    categories: ['기도'],
    name: '기도 : 신성 방호',
    x: 0.316496,
    y: 0.286247,
  },
  {
    id: 'LSDL-1275',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.801496,
    y: 0.143949,
    loot: [
      {
        id: 'LSDL-1275-1',
        name: '석검 열쇠',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1276',
    categories: ['일반단석'],
    name: '단석[1]',
    x: 0.798517,
    y: 0.132419,
    loot: [
      {
        id: 'LSDL-1276-1',
        name: '단석[1]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1277',
    categories: ['무기'],
    name: '모닝스타',
    x: 0.779145,
    y: 0.302778,
  },
  {
    id: 'LSDL-1278',
    categories: ['일반단석'],
    name: '단석[2]',
    x: 0.768488,
    y: 0.319418,
    loot: [
      {
        id: 'LSDL-1278-1',
        name: '단석[2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1279',
    categories: ['전회'],
    name: '전회 : 강화 사격',
    x: 0.753405,
    y: 0.382179,
  },
  {
    id: 'LSDL-1280',
    categories: ['NPC'],
    name: '방랑 민족 상인 [4]',
    x: 0.779145,
    y: 0.437262,
  },
  {
    id: 'LSDL-1281',
    categories: ['보스'],
    name: '밤 기병 - 몬 성',
    x: 0.741164,
    y: 0.466717,
    loot: [
      {
        id: 'LSDL-1281-1',
        name: '밤 기병의 철퇴',
      },
      {
        id: 'LSDL-1281-2',
        name: '철벽의 방패',
      },
    ],
  },
  {
    id: 'LSDL-1282',
    categories: ['무기'],
    name: '큰 거북 등딱지 방패',
    x: 0.792397,
    y: 0.448356,
  },
  {
    id: 'LSDL-1283',
    categories: ['보스'],
    name: '죽음의 새 - 몬 성',
    x: 0.648235,
    y: 0.543685,
    loot: [
      {
        id: 'LSDL-1283-1',
        name: '산 제물의 도끼',
      },
    ],
  },
  {
    id: 'LSDL-1284',
    categories: ['색단석'],
    name: '색 잃은 단석[2]',
    x: 0.737749,
    y: 0.76727,
    loot: [
      {
        id: 'LSDL-1284-1',
        name: '색 잃은 단석[2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1285',
    categories: ['중요아이템'],
    name: '별빛 조각',
    x: 0.894562,
    y: 0.415896,
    loot: [
      {
        id: 'LSDL-1285-1',
        name: '별빛 조각',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1287',
    categories: ['무기'],
    name: '화염 문양 우드 실드',
    x: 0.637114,
    y: 0.354992,
  },
  {
    id: 'LSDL-1288',
    categories: ['기도'],
    name: '기도 : 뇌격',
    x: 0.553448,
    y: 0.434967,
  },
  {
    id: 'LSDL-1293',
    categories: [],
    name: '영기류',
    x: 0.523992,
    y: 0.268323,
  },
  {
    id: 'LSDL-1294',
    categories: [],
    name: '영기류',
    x: 0.576072,
    y: 0.33521,
  },
  {
    id: 'LSDL-1295',
    categories: [],
    name: '이름 없는 마커',
    x: 0.748268,
    y: 0.031105,
  },
  {
    id: 'LSDL-1296',
    categories: ['무기'],
    name: '일식 문양 카이트 실드',
    x: 0.424232,
    y: 0.327969,
  },
  {
    id: 'LSDL-1297',
    categories: ['NPC'],
    name: '은둔 상인 [1]',
    x: 0.168635,
    y: 0.466715,
  },
  {
    id: 'LSDL-1298',
    categories: [],
    name: '전송 함정 : 신수교',
    x: 0.311373,
    y: 0.579423,
  },
  {
    id: 'LSDL-1303',
    categories: ['NPC'],
    name: 'NPC 소환 : 성주 에드거',
    x: 0.523419,
    y: 0.88495,
  },
  {
    id: 'LSDL-1304',
    categories: ['보스'],
    name: '사자 혼종',
    x: 0.505904,
    y: 0.919104,
    loot: [
      {
        id: 'LSDL-1304-1',
        name: '검 잇기의 대검',
      },
    ],
  },
  {
    id: 'LSDL-1305',
    categories: ['NPC'],
    name: '복수자 에드거[2]',
    x: 0.821989,
    y: 0.230345,
  },
  {
    id: 'LSDL-1306',
    categories: [],
    name: '영기류',
    x: 0.792096,
    y: 0.410923,
  },
  {
    id: 'LSDL-1316',
    categories: [],
    name: '영기류',
    x: 0.701162,
    y: 0.161163,
  },
  {
    id: 'LSDL-1365',
    categories: ['일반단석'],
    name: '단석 [1]',
    x: 0.778872,
    y: 0.472837,
    loot: [
      {
        id: 'LSDL-1365-1',
        name: '단석 [1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1366',
    categories: [],
    name: '트리나의 수련',
    x: 0.605965,
    y: 0.788336,
    loot: [
      {
        id: 'LSDL-1366-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1367',
    categories: [],
    name: '트리나의 수련',
    x: 0.873221,
    y: 0.193623,
    loot: [
      {
        id: 'LSDL-1367-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1369',
    categories: [],
    name: '트리나의 수련',
    x: 0.443714,
    y: 0.314444,
    loot: [
      {
        id: 'LSDL-1369-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1370',
    categories: [],
    name: '트리나의 수련',
    x: 0.163227,
    y: 0.360128,
    loot: [
      {
        id: 'LSDL-1370-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1440',
    categories: [],
    name: '트리나의 수련',
    x: 0.514156,
    y: 0.172693,
    loot: [
      {
        id: 'LSDL-1440-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1441',
    categories: [],
    name: '트리나의 수련',
    x: 0.499237,
    y: 0.167583,
    loot: [
      {
        id: 'LSDL-1441-1',
        name: '트리나의 수련',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1666',
    categories: [],
    name: '트리나의 수련',
    x: 0.291306,
    y: 0.334936,
    loot: [
      {
        id: 'LSDL-1666-1',
        name: '트리나의 수련',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1667',
    categories: ['장소'],
    name: '용찬 교회',
    x: 0.110284,
    y: 0.041213,
  },
  {
    id: 'LSDL-1668',
    categories: ['기타'],
    name: '힌트 메시지',
    x: 0.132914,
    y: 0.054437,
  },
  {
    id: 'LSDL-1831',
    categories: ['탈리스만'],
    name: '쌍날검의 탈리스만',
    x: 0.505631,
    y: 0.772106,
  },
  {
    id: 'LSDL-1835',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.588887,
    y: 0.766559,
    loot: [
      {
        id: 'LSDL-1835-1',
        name: '단석 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1836',
    categories: ['NPC'],
    name: '마술사 셀렌',
    x: 0.200798,
    y: 0.36909,
  },
  {
    id: 'LSDL-1918',
    categories: [],
    name: '트리나의 수련',
    x: 0.608943,
    y: 0.317013,
    loot: [
      {
        id: 'LSDL-1918-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2257',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.782287,
    y: 0.363955,
    loot: [
      {
        id: 'LSDL-2257-1',
        name: '아르테리아의 잎',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2258',
    categories: ['일반단석'],
    name: '단석 [1]',
    x: 0.546617,
    y: 0.797708,
    loot: [
      {
        id: 'LSDL-2258-1',
        name: '단석 [1]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2259',
    categories: ['무기'],
    name: '클레이모어',
    x: 0.537218,
    y: 0.754182,
  },
  {
    id: 'LSDL-2260',
    categories: ['무기'],
    name: '강선 토치',
    x: 0.566673,
    y: 0.735384,
  },
  {
    id: 'LSDL-2261',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.533392,
    y: 0.824184,
    loot: [
      {
        id: 'LSDL-2261-1',
        name: '단석 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2262',
    categories: ['무기'],
    name: '채찍',
    x: 0.518856,
    y: 0.831014,
  },
  {
    id: 'LSDL-2263',
    categories: ['색단석'],
    name: '색 잃은 단석 [1]',
    x: 0.4941,
    y: 0.871152,
    loot: [
      {
        id: 'LSDL-2263-1',
        name: '색 잃은 단석 [1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2292',
    categories: [],
    name: '룬의 호 파밍 위치 1',
    x: 0.505631,
    y: 0.843392,
  },
  {
    id: 'LSDL-2299',
    categories: [],
    name: '황금의 룬 [1]',
    x: 0.540633,
    y: 0.662376,
    loot: [
      {
        id: 'LSDL-2299-1',
        name: '황금의 룬 [1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2301',
    categories: [],
    name: '황금의 룬 [4]',
    x: 0.756685,
    y: 0.659399,
    loot: [
      {
        id: 'LSDL-2301-1',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2302',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.724661,
    y: 0.772953,
    loot: [
      {
        id: 'LSDL-2302-1',
        name: '아르테리아의 잎',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2303',
    categories: [],
    name: '독꽃 파밍 위치 1',
    x: 0.767341,
    y: 0.641885,
  },
  {
    id: 'LSDL-2304',
    categories: [],
    name: '이엘로의 눈동자',
    x: 0.603396,
    y: 0.456607,
    loot: [
      {
        id: 'LSDL-2304-1',
        name: '이엘로의 눈동자',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2305',
    categories: [],
    name: '이엘로의 눈동자',
    x: 0.591456,
    y: 0.426715,
    loot: [
      {
        id: 'LSDL-2305-1',
        name: '이엘로의 눈동자',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2306',
    categories: [],
    name: '황금의 룬 [2]',
    x: 0.603396,
    y: 0.370375,
    loot: [
      {
        id: 'LSDL-2306-1',
        name: '황금의 룬 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2307',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.663591,
    y: 0.406223,
    loot: [
      {
        id: 'LSDL-2307-1',
        name: '아르테리아의 잎',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-2308',
    categories: [],
    name: '이엘로의 눈동자',
    x: 0.65206,
    y: 0.367807,
    loot: [
      {
        id: 'LSDL-2308-1',
        name: '이엘로의 눈동자',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-2309',
    categories: [],
    name: '황금의 룬 [2]',
    x: 0.585472,
    y: 0.327669,
    loot: [
      {
        id: 'LSDL-2309-1',
        name: '황금의 룬 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2310',
    categories: [],
    name: '독꽃 파밍 위치',
    x: 0.58804,
    y: 0.341331,
  },
  {
    id: 'LSDL-2311',
    categories: ['중요아이템'],
    name: '유혹의 나뭇가지',
    x: 0.414259,
    y: 0.054438,
    loot: [
      {
        id: 'LSDL-2311-1',
        name: '유혹의 나뭇가지',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2313',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.550469,
    y: 0.178676,
    loot: [
      {
        id: 'LSDL-2313-1',
        name: '아르테리아의 잎',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2314',
    categories: ['무기'],
    name: '거의 망가진 나무 방패',
    x: 0.576919,
    y: 0.277285,
  },
  {
    id: 'LSDL-2315',
    categories: [],
    name: '황금의 룬 [1]',
    x: 0.744716,
    y: 0.232039,
    loot: [
      {
        id: 'LSDL-2315-1',
        name: '황금의 룬 [1]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2316',
    categories: [],
    name: '황금의 룬 [1]',
    x: 0.738322,
    y: 0.220946,
    loot: [
      {
        id: 'LSDL-2316-1',
        name: '황금의 룬 [1]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2317',
    categories: [],
    name: '산양 파밍 위치 2',
    x: 0.413849,
    y: 0.175261,
  },
  {
    id: 'LSDL-2318',
    categories: [],
    name: '황금의 룬 [5]',
    x: 0.071861,
    y: 0.362669,
    loot: [
      {
        id: 'LSDL-2318-1',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2319',
    categories: [],
    name: '황금의 룬 [2]',
    x: 0.267397,
    y: 0.23589,
    loot: [
      {
        id: 'LSDL-2319-1',
        name: '황금의 룬 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2320',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.28533,
    y: 0.382314,
  },
  {
    id: 'LSDL-2321',
    categories: [],
    name: '석관 묘지 ( 흐느낌 반도 )',
    x: 0.246905,
    y: 0.579122,
    loot: [
      {
        id: 'LSDL-2321-1',
        name: '황금의 룬 [1]',
        quantity: 4,
      },
      {
        id: 'LSDL-2321-2',
        name: '황금의 룬 [2]',
      },
      {
        id: 'LSDL-2321-3',
        name: '황금의 룬 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2322',
    categories: [],
    name: '큰 잠자리 머리',
    x: 0.354067,
    y: 0.547537,
    loot: [
      {
        id: 'LSDL-2322-1',
        name: '큰 잠자리 머리',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2444',
    categories: [],
    name: '황금의 룬 [1]',
    x: 0.774172,
    y: 0.048892,
    loot: [
      {
        id: 'LSDL-2444-1',
        name: '황금의 룬 [1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2500',
    categories: ['보스'],
    name: '흐느낌의 봉인 감옥',
    x: 0.276365,
    y: 0.297367,
    loot: [
      {
        id: 'LSDL-2500-1',
        name: '라다곤의 각인',
      },
    ],
  },
  {
    id: 'LSDL-2615',
    categories: [],
    name: '황금의 룬 [2]',
    x: 0.684521,
    y: 0.004055,
    loot: [
      {
        id: 'LSDL-2615-1',
        name: '황금의 룬 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2878',
    categories: [],
    name: '잠알 파밍 위치 (흐느낌 감시탑 남쪽)',
    x: 0.654629,
    y: 0.268324,
  },
];

// LSDL base-game map, checked 2026-11-20; patch unspecified.
// Source, terrain alignment and description review: reference-data/maps/stormveil-castle/.
// Regenerate: node reference-data/maps/generate.mjs stormveil-castle.
const STORMVEIL_CASTLE_MARKERS = [
  {
    id: 'LSDL-379',
    categories: ['장소'],
    name: '이름 없는 마커',
    x: 0.886105,
    y: 0.909203,
  },
  {
    id: 'LSDL-390',
    categories: ['장소'],
    name: '이름 없는 마커',
    x: 0.551957,
    y: 0.750607,
  },
  {
    id: 'LSDL-517',
    categories: ['축복'],
    name: '끔찍한 흉조 멀기트',
    x: 0.286802,
    y: 0.938577,
  },
  {
    id: 'LSDL-519',
    categories: ['축복'],
    name: '스톰빌 정문',
    x: 0.225023,
    y: 0.881249,
  },
  {
    id: 'LSDL-520',
    categories: ['축복'],
    name: '성문 옆 작은 방',
    x: 0.198148,
    y: 0.91132,
    loot: [
      {
        id: 'LSDL-520-1',
        name: '황금의 룬 [5]',
      },
      {
        id: 'LSDL-520-2',
        name: '시민의 옷',
      },
    ],
  },
  {
    id: 'LSDL-539',
    categories: ['축복'],
    name: '성으로 향하는 굴',
    x: 0.31213,
    y: 0.909462,
  },
  {
    id: 'LSDL-540',
    categories: ['축복'],
    name: '폭풍 언덕의 낡은 집',
    x: 0.39306,
    y: 0.844326,
    loot: [
      {
        id: 'LSDL-540-1',
        name: '석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-541',
    categories: ['축복'],
    name: '림그레이브 신수탑 교량',
    x: 0.246642,
    y: 0.732858,
  },
  {
    id: 'LSDL-543',
    categories: ['축복'],
    name: '후미진 작은 방',
    x: 0.161999,
    y: 0.479853,
    loot: [
      {
        id: 'LSDL-543-1',
        name: '전회 : 폭풍 부르기',
      },
      {
        id: 'LSDL-543-2',
        name: '단석 [2]',
        quantity: 3,
      },
      {
        id: 'LSDL-543-3',
        name: '단석 [1]',
      },
      {
        id: 'LSDL-543-4',
        name: '성관의 타워 실드',
      },
      {
        id: 'LSDL-543-5',
        name: '단석 [3]',
      },
    ],
  },
  {
    id: 'LSDL-544',
    categories: ['축복'],
    name: '접목의 고드릭',
    x: 0.127401,
    y: 0.421037,
  },
  {
    id: 'LSDL-546',
    categories: ['축복'],
    name: '호수를 향한 절벽',
    x: 0.032875,
    y: 0.273229,
  },
  {
    id: 'LSDL-880',
    categories: ['축복'],
    name: '화가의 낡은 집',
    x: 0.887319,
    y: 0.910691,
  },
  {
    id: 'LSDL-883',
    categories: ['축복'],
    name: '성인 다리',
    x: 0.745246,
    y: 0.513172,
  },
  {
    id: 'LSDL-885',
    categories: ['축복', '던전', '보스'],
    name: '죽음에 닿은 지하 묘지 (해골)',
    x: 0.662987,
    y: 0.46987,
    loot: [
      {
        id: 'LSDL-885-1',
        name: '묘 은방울꽃 [1]',
        quantity: 4,
      },
      {
        id: 'LSDL-885-2',
        name: '타도',
      },
      {
        id: 'LSDL-885-3',
        name: '피의 장미',
        quantity: 3,
      },
      {
        id: 'LSDL-885-4',
        name: '붉은 흉악한 칼날',
      },
      {
        id: 'LSDL-885-5',
        name: '사근',
      },
    ],
  },
  {
    id: 'LSDL-887',
    categories: ['축복', '던전', '보스'],
    name: '높은 길 아래 동굴',
    x: 0.757669,
    y: 0.401227,
    loot: [
      {
        id: 'LSDL-887-1',
        name: '단석 [1]',
        quantity: 3,
      },
      {
        id: 'LSDL-887-2',
        name: '단석 [2]',
        quantity: 1,
      },
      {
        id: 'LSDL-887-3',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-887-4',
        name: '샴시르',
      },
      {
        id: 'LSDL-887-5',
        name: '푸른 무희',
      },
    ],
  },
  {
    id: 'LSDL-889',
    categories: ['축복'],
    name: '림그레이브 신수탑',
    x: 0.920807,
    y: 0.094139,
  },
  {
    id: 'LSDL-891',
    categories: ['축복'],
    name: '전쟁 배움의 낡은 집',
    x: 0.548868,
    y: 0.752891,
  },
  {
    id: 'LSDL-931',
    categories: ['축복', '던전', '보스'],
    name: '고인물 동굴',
    x: 0.000656,
    y: 0.204691,
    loot: [
      {
        id: 'LSDL-931-1',
        name: '황금의 룬 [3]',
      },
      {
        id: 'LSDL-931-2',
        name: '황금의 룬 [4]',
      },
      {
        id: 'LSDL-931-3',
        name: '동굴 이끼',
      },
      {
        id: 'LSDL-931-4',
        name: '동굴 이끼 결정',
      },
      {
        id: 'LSDL-931-5',
        name: '동굴 이끼 꽃눈',
      },
      {
        id: 'LSDL-931-6',
        name: '독꽃',
      },
      {
        id: 'LSDL-931-7',
        name: '현자의 후드',
      },
      {
        id: 'LSDL-931-8',
        name: '현자의 로브',
      },
      {
        id: 'LSDL-931-9',
        name: '현자의 바지',
      },
      {
        id: 'LSDL-931-10',
        name: '유익검의 휘장',
      },
    ],
  },
  {
    id: 'LSDL-934',
    categories: ['축복'],
    name: '마중물 마을 변두리',
    x: 0.992443,
    y: 0.563329,
  },
  {
    id: 'LSDL-999',
    categories: ['NPC'],
    name: '알렉산더[1]',
    x: 0.722848,
    y: 0.540108,
  },
  {
    id: 'LSDL-1008',
    categories: ['NPC'],
    name: '네펠리 루[1]',
    x: 0.155657,
    y: 0.613155,
  },
  {
    id: 'LSDL-1068',
    categories: ['NPC'],
    name: '방랑 민족 상인 [1]',
    x: 0.837872,
    y: 0.555889,
  },
  {
    id: 'LSDL-1081',
    categories: ['NPC'],
    name: '마음이 꺾인 아가씨(로데리카 [1])',
    x: 0.402579,
    y: 0.877107,
  },
  {
    id: 'LSDL-1082',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.180801,
    y: 0.609808,
  },
  {
    id: 'LSDL-1110',
    categories: ['NPC'],
    name: '피 묻은 손가락 사냥꾼 유라[2]',
    x: 0.826747,
    y: 0.919457,
  },
  {
    id: 'LSDL-1111',
    categories: ['축복'],
    name: '흐린 강 기슭',
    x: 0.802001,
    y: 0.917809,
  },
  {
    id: 'LSDL-1112',
    categories: ['색단석'],
    name: '색 잃은 단석[1]',
    x: 0.845294,
    y: 0.936937,
  },
  {
    id: 'LSDL-1113',
    categories: ['일반단석'],
    name: '단석[1]',
    x: 0.87455,
    y: 0.913666,
  },
  {
    id: 'LSDL-1114',
    categories: ['일반단석'],
    name: '단석[1]',
    x: 0.713382,
    y: 0.793272,
    loot: [
      {
        id: 'LSDL-1114-1',
        name: '단석[1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1116',
    categories: ['축복', '던전', '보스'],
    name: '흐린 강의 지하 묘지 ( 임프 )',
    x: 0.791709,
    y: 0.776696,
    loot: [
      {
        id: 'LSDL-1116-1',
        name: '묘 은방울꽃 [1]',
        quantity: 3,
      },
      {
        id: 'LSDL-1116-2',
        name: '땅 잃은 기사 잉바르',
      },
    ],
  },
  {
    id: 'LSDL-1135',
    categories: ['보스'],
    name: '끔찍한 흉조 멀기트',
    x: 0.264488,
    y: 0.933582,
    loot: [
      {
        id: 'LSDL-1135-1',
        name: '부적 주머니',
      },
    ],
  },
  {
    id: 'LSDL-1136',
    categories: ['보스'],
    name: '접목의 고드릭',
    x: 0.11979,
    y: 0.40393,
    loot: [
      {
        id: 'LSDL-1136-1',
        name: '고드릭의 거대한 룬',
      },
      {
        id: 'LSDL-1136-2',
        name: '접목의 추억',
      },
    ],
  },
  {
    id: 'LSDL-1185',
    categories: ['암령'],
    name: '침입 : 배율자 헨릭스',
    x: 0.512216,
    y: 0.359943,
    loot: [
      {
        id: 'LSDL-1185-1',
        name: '망치의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-1186',
    categories: ['탈리스만'],
    name: '망치의 탈리스만',
    x: 0.51263,
    y: 0.337522,
  },
  {
    id: 'LSDL-1207',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.414946,
    y: 0.981614,
  },
  {
    id: 'LSDL-1208',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.393509,
    y: 0.868712,
  },
  {
    id: 'LSDL-1218',
    categories: ['일반단석'],
    name: '빛나는 석상',
    x: 0.616115,
    y: 0.88322,
    loot: [
      {
        id: 'LSDL-1218-1',
        name: '단석 [1]',
        quantity: 5,
      },
      {
        id: 'LSDL-1218-2',
        name: '단석 [2]',
      },
    ],
  },
  {
    id: 'LSDL-1219',
    categories: ['보스'],
    name: '죽음의 새 - 전쟁 배움 집',
    x: 0.638352,
    y: 0.763678,
    loot: [
      {
        id: 'LSDL-1219-1',
        name: '푸른 날개 칠지인',
      },
    ],
  },
  {
    id: 'LSDL-1220',
    categories: ['보스'],
    name: '방울 사냥꾼 - 전쟁 배움 집',
    x: 0.550559,
    y: 0.733818,
    loot: [
      {
        id: 'LSDL-1220-1',
        name: '뼈 장사꾼의 방울',
      },
    ],
  },
  {
    id: 'LSDL-1221',
    categories: ['NPC'],
    name: '전사 베르나르',
    x: 0.566225,
    y: 0.757886,
  },
  {
    id: 'LSDL-1222',
    categories: ['일반단석'],
    name: '단석[1]',
    x: 0.443939,
    y: 0.95404,
    loot: [
      {
        id: 'LSDL-1222-1',
        name: '단석[1]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1223',
    categories: ['중요아이템'],
    name: '작은 붉은 우상',
    x: 0.524169,
    y: 0.338106,
  },
  {
    id: 'LSDL-1225',
    categories: ['성배병'],
    name: '근력의 혹 결정 물방울',
    x: 0.494084,
    y: 0.638343,
  },
  {
    id: 'LSDL-1226',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.402579,
    y: 0.845867,
  },
  {
    id: 'LSDL-1227',
    categories: ['전회'],
    name: '전회 : 난격',
    x: 0.336207,
    y: 0.709694,
  },
  {
    id: 'LSDL-1232',
    categories: ['무기'],
    name: '랜스',
    x: 0.627928,
    y: 0.613426,
  },
  {
    id: 'LSDL-1233',
    categories: ['무기'],
    name: '짐승 문양 히터 실드',
    x: 0.636159,
    y: 0.591856,
  },
  {
    id: 'LSDL-1234',
    categories: ['색단석'],
    name: '색 잃은 단석[1]',
    x: 0.627926,
    y: 0.48889,
    loot: [
      {
        id: 'LSDL-1234-1',
        name: '색 잃은 단석[1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1235',
    categories: ['전회'],
    name: '전회 : 황금 나무에 맹세코',
    x: 0.63534,
    y: 0.547014,
  },
  {
    id: 'LSDL-1236',
    categories: ['탈리스만'],
    name: '랜스의 탈리스만',
    x: 0.740041,
    y: 0.17176,
  },
  {
    id: 'LSDL-1237',
    categories: ['일반단석'],
    name: '단석[1]',
    x: 0.785372,
    y: 0.520451,
    loot: [
      {
        id: 'LSDL-1237-1',
        name: '단석[1]',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1238',
    categories: ['NPC'],
    name: '죽음을 사냥하는 자 D [1]',
    x: 0.941208,
    y: 0.497767,
  },
  {
    id: 'LSDL-1263',
    categories: ['중요아이템'],
    name: '투사의 갈고리 손가락',
    x: 0.524995,
    y: 0.354949,
  },
  {
    id: 'LSDL-1310',
    categories: [],
    name: '이름 없는 마커',
    x: 0.844052,
    y: 0.842525,
  },
  {
    id: 'LSDL-1311',
    categories: [],
    name: '이름 없는 마커',
    x: 0.710508,
    y: 0.837582,
  },
  {
    id: 'LSDL-1312',
    categories: [],
    name: '영기류',
    x: 0.773158,
    y: 0.543669,
  },
  {
    id: 'LSDL-1315',
    categories: ['NPC'],
    name: '고스토크[4]',
    x: 0.105396,
    y: 0.403345,
  },
  {
    id: 'LSDL-1317',
    categories: ['전회'],
    name: '전회 : 폭풍의 벽',
    x: 0.221197,
    y: 0.461205,
  },
  {
    id: 'LSDL-1318',
    categories: ['제작서'],
    name: '방랑 전사의 제작서 [7]',
    x: 0.265303,
    y: 0.424705,
  },
  {
    id: 'LSDL-1321',
    categories: ['중요아이템'],
    name: '샤브리리의 포도',
    x: 0.065787,
    y: 0.284387,
  },
  {
    id: 'LSDL-1322',
    categories: ['NPC'],
    name: '하이타[1]',
    x: 0.031574,
    y: 0.254527,
  },
  {
    id: 'LSDL-1323',
    categories: ['일반단석'],
    name: '단석[1]',
    x: 0.231374,
    y: 0.949362,
    loot: [
      {
        id: 'LSDL-1323-1',
        name: '단석[1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1326',
    categories: ['NPC'],
    name: '고스토크[1]',
    x: 0.209801,
    y: 0.904254,
  },
  {
    id: 'LSDL-1327',
    categories: ['NPC'],
    name: '마술사 로지에르 소환 사인',
    x: 0.302823,
    y: 0.931936,
  },
  {
    id: 'LSDL-1328',
    categories: ['NPC'],
    name: '네펠리 루 소환 사인',
    x: 0.153182,
    y: 0.462904,
  },
  {
    id: 'LSDL-1329',
    categories: ['일반단석'],
    name: '단석[3]',
    x: 0.152642,
    y: 0.985064,
    loot: [
      {
        id: 'LSDL-1329-1',
        name: '단석[3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1330',
    categories: ['축복'],
    name: '스톰빌 절벽',
    x: 0.15649,
    y: 0.946013,
  },
  {
    id: 'LSDL-1348',
    categories: ['중요아이템'],
    name: '그림 : 예언',
    x: 0.107841,
    y: 0.644714,
  },
  {
    id: 'LSDL-1350',
    categories: ['마술'],
    name: '마술 : 원혼 부르기',
    x: 0.095888,
    y: 0.655499,
  },
  {
    id: 'LSDL-1351',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.1132,
    y: 0.696994,
  },
  {
    id: 'LSDL-1353',
    categories: ['탈리스만'],
    name: '뇌룡 표식의 탈리스만',
    x: 0.274376,
    y: 0.691151,
  },
  {
    id: 'LSDL-1354',
    categories: ['방어구'],
    name: '전회 스카라베',
    x: 0.458907,
    y: 0.530701,
  },
  {
    id: 'LSDL-1355',
    categories: [],
    name: '전송문 : 림그레이브 신수탑',
    x: 0.444891,
    y: 0.542283,
  },
  {
    id: 'LSDL-1356',
    categories: [],
    name: '트리나의 수련',
    x: 0.954535,
    y: 0.697004,
    loot: [
      {
        id: 'LSDL-1356-1',
        name: '트리나의 수련',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1364',
    categories: [],
    name: '트리나의 수련',
    x: 0.864681,
    y: 0.783338,
    loot: [
      {
        id: 'LSDL-1364-1',
        name: '트리나의 수련',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1371',
    categories: [],
    name: '트리나의 수련',
    x: 0.210488,
    y: 0.945217,
    loot: [
      {
        id: 'LSDL-1371-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1372',
    categories: ['장소'],
    name: '스톰빌 성',
    x: 0.241073,
    y: 0.855534,
  },
  {
    id: 'LSDL-1373',
    categories: ['NPC'],
    name: '고스토크 미행 [1]',
    x: 0.168855,
    y: 0.96514,
  },
  {
    id: 'LSDL-1374',
    categories: [],
    name: '트리나의 수련',
    x: 0.180801,
    y: 0.56417,
    loot: [
      {
        id: 'LSDL-1374-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1377',
    categories: ['색단석'],
    name: '사자',
    x: 0.228211,
    y: 0.796613,
    loot: [
      {
        id: 'LSDL-1377-1',
        name: '색 잃은 단석 [1]',
        quantity: 1,
      },
      {
        id: 'LSDL-1377-2',
        name: '짐승 피',
      },
      {
        id: 'LSDL-1377-3',
        name: '옛 엄니',
      },
    ],
  },
  {
    id: 'LSDL-1494',
    categories: ['장소'],
    name: '림그레이브 신수탑',
    x: 0.917007,
    y: 0.066883,
  },
  {
    id: 'LSDL-1578',
    categories: ['장소'],
    name: '림그레이브 콜로세움 마리카 동상',
    x: 0.527055,
    y: 0.30931,
  },
  {
    id: 'LSDL-1600',
    categories: [],
    name: '전송문',
    x: 0.876618,
    y: 0.129151,
  },
  {
    id: 'LSDL-1673',
    categories: ['그릇'],
    name: '금 간 항아리 - 스톰빌',
    x: 0.109076,
    y: 0.540898,
    loot: [
      {
        id: 'LSDL-1673-1',
        name: '금 간 항아리 - 스톰빌',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1882',
    categories: ['암령'],
    name: '화산관 암살 퀘스트 1 : 옛 기사 이슈트반',
    x: 0.498202,
    y: 0.368231,
  },
  {
    id: 'LSDL-1919',
    categories: ['NPC'],
    name: '재봉사 아인 보크 [3]',
    x: 0.016321,
    y: 0.29023,
  },
  {
    id: 'LSDL-2174',
    categories: [],
    name: '석관 묘지 ( 폭풍의 언덕 )',
    x: 0.530775,
    y: 0.835614,
    loot: [
      {
        id: 'LSDL-2174-1',
        name: '황금의 룬 [1]',
        quantity: 4,
      },
      {
        id: 'LSDL-2174-2',
        name: '황금의 룬 [2]',
      },
      {
        id: 'LSDL-2174-3',
        name: '황금의 룬 [3]',
      },
      {
        id: 'LSDL-2174-4',
        name: '황금의 룬 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2243',
    categories: [],
    name: '트리나의 수련',
    x: 0.809011,
    y: 0.545051,
    loot: [
      {
        id: 'LSDL-2243-1',
        name: '트리나의 수련',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2282',
    categories: [],
    name: '뿌리 기름 파밍 위치 1',
    x: 0.562926,
    y: 0.716923,
  },
  {
    id: 'LSDL-2283',
    categories: [],
    name: '뿌리 기름 파밍 위치 2',
    x: 0.565399,
    y: 0.61146,
  },
  {
    id: 'LSDL-2284',
    categories: [],
    name: '연기 나비 파밍 위치 1',
    x: 0.59012,
    y: 0.463706,
  },
  {
    id: 'LSDL-2287',
    categories: [],
    name: '문어 파밍 위치 - 림그레이브 북쪽',
    x: 0.794578,
    y: 0.451276,
  },
  {
    id: 'LSDL-2332',
    categories: [],
    name: '황금의 룬 [5]',
    x: 0.198533,
    y: 0.883799,
    loot: [
      {
        id: 'LSDL-2332-1',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2333',
    categories: [],
    name: '트리나의 수련',
    x: 0.196881,
    y: 0.743483,
    loot: [
      {
        id: 'LSDL-2333-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2334',
    categories: ['무기'],
    name: '아바레스트',
    x: 0.184927,
    y: 0.726853,
  },
  {
    id: 'LSDL-2335',
    categories: [],
    name: '트리나의 수련',
    x: 0.192344,
    y: 0.612306,
    loot: [
      {
        id: 'LSDL-2335-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2336',
    categories: [],
    name: '트리나의 수련',
    x: 0.189461,
    y: 0.664585,
    loot: [
      {
        id: 'LSDL-2336-1',
        name: '트리나의 수련',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2337',
    categories: [],
    name: '황금의 룬',
    x: 0.154421,
    y: 0.673723,
    loot: [
      {
        id: 'LSDL-2337-1',
        name: '황금의 룬 [1]',
      },
      {
        id: 'LSDL-2337-2',
        name: '황금의 룬 [2]',
        quantity: 2,
      },
      {
        id: 'LSDL-2337-3',
        name: '황금의 룬 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2338',
    categories: ['무기'],
    name: '파이크',
    x: 0.137109,
    y: 0.643864,
  },
  {
    id: 'LSDL-2339',
    categories: ['무기'],
    name: '목제 대형 방패',
    x: 0.142878,
    y: 0.618149,
  },
  {
    id: 'LSDL-2340',
    categories: ['일반단석'],
    name: '빛나는 석상',
    x: 0.125566,
    y: 0.620593,
    loot: [
      {
        id: 'LSDL-2340-1',
        name: '단석 [1]',
        quantity: 5,
      },
      {
        id: 'LSDL-2340-2',
        name: '단석 [2]',
      },
    ],
  },
  {
    id: 'LSDL-2341',
    categories: ['축복'],
    name: '승강기 측 방',
    x: 0.10784,
    y: 0.580745,
  },
  {
    id: 'LSDL-2342',
    categories: ['일반단석'],
    name: '단석 [1]',
    x: 0.100422,
    y: 0.604016,
    loot: [
      {
        id: 'LSDL-2342-1',
        name: '단석 [1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2344',
    categories: ['중요아이템'],
    name: '단석, 황룬',
    x: 0.121854,
    y: 0.578302,
    loot: [
      {
        id: 'LSDL-2344-1',
        name: '단석 [2]',
        quantity: 1,
      },
      {
        id: 'LSDL-2344-2',
        name: '황금의 룬 [1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2346',
    categories: ['일반단석'],
    name: '스톰빌 정문 앞 발리스타들',
    x: 0.169679,
    y: 0.864672,
    loot: [
      {
        id: 'LSDL-2346-1',
        name: '단석 [1]',
      },
      {
        id: 'LSDL-2346-2',
        name: '단석 [2]',
      },
    ],
  },
  {
    id: 'LSDL-2347',
    categories: [],
    name: '황금의 룬 [2]',
    x: 0.168022,
    y: 0.587387,
    loot: [
      {
        id: 'LSDL-2347-1',
        name: '황금의 룬 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2348',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.191931,
    y: 0.560026,
    loot: [
      {
        id: 'LSDL-2348-1',
        name: '단석 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2349',
    categories: ['제작서'],
    name: '방랑 전사의 제작서 [10]',
    x: 0.157718,
    y: 0.635576,
  },
  {
    id: 'LSDL-2350',
    categories: ['일반단석'],
    name: '색 잃은 단석 [2]',
    x: 0.146178,
    y: 0.726056,
  },
  {
    id: 'LSDL-2353',
    categories: ['무기'],
    name: '갈고리 발톱',
    x: 0.119386,
    y: 0.789121,
  },
  {
    id: 'LSDL-2356',
    categories: ['중요아이템'],
    name: '잠기는 방',
    x: 0.126394,
    y: 0.81983,
    loot: [
      {
        id: 'LSDL-2356-1',
        name: '녹슨 열쇠',
      },
      {
        id: 'LSDL-2356-2',
        name: '곡검의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-2363',
    categories: ['전회'],
    name: '전회 : 폭풍 부르기',
    x: 0.128037,
    y: 0.534257,
  },
  {
    id: 'LSDL-2364',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.138756,
    y: 0.559175,
    loot: [
      {
        id: 'LSDL-2364-1',
        name: '단석 [2]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2365',
    categories: ['무기'],
    name: '성관의 타깃 실드',
    x: 0.094236,
    y: 0.525968,
  },
  {
    id: 'LSDL-2366',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.075685,
    y: 0.536754,
    loot: [
      {
        id: 'LSDL-2366-1',
        name: '단석 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2367',
    categories: [],
    name: '황금의 룬 [5]',
    x: 0.070742,
    y: 0.574104,
    loot: [
      {
        id: 'LSDL-2367-1',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2369',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.09094,
    y: 0.604016,
    loot: [
      {
        id: 'LSDL-2369-1',
        name: '단석 [2]',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2370',
    categories: [],
    name: '황금의 룬 [2]',
    x: 0.08723,
    y: 0.574954,
    loot: [
      {
        id: 'LSDL-2370-1',
        name: '황금의 룬 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2372',
    categories: ['중요아이템'],
    name: '지하 문드러진 나무령 근처',
    x: 0.104956,
    y: 0.699491,
    loot: [
      {
        id: 'LSDL-2372-1',
        name: '석검 열쇠',
        quantity: 1,
      },
      {
        id: 'LSDL-2372-2',
        name: '죽음의 왕자의 부스럼',
      },
    ],
  },
  {
    id: 'LSDL-2382',
    categories: [],
    name: '룬',
    x: 0.213373,
    y: 0.875458,
    loot: [
      {
        id: 'LSDL-2382-1',
        name: '황금의 룬 [1]',
      },
      {
        id: 'LSDL-2382-2',
        name: '황금의 룬 [2]',
      },
      {
        id: 'LSDL-2382-3',
        name: '발리스타 볼트',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-2385',
    categories: ['방어구'],
    name: '시민의 옷',
    x: 0.189878,
    y: 0.907867,
  },
  {
    id: 'LSDL-2386',
    categories: ['중요아이템'],
    name: '석검 열쇠 방 - 스톰빌 쥐',
    x: 0.146098,
    y: 0.799906,
    loot: [
      {
        id: 'LSDL-2386-1',
        name: '신 사냥의 성인',
      },
      {
        id: 'LSDL-2386-2',
        name: '황금의 룬 [4]',
      },
      {
        id: 'LSDL-2386-3',
        name: '신의 살갗의 기도서',
      },
    ],
  },
  {
    id: 'LSDL-2387',
    categories: ['중요아이템'],
    name: '식당',
    x: 0.156486,
    y: 0.754268,
    loot: [
      {
        id: 'LSDL-2387-1',
        name: '출혈 이끼약',
        quantity: 1,
      },
      {
        id: 'LSDL-2387-2',
        name: '하이랜드 액스',
      },
      {
        id: 'LSDL-2387-3',
        name: '용사의 고깃덩어리',
      },
      {
        id: 'LSDL-2387-4',
        name: '거북 목 절임',
        quantity: 3,
      },
      {
        id: 'LSDL-2387-5',
        name: '석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-2388',
    categories: ['중요아이템'],
    name: '의태의 베일',
    x: 0.15937,
    y: 0.792468,
  },
  {
    id: 'LSDL-2389',
    categories: ['중요아이템'],
    name: '아이템들',
    x: 0.136699,
    y: 0.738488,
    loot: [
      {
        id: 'LSDL-2389-1',
        name: '황금의 룬 [2]',
      },
    ],
  },
  {
    id: 'LSDL-2390',
    categories: ['축복'],
    name: '성벽 탑',
    x: 0.109492,
    y: 0.754267,
    loot: [
      {
        id: 'LSDL-2390-1',
        name: '황금의 룬 [2]',
      },
      {
        id: 'LSDL-2390-2',
        name: '석검 열쇠',
        quantity: 1,
      },
      {
        id: 'LSDL-2390-3',
        name: '제스처 : 앉아서 자기',
      },
      {
        id: 'LSDL-2390-4',
        name: '손톱의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-2391',
    categories: ['무기'],
    name: '침식된 목제 방패',
    x: 0.077339,
    y: 0.651301,
  },
  {
    id: 'LSDL-2392',
    categories: ['전회'],
    name: '전회 : 폭풍의 습격',
    x: 0.08146,
    y: 0.695346,
  },
  {
    id: 'LSDL-2393',
    categories: ['기도'],
    name: '기도 : 도가니의 모습/뿔',
    x: 0.082699,
    y: 0.765052,
  },
  {
    id: 'LSDL-2394',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.111966,
    y: 0.832315,
    loot: [
      {
        id: 'LSDL-2394-1',
        name: '아르테리아의 잎',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2395',
    categories: ['중요아이템'],
    name: '스톰빌 절벽 ~ 성벽 탑 구간',
    x: 0.142472,
    y: 0.880451,
    loot: [
      {
        id: 'LSDL-2395-1',
        name: '황금의 룬 [2]',
        quantity: 2,
      },
      {
        id: 'LSDL-2395-2',
        name: '갈고리 발톱',
      },
    ],
  },
  {
    id: 'LSDL-2396',
    categories: ['NPC'],
    name: '고스토크 미행 [2]',
    x: 0.138762,
    y: 0.83561,
  },
  {
    id: 'LSDL-2397',
    categories: ['중요아이템'],
    name: '석검 열쇠 방 - 스톰빌 식당 옆',
    x: 0.128453,
    y: 0.749273,
    loot: [
      {
        id: 'LSDL-2397-1',
        name: '자비의 단검',
      },
      {
        id: 'LSDL-2397-2',
        name: '매 문양 우드 실드',
      },
      {
        id: 'LSDL-2397-3',
        name: '철의 숫돌 칼날',
      },
    ],
  },
  {
    id: 'LSDL-2398',
    categories: ['중요아이템'],
    name: '번데기 방',
    x: 0.133401,
    y: 0.696994,
    loot: [
      {
        id: 'LSDL-2398-1',
        name: '번데기들의 유품',
      },
      {
        id: 'LSDL-2398-2',
        name: '심홍색 후드',
      },
    ],
  },
  {
    id: 'LSDL-2420',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.031573,
    y: 0.21298,
  },
  {
    id: 'LSDL-2482',
    categories: ['무기'],
    name: '트리 스피어',
    x: 0.18739,
    y: 0.281891,
  },
  {
    id: 'LSDL-2493',
    categories: ['일반단석'],
    name: '단석 [1]',
    x: 0.167199,
    y: 0.615652,
    loot: [
      {
        id: 'LSDL-2493-1',
        name: '단석 [1]',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-2954',
    categories: ['NPC'],
    name: '스포일러 - 스톰빌 성',
    x: 0.097119,
    y: 0.337517,
  },
  {
    id: 'LSDL-3012',
    categories: ['중요아이템'],
    name: '그림: 귀소',
    x: 0.885287,
    y: 0.883807,
  },
  {
    id: 'LSDL-3016',
    categories: ['중요아이템'],
    name: '☆영마의 복장 「트리가드」',
    x: 0.108246,
    y: 0.315096,
  },
];

// LSDL base-game map, checked 2026-11-20; patch unspecified.
// Source, terrain alignment and description review: reference-data/maps/liurnia-east-west/.
// Regenerate: node reference-data/maps/generate.mjs liurnia-east-west.
const LIURNIA_EAST_WEST_MARKERS = [
  {
    id: 'LSDL-238',
    categories: ['NPC'],
    name: '백면 바레[2]',
    x: 0.287811,
    y: 0.459547,
  },
  {
    id: 'LSDL-271',
    categories: ['장소'],
    name: '항아리 마을',
    x: 0.860229,
    y: 0.433471,
    loot: [
      {
        id: 'LSDL-271-1',
        name: '아르테리아의 잎',
        quantity: 2,
      },
      {
        id: 'LSDL-271-2',
        name: '미켈라의 수련',
        quantity: 2,
      },
      {
        id: 'LSDL-271-3',
        name: '트리나의 수련',
        quantity: 2,
      },
      {
        id: 'LSDL-271-4',
        name: '이엘로의 눈동자',
        quantity: 2,
      },
      {
        id: 'LSDL-271-5',
        name: '산 항아리 파편',
        quantity: 1,
      },
      {
        id: 'LSDL-271-6',
        name: '단석 [3]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-273',
    categories: ['장소'],
    name: '에인세르 강 우물',
    x: 0.75664,
    y: 0.214494,
  },
  {
    id: 'LSDL-276',
    categories: ['축복', '던전', '보스'],
    name: '레아루카리아의 결정 갱도',
    x: 0.509068,
    y: 0.146852,
    loot: [
      {
        id: 'LSDL-276-1',
        name: '결정 나이프',
      },
      {
        id: 'LSDL-276-2',
        name: '암반 부수기',
      },
      {
        id: 'LSDL-276-3',
        name: '단석 [1]',
        quantity: 3,
      },
      {
        id: 'LSDL-276-4',
        name: '단석 [2]',
        quantity: 5,
      },
      {
        id: 'LSDL-276-5',
        name: '단석 [3]',
        quantity: 6,
      },
      {
        id: 'LSDL-276-6',
        name: '색 잃은 단석 [1]',
        quantity: 1,
      },
      {
        id: 'LSDL-276-7',
        name: '색 잃은 단석 [2]',
        quantity: 2,
      },
      {
        id: 'LSDL-276-8',
        name: '색 잃은 단석 [3]',
        quantity: 2,
      },
      {
        id: 'LSDL-276-9',
        name: '황금의 룬 [3]',
        quantity: 1,
      },
      {
        id: 'LSDL-276-10',
        name: '망가진 결정',
      },
      {
        id: 'LSDL-276-11',
        name: '단석 채석꾼의 방울 [1]',
      },
    ],
  },
  {
    id: 'LSDL-278',
    categories: ['장소'],
    name: '테스의 마술사탑',
    x: 0.271904,
    y: 0.122039,
    loot: [
      {
        id: 'LSDL-278-1',
        name: '메모리 스톤',
      },
    ],
  },
  {
    id: 'LSDL-279',
    categories: ['장소'],
    name: '마술학원 레아 루카리아',
    x: 0.245481,
    y: 0.264384,
  },
  {
    id: 'LSDL-283',
    categories: ['장소'],
    name: '장미 교회',
    x: 0.279301,
    y: 0.468236,
    loot: [
      {
        id: 'LSDL-283-1',
        name: '피의 장미',
      },
      {
        id: 'LSDL-283-2',
        name: '방랑 전사의 제작서 [12]',
      },
    ],
  },
  {
    id: 'LSDL-284',
    categories: ['장소'],
    name: '작은 황금 나무',
    x: 0.077298,
    y: 0.480339,
  },
  {
    id: 'LSDL-285',
    categories: ['장소'],
    name: '맺음의 교회',
    x: 0.541766,
    y: 0.238948,
    loot: [
      {
        id: 'LSDL-285-1',
        name: '황금 재봉 바늘',
      },
      {
        id: 'LSDL-285-2',
        name: '황금의 재봉 도구',
      },
    ],
  },
  {
    id: 'LSDL-286',
    categories: ['장소'],
    name: '화가의 오두막',
    x: 0.741533,
    y: 0.371307,
    loot: [
      {
        id: 'LSDL-286-1',
        name: '그림 : 재탄',
      },
    ],
  },
  {
    id: 'LSDL-288',
    categories: ['장소'],
    name: '작은 황금 나무',
    x: 0.697187,
    y: 0.104337,
  },
  {
    id: 'LSDL-289',
    categories: ['장소'],
    name: '미친 불 마을',
    x: 0.656819,
    y: 0.064211,
  },
  {
    id: 'LSDL-291',
    categories: ['장소'],
    name: '개종된 변방의 탑',
    x: 0.825733,
    y: 0.042831,
    loot: [
      {
        id: 'LSDL-291-1',
        name: '하이마의 포탄',
      },
      {
        id: 'LSDL-291-2',
        name: '하이마의 망치',
      },
    ],
  },
  {
    id: 'LSDL-395',
    categories: ['장소'],
    name: '이리스의 교회',
    x: 0.815534,
    y: 0.840763,
  },
  {
    id: 'LSDL-397',
    categories: ['장소'],
    name: '이름 없는 마커',
    x: 0.5168,
    y: 0.72257,
  },
  {
    id: 'LSDL-401',
    categories: ['장소'],
    name: '마누스 셀리스 대교회',
    x: 0.284264,
    y: 0.619242,
    loot: [
      {
        id: 'LSDL-401-1',
        name: '별빛 조각',
        quantity: 11,
      },
    ],
  },
  {
    id: 'LSDL-402',
    categories: ['장소'],
    name: '이름 없는 마커',
    x: 0.178976,
    y: 0.688768,
  },
  {
    id: 'LSDL-404',
    categories: ['장소'],
    name: '달의 민족의 폐허',
    x: 0.194565,
    y: 0.616414,
    loot: [
      {
        id: 'LSDL-404-1',
        name: '색 잃은 단석 [8]',
      },
    ],
  },
  {
    id: 'LSDL-405',
    categories: ['보스'],
    name: '칼날 우두머리의 봉인감옥',
    x: 0.056426,
    y: 0.584648,
    loot: [
      {
        id: 'LSDL-405-1',
        name: '검은 칼날 티시',
      },
    ],
  },
  {
    id: 'LSDL-513',
    categories: ['축복'],
    name: '리에니에 호숫가',
    x: 0.729448,
    y: 0.751481,
  },
  {
    id: 'LSDL-519',
    categories: ['축복'],
    name: '스톰빌 정문',
    x: 0.980277,
    y: 0.974652,
  },
  {
    id: 'LSDL-520',
    categories: ['축복'],
    name: '성문 옆 작은 방',
    x: 0.960793,
    y: 0.982385,
    loot: [
      {
        id: 'LSDL-520-1',
        name: '황금의 룬 [5]',
      },
      {
        id: 'LSDL-520-2',
        name: '시민의 옷',
      },
    ],
  },
  {
    id: 'LSDL-541',
    categories: ['축복'],
    name: '림그레이브 신수탑 교량',
    x: 0.995953,
    y: 0.936494,
  },
  {
    id: 'LSDL-543',
    categories: ['축복'],
    name: '후미진 작은 방',
    x: 0.934589,
    y: 0.871435,
    loot: [
      {
        id: 'LSDL-543-1',
        name: '전회 : 폭풍 부르기',
      },
      {
        id: 'LSDL-543-2',
        name: '단석 [2]',
        quantity: 3,
      },
      {
        id: 'LSDL-543-3',
        name: '단석 [1]',
      },
      {
        id: 'LSDL-543-4',
        name: '성관의 타워 실드',
      },
      {
        id: 'LSDL-543-5',
        name: '단석 [3]',
      },
    ],
  },
  {
    id: 'LSDL-544',
    categories: ['축복'],
    name: '접목의 고드릭',
    x: 0.909506,
    y: 0.856311,
  },
  {
    id: 'LSDL-546',
    categories: ['축복'],
    name: '호수를 향한 절벽',
    x: 0.840976,
    y: 0.818303,
  },
  {
    id: 'LSDL-547',
    categories: ['축복'],
    name: '리에니에 가도 동쪽',
    x: 0.855755,
    y: 0.743913,
  },
  {
    id: 'LSDL-548',
    categories: ['축복'],
    name: '라스카 폐허',
    x: 0.663157,
    y: 0.671134,
  },
  {
    id: 'LSDL-550',
    categories: ['축복'],
    name: '조망섬',
    x: 0.530576,
    y: 0.601894,
  },
  {
    id: 'LSDL-552',
    categories: ['축복'],
    name: '마누스 셀리스 대교회',
    x: 0.313568,
    y: 0.616702,
  },
  {
    id: 'LSDL-556',
    categories: ['축복'],
    name: '새우 삶는 오두막',
    x: 0.496311,
    y: 0.536835,
  },
  {
    id: 'LSDL-557',
    categories: ['축복'],
    name: '개종된 탑',
    x: 0.146723,
    y: 0.543595,
  },
  {
    id: 'LSDL-559',
    categories: ['축복'],
    name: '성당 구획',
    x: 0.169563,
    y: 0.380156,
  },
  {
    id: 'LSDL-560',
    categories: ['축복'],
    name: '레아 루카리아 남문',
    x: 0.374702,
    y: 0.357615,
  },
  {
    id: 'LSDL-561',
    categories: ['축복'],
    name: '문 앞 마을 북쪽',
    x: 0.411652,
    y: 0.294825,
  },
  {
    id: 'LSDL-562',
    categories: ['축복'],
    name: '레아 루카리아 대서고',
    x: 0.274818,
    y: 0.269699,
  },
  {
    id: 'LSDL-563',
    categories: ['축복'],
    name: '뻐꾸기의 교회',
    x: 0.248841,
    y: 0.299646,
    loot: [
      {
        id: 'LSDL-563-1',
        name: '룬의 호',
      },
      {
        id: 'LSDL-563-2',
        name: '황금의 룬 [2]',
      },
      {
        id: 'LSDL-563-3',
        name: '단석 [3]',
      },
      {
        id: 'LSDL-563-4',
        name: '황금의 룬 [3]',
      },
      {
        id: 'LSDL-563-5',
        name: '학원의 휘석 열쇠',
      },
      {
        id: 'LSDL-563-6',
        name: '부서지는 결정',
      },
      {
        id: 'LSDL-563-7',
        name: '쌍현의 휘석 머리',
      },
    ],
  },
  {
    id: 'LSDL-564',
    categories: ['축복'],
    name: '배움터의 방',
    x: 0.328567,
    y: 0.331056,
  },
  {
    id: 'LSDL-565',
    categories: ['축복'],
    name: '토론실',
    x: 0.339541,
    y: 0.345865,
    loot: [
      {
        id: 'LSDL-565-1',
        name: '결정 나무의 싹',
        quantity: 5,
      },
      {
        id: 'LSDL-565-2',
        name: '라다곤의 초상',
      },
      {
        id: 'LSDL-565-3',
        name: '황금의 룬 [4]',
      },
    ],
  },
  {
    id: 'LSDL-567',
    categories: ['축복'],
    name: '학원 정문 앞',
    x: 0.273249,
    y: 0.248646,
  },
  {
    id: 'LSDL-583',
    categories: ['축복'],
    name: '서원 입구',
    x: 0.811407,
    y: 0.38773,
  },
  {
    id: 'LSDL-584',
    categories: ['축복'],
    name: '리에니에 신수탑 교량',
    x: 0.844327,
    y: 0.40754,
  },
  {
    id: 'LSDL-585',
    categories: ['축복'],
    name: '항아리 마을',
    x: 0.86023,
    y: 0.450698,
  },
  {
    id: 'LSDL-587',
    categories: ['축복'],
    name: '동부 대지',
    x: 0.72675,
    y: 0.260522,
  },
  {
    id: 'LSDL-588',
    categories: ['축복'],
    name: '동부 대지',
    x: 0.72675,
    y: 0.260522,
  },
  {
    id: 'LSDL-589',
    categories: ['축복'],
    name: '동부 대지',
    x: 0.72675,
    y: 0.260522,
  },
  {
    id: 'LSDL-590',
    categories: ['축복'],
    name: '맺음의 교회',
    x: 0.567297,
    y: 0.235888,
  },
  {
    id: 'LSDL-591',
    categories: ['축복'],
    name: '유적 미로 ',
    x: 0.650606,
    y: 0.149107,
  },
  {
    id: 'LSDL-592',
    categories: ['축복'],
    name: '영묘 무리',
    x: 0.594841,
    y: 0.10256,
  },
  {
    id: 'LSDL-593',
    categories: ['축복'],
    name: '레아 루카리아 동문',
    x: 0.405068,
    y: 0.093705,
  },
  {
    id: 'LSDL-599',
    categories: ['축복'],
    name: '리에니에 호수 북쪽',
    x: 0.169228,
    y: 0.051706,
  },
  {
    id: 'LSDL-600',
    categories: ['축복'],
    name: '마술사 탑의 작은 섬',
    x: 0.232809,
    y: 0.132381,
  },
  {
    id: 'LSDL-601',
    categories: ['축복'],
    name: '동문 다리 교각',
    x: 0.332247,
    y: 0.185118,
  },
  {
    id: 'LSDL-602',
    categories: ['축복'],
    name: '사종루 기슭',
    x: 0.033455,
    y: 0.260161,
  },
  {
    id: 'LSDL-782',
    categories: ['축복', '던전', '보스'],
    name: '학원 결정 동굴',
    x: 0.217505,
    y: 0.292405,
    loot: [
      {
        id: 'LSDL-782-1',
        name: '동굴 이끼 꽃눈',
        quantity: 2,
      },
      {
        id: 'LSDL-782-2',
        name: '동굴 이끼 결정',
        quantity: 17,
      },
      {
        id: 'LSDL-782-3',
        name: '은색 반딧불',
        quantity: 4,
      },
      {
        id: 'LSDL-782-4',
        name: '뻐꾸기의 휘석',
        quantity: 5,
      },
      {
        id: 'LSDL-782-5',
        name: '석검 열쇠',
        quantity: 1,
      },
      {
        id: 'LSDL-782-6',
        name: '결정 지팡이',
      },
      {
        id: 'LSDL-782-7',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-782-8',
        name: '결정 해방',
      },
      {
        id: 'LSDL-782-9',
        name: '마술의 땅',
      },
    ],
  },
  {
    id: 'LSDL-787',
    categories: ['축복'],
    name: '화가의 오두막',
    x: 0.749147,
    y: 0.371635,
  },
  {
    id: 'LSDL-790',
    categories: ['축복'],
    name: '미친 불 마을 변두리',
    x: 0.728985,
    y: 0.033814,
  },
  {
    id: 'LSDL-795',
    categories: ['축복', '던전', '보스'],
    name: '검은 칼날의 지하 묘지 (해골)',
    x: 0.793035,
    y: 0.022543,
    loot: [
      {
        id: 'LSDL-795-1',
        name: '로제스의 도끼',
      },
      {
        id: 'LSDL-795-2',
        name: '룬의 호',
      },
      {
        id: 'LSDL-795-3',
        name: '쌍현 마술사의 뼛가루',
      },
      {
        id: 'LSDL-795-4',
        name: '사근',
      },
      {
        id: 'LSDL-795-5',
        name: '푸른 흉악한 칼날',
      },
      {
        id: 'LSDL-795-6',
        name: '검은 칼날의 각인',
      },
    ],
  },
  {
    id: 'LSDL-898',
    categories: ['축복'],
    name: '늑대가 잠든 오두막',
    x: 0.517247,
    y: 0.722652,
  },
  {
    id: 'LSDL-903',
    categories: ['축복'],
    name: '에인세르 강 안쪽 우물',
    x: 0.180768,
    y: 0.689164,
  },
  {
    id: 'LSDL-907',
    categories: ['축복', '던전', '보스'],
    name: '막다른 길의 지하 묘지 [임프]',
    x: 0.057179,
    y: 0.531353,
    loot: [
      {
        id: 'LSDL-907-1',
        name: '레아 루카리아 병사의 뼛가루',
      },
      {
        id: 'LSDL-907-2',
        name: '파수견의 석장',
      },
      {
        id: 'LSDL-907-3',
        name: '묘 은방울꽃 [2]',
        quantity: 4,
      },
      {
        id: 'LSDL-907-4',
        name: '묘 은방울꽃 [3]',
        quantity: 4,
      },
      {
        id: 'LSDL-907-5',
        name: '영혼 묘 은방울꽃 [2]',
        quantity: 1,
      },
      {
        id: 'LSDL-907-6',
        name: '묘의 보라',
      },
      {
        id: 'LSDL-907-7',
        name: '룬의 호',
      },
      {
        id: 'LSDL-907-8',
        name: '휘석 마술사의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-931',
    categories: ['축복', '던전', '보스'],
    name: '고인물 동굴',
    x: 0.817618,
    y: 0.800679,
    loot: [
      {
        id: 'LSDL-931-1',
        name: '황금의 룬 [3]',
      },
      {
        id: 'LSDL-931-2',
        name: '황금의 룬 [4]',
      },
      {
        id: 'LSDL-931-3',
        name: '동굴 이끼',
      },
      {
        id: 'LSDL-931-4',
        name: '동굴 이끼 결정',
      },
      {
        id: 'LSDL-931-5',
        name: '동굴 이끼 꽃눈',
      },
      {
        id: 'LSDL-931-6',
        name: '독꽃',
      },
      {
        id: 'LSDL-931-7',
        name: '현자의 후드',
      },
      {
        id: 'LSDL-931-8',
        name: '현자의 로브',
      },
      {
        id: 'LSDL-931-9',
        name: '현자의 바지',
      },
      {
        id: 'LSDL-931-10',
        name: '유익검의 휘장',
      },
    ],
  },
  {
    id: 'LSDL-937',
    categories: ['장소'],
    name: '정화된 폐허',
    x: 0.783246,
    y: 0.666831,
    loot: [
      {
        id: 'LSDL-937-1',
        name: '황금의 룬 [3]',
      },
      {
        id: 'LSDL-937-2',
        name: '샤브리리의 포도',
      },
      {
        id: 'LSDL-937-3',
        name: '두 손가락의 전승',
      },
    ],
  },
  {
    id: 'LSDL-938',
    categories: ['장소'],
    name: '가도 감시탑',
    x: 0.761727,
    y: 0.567576,
    loot: [
      {
        id: 'LSDL-938-1',
        name: '카리아의 휘검 지팡이',
      },
      {
        id: 'LSDL-938-2',
        name: '휘석 장인의 제작서 [3]',
      },
    ],
  },
  {
    id: 'LSDL-939',
    categories: ['NPC'],
    name: '손가락 읽는 노파',
    x: 0.42581,
    y: 0.427961,
  },
  {
    id: 'LSDL-942',
    categories: ['장소'],
    name: '왕가령 폐허',
    x: 0.208834,
    y: 0.032402,
    loot: [
      {
        id: 'LSDL-942-1',
        name: '빙결의 침',
      },
    ],
  },
  {
    id: 'LSDL-943',
    categories: ['축복'],
    name: '사종루',
    x: 0.098559,
    y: 0.180334,
    loot: [
      {
        id: 'LSDL-943-1',
        name: '휘석검 열쇠',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-945',
    categories: ['축복'],
    name: '복수자의 오두막',
    x: 0.069873,
    y: 0.401058,
    loot: [
      {
        id: 'LSDL-945-1',
        name: '날고기 경단',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-1003',
    categories: ['NPC'],
    name: '알렉산더[5]',
    x: 0.821795,
    y: 0.459565,
  },
  {
    id: 'LSDL-1008',
    categories: ['NPC'],
    name: '네펠리 루[1]',
    x: 0.92999,
    y: 0.905713,
  },
  {
    id: 'LSDL-1009',
    categories: ['축복'],
    name: '월광의 제단',
    x: 0.186133,
    y: 0.673015,
  },
  {
    id: 'LSDL-1010',
    categories: ['NPC'],
    name: '네펠리 루[3]',
    x: 0.191811,
    y: 0.659353,
  },
  {
    id: 'LSDL-1013',
    categories: ['장소'],
    name: '달의 귀족의 폐허',
    x: 0.327491,
    y: 0.670885,
  },
  {
    id: 'LSDL-1014',
    categories: ['장소'],
    name: '백금 마을',
    x: 0.220799,
    y: 0.645487,
    loot: [
      {
        id: 'LSDL-1014-1',
        name: '물방울 유생',
      },
      {
        id: 'LSDL-1014-2',
        name: '결정검',
      },
      {
        id: 'LSDL-1014-3',
        name: '미켈라의 수련',
      },
      {
        id: 'LSDL-1014-4',
        name: '도가니 혹의 탈리스만',
      },
      {
        id: 'LSDL-1014-5',
        name: '룬의 호',
      },
    ],
  },
  {
    id: 'LSDL-1015',
    categories: ['축복'],
    name: '제단 남쪽',
    x: 0.073764,
    y: 0.772283,
  },
  {
    id: 'LSDL-1016',
    categories: ['장소'],
    name: '히에로나의 마술사탑',
    x: 0.05942,
    y: 0.784661,
    loot: [
      {
        id: 'LSDL-1016-1',
        name: '라니의 암월',
      },
    ],
  },
  {
    id: 'LSDL-1066',
    categories: ['NPC'],
    name: '백금의 라티나',
    x: 0.531013,
    y: 0.724251,
  },
  {
    id: 'LSDL-1067',
    categories: ['장소'],
    name: '이름 없는 마커',
    x: 0.07555,
    y: 0.401495,
  },
  {
    id: 'LSDL-1082',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.948219,
    y: 0.904853,
  },
  {
    id: 'LSDL-1084',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.459282,
    y: 0.418999,
  },
  {
    id: 'LSDL-1085',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.314035,
    y: 0.205952,
  },
  {
    id: 'LSDL-1136',
    categories: ['보스'],
    name: '접목의 고드릭',
    x: 0.903988,
    y: 0.851912,
    loot: [
      {
        id: 'LSDL-1136-1',
        name: '고드릭의 거대한 룬',
      },
      {
        id: 'LSDL-1136-2',
        name: '접목의 추억',
      },
    ],
  },
  {
    id: 'LSDL-1153',
    categories: ['지도조각'],
    name: '지도 조각 (리에니에 동부)',
    x: 0.723774,
    y: 0.705686,
  },
  {
    id: 'LSDL-1154',
    categories: ['지도조각'],
    name: '지도 조각 (리에니에 북부)',
    x: 0.580319,
    y: 0.469372,
  },
  {
    id: 'LSDL-1155',
    categories: ['지도조각'],
    name: '지도 조각 (리에니에 서부)',
    x: 0.181039,
    y: 0.041788,
  },
  {
    id: 'LSDL-1191',
    categories: ['성배병'],
    name: '성배의 물방울',
    x: 0.816125,
    y: 0.852553,
  },
  {
    id: 'LSDL-1211',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.314335,
    y: 0.30078,
  },
  {
    id: 'LSDL-1315',
    categories: ['NPC'],
    name: '고스토크[4]',
    x: 0.893552,
    y: 0.851762,
  },
  {
    id: 'LSDL-1317',
    categories: ['전회'],
    name: '전회 : 폭풍의 벽',
    x: 0.977507,
    y: 0.86664,
  },
  {
    id: 'LSDL-1321',
    categories: ['중요아이템'],
    name: '샤브리리의 포도',
    x: 0.864836,
    y: 0.821172,
  },
  {
    id: 'LSDL-1322',
    categories: ['NPC'],
    name: '하이타[1]',
    x: 0.840033,
    y: 0.813494,
  },
  {
    id: 'LSDL-1323',
    categories: ['일반단석'],
    name: '단석[1]',
    x: 0.984881,
    y: 0.992167,
    loot: [
      {
        id: 'LSDL-1323-1',
        name: '단석[1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1326',
    categories: ['NPC'],
    name: '고스토크[1]',
    x: 0.969241,
    y: 0.980568,
  },
  {
    id: 'LSDL-1328',
    categories: ['NPC'],
    name: '네펠리 루 소환 사인',
    x: 0.928197,
    y: 0.867077,
  },
  {
    id: 'LSDL-1330',
    categories: ['축복'],
    name: '스톰빌 절벽',
    x: 0.93059,
    y: 0.991306,
  },
  {
    id: 'LSDL-1348',
    categories: ['중요아이템'],
    name: '그림 : 예언',
    x: 0.895322,
    y: 0.913828,
  },
  {
    id: 'LSDL-1350',
    categories: ['마술'],
    name: '마술 : 원혼 부르기',
    x: 0.886656,
    y: 0.916602,
  },
  {
    id: 'LSDL-1351',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.899207,
    y: 0.927272,
  },
  {
    id: 'LSDL-1371',
    categories: [],
    name: '트리나의 수련',
    x: 0.969739,
    y: 0.991101,
    loot: [
      {
        id: 'LSDL-1371-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1372',
    categories: ['장소'],
    name: '스톰빌 성',
    x: 0.991914,
    y: 0.96804,
  },
  {
    id: 'LSDL-1373',
    categories: ['NPC'],
    name: '고스토크 미행 [1]',
    x: 0.939555,
    y: 0.996225,
  },
  {
    id: 'LSDL-1374',
    categories: [],
    name: '트리나의 수련',
    x: 0.948219,
    y: 0.893117,
    loot: [
      {
        id: 'LSDL-1374-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1377',
    categories: ['색단석'],
    name: '사자',
    x: 0.982589,
    y: 0.952889,
    loot: [
      {
        id: 'LSDL-1377-1',
        name: '색 잃은 단석 [1]',
        quantity: 1,
      },
      {
        id: 'LSDL-1377-2',
        name: '짐승 피',
      },
      {
        id: 'LSDL-1377-3',
        name: '옛 엄니',
      },
    ],
  },
  {
    id: 'LSDL-1378',
    categories: ['마술스크롤'],
    name: '학원의 스크롤',
    x: 0.788629,
    y: 0.817551,
  },
  {
    id: 'LSDL-1379',
    categories: ['NPC'],
    name: '방랑 민족 상인 [5]',
    x: 0.725271,
    y: 0.746248,
  },
  {
    id: 'LSDL-1383',
    categories: ['NPC'],
    name: '손가락의 무녀',
    x: 0.761734,
    y: 0.973804,
  },
  {
    id: 'LSDL-1384',
    categories: [],
    name: '전송문 : 레아 루카리아 남문으로',
    x: 0.779659,
    y: 0.630545,
  },
  {
    id: 'LSDL-1387',
    categories: ['축복', '던전', '보스'],
    name: '절벽 아래 지하 묘지',
    x: 0.872903,
    y: 0.670248,
    loot: [
      {
        id: 'LSDL-1387-1',
        name: '녹스의 거울 투구',
      },
      {
        id: 'LSDL-1387-2',
        name: '대낫',
      },
      {
        id: 'LSDL-1387-3',
        name: '말하는 머리 「대단해!」',
      },
      {
        id: 'LSDL-1387-4',
        name: '시종의 뼛가루',
      },
      {
        id: 'LSDL-1387-5',
        name: '황금의 룬 [3]',
        quantity: 1,
      },
      {
        id: 'LSDL-1387-6',
        name: '묘 은방울꽃 [2]',
        quantity: 4,
      },
      {
        id: 'LSDL-1387-7',
        name: '묘 은방울꽃 [3]',
        quantity: 4,
      },
      {
        id: 'LSDL-1387-8',
        name: '묘의 보라',
      },
      {
        id: 'LSDL-1387-9',
        name: '룬의 호',
      },
      {
        id: 'LSDL-1387-10',
        name: '카이덴 용병의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-1390',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.80476,
    y: 0.443553,
    loot: [
      {
        id: 'LSDL-1390-1',
        name: '단석 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1391',
    categories: ['보스'],
    name: '티비아의 배 - 리에니에',
    x: 0.803865,
    y: 0.455288,
    loot: [
      {
        id: 'LSDL-1391-1',
        name: '사근',
      },
      {
        id: 'LSDL-1391-2',
        name: '산적 스켈레톤의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-1392',
    categories: [],
    name: '트리나의 수련',
    x: 0.794301,
    y: 0.450165,
    loot: [
      {
        id: 'LSDL-1392-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1393',
    categories: ['중요아이템'],
    name: '별빛 조각',
    x: 0.793704,
    y: 0.496698,
  },
  {
    id: 'LSDL-1394',
    categories: ['기도서'],
    name: '용 신앙의 기도서',
    x: 0.768001,
    y: 0.414944,
  },
  {
    id: 'LSDL-1395',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.7677,
    y: 0.360514,
    loot: [
      {
        id: 'LSDL-1395-1',
        name: '단석 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1396',
    categories: [],
    name: '트리나의 수련',
    x: 0.764116,
    y: 0.482831,
    loot: [
      {
        id: 'LSDL-1396-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1397',
    categories: [],
    name: '영기류',
    x: 0.796393,
    y: 0.508652,
  },
  {
    id: 'LSDL-1398',
    categories: ['무기'],
    name: '루체른',
    x: 0.820303,
    y: 0.58102,
  },
  {
    id: 'LSDL-1400',
    categories: ['색단석'],
    name: '색 읽은 단석 [2]',
    x: 0.802669,
    y: 0.538968,
    loot: [
      {
        id: 'LSDL-1400-1',
        name: '색 읽은 단석 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1401',
    categories: ['보스'],
    name: '밤 기병 - 리에니에 서쪽',
    x: 0.788026,
    y: 0.534911,
    loot: [
      {
        id: 'LSDL-1401-1',
        name: '얼음창',
      },
    ],
  },
  {
    id: 'LSDL-1402',
    categories: ['마술'],
    name: '마술: 죄의 가시',
    x: 0.692986,
    y: 0.311412,
  },
  {
    id: 'LSDL-1403',
    categories: ['기도'],
    name: '기도: 불의 치유여',
    x: 0.696274,
    y: 0.290919,
  },
  {
    id: 'LSDL-1404',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.757834,
    y: 0.141922,
    loot: [
      {
        id: 'LSDL-1404-1',
        name: '석검 열쇠',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1405',
    categories: ['색단석'],
    name: '색 잃은 단석 [3]',
    x: 0.793701,
    y: 0.374382,
    loot: [
      {
        id: 'LSDL-1405-1',
        name: '색 잃은 단석 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1407',
    categories: [],
    name: '트리나의 수련 ',
    x: 0.667584,
    y: 0.317601,
  },
  {
    id: 'LSDL-1408',
    categories: ['보스'],
    name: '방울 사냥꾼 - 맺음의 교회',
    x: 0.556406,
    y: 0.238183,
    loot: [
      {
        id: 'LSDL-1408-1',
        name: '고기 장사꾼의 방울',
      },
    ],
  },
  {
    id: 'LSDL-1410',
    categories: [],
    name: '트리나의 수련',
    x: 0.789212,
    y: 0.036041,
    loot: [
      {
        id: 'LSDL-1410-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1411',
    categories: ['일반단석'],
    name: '색 잃은 단석 [2]',
    x: 0.554909,
    y: 0.068473,
  },
  {
    id: 'LSDL-1412',
    categories: [],
    name: '걷는 영묘',
    x: 0.633808,
    y: 0.124406,
  },
  {
    id: 'LSDL-1413',
    categories: [],
    name: '걷는 영묘',
    x: 0.590474,
    y: 0.08107,
  },
  {
    id: 'LSDL-1414',
    categories: [],
    name: '걷는 영묘 [종]',
    x: 0.461369,
    y: 0.166251,
  },
  {
    id: 'LSDL-1415',
    categories: ['보스'],
    name: '밤 기병 - 벨룸 가도',
    x: 0.466447,
    y: 0.047351,
    loot: [
      {
        id: 'LSDL-1415-1',
        name: '거인 사냥',
      },
      {
        id: 'LSDL-1415-2',
        name: '밤 기병의 글레이브',
      },
    ],
  },
  {
    id: 'LSDL-1418',
    categories: ['NPC'],
    name: '하이타 [4]',
    x: 0.478701,
    y: 0.007854,
  },
  {
    id: 'LSDL-1419',
    categories: ['축복'],
    name: '문 앞 마을 다리',
    x: 0.739313,
    y: 0.509936,
  },
  {
    id: 'LSDL-1420',
    categories: ['NPC'],
    name: '하이타 [3]',
    x: 0.741105,
    y: 0.500974,
  },
  {
    id: 'LSDL-1425',
    categories: ['중요아이템'],
    name: '수면 기름',
    x: 0.332559,
    y: 0.018741,
    loot: [
      {
        id: 'LSDL-1425-1',
        name: '수면 기름',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1426',
    categories: ['NPC'],
    name: '미리엘',
    x: 0.56597,
    y: 0.250356,
  },
  {
    id: 'LSDL-1428',
    categories: ['장소'],
    name: '왕을 기다리는 예배당',
    x: 0.752829,
    y: 0.967833,
    loot: [
      {
        id: 'LSDL-1428-1',
        name: '빛바랜 자의 늙은 손가락',
      },
      {
        id: 'LSDL-1428-2',
        name: '폭풍 매의 옛 왕',
      },
      {
        id: 'LSDL-1428-3',
        name: '폭풍매 디네의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-1429',
    categories: ['보스'],
    name: '접목의 귀공자',
    x: 0.752769,
    y: 0.932599,
    loot: [
      {
        id: 'LSDL-1429-1',
        name: '의장 직검',
      },
      {
        id: 'LSDL-1429-2',
        name: '짐승 문양 황금 방패',
      },
    ],
  },
  {
    id: 'LSDL-1432',
    categories: ['기타'],
    name: '새의 망원경',
    x: 0.590782,
    y: 0.596183,
  },
  {
    id: 'LSDL-1461',
    categories: ['제작서'],
    name: '휘석 장인의 제작서 [2]',
    x: 0.664302,
    y: 0.665341,
  },
  {
    id: 'LSDL-1462',
    categories: ['장소'],
    name: '라스카 폐허',
    x: 0.619473,
    y: 0.646556,
    loot: [
      {
        id: 'LSDL-1462-1',
        name: '의식 항아리',
      },
      {
        id: 'LSDL-1462-2',
        name: '트리나의 수련',
        quantity: 2,
      },
      {
        id: 'LSDL-1462-3',
        name: '단석 [3]',
      },
      {
        id: 'LSDL-1462-4',
        name: '피의 장미',
      },
      {
        id: 'LSDL-1462-5',
        name: '주령을 부르는 종',
      },
    ],
  },
  {
    id: 'LSDL-1463',
    categories: ['축복', '던전', '보스'],
    name: '호수 옆 결정 동굴',
    x: 0.528024,
    y: 0.679849,
    loot: [
      {
        id: 'LSDL-1463-1',
        name: '창의 탈리스만',
      },
      {
        id: 'LSDL-1463-2',
        name: '아르테리아의 잎',
      },
      {
        id: 'LSDL-1463-3',
        name: '황금의 룬 [5]',
      },
      {
        id: 'LSDL-1463-4',
        name: '단석 [2]',
      },
      {
        id: 'LSDL-1463-5',
        name: '단석 [4]',
      },
      {
        id: 'LSDL-1463-6',
        name: '동굴 이끼',
      },
      {
        id: 'LSDL-1463-7',
        name: '동굴 이끼 꽃눈',
      },
      {
        id: 'LSDL-1463-8',
        name: '동굴 이끼 결정',
      },
      {
        id: 'LSDL-1463-9',
        name: '은색 반딧불',
      },
      {
        id: 'LSDL-1463-10',
        name: '푸른 호박 메달리온',
      },
    ],
  },
  {
    id: 'LSDL-1464',
    categories: [],
    name: '전송문',
    x: 0.620071,
    y: 0.638864,
  },
  {
    id: 'LSDL-1465',
    categories: [],
    name: '트리나의 수련',
    x: 0.716599,
    y: 0.569926,
    loot: [
      {
        id: 'LSDL-1465-1',
        name: '트리나의 수련',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-1466',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.719887,
    y: 0.57953,
    loot: [
      {
        id: 'LSDL-1466-1',
        name: '단석 [2]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1467',
    categories: [],
    name: '영기류',
    x: 0.729751,
    y: 0.601731,
  },
  {
    id: 'LSDL-1469',
    categories: [],
    name: '트리나의 수련',
    x: 0.506207,
    y: 0.731942,
    loot: [
      {
        id: 'LSDL-1469-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1470',
    categories: ['기도서'],
    name: '불의 승병의 기도서',
    x: 0.484689,
    y: 0.679425,
  },
  {
    id: 'LSDL-1471',
    categories: [],
    name: '트리나의 수련',
    x: 0.585105,
    y: 0.716573,
    loot: [
      {
        id: 'LSDL-1471-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1475',
    categories: ['장소'],
    name: '카리아의 서원',
    x: 0.822691,
    y: 0.409821,
    loot: [
      {
        id: 'LSDL-1475-1',
        name: '카리아의 휘석 지팡이',
      },
      {
        id: 'LSDL-1475-2',
        name: '쏟아지는 마력',
      },
      {
        id: 'LSDL-1475-3',
        name: '푸른 종자의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-1476',
    categories: ['NPC'],
    name: '권유자 라야',
    x: 0.60423,
    y: 0.591907,
  },
  {
    id: 'LSDL-1477',
    categories: ['NPC'],
    name: '패치 [2]',
    x: 0.536987,
    y: 0.595541,
  },
  {
    id: 'LSDL-1478',
    categories: ['탈리스만'],
    name: '희생의 가는 가지',
    x: 0.720787,
    y: 0.739417,
  },
  {
    id: 'LSDL-1479',
    categories: [],
    name: '영기류',
    x: 0.690901,
    y: 0.715085,
  },
  {
    id: 'LSDL-1480',
    categories: ['보스'],
    name: '죽음의 새 - 새우 오두막',
    x: 0.543861,
    y: 0.572274,
    loot: [
      {
        id: 'LSDL-1480-1',
        name: '붉은 날개 칠지인',
      },
    ],
  },
  {
    id: 'LSDL-1481',
    categories: ['전회'],
    name: '전회 : 무적',
    x: 0.359767,
    y: 0.627768,
  },
  {
    id: 'LSDL-1482',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.398317,
    y: 0.510999,
    loot: [
      {
        id: 'LSDL-1482-1',
        name: '단석 [2]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1484',
    categories: ['NPC'],
    name: '불량배 [1]',
    x: 0.488871,
    y: 0.540892,
  },
  {
    id: 'LSDL-1485',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.613493,
    y: 0.500973,
    loot: [
      {
        id: 'LSDL-1485-1',
        name: '단석 [3]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1486',
    categories: ['중요아이템'],
    name: '새다리 백은 절임',
    x: 0.700162,
    y: 0.476204,
    loot: [
      {
        id: 'LSDL-1486-1',
        name: '새다리 백은 절임',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1487',
    categories: ['영체'],
    name: '육지 멍게의 뼛가루',
    x: 0.704942,
    y: 0.417293,
  },
  {
    id: 'LSDL-1488',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.654734,
    y: 0.37822,
    loot: [
      {
        id: 'LSDL-1488-1',
        name: '단석 [3]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1489',
    categories: ['축복'],
    name: '리에니에 호수 동쪽',
    x: 0.696275,
    y: 0.344065,
  },
  {
    id: 'LSDL-1490',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.606317,
    y: 0.325716,
    loot: [
      {
        id: 'LSDL-1490-1',
        name: '단석 [3]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1491',
    categories: [],
    name: '트리나의 수련',
    x: 0.474824,
    y: 0.528501,
    loot: [
      {
        id: 'LSDL-1491-1',
        name: '트리나의 수련',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1492',
    categories: ['축복'],
    name: '호수의 낙하 유적',
    x: 0.39503,
    y: 0.467021,
  },
  {
    id: 'LSDL-1493',
    categories: [],
    name: '트리나의 수련',
    x: 0.510686,
    y: 0.486886,
    loot: [
      {
        id: 'LSDL-1493-1',
        name: '트리나의 수련',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1495',
    categories: ['기도'],
    name: '기도 : 혈염의 칼날',
    x: 0.248589,
    y: 0.445037,
  },
  {
    id: 'LSDL-1497',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.178956,
    y: 0.464041,
    loot: [
      {
        id: 'LSDL-1497-1',
        name: '단석 [2]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1498',
    categories: ['색단석'],
    name: '색 잃은 단석 [1]',
    x: 0.279373,
    y: 0.523171,
    loot: [
      {
        id: 'LSDL-1498-1',
        name: '색 잃은 단석 [1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1499',
    categories: ['축복'],
    name: '호수의 폴리',
    x: 0.335857,
    y: 0.555824,
  },
  {
    id: 'LSDL-1500',
    categories: ['성배병'],
    name: '기량의 결정 혹 물방울',
    x: 0.447929,
    y: 0.571194,
  },
  {
    id: 'LSDL-1501',
    categories: [],
    name: '트리나의 수련',
    x: 0.458688,
    y: 0.566071,
  },
  {
    id: 'LSDL-1502',
    categories: [],
    name: '트리나의 수련',
    x: 0.236637,
    y: 0.56928,
    loot: [
      {
        id: 'LSDL-1502-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1503',
    categories: ['색단석'],
    name: '색 잃은 단석 [2]',
    x: 0.233947,
    y: 0.553268,
    loot: [
      {
        id: 'LSDL-1503-1',
        name: '색 잃은 단석 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1504',
    categories: ['장소'],
    name: '개종된 탑',
    x: 0.152957,
    y: 0.539605,
    loot: [
      {
        id: 'LSDL-1504-1',
        name: '뻐꾸기의 휘석',
        quantity: 5,
      },
      {
        id: 'LSDL-1504-2',
        name: '메모리 스톤',
      },
    ],
  },
  {
    id: 'LSDL-1505',
    categories: ['보스'],
    name: '황금 나무의 화신',
    x: 0.089002,
    y: 0.494561,
    loot: [
      {
        id: 'LSDL-1505-1',
        name: '푸른 결정 물방울',
      },
      {
        id: 'LSDL-1505-2',
        name: '파열된 결정 물방울',
      },
    ],
  },
  {
    id: 'LSDL-1506',
    categories: ['전회'],
    name: '전회 : 검무',
    x: 0.053139,
    y: 0.482606,
  },
  {
    id: 'LSDL-1508',
    categories: ['무기'],
    name: '해파리의 방패',
    x: 0.03819,
    y: 0.215978,
  },
  {
    id: 'LSDL-1509',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.079731,
    y: 0.186318,
    loot: [
      {
        id: 'LSDL-1509-1',
        name: '단석 [4]',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1512',
    categories: ['중요아이템'],
    name: '룬의 호',
    x: 0.046856,
    y: 0.176071,
    loot: [
      {
        id: 'LSDL-1512-1',
        name: '룬의 호',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1513',
    categories: [],
    name: '마차',
    x: 0.069568,
    y: 0.160483,
    loot: [
      {
        id: 'LSDL-1513-1',
        name: '카리아의 휘석검',
      },
    ],
  },
  {
    id: 'LSDL-1514',
    categories: [],
    name: '미켈라의 수련',
    x: 0.151755,
    y: 0.177766,
    loot: [
      {
        id: 'LSDL-1514-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1518',
    categories: [],
    name: '얼음 결정 나무의 싹 *8',
    x: 0.204649,
    y: 0.00572,
    loot: [
      {
        id: 'LSDL-1518-1',
        name: '얼음 결정 나무의 싹',
        quantity: 8,
      },
    ],
  },
  {
    id: 'LSDL-1519',
    categories: [],
    name: '휘석 반딧불 *4',
    x: 0.214212,
    y: 0.026213,
    loot: [
      {
        id: 'LSDL-1519-1',
        name: '휘석 반딧불',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-1549',
    categories: ['무기'],
    name: '빙각의 도끼',
    x: 0.215116,
    y: 0.410021,
  },
  {
    id: 'LSDL-1550',
    categories: [],
    name: '트리나의 수련',
    x: 0.37112,
    y: 0.3667,
    loot: [
      {
        id: 'LSDL-1550-1',
        name: '트리나의 수련',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1551',
    categories: [],
    name: '석관 묘지 ( 학원 정문 앞 )',
    x: 0.348405,
    y: 0.395513,
    loot: [
      {
        id: 'LSDL-1551-1',
        name: '황금의 룬 [1]',
        quantity: 2,
      },
      {
        id: 'LSDL-1551-2',
        name: '황금의 룬 [2]',
        quantity: 3,
      },
      {
        id: 'LSDL-1551-3',
        name: '황금의 룬 [3]',
        quantity: 2,
      },
      {
        id: 'LSDL-1551-4',
        name: '황금의 룬 [4]',
        quantity: 2,
      },
      {
        id: 'LSDL-1551-5',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1552',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.303876,
    y: 0.391455,
    loot: [
      {
        id: 'LSDL-1552-1',
        name: '단석 [2]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1553',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.382774,
    y: 0.403629,
    loot: [
      {
        id: 'LSDL-1553-1',
        name: '단석 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1554',
    categories: ['무기'],
    name: '청백 목제 방패',
    x: 0.360359,
    y: 0.389529,
  },
  {
    id: 'LSDL-1556',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.608113,
    y: 0.42049,
    loot: [
      {
        id: 'LSDL-1556-1',
        name: '아르테리아의 잎',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1557',
    categories: ['NPC'],
    name: '디아로스[2]',
    x: 0.550434,
    y: 0.404272,
  },
  {
    id: 'LSDL-1558',
    categories: ['축복'],
    name: '학원 문 앞 정문',
    x: 0.585401,
    y: 0.465315,
  },
  {
    id: 'LSDL-1559',
    categories: [],
    name: '트리나의 수련',
    x: 0.526526,
    y: 0.433304,
    loot: [
      {
        id: 'LSDL-1559-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1560',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.509489,
    y: 0.420065,
    loot: [
      {
        id: 'LSDL-1560-1',
        name: '아르테리아의 잎',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1561',
    categories: ['제작서'],
    name: '휘석 장인의 제작서 [4]',
    x: 0.510983,
    y: 0.413234,
  },
  {
    id: 'LSDL-1563',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.419236,
    y: 0.41281,
    loot: [
      {
        id: 'LSDL-1563-1',
        name: '단석 [2]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1564',
    categories: ['전회'],
    name: '전회 : 돌격',
    x: 0.409374,
    y: 0.422414,
  },
  {
    id: 'LSDL-1565',
    categories: [],
    name: '전송문',
    x: 0.499027,
    y: 0.326986,
  },
  {
    id: 'LSDL-1566',
    categories: ['보스'],
    name: '죽음 의례의 새 - 학원 앞',
    x: 0.423717,
    y: 0.321438,
    loot: [
      {
        id: 'LSDL-1566-1',
        name: '옛 죽음의 영혼',
      },
    ],
  },
  {
    id: 'LSDL-1567',
    categories: ['중요아이템'],
    name: '약속 장소 지도',
    x: 0.380382,
    y: 0.35133,
  },
  {
    id: 'LSDL-1568',
    categories: ['보스'],
    name: '휘석룡 스마라그',
    x: 0.175069,
    y: 0.321218,
    loot: [
      {
        id: 'LSDL-1568-1',
        name: '용의 심장',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1569',
    categories: ['중요아이템'],
    name: '이름 없는 마커',
    x: 0.168791,
    y: 0.313758,
    loot: [
      {
        id: 'LSDL-1569-1',
        name: '학원의 휘석 열쇠',
        quantity: 1,
      },
      {
        id: 'LSDL-1569-2',
        name: '쿠쿠리',
        quantity: 6,
      },
      {
        id: 'LSDL-1569-3',
        name: '용상기름',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1570',
    categories: ['색단석'],
    name: '색 잃은 단석 [2]',
    x: 0.116492,
    y: 0.337229,
    loot: [
      {
        id: 'LSDL-1570-1',
        name: '색 잃은 단석 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1582',
    categories: [],
    name: '튜토리얼 종료지점',
    x: 0.783549,
    y: 0.91104,
  },
  {
    id: 'LSDL-1583',
    categories: [],
    name: '전송문 : 사종루 1번 탑',
    x: 0.135616,
    y: 0.181619,
  },
  {
    id: 'LSDL-1584',
    categories: [],
    name: '전송문 : 사종루 2번 탑',
    x: 0.109915,
    y: 0.189734,
  },
  {
    id: 'LSDL-1585',
    categories: [],
    name: '전송문 : 사종루 3번 탑',
    x: 0.123363,
    y: 0.20979,
  },
  {
    id: 'LSDL-1595',
    categories: ['NPC'],
    name: '셀렌/제렌 퀘스트 최종 보상',
    x: 0.282356,
    y: 0.264876,
  },
  {
    id: 'LSDL-1596',
    categories: ['중요아이템'],
    name: '암월의 반지',
    x: 0.273988,
    y: 0.262308,
  },
  {
    id: 'LSDL-1607',
    categories: [],
    name: '납치하는 소녀',
    x: 0.278472,
    y: 0.319306,
  },
  {
    id: 'LSDL-1611',
    categories: [],
    name: '리에니에 동쪽의 전송문',
    x: 0.187615,
    y: 0.050545,
  },
  {
    id: 'LSDL-1615',
    categories: ['마술'],
    name: '별똥별',
    x: 0.326588,
    y: 0.338734,
    loot: [
      {
        id: 'LSDL-1615-1',
        name: '별똥별',
      },
      {
        id: 'LSDL-1615-2',
        name: '석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-1623',
    categories: ['그릇'],
    name: '금 간 항아리 - 항아리마을 1',
    x: 0.869611,
    y: 0.445903,
    loot: [
      {
        id: 'LSDL-1623-1',
        name: '금 간 항아리 - 항아리마을 1',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1624',
    categories: ['그릇'],
    name: '의식 항아리 - 항아리마을 1',
    x: 0.862439,
    y: 0.440561,
    loot: [
      {
        id: 'LSDL-1624-1',
        name: '의식 항아리 - 항아리마을 1',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1625',
    categories: ['그릇'],
    name: '금 간 항아리 - 항아리마을 3',
    x: 0.864531,
    y: 0.422199,
    loot: [
      {
        id: 'LSDL-1625-1',
        name: '금 간 항아리 - 항아리마을 3',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1626',
    categories: ['그릇'],
    name: '금 간 항아리 - 항아리마을 2',
    x: 0.847496,
    y: 0.421352,
    loot: [
      {
        id: 'LSDL-1626-1',
        name: '금 간 항아리 - 항아리마을 2',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1627',
    categories: ['그릇'],
    name: '의식 항아리 - 항아리마을 2',
    x: 0.843612,
    y: 0.426257,
    loot: [
      {
        id: 'LSDL-1627-1',
        name: '의식 항아리 - 항아리마을 2',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1628',
    categories: [],
    name: '석관 묘지 (항아리마을)',
    x: 0.86782,
    y: 0.47279,
    loot: [
      {
        id: 'LSDL-1628-1',
        name: '황금의 룬 [1]',
      },
      {
        id: 'LSDL-1628-2',
        name: '황금의 룬 [2]',
        quantity: 2,
      },
      {
        id: 'LSDL-1628-3',
        name: '황금의 룬 [3]',
        quantity: 2,
      },
      {
        id: 'LSDL-1628-4',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-1629',
    categories: ['그릇'],
    name: '의식 항아리 - 레아 루카리아',
    x: 0.312842,
    y: 0.349404,
  },
  {
    id: 'LSDL-1630',
    categories: ['탈리스만'],
    name: '마술사 구 탈리스만',
    x: 0.326588,
    y: 0.34898,
  },
  {
    id: 'LSDL-1631',
    categories: ['그릇'],
    name: '금 간 항아리 - 레아 루카리아',
    x: 0.344221,
    y: 0.335523,
  },
  {
    id: 'LSDL-1673',
    categories: ['그릇'],
    name: '금 간 항아리 - 스톰빌',
    x: 0.896219,
    y: 0.887133,
    loot: [
      {
        id: 'LSDL-1673-1',
        name: '금 간 항아리 - 스톰빌',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1686',
    categories: ['기타'],
    name: '사종루 전송문 사용법',
    x: 0.115892,
    y: 0.166672,
  },
  {
    id: 'LSDL-1693',
    categories: ['중요아이템'],
    name: '휘석의 숫돌 칼날',
    x: 0.325692,
    y: 0.313964,
  },
  {
    id: 'LSDL-1729',
    categories: ['보스'],
    name: '황금 나무의 화신',
    x: 0.690291,
    y: 0.089404,
    loot: [
      {
        id: 'LSDL-1729-1',
        name: '마력 두른 깨진 물방울',
      },
      {
        id: 'LSDL-1729-2',
        name: '벼락 두른 깨진 물방울',
      },
      {
        id: 'LSDL-1729-3',
        name: '신성 두른 깨진 물방울',
      },
    ],
  },
  {
    id: 'LSDL-1731',
    categories: ['제작서'],
    name: '병자의 제작서 [1]',
    x: 0.682521,
    y: 0.056533,
  },
  {
    id: 'LSDL-1732',
    categories: ['암령'],
    name: '문드러진 손가락 바이크',
    x: 0.62514,
    y: 0.0053,
    loot: [
      {
        id: 'LSDL-1732-1',
        name: '손가락 자국의 포도',
      },
      {
        id: 'LSDL-1732-2',
        name: '바이크의 전투 창',
      },
    ],
  },
  {
    id: 'LSDL-1733',
    categories: ['기도'],
    name: '공열광화',
    x: 0.649946,
    y: 0.024714,
  },
  {
    id: 'LSDL-1828',
    categories: ['암령'],
    name: '복수자 에드거',
    x: 0.079735,
    y: 0.406605,
    loot: [
      {
        id: 'LSDL-1828-1',
        name: '샤브리리의 포도',
      },
      {
        id: 'LSDL-1828-2',
        name: '땅 잃은 기사의 도끼창 +8',
      },
      {
        id: 'LSDL-1828-3',
        name: '날고기 경단',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-1850',
    categories: ['중요아이템'],
    name: '제스쳐 : 내 안에 불꽃있으라',
    x: 0.494552,
    y: 0.681352,
  },
  {
    id: 'LSDL-1908',
    categories: ['기타'],
    name: '물레방아를 타고 끝까지 내려감',
    x: 0.288036,
    y: 0.314825,
    loot: [
      {
        id: 'LSDL-1908-1',
        name: '단석 [5]',
      },
      {
        id: 'LSDL-1908-2',
        name: '휘석의 반딧불',
        quantity: 12,
      },
      {
        id: 'LSDL-1908-3',
        name: '긴 꼬리 고양이 탈리스만',
      },
      {
        id: 'LSDL-1908-4',
        name: '상실의 전회',
      },
    ],
  },
  {
    id: 'LSDL-1912',
    categories: ['중요아이템'],
    name: '별의 물방울',
    x: 0.380084,
    y: 0.342355,
    loot: [
      {
        id: 'LSDL-1912-1',
        name: '별의 물방울',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1913',
    categories: ['중요아이템'],
    name: '물레방아 옆',
    x: 0.325392,
    y: 0.324006,
    loot: [
      {
        id: 'LSDL-1913-1',
        name: '중력탄',
      },
      {
        id: 'LSDL-1913-2',
        name: '색 잃은 단석 [3]',
      },
    ],
  },
  {
    id: 'LSDL-1919',
    categories: ['NPC'],
    name: '재봉사 아인 보크 [3]',
    x: 0.828974,
    y: 0.822675,
  },
  {
    id: 'LSDL-2267',
    categories: [],
    name: '잠알 *2',
    x: 0.535185,
    y: 0.027282,
    loot: [
      {
        id: 'LSDL-2267-1',
        name: '잠알',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2276',
    categories: [],
    name: '잠알 파밍 위치 (월광제단)',
    x: 0.223191,
    y: 0.661075,
  },
  {
    id: 'LSDL-2324',
    categories: ['NPC'],
    name: '은둔 상인 [2]',
    x: 0.375302,
    y: 0.325496,
  },
  {
    id: 'LSDL-2332',
    categories: [],
    name: '황금의 룬 [5]',
    x: 0.961072,
    y: 0.975308,
    loot: [
      {
        id: 'LSDL-2332-1',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2333',
    categories: [],
    name: '트리나의 수련',
    x: 0.959876,
    y: 0.939227,
    loot: [
      {
        id: 'LSDL-2333-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2334',
    categories: ['무기'],
    name: '아바레스트',
    x: 0.951209,
    y: 0.93495,
  },
  {
    id: 'LSDL-2335',
    categories: [],
    name: '트리나의 수련',
    x: 0.956587,
    y: 0.905495,
    loot: [
      {
        id: 'LSDL-2335-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2336',
    categories: [],
    name: '트리나의 수련',
    x: 0.954497,
    y: 0.918938,
    loot: [
      {
        id: 'LSDL-2336-1',
        name: '트리나의 수련',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2337',
    categories: [],
    name: '황금의 룬',
    x: 0.929093,
    y: 0.921288,
    loot: [
      {
        id: 'LSDL-2337-1',
        name: '황금의 룬 [1]',
      },
      {
        id: 'LSDL-2337-2',
        name: '황금의 룬 [2]',
        quantity: 2,
      },
      {
        id: 'LSDL-2337-3',
        name: '황금의 룬 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2338',
    categories: ['무기'],
    name: '파이크',
    x: 0.916542,
    y: 0.91361,
  },
  {
    id: 'LSDL-2339',
    categories: ['무기'],
    name: '목제 대형 방패',
    x: 0.920725,
    y: 0.906998,
  },
  {
    id: 'LSDL-2340',
    categories: ['일반단석'],
    name: '빛나는 석상',
    x: 0.908174,
    y: 0.907626,
    loot: [
      {
        id: 'LSDL-2340-1',
        name: '단석 [1]',
        quantity: 5,
      },
      {
        id: 'LSDL-2340-2',
        name: '단석 [2]',
      },
    ],
  },
  {
    id: 'LSDL-2341',
    categories: ['축복'],
    name: '승강기 측 방',
    x: 0.895322,
    y: 0.897379,
  },
  {
    id: 'LSDL-2342',
    categories: ['일반단석'],
    name: '단석 [1]',
    x: 0.889944,
    y: 0.903363,
    loot: [
      {
        id: 'LSDL-2342-1',
        name: '단석 [1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2344',
    categories: ['중요아이템'],
    name: '단석, 황룬',
    x: 0.905482,
    y: 0.896751,
    loot: [
      {
        id: 'LSDL-2344-1',
        name: '단석 [2]',
        quantity: 1,
      },
      {
        id: 'LSDL-2344-2',
        name: '황금의 룬 [1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2346',
    categories: ['일반단석'],
    name: '스톰빌 정문 앞 발리스타들',
    x: 0.940153,
    y: 0.97039,
    loot: [
      {
        id: 'LSDL-2346-1',
        name: '단석 [1]',
      },
      {
        id: 'LSDL-2346-2',
        name: '단석 [2]',
      },
    ],
  },
  {
    id: 'LSDL-2347',
    categories: [],
    name: '황금의 룬 [2]',
    x: 0.938954,
    y: 0.899087,
    loot: [
      {
        id: 'LSDL-2347-1',
        name: '황금의 룬 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2348',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.956289,
    y: 0.892052,
    loot: [
      {
        id: 'LSDL-2348-1',
        name: '단석 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2349',
    categories: ['제작서'],
    name: '방랑 전사의 제작서 [10]',
    x: 0.931483,
    y: 0.911479,
  },
  {
    id: 'LSDL-2350',
    categories: ['일반단석'],
    name: '색 잃은 단석 [2]',
    x: 0.923116,
    y: 0.934745,
  },
  {
    id: 'LSDL-2353',
    categories: ['무기'],
    name: '갈고리 발톱',
    x: 0.903691,
    y: 0.950962,
  },
  {
    id: 'LSDL-2356',
    categories: ['중요아이템'],
    name: '잠기는 방',
    x: 0.908771,
    y: 0.958859,
    loot: [
      {
        id: 'LSDL-2356-1',
        name: '녹슨 열쇠',
      },
      {
        id: 'LSDL-2356-2',
        name: '곡검의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-2363',
    categories: ['전회'],
    name: '전회 : 폭풍 부르기',
    x: 0.909965,
    y: 0.885425,
  },
  {
    id: 'LSDL-2364',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.917737,
    y: 0.891833,
    loot: [
      {
        id: 'LSDL-2364-1',
        name: '단석 [2]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2365',
    categories: ['무기'],
    name: '성관의 타깃 실드',
    x: 0.88546,
    y: 0.883294,
  },
  {
    id: 'LSDL-2366',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.87201,
    y: 0.886067,
    loot: [
      {
        id: 'LSDL-2366-1',
        name: '단석 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2367',
    categories: [],
    name: '황금의 룬 [5]',
    x: 0.868426,
    y: 0.895671,
    loot: [
      {
        id: 'LSDL-2367-1',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2369',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.88307,
    y: 0.903363,
    loot: [
      {
        id: 'LSDL-2369-1',
        name: '단석 [2]',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2370',
    categories: [],
    name: '황금의 룬 [2]',
    x: 0.88038,
    y: 0.89589,
    loot: [
      {
        id: 'LSDL-2370-1',
        name: '황금의 룬 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2372',
    categories: ['중요아이템'],
    name: '지하 문드러진 나무령 근처',
    x: 0.89323,
    y: 0.927914,
    loot: [
      {
        id: 'LSDL-2372-1',
        name: '석검 열쇠',
        quantity: 1,
      },
      {
        id: 'LSDL-2372-2',
        name: '죽음의 왕자의 부스럼',
      },
    ],
  },
  {
    id: 'LSDL-2382',
    categories: [],
    name: '룬',
    x: 0.971831,
    y: 0.973163,
    loot: [
      {
        id: 'LSDL-2382-1',
        name: '황금의 룬 [1]',
      },
      {
        id: 'LSDL-2382-2',
        name: '황금의 룬 [2]',
      },
      {
        id: 'LSDL-2382-3',
        name: '발리스타 볼트',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-2384',
    categories: ['제작서'],
    name: '휘석 장인의 제작서 [1]',
    x: 0.744398,
    y: 0.788724,
  },
  {
    id: 'LSDL-2385',
    categories: ['방어구'],
    name: '시민의 옷',
    x: 0.954796,
    y: 0.981497,
  },
  {
    id: 'LSDL-2386',
    categories: ['중요아이템'],
    name: '석검 열쇠 방 - 스톰빌 쥐',
    x: 0.923057,
    y: 0.953735,
    loot: [
      {
        id: 'LSDL-2386-1',
        name: '신 사냥의 성인',
      },
      {
        id: 'LSDL-2386-2',
        name: '황금의 룬 [4]',
      },
      {
        id: 'LSDL-2386-3',
        name: '신의 살갗의 기도서',
      },
    ],
  },
  {
    id: 'LSDL-2387',
    categories: ['중요아이템'],
    name: '식당',
    x: 0.930589,
    y: 0.942,
    loot: [
      {
        id: 'LSDL-2387-1',
        name: '출혈 이끼약',
        quantity: 1,
      },
      {
        id: 'LSDL-2387-2',
        name: '하이랜드 액스',
      },
      {
        id: 'LSDL-2387-3',
        name: '용사의 고깃덩어리',
      },
      {
        id: 'LSDL-2387-4',
        name: '거북 목 절임',
        quantity: 3,
      },
      {
        id: 'LSDL-2387-5',
        name: '석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-2388',
    categories: ['중요아이템'],
    name: '의태의 베일',
    x: 0.93268,
    y: 0.951823,
  },
  {
    id: 'LSDL-2389',
    categories: ['중요아이템'],
    name: '아이템들',
    x: 0.916244,
    y: 0.937942,
    loot: [
      {
        id: 'LSDL-2389-1',
        name: '황금의 룬 [2]',
      },
    ],
  },
  {
    id: 'LSDL-2390',
    categories: ['축복'],
    name: '성벽 탑',
    x: 0.896518,
    y: 0.941999,
    loot: [
      {
        id: 'LSDL-2390-1',
        name: '황금의 룬 [2]',
      },
      {
        id: 'LSDL-2390-2',
        name: '석검 열쇠',
        quantity: 1,
      },
      {
        id: 'LSDL-2390-3',
        name: '제스처 : 앉아서 자기',
      },
      {
        id: 'LSDL-2390-4',
        name: '손톱의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-2391',
    categories: ['무기'],
    name: '침식된 목제 방패',
    x: 0.873208,
    y: 0.915522,
  },
  {
    id: 'LSDL-2392',
    categories: ['전회'],
    name: '전회 : 폭풍의 습격',
    x: 0.876196,
    y: 0.926848,
  },
  {
    id: 'LSDL-2393',
    categories: ['기도'],
    name: '기도 : 도가니의 모습/뿔',
    x: 0.877093,
    y: 0.944773,
  },
  {
    id: 'LSDL-2394',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.898311,
    y: 0.962069,
    loot: [
      {
        id: 'LSDL-2394-1',
        name: '아르테리아의 잎',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2395',
    categories: ['중요아이템'],
    name: '스톰빌 절벽 ~ 성벽 탑 구간',
    x: 0.920427,
    y: 0.974447,
    loot: [
      {
        id: 'LSDL-2395-1',
        name: '황금의 룬 [2]',
        quantity: 2,
      },
      {
        id: 'LSDL-2395-2',
        name: '갈고리 발톱',
      },
    ],
  },
  {
    id: 'LSDL-2396',
    categories: ['NPC'],
    name: '고스토크 미행 [2]',
    x: 0.917738,
    y: 0.962916,
  },
  {
    id: 'LSDL-2397',
    categories: ['중요아이템'],
    name: '석검 열쇠 방 - 스톰빌 식당 옆',
    x: 0.910265,
    y: 0.940715,
    loot: [
      {
        id: 'LSDL-2397-1',
        name: '자비의 단검',
      },
      {
        id: 'LSDL-2397-2',
        name: '매 문양 우드 실드',
      },
      {
        id: 'LSDL-2397-3',
        name: '철의 숫돌 칼날',
      },
    ],
  },
  {
    id: 'LSDL-2398',
    categories: ['중요아이템'],
    name: '번데기 방',
    x: 0.913853,
    y: 0.927272,
    loot: [
      {
        id: 'LSDL-2398-1',
        name: '번데기들의 유품',
      },
      {
        id: 'LSDL-2398-2',
        name: '심홍색 후드',
      },
    ],
  },
  {
    id: 'LSDL-2401',
    categories: [],
    name: '풍선 기구',
    x: 0.668781,
    y: 0.503528,
    loot: [
      {
        id: 'LSDL-2401-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2402',
    categories: ['암령'],
    name: '침입 사인 : 까마귀 산의 암살자',
    x: 0.2967,
    y: 0.230503,
  },
  {
    id: 'LSDL-2403',
    categories: [],
    name: '트리나의 수련',
    x: 0.377094,
    y: 0.331466,
    loot: [
      {
        id: 'LSDL-2403-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2405',
    categories: ['중요아이템'],
    name: '물레방아 앞 공동 묘지',
    x: 0.321805,
    y: 0.290698,
    loot: [
      {
        id: 'LSDL-2405-1',
        name: '트리나의 수련',
      },
      {
        id: 'LSDL-2405-2',
        name: '전회 : 환영창',
      },
      {
        id: 'LSDL-2405-3',
        name: '황금의 룬 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2407',
    categories: ['영체'],
    name: '인형 병사의 뼛가루',
    x: 0.302082,
    y: 0.285998,
  },
  {
    id: 'LSDL-2408',
    categories: ['기타'],
    name: '물레방아 아래',
    x: 0.300586,
    y: 0.302447,
    loot: [
      {
        id: 'LSDL-2408-1',
        name: '황금의 룬 [4]',
      },
      {
        id: 'LSDL-2408-2',
        name: '카리아 기사의 투구',
      },
      {
        id: 'LSDL-2408-3',
        name: '카리아 기사의 갑옷',
      },
      {
        id: 'LSDL-2408-4',
        name: '카리아 기사의 장갑',
      },
      {
        id: 'LSDL-2408-5',
        name: '카리아 기사의 각반',
      },
    ],
  },
  {
    id: 'LSDL-2409',
    categories: ['중요아이템'],
    name: '배움터의 방 계단 올라가서 왼쪽 방',
    x: 0.345416,
    y: 0.328692,
    loot: [
      {
        id: 'LSDL-2409-1',
        name: '휘석 장인의 제작서 [5]',
      },
      {
        id: 'LSDL-2409-2',
        name: '교실의 스크롤',
      },
    ],
  },
  {
    id: 'LSDL-2411',
    categories: ['중요아이템'],
    name: '교실의 스크롤 환상 벽 너머',
    x: 0.351992,
    y: 0.323364,
    loot: [
      {
        id: 'LSDL-2411-1',
        name: '단석 [4]',
      },
      {
        id: 'LSDL-2411-2',
        name: '트리나의 수련',
        quantity: 2,
      },
      {
        id: 'LSDL-2411-3',
        name: '올리비니스의 휘석 머리',
      },
    ],
  },
  {
    id: 'LSDL-2413',
    categories: ['방어구'],
    name: '카롤로스 휘석 머리',
    x: 0.305368,
    y: 0.311833,
  },
  {
    id: 'LSDL-2414',
    categories: ['NPC'],
    name: '적대 npc : 카리아의 기사 문그램',
    x: 0.330173,
    y: 0.283867,
    loot: [
      {
        id: 'LSDL-2414-1',
        name: '카리아의 기사 방패',
      },
    ],
  },
  {
    id: 'LSDL-2415',
    categories: [],
    name: '맺음의 교회로 가는 전송문',
    x: 0.347209,
    y: 0.28067,
  },
  {
    id: 'LSDL-2416',
    categories: ['기타'],
    name: '점프 구간',
    x: 0.331968,
    y: 0.293048,
    loot: [
      {
        id: 'LSDL-2416-1',
        name: '트리나의 수련',
      },
      {
        id: 'LSDL-2416-2',
        name: '황금의 룬 [4]',
      },
      {
        id: 'LSDL-2416-3',
        name: '휘석 스카라베',
      },
      {
        id: 'LSDL-2416-4',
        name: '황금의 룬 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2417',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.355278,
    y: 0.31376,
  },
  {
    id: 'LSDL-2418',
    categories: ['보스'],
    name: '만월의 여왕 레날라',
    x: 0.266219,
    y: 0.267007,
    loot: [
      {
        id: 'LSDL-2418-1',
        name: '태어나지 않는 자의 거대한 룬',
      },
      {
        id: 'LSDL-2418-2',
        name: '만월 여왕의 추억',
      },
    ],
  },
  {
    id: 'LSDL-2419',
    categories: ['중요아이템'],
    name: '지붕 점프 구간',
    x: 0.306265,
    y: 0.321219,
    loot: [
      {
        id: 'LSDL-2419-1',
        name: '황금의 룬 [3]',
      },
      {
        id: 'LSDL-2419-2',
        name: '황금의 룬 [4]',
      },
      {
        id: 'LSDL-2419-3',
        name: '월륜의 석궁',
      },
      {
        id: 'LSDL-2419-4',
        name: '단석 [4]',
      },
      {
        id: 'LSDL-2419-5',
        name: '라줄리의 휘석 머리',
      },
      {
        id: 'LSDL-2419-6',
        name: '황금의 룬 [1]',
      },
      {
        id: 'LSDL-2419-7',
        name: '휘석검 열쇠',
      },
      {
        id: 'LSDL-2419-8',
        name: '단석 [3]',
        quantity: 2,
      },
      {
        id: 'LSDL-2419-9',
        name: '색 잃은 단석 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2420',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.840032,
    y: 0.80281,
  },
  {
    id: 'LSDL-2445',
    categories: ['NPC'],
    name: '하이타 [2]',
    x: 0.7692,
    y: 0.679646,
  },
  {
    id: 'LSDL-2451',
    categories: [],
    name: '황금의 룬 [4]',
    x: 0.287738,
    y: 0.339375,
  },
  {
    id: 'LSDL-2452',
    categories: [],
    name: '황금의 룬 [4]',
    x: 0.234241,
    y: 0.316109,
  },
  {
    id: 'LSDL-2453',
    categories: ['중요아이템'],
    name: '휘석검 열쇠',
    x: 0.257551,
    y: 0.322298,
  },
  {
    id: 'LSDL-2454',
    categories: ['색단석'],
    name: '색 잃은 단석 [4]',
    x: 0.25277,
    y: 0.31589,
  },
  {
    id: 'LSDL-2455',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.265921,
    y: 0.312475,
    loot: [
      {
        id: 'LSDL-2455-1',
        name: '단석 [3]',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2456',
    categories: ['무기'],
    name: '아줄의 휘석 지팡이',
    x: 0.282955,
    y: 0.296039,
  },
  {
    id: 'LSDL-2457',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.814928,
    y: 0.79449,
    loot: [
      {
        id: 'LSDL-2457-1',
        name: '아르테리아의 잎',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2458',
    categories: [],
    name: '영기류',
    x: 0.813434,
    y: 0.749241,
  },
  {
    id: 'LSDL-2459',
    categories: [],
    name: '휘석 반딧불 파밍 위치 : 리에니에 남쪽',
    x: 0.625747,
    y: 0.592126,
  },
  {
    id: 'LSDL-2460',
    categories: [],
    name: '결정 나무의 싹',
    x: 0.698367,
    y: 0.423687,
  },
  {
    id: 'LSDL-2461',
    categories: ['물방울 유생'],
    name: '물방울 유생',
    x: 0.375603,
    y: 0.504168,
  },
  {
    id: 'LSDL-2462',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.338248,
    y: 0.578024,
    loot: [
      {
        id: 'LSDL-2462-1',
        name: '단석 [2]',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2464',
    categories: [],
    name: '풍선 기구',
    x: 0.177463,
    y: 0.491146,
    loot: [
      {
        id: 'LSDL-2464-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2465',
    categories: [],
    name: '문어 알, 흰 저민 고기 파밍 위치 : 리에니에 성당구획',
    x: 0.178357,
    y: 0.429448,
  },
  {
    id: 'LSDL-2466',
    categories: ['장소'],
    name: '성당 구획',
    x: 0.219299,
    y: 0.388258,
    loot: [
      {
        id: 'LSDL-2466-1',
        name: '피의 장미',
      },
      {
        id: 'LSDL-2466-2',
        name: '트리나의 수련',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2467',
    categories: ['축복'],
    name: '결정의 숲',
    x: 0.204653,
    y: 0.267007,
  },
  {
    id: 'LSDL-2468',
    categories: ['중요아이템'],
    name: '룬의 호',
    x: 0.524439,
    y: 0.731082,
    loot: [
      {
        id: 'LSDL-2468-1',
        name: '룬의 호',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2469',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.190606,
    y: 0.24053,
    loot: [
      {
        id: 'LSDL-2469-1',
        name: '단석 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2470',
    categories: [],
    name: '트리나의 수련',
    x: 0.20286,
    y: 0.221102,
    loot: [
      {
        id: 'LSDL-2470-1',
        name: '트리나의 수련',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2471',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.299391,
    y: 0.184175,
    loot: [
      {
        id: 'LSDL-2471-1',
        name: '단석 [2]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2472',
    categories: ['전회'],
    name: '전회 : 방패 강타',
    x: 0.355275,
    y: 0.18397,
  },
  {
    id: 'LSDL-2473',
    categories: ['색단석'],
    name: '색 잃은 단석 [3]',
    x: 0.415943,
    y: 0.129104,
    loot: [
      {
        id: 'LSDL-2473-1',
        name: '색 잃은 단석 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2474',
    categories: [],
    name: '영기류',
    x: 0.440748,
    y: 0.122915,
  },
  {
    id: 'LSDL-2475',
    categories: ['NPC'],
    name: '아인 보크 [3]',
    x: 0.411759,
    y: 0.084702,
  },
  {
    id: 'LSDL-2476',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.48767,
    y: 0.242882,
    loot: [
      {
        id: 'LSDL-2476-1',
        name: '아르테리아의 잎',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2478',
    categories: [],
    name: '풍선 기구',
    x: 0.232145,
    y: 0.102625,
    loot: [
      {
        id: 'LSDL-2478-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2480',
    categories: [],
    name: '풍선 기구',
    x: 0.195984,
    y: 0.125263,
    loot: [
      {
        id: 'LSDL-2480-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2481',
    categories: [],
    name: '풍선 기구',
    x: 0.27309,
    y: 0.083854,
    loot: [
      {
        id: 'LSDL-2481-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2482',
    categories: ['무기'],
    name: '트리 스피어',
    x: 0.952999,
    y: 0.820531,
  },
  {
    id: 'LSDL-2483',
    categories: [],
    name: '풍선 기구',
    x: 0.853777,
    y: 0.707818,
    loot: [
      {
        id: 'LSDL-2483-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2484',
    categories: [],
    name: '풍선 기구',
    x: 0.877986,
    y: 0.725333,
    loot: [
      {
        id: 'LSDL-2484-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2485',
    categories: ['색단석'],
    name: '색 잃은 단석 [2]',
    x: 0.892031,
    y: 0.714226,
    loot: [
      {
        id: 'LSDL-2485-1',
        name: '색 잃은 단석 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2486',
    categories: [],
    name: '황금의 룬 [4]',
    x: 0.759336,
    y: 0.584654,
    loot: [
      {
        id: 'LSDL-2486-1',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2487',
    categories: [],
    name: '큰 잠자리 머리',
    x: 0.785036,
    y: 0.402129,
    loot: [
      {
        id: 'LSDL-2487-1',
        name: '큰 잠자리 머리',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-2488',
    categories: ['중요아이템'],
    name: '제스쳐 : 내 안에 불꽃 있으라',
    x: 0.688801,
    y: 0.289635,
  },
  {
    id: 'LSDL-2492',
    categories: [],
    name: '황금의 룬',
    x: 0.807752,
    y: 0.578889,
    loot: [
      {
        id: 'LSDL-2492-1',
        name: '황금의 룬 [3]',
      },
      {
        id: 'LSDL-2492-2',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2493',
    categories: ['일반단석'],
    name: '단석 [1]',
    x: 0.938358,
    y: 0.906356,
    loot: [
      {
        id: 'LSDL-2493-1',
        name: '단석 [1]',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-2496',
    categories: ['보스'],
    name: '도둑의 봉인 감옥',
    x: 0.70943,
    y: 0.739199,
    loot: [
      {
        id: 'LSDL-2496-1',
        name: '악신의 불',
      },
    ],
  },
  {
    id: 'LSDL-2499',
    categories: ['보스'],
    name: '뻐꾸기의 봉인 감옥',
    x: 0.056124,
    y: 0.349402,
    loot: [
      {
        id: 'LSDL-2499-1',
        name: '거검진',
      },
    ],
  },
  {
    id: 'LSDL-2780',
    categories: [],
    name: '유생나비',
    x: 0.771297,
    y: 0.923855,
    loot: [
      {
        id: 'LSDL-2780-1',
        name: '유생나비',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2787',
    categories: ['보스'],
    name: '라다곤의 붉은 늑대',
    x: 0.346013,
    y: 0.347054,
    loot: [
      {
        id: 'LSDL-2787-1',
        name: '메모리 스톤',
      },
    ],
  },
  {
    id: 'LSDL-2792',
    categories: [],
    name: '트리나의 수련',
    x: 0.091086,
    y: 0.173503,
  },
  {
    id: 'LSDL-2800',
    categories: [],
    name: '트리나의 수련',
    x: 0.324495,
    y: 0.307775,
  },
  {
    id: 'LSDL-2820',
    categories: [],
    name: '이옐로의 눈동자',
    x: 0.755442,
    y: 0.077874,
  },
  {
    id: 'LSDL-2821',
    categories: ['탈리스만'],
    name: '샤브리리의 화',
    x: 0.665487,
    y: 0.052038,
  },
  {
    id: 'LSDL-2822',
    categories: [],
    name: '이옐로의 눈동자',
    x: 0.679233,
    y: 0.064211,
    loot: [
      {
        id: 'LSDL-2822-1',
        name: '이옐로의 눈동자',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2823',
    categories: [],
    name: '이옐로의 눈동자',
    x: 0.668176,
    y: 0.060577,
    loot: [
      {
        id: 'LSDL-2823-1',
        name: '이옐로의 눈동자',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2824',
    categories: [],
    name: '소재 아이템',
    x: 0.681325,
    y: 0.035822,
    loot: [
      {
        id: 'LSDL-2824-1',
        name: '이옐로의 눈동자',
        quantity: 2,
      },
      {
        id: 'LSDL-2824-2',
        name: '아르테리아의 잎',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2830',
    categories: [],
    name: '석관 묘지 (미친불 마을)',
    x: 0.573139,
    y: 0.049906,
    loot: [
      {
        id: 'LSDL-2830-1',
        name: '황금의 룬 [1]',
        quantity: 1,
      },
      {
        id: 'LSDL-2830-2',
        name: '황금의 룬 [2]',
        quantity: 1,
      },
      {
        id: 'LSDL-2830-3',
        name: '황금의 룬 [3]',
        quantity: 4,
      },
      {
        id: 'LSDL-2830-4',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2830-5',
        name: '황금의 룬 [7]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2831',
    categories: ['무기'],
    name: '뿔 회오리 방패',
    x: 0.626636,
    y: 0.142549,
  },
  {
    id: 'LSDL-2832',
    categories: [],
    name: '트리나의 수련',
    x: 0.580613,
    y: 0.154722,
  },
  {
    id: 'LSDL-2833',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.55282,
    y: 0.149817,
    loot: [
      {
        id: 'LSDL-2833-1',
        name: '아르테리아의 잎',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2881',
    categories: ['NPC'],
    name: '스포일러 npc (대서고)',
    x: 0.284449,
    y: 0.273401,
  },
  {
    id: 'LSDL-2885',
    categories: ['보스'],
    name: '신의 살갗의 귀인',
    x: 0.927589,
    y: 0.395299,
    loot: [
      {
        id: 'LSDL-2885-1',
        name: '신의 살갗의 귀인 후드',
      },
      {
        id: 'LSDL-2885-2',
        name: '신의 살갗의 귀인 로브',
      },
      {
        id: 'LSDL-2885-3',
        name: '귀인의 팔찌',
      },
      {
        id: 'LSDL-2885-4',
        name: '귀인의 바지',
      },
    ],
  },
  {
    id: 'LSDL-2886',
    categories: ['보스'],
    name: '휘석룡 아듀라',
    x: 0.264431,
    y: 0.622863,
    loot: [
      {
        id: 'LSDL-2886-1',
        name: '용의 심장',
        quantity: 3,
      },
      {
        id: 'LSDL-2886-2',
        name: '아듀라의 달의 검',
      },
    ],
  },
  {
    id: 'LSDL-2887',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [2]',
    x: 0.372319,
    y: 0.670039,
  },
  {
    id: 'LSDL-2888',
    categories: ['탈리스만'],
    name: '푸른 호박 메달리온 +2',
    x: 0.307765,
    y: 0.662141,
  },
  {
    id: 'LSDL-2889',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [2]',
    x: 0.30179,
    y: 0.668754,
  },
  {
    id: 'LSDL-2890',
    categories: [],
    name: '황금의 룬 [10]',
    x: 0.299698,
    y: 0.674096,
    loot: [
      {
        id: 'LSDL-2890-1',
        name: '황금의 룬 [10]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2891',
    categories: ['기타'],
    name: '히에로나의 마술사탑 거대한 지혜로운 짐승 1',
    x: 0.038799,
    y: 0.783814,
  },
  {
    id: 'LSDL-2892',
    categories: ['기타'],
    name: '히에로나의 마술사탑 거대한 지혜로운 짐승 3',
    x: 0.086312,
    y: 0.5998,
  },
  {
    id: 'LSDL-2893',
    categories: ['중요아이템'],
    name: '용의 심장',
    x: 0.10544,
    y: 0.654872,
    loot: [
      {
        id: 'LSDL-2893-1',
        name: '용의 심장',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2894',
    categories: ['기타'],
    name: '히에로나의 마술사탑 거대한 지혜로운 짐승 2',
    x: 0.361861,
    y: 0.732365,
  },
  {
    id: 'LSDL-2895',
    categories: ['중요아이템'],
    name: '아이템',
    x: 0.188523,
    y: 0.625417,
    loot: [
      {
        id: 'LSDL-2895-1',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-2895-2',
        name: '황금의 룬 [9]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2954',
    categories: ['NPC'],
    name: '스포일러 - 스톰빌 성',
    x: 0.887552,
    y: 0.834834,
  },
  {
    id: 'LSDL-2961',
    categories: ['NPC'],
    name: '디아로스',
    x: 0.857657,
    y: 0.427541,
  },
  {
    id: 'LSDL-2963',
    categories: ['NPC'],
    name: '작은 항아리',
    x: 0.849291,
    y: 0.440342,
  },
  {
    id: 'LSDL-2972',
    categories: ['기타'],
    name: '항아리 마을 내려가기',
    x: 0.836738,
    y: 0.44205,
  },
  {
    id: 'LSDL-3016',
    categories: ['중요아이템'],
    name: '☆영마의 복장 「트리가드」',
    x: 0.895619,
    y: 0.829069,
  },
  {
    id: 'LSDL-3017',
    categories: ['무기'],
    name: '☆이데스의 검',
    x: 0.704349,
    y: 0.71059,
  },
];

// LSDL base-game map, checked 2026-11-20; patch unspecified.
// Source, terrain alignment and description review: reference-data/maps/liurnia-north/.
// Regenerate: node reference-data/maps/generate.mjs liurnia-north.
const LIURNIA_NORTH_MARKERS = [
  {
    id: 'LSDL-108',
    categories: ['보스'],
    name: '왕가 묘지의 봉인감옥',
    x: 0.502138,
    y: 0.233734,
    loot: [
      {
        id: 'LSDL-108-1',
        name: '메테오라이트',
      },
    ],
  },
  {
    id: 'LSDL-278',
    categories: ['장소'],
    name: '테스의 마술사탑',
    x: 0.200869,
    y: 0.971826,
    loot: [
      {
        id: 'LSDL-278-1',
        name: '메모리 스톤',
      },
    ],
  },
  {
    id: 'LSDL-288',
    categories: ['장소'],
    name: '작은 황금 나무',
    x: 0.7568,
    y: 0.919617,
  },
  {
    id: 'LSDL-289',
    categories: ['장소'],
    name: '미친 불 마을',
    x: 0.704029,
    y: 0.80136,
  },
  {
    id: 'LSDL-291',
    categories: ['장소'],
    name: '개종된 변방의 탑',
    x: 0.924834,
    y: 0.738335,
    loot: [
      {
        id: 'LSDL-291-1',
        name: '하이마의 포탄',
      },
      {
        id: 'LSDL-291-2',
        name: '하이마의 망치',
      },
    ],
  },
  {
    id: 'LSDL-296',
    categories: ['장소'],
    name: '미친 불의 등잔',
    x: 0.760306,
    y: 0.610217,
    loot: [
      {
        id: 'LSDL-296-1',
        name: '샤브리리의 외침',
      },
    ],
  },
  {
    id: 'LSDL-298',
    categories: ['장소'],
    name: '진정의 교회',
    x: 0.644375,
    y: 0.542335,
    loot: [
      {
        id: 'LSDL-298-1',
        name: '성배의 물방울',
      },
      {
        id: 'LSDL-298-2',
        name: '손가락 무녀의 모자',
      },
      {
        id: 'LSDL-298-3',
        name: '손가락 무녀의 로브',
      },
      {
        id: 'LSDL-298-4',
        name: '손가락 무녀의 신발',
      },
    ],
  },
  {
    id: 'LSDL-408',
    categories: ['장소'],
    name: '레나의 마술사탑',
    x: 0.150432,
    y: 0.037286,
  },
  {
    id: 'LSDL-409',
    categories: ['장소'],
    name: '이름 없는 마커',
    x: 0.054678,
    y: 0.211371,
  },
  {
    id: 'LSDL-411',
    categories: ['장소'],
    name: '카리아 성관',
    x: 0.266891,
    y: 0.245973,
  },
  {
    id: 'LSDL-592',
    categories: ['축복'],
    name: '영묘 무리',
    x: 0.623013,
    y: 0.914389,
  },
  {
    id: 'LSDL-593',
    categories: ['축복'],
    name: '레아 루카리아 동문',
    x: 0.374941,
    y: 0.888308,
  },
  {
    id: 'LSDL-594',
    categories: ['축복'],
    name: '계곡 바닥',
    x: 0.386134,
    y: 0.52016,
  },
  {
    id: 'LSDL-595',
    categories: ['축복'],
    name: '카리아 성관 정문',
    x: 0.244359,
    y: 0.380324,
  },
  {
    id: 'LSDL-596',
    categories: ['축복'],
    name: '성관 상층',
    x: 0.330424,
    y: 0.285419,
  },
  {
    id: 'LSDL-597',
    categories: ['축복'],
    name: '성관 하층',
    x: 0.208933,
    y: 0.283523,
  },
  {
    id: 'LSDL-599',
    categories: ['축복'],
    name: '리에니에 호수 북쪽',
    x: 0.066648,
    y: 0.764546,
  },
  {
    id: 'LSDL-604',
    categories: ['축복'],
    name: '라니의 마술사탑',
    x: 0.035294,
    y: 0.231565,
  },
  {
    id: 'LSDL-606',
    categories: ['축복'],
    name: '왕가의 월견장',
    x: 0.242481,
    y: 0.138904,
  },
  {
    id: 'LSDL-607',
    categories: ['축복'],
    name: '카리아 성관 뒤편',
    x: 0.371003,
    y: 0.167902,
  },
  {
    id: 'LSDL-609',
    categories: ['축복'],
    name: '용암 토룡 마카르',
    x: 0.546558,
    y: 0.112352,
  },
  {
    id: 'LSDL-610',
    categories: ['축복'],
    name: '버려진 관',
    x: 0.55776,
    y: 0.02446,
  },
  {
    id: 'LSDL-611',
    categories: ['축복'],
    name: '옛 유적 절벽 맞은편',
    x: 0.616999,
    y: 0.170758,
  },
  {
    id: 'LSDL-612',
    categories: ['축복'],
    name: '계곡에 숨은 마을',
    x: 0.672977,
    y: 0.147554,
  },
  {
    id: 'LSDL-613',
    categories: ['축복'],
    name: '계곡에 숨은 마을',
    x: 0.672977,
    y: 0.147554,
  },
  {
    id: 'LSDL-614',
    categories: ['축복'],
    name: '옛 유적 절벽',
    x: 0.687611,
    y: 0.123342,
  },
  {
    id: 'LSDL-616',
    categories: ['축복'],
    name: '알터 고원',
    x: 0.800953,
    y: 0.153641,
  },
  {
    id: 'LSDL-790',
    categories: ['축복'],
    name: '미친 불 마을 변두리',
    x: 0.798365,
    y: 0.711765,
  },
  {
    id: 'LSDL-795',
    categories: ['축복', '던전', '보스'],
    name: '검은 칼날의 지하 묘지 (해골)',
    x: 0.88209,
    y: 0.678542,
    loot: [
      {
        id: 'LSDL-795-1',
        name: '로제스의 도끼',
      },
      {
        id: 'LSDL-795-2',
        name: '룬의 호',
      },
      {
        id: 'LSDL-795-3',
        name: '쌍현 마술사의 뼛가루',
      },
      {
        id: 'LSDL-795-4',
        name: '사근',
      },
      {
        id: 'LSDL-795-5',
        name: '푸른 흉악한 칼날',
      },
      {
        id: 'LSDL-795-6',
        name: '검은 칼날의 각인',
      },
    ],
  },
  {
    id: 'LSDL-910',
    categories: ['축복'],
    name: '라니의 방',
    x: 0.05497,
    y: 0.211592,
  },
  {
    id: 'LSDL-942',
    categories: ['장소'],
    name: '왕가령 폐허',
    x: 0.11842,
    y: 0.707648,
    loot: [
      {
        id: 'LSDL-942-1',
        name: '빙결의 침',
      },
    ],
  },
  {
    id: 'LSDL-1075',
    categories: ['전회'],
    name: '전회 : 서리밟기 ',
    x: 0.383678,
    y: 0.454084,
  },
  {
    id: 'LSDL-1086',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.311009,
    y: 0.274149,
  },
  {
    id: 'LSDL-1088',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.628618,
    y: 0.198009,
  },
  {
    id: 'LSDL-1155',
    categories: ['지도조각'],
    name: '지도 조각 (리에니에 서부)',
    x: 0.082087,
    y: 0.735312,
  },
  {
    id: 'LSDL-1192',
    categories: ['축복'],
    name: '벨룸 교회',
    x: 0.438372,
    y: 0.606326,
  },
  {
    id: 'LSDL-1194',
    categories: ['성배병'],
    name: '성배의 물방울',
    x: 0.643863,
    y: 0.579902,
  },
  {
    id: 'LSDL-1410',
    categories: [],
    name: '트리나의 수련',
    x: 0.877093,
    y: 0.718325,
    loot: [
      {
        id: 'LSDL-1410-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1411',
    categories: ['일반단석'],
    name: '색 잃은 단석 [2]',
    x: 0.570813,
    y: 0.813929,
  },
  {
    id: 'LSDL-1412',
    categories: [],
    name: '걷는 영묘',
    x: 0.673952,
    y: 0.978771,
  },
  {
    id: 'LSDL-1413',
    categories: [],
    name: '걷는 영묘',
    x: 0.617303,
    y: 0.851051,
  },
  {
    id: 'LSDL-1415',
    categories: ['보스'],
    name: '밤 기병 - 벨룸 가도',
    x: 0.455174,
    y: 0.751683,
    loot: [
      {
        id: 'LSDL-1415-1',
        name: '거인 사냥',
      },
      {
        id: 'LSDL-1415-2',
        name: '밤 기병의 글레이브',
      },
    ],
  },
  {
    id: 'LSDL-1416',
    categories: ['장소'],
    name: '벨룸 교회',
    x: 0.444232,
    y: 0.581804,
    loot: [
      {
        id: 'LSDL-1416-1',
        name: '성배의 물방울',
      },
    ],
  },
  {
    id: 'LSDL-1418',
    categories: ['NPC'],
    name: '하이타 [4]',
    x: 0.471191,
    y: 0.635275,
  },
  {
    id: 'LSDL-1421',
    categories: ['NPC'],
    name: '방랑 민족 상인 [6]',
    x: 0.442668,
    y: 0.535861,
  },
  {
    id: 'LSDL-1422',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.667295,
    y: 0.178503,
    loot: [
      {
        id: 'LSDL-1422-1',
        name: '단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1423',
    categories: ['전회'],
    name: '전회: 야만적인 포효',
    x: 0.671201,
    y: 0.106781,
  },
  {
    id: 'LSDL-1424',
    categories: ['색단석'],
    name: '색 잃은 단석 [4]',
    x: 0.333282,
    y: 0.544684,
    loot: [
      {
        id: 'LSDL-1424-1',
        name: '색 잃은 단석 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1425',
    categories: ['중요아이템'],
    name: '수면 기름',
    x: 0.280154,
    y: 0.667375,
    loot: [
      {
        id: 'LSDL-1425-1',
        name: '수면 기름',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1453',
    categories: [],
    name: '미켈라의 수련',
    x: 0.73214,
    y: 0.001082,
  },
  {
    id: 'LSDL-1474',
    categories: ['보스'],
    name: '친위기사 로레타',
    x: 0.257876,
    y: 0.147694,
    loot: [
      {
        id: 'LSDL-1474-1',
        name: '로레타의 대궁',
      },
      {
        id: 'LSDL-1474-2',
        name: '로레타의 참격',
      },
    ],
  },
  {
    id: 'LSDL-1516',
    categories: ['축복'],
    name: '성관으로 가는 길',
    x: 0.132872,
    y: 0.590636,
  },
  {
    id: 'LSDL-1517',
    categories: ['NPC'],
    name: '이지',
    x: 0.125448,
    y: 0.584314,
  },
  {
    id: 'LSDL-1518',
    categories: [],
    name: '얼음 결정 나무의 싹 *8',
    x: 0.112948,
    y: 0.62901,
    loot: [
      {
        id: 'LSDL-1518-1',
        name: '얼음 결정 나무의 싹',
        quantity: 8,
      },
    ],
  },
  {
    id: 'LSDL-1519',
    categories: [],
    name: '휘석 반딧불 *4',
    x: 0.12545,
    y: 0.689407,
    loot: [
      {
        id: 'LSDL-1519-1',
        name: '휘석 반딧불',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-1520',
    categories: [],
    name: '전송문',
    x: 0.162161,
    y: 0.042629,
  },
  {
    id: 'LSDL-1522',
    categories: [],
    name: '미켈라의 수련',
    x: 0.226626,
    y: 0.320692,
    loot: [
      {
        id: 'LSDL-1522-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1523',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.276241,
    y: 0.327011,
    loot: [
      {
        id: 'LSDL-1523-1',
        name: '단석 [2]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-1524',
    categories: ['마술'],
    name: '마술 : 카리아의 찌르기',
    x: 0.301243,
    y: 0.29177,
  },
  {
    id: 'LSDL-1525',
    categories: ['제작서'],
    name: '휘석 장인의 제작서 [6] 성관 입장 후 오른쪽',
    x: 0.317262,
    y: 0.400615,
  },
  {
    id: 'LSDL-1526',
    categories: ['색단석'],
    name: '색 잃은 단석 [3]',
    x: 0.325464,
    y: 0.344605,
    loot: [
      {
        id: 'LSDL-1526-1',
        name: '색 잃은 단석 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1527',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.210215,
    y: 0.262831,
    loot: [
      {
        id: 'LSDL-1527-1',
        name: '단석 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1528',
    categories: ['무기'],
    name: '전설의 무기 : 밤과 불꽃의 검',
    x: 0.288349,
    y: 0.285477,
  },
  {
    id: 'LSDL-1529',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.333667,
    y: 0.189844,
    loot: [
      {
        id: 'LSDL-1529-1',
        name: '단석 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1530',
    categories: [],
    name: '미켈라의 수련',
    x: 0.343823,
    y: 0.199282,
    loot: [
      {
        id: 'LSDL-1530-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1531',
    categories: ['무기'],
    name: '거인의 마법 검',
    x: 0.303974,
    y: 0.18544,
  },
  {
    id: 'LSDL-1532',
    categories: ['보스'],
    name: '휘석룡 아듀라',
    x: 0.135988,
    y: 0.172865,
  },
  {
    id: 'LSDL-1533',
    categories: [],
    name: '푸른 스카라베',
    x: 0.18873,
    y: 0.253394,
  },
  {
    id: 'LSDL-1534',
    categories: ['NPC'],
    name: '피디',
    x: 0.198497,
    y: 0.25717,
  },
  {
    id: 'LSDL-1535',
    categories: [],
    name: '트리나의 수련',
    x: 0.049263,
    y: 0.243962,
    loot: [
      {
        id: 'LSDL-1535-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1536',
    categories: ['기타'],
    name: '바닥의 비밀 벽',
    x: 0.113328,
    y: 0.15651,
  },
  {
    id: 'LSDL-1537',
    categories: ['전회'],
    name: '전회 : 냉기 안개',
    x: 0.178569,
    y: 0.114353,
  },
  {
    id: 'LSDL-1538',
    categories: ['장소'],
    name: '셀브스의 마술사 탑',
    x: 0.144195,
    y: 0.343365,
    loot: [
      {
        id: 'LSDL-1538-1',
        name: '메모리 스톤',
      },
    ],
  },
  {
    id: 'LSDL-1539',
    categories: ['NPC'],
    name: '셀브스',
    x: 0.133649,
    y: 0.335836,
  },
  {
    id: 'LSDL-1540',
    categories: ['마술'],
    name: '마술 : 빙결의 무기',
    x: 0.331711,
    y: 0.133219,
  },
  {
    id: 'LSDL-1542',
    categories: ['영체'],
    name: '백금의 사람의 뼛가루',
    x: 0.400082,
    y: 0.316931,
  },
  {
    id: 'LSDL-1543',
    categories: ['중요아이템'],
    name: '그림 : 재탄 보상',
    x: 0.413363,
    y: 0.318831,
    loot: [
      {
        id: 'LSDL-1543-1',
        name: '유년 학도의 모자',
      },
      {
        id: 'LSDL-1543-2',
        name: '유년 학도의 로브',
      },
      {
        id: 'LSDL-1543-3',
        name: '물방울 유생',
      },
    ],
  },
  {
    id: 'LSDL-1544',
    categories: [],
    name: '묘 은방울 꽃 [1]',
    x: 0.4286,
    y: 0.338963,
  },
  {
    id: 'LSDL-1545',
    categories: ['일반묘'],
    name: '묘 은방울 꽃 [1]',
    x: 0.435238,
    y: 0.203051,
    loot: [
      {
        id: 'LSDL-1545-1',
        name: '묘 은방울 꽃 [1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1547',
    categories: [],
    name: '미켈라의 수련',
    x: 0.47587,
    y: 0.35088,
    loot: [
      {
        id: 'LSDL-1547-1',
        name: '미켈라의 수련',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-1611',
    categories: [],
    name: '리에니에 동쪽의 전송문',
    x: 0.090683,
    y: 0.761122,
  },
  {
    id: 'LSDL-1618',
    categories: ['중요아이템'],
    name: '결정 투척 화살 *8',
    x: 0.238342,
    y: 0.212498,
    loot: [
      {
        id: 'LSDL-1618-1',
        name: '결정 투척 화살',
        quantity: 8,
      },
    ],
  },
  {
    id: 'LSDL-1619',
    categories: ['그릇'],
    name: '금 간 항아리 - 카리아 성관',
    x: 0.266471,
    y: 0.222563,
  },
  {
    id: 'LSDL-1620',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.287178,
    y: 0.231372,
    loot: [
      {
        id: 'LSDL-1620-1',
        name: '단석 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1621',
    categories: ['전회'],
    name: '전회 : 그레이트 카리아',
    x: 0.252409,
    y: 0.240808,
  },
  {
    id: 'LSDL-1670',
    categories: ['기타'],
    name: '뛰어내릴 수 있는 창문',
    x: 0.264127,
    y: 0.190475,
  },
  {
    id: 'LSDL-1682',
    categories: ['무기'],
    name: '우루미',
    x: 0.327421,
    y: 0.396829,
  },
  {
    id: 'LSDL-1683',
    categories: ['중요아이템'],
    name: '얼음 결정 나무의 싹*8',
    x: 0.316089,
    y: 0.366631,
    loot: [
      {
        id: 'LSDL-1683-1',
        name: '얼음 결정 나무의 싹',
        quantity: 8,
      },
    ],
  },
  {
    id: 'LSDL-1684',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.326637,
    y: 0.363489,
    loot: [
      {
        id: 'LSDL-1684-1',
        name: '황금의 룬 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1685',
    categories: ['색단석'],
    name: '색 읽은 단석 [3]',
    x: 0.25749,
    y: 0.381733,
    loot: [
      {
        id: 'LSDL-1685-1',
        name: '색 읽은 단석 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1729',
    categories: ['보스'],
    name: '황금 나무의 화신',
    x: 0.747785,
    y: 0.875608,
    loot: [
      {
        id: 'LSDL-1729-1',
        name: '마력 두른 깨진 물방울',
      },
      {
        id: 'LSDL-1729-2',
        name: '벼락 두른 깨진 물방울',
      },
      {
        id: 'LSDL-1729-3',
        name: '신성 두른 깨진 물방울',
      },
    ],
  },
  {
    id: 'LSDL-1731',
    categories: ['제작서'],
    name: '병자의 제작서 [1]',
    x: 0.737627,
    y: 0.778729,
  },
  {
    id: 'LSDL-1732',
    categories: ['암령'],
    name: '문드러진 손가락 바이크',
    x: 0.662616,
    y: 0.627737,
    loot: [
      {
        id: 'LSDL-1732-1',
        name: '손가락 자국의 포도',
      },
      {
        id: 'LSDL-1732-2',
        name: '바이크의 전투 창',
      },
    ],
  },
  {
    id: 'LSDL-1733',
    categories: ['기도'],
    name: '공열광화',
    x: 0.695043,
    y: 0.684953,
  },
  {
    id: 'LSDL-1876',
    categories: ['NPC'],
    name: '반 늑대 블라이드 [4]',
    x: 0.0727,
    y: 0.235155,
  },
  {
    id: 'LSDL-1884',
    categories: ['암령'],
    name: '화산관 암살 퀘스트 (패치) : 큰 뿔의 트라고스',
    x: 0.618851,
    y: 0.152711,
  },
  {
    id: 'LSDL-2267',
    categories: [],
    name: '잠알 *2',
    x: 0.545027,
    y: 0.692529,
    loot: [
      {
        id: 'LSDL-2267-1',
        name: '잠알',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2268',
    categories: [],
    name: '잠알',
    x: 0.216077,
    y: 0.328906,
    loot: [
      {
        id: 'LSDL-2268-1',
        name: '잠알',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2269',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.242253,
    y: 0.36603,
    loot: [
      {
        id: 'LSDL-2269-1',
        name: '석검 열쇠',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2473',
    categories: ['색단석'],
    name: '색 잃은 단석 [3]',
    x: 0.389157,
    y: 0.992635,
    loot: [
      {
        id: 'LSDL-2473-1',
        name: '색 잃은 단석 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2474',
    categories: [],
    name: '영기류',
    x: 0.421583,
    y: 0.974393,
  },
  {
    id: 'LSDL-2475',
    categories: ['NPC'],
    name: '아인 보크 [3]',
    x: 0.383686,
    y: 0.861772,
  },
  {
    id: 'LSDL-2478',
    categories: [],
    name: '풍선 기구',
    x: 0.148895,
    y: 0.914611,
    loot: [
      {
        id: 'LSDL-2478-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2480',
    categories: [],
    name: '풍선 기구',
    x: 0.101626,
    y: 0.981333,
    loot: [
      {
        id: 'LSDL-2480-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2481',
    categories: [],
    name: '풍선 기구',
    x: 0.202417,
    y: 0.859284,
    loot: [
      {
        id: 'LSDL-2481-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2522',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.935291,
    y: 0.2024,
    loot: [
      {
        id: 'LSDL-2522-1',
        name: '석검 열쇠',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2523',
    categories: [],
    name: '미켈라의 수련',
    x: 0.851303,
    y: 0.357789,
    loot: [
      {
        id: 'LSDL-2523-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2524',
    categories: ['보스'],
    name: '황금 일족의 봉인감옥',
    x: 0.898572,
    y: 0.342687,
    loot: [
      {
        id: 'LSDL-2524-1',
        name: '고드프리의 초상',
      },
    ],
  },
  {
    id: 'LSDL-2525',
    categories: ['보스'],
    name: '밤 기병 - 알터 가도',
    x: 0.945057,
    y: 0.072165,
    loot: [
      {
        id: 'LSDL-2525-1',
        name: '성률 공유',
      },
    ],
  },
  {
    id: 'LSDL-2603',
    categories: [],
    name: '유생나비',
    x: 0.705578,
    y: 0.035687,
  },
  {
    id: 'LSDL-2617',
    categories: ['일반묘'],
    name: '묘 은방울 꽃 [2]',
    x: 0.416487,
    y: 0.235139,
    loot: [
      {
        id: 'LSDL-2617-1',
        name: '묘 은방울 꽃 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2618',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.469619,
    y: 0.324466,
  },
  {
    id: 'LSDL-2619',
    categories: [],
    name: '트리나의 수련',
    x: 0.410632,
    y: 0.421991,
    loot: [
      {
        id: 'LSDL-2619-1',
        name: '트리나의 수련',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-2620',
    categories: [],
    name: '석관 묘지 (카리아 성관)',
    x: 0.073485,
    y: 0.321343,
    loot: [
      {
        id: 'LSDL-2620-1',
        name: '황금의 룬 [1]',
        quantity: 1,
      },
      {
        id: 'LSDL-2620-2',
        name: '황금의 룬 [2]',
        quantity: 1,
      },
      {
        id: 'LSDL-2620-3',
        name: '황금의 룬 [3]',
        quantity: 4,
      },
      {
        id: 'LSDL-2620-4',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2620-5',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2621',
    categories: ['중요아이템'],
    name: '동굴 안',
    x: 0.702455,
    y: 0.159629,
    loot: [
      {
        id: 'LSDL-2621-1',
        name: '단석 [3]',
        quantity: 1,
      },
      {
        id: 'LSDL-2621-2',
        name: '단석 [4]',
        quantity: 4,
      },
      {
        id: 'LSDL-2621-3',
        name: '단석 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-2621-4',
        name: '색 잃은 단석 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2621-5',
        name: '망가진 결정',
      },
      {
        id: 'LSDL-2621-6',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-2621-7',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2622',
    categories: ['중요아이템'],
    name: '절벽 구간',
    x: 0.696593,
    y: 0.079098,
    loot: [
      {
        id: 'LSDL-2622-1',
        name: '단석 [3]',
        quantity: 2,
      },
      {
        id: 'LSDL-2622-2',
        name: '단석 [4]',
        quantity: 5,
      },
      {
        id: 'LSDL-2622-3',
        name: '색 잃은 단석 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2622-4',
        name: '망가진 결정',
      },
      {
        id: 'LSDL-2622-5',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-2622-6',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2622-7',
        name: '황금의 룬 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-2622-8',
        name: '황금의 룬 [6]',
        quantity: 3,
      },
      {
        id: 'LSDL-2622-9',
        name: '뱀신의 곡도',
      },
    ],
  },
  {
    id: 'LSDL-2623',
    categories: ['NPC'],
    name: '협력 NPC 소환',
    x: 0.604787,
    y: 0.157116,
  },
  {
    id: 'LSDL-2624',
    categories: ['보스'],
    name: '용암토룡 마카르',
    x: 0.562595,
    y: 0.129436,
    loot: [
      {
        id: 'LSDL-2624-1',
        name: '토룡의 비늘검',
      },
      {
        id: 'LSDL-2624-2',
        name: '용의 심장',
      },
    ],
  },
  {
    id: 'LSDL-2625',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.582125,
    y: 0.016816,
  },
  {
    id: 'LSDL-2626',
    categories: [],
    name: '트리나의 수련',
    x: 0.735268,
    y: 0.126283,
  },
  {
    id: 'LSDL-2815',
    categories: ['색단석'],
    name: '색 잃은 단석 [3]',
    x: 0.70519,
    y: 0.237643,
  },
  {
    id: 'LSDL-2816',
    categories: ['중요아이템'],
    name: '룬의 호',
    x: 0.580183,
    y: 0.549062,
  },
  {
    id: 'LSDL-2817',
    categories: ['무기'],
    name: '그레이트 메이스',
    x: 0.623156,
    y: 0.471066,
  },
  {
    id: 'LSDL-2818',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.732152,
    y: 0.549699,
  },
  {
    id: 'LSDL-2819',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.748951,
    y: 0.567335,
  },
  {
    id: 'LSDL-2820',
    categories: [],
    name: '이옐로의 눈동자',
    x: 0.832951,
    y: 0.84162,
  },
  {
    id: 'LSDL-2821',
    categories: ['탈리스만'],
    name: '샤브리리의 화',
    x: 0.715359,
    y: 0.765483,
  },
  {
    id: 'LSDL-2822',
    categories: [],
    name: '이옐로의 눈동자',
    x: 0.73333,
    y: 0.801359,
    loot: [
      {
        id: 'LSDL-2822-1',
        name: '이옐로의 눈동자',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2823',
    categories: [],
    name: '이옐로의 눈동자',
    x: 0.718875,
    y: 0.790649,
    loot: [
      {
        id: 'LSDL-2823-1',
        name: '이옐로의 눈동자',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2824',
    categories: [],
    name: '소재 아이템',
    x: 0.736063,
    y: 0.717687,
    loot: [
      {
        id: 'LSDL-2824-1',
        name: '이옐로의 눈동자',
        quantity: 2,
      },
      {
        id: 'LSDL-2824-2',
        name: '아르테리아의 잎',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2825',
    categories: ['축복'],
    name: '이름 없는 마커',
    x: 0.657536,
    y: 0.550347,
  },
  {
    id: 'LSDL-2826',
    categories: ['축복'],
    name: '진정의 교회',
    x: 0.657536,
    y: 0.550347,
  },
  {
    id: 'LSDL-2827',
    categories: [],
    name: '미켈라의 수련',
    x: 0.66613,
    y: 0.58115,
  },
  {
    id: 'LSDL-2828',
    categories: [],
    name: '이옐로의 눈동자',
    x: 0.677851,
    y: 0.559768,
  },
  {
    id: 'LSDL-2829',
    categories: [],
    name: '트리나의 수련',
    x: 0.615735,
    y: 0.596251,
  },
  {
    id: 'LSDL-2830',
    categories: [],
    name: '석관 묘지 (미친불 마을)',
    x: 0.594642,
    y: 0.759207,
    loot: [
      {
        id: 'LSDL-2830-1',
        name: '황금의 룬 [1]',
        quantity: 1,
      },
      {
        id: 'LSDL-2830-2',
        name: '황금의 룬 [2]',
        quantity: 1,
      },
      {
        id: 'LSDL-2830-3',
        name: '황금의 룬 [3]',
        quantity: 4,
      },
      {
        id: 'LSDL-2830-4',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2830-5',
        name: '황금의 룬 [7]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2925',
    categories: ['성배병'],
    name: '지력의 혹 결정 물방울',
    x: 0.189125,
    y: 0.476118,
  },
  {
    id: 'LSDL-2983',
    categories: ['축복'],
    name: '덱타스 대승강기',
    x: 0.760275,
    y: 0.30496,
  },
];

// LSDL base-game map, checked 2026-11-21; patch unspecified.
// Source, terrain alignment and description review: reference-data/maps/ainsel-river/.
// Regenerate: node reference-data/maps/generate.mjs ainsel-river.
const AINSEL_RIVER_MARKERS = [
  {
    id: 'LSDL-947',
    categories: ['축복'],
    name: '에인세르 강 하류',
    x: 0.312823,
    y: 0.64486,
  },
  {
    id: 'LSDL-950',
    categories: ['축복'],
    name: '에인세르 강 수문',
    x: 0.649092,
    y: 0.901387,
  },
  {
    id: 'LSDL-951',
    categories: ['축복'],
    name: '에인세르 강 우물 아래',
    x: 0.927326,
    y: 0.695952,
  },
  {
    id: 'LSDL-953',
    categories: ['축복'],
    name: '영원한 도읍 노스텔라',
    x: 0.382453,
    y: 0.244712,
  },
  {
    id: 'LSDL-954',
    categories: ['축복'],
    name: '녹스텔라의 용인병',
    x: 0.16449,
    y: 0.148888,
  },
  {
    id: 'LSDL-1144',
    categories: ['보스'],
    name: '녹스텔라의 용인병',
    x: 0.110498,
    y: 0.187501,
    loot: [
      {
        id: 'LSDL-1144-1',
        name: '얼음 뇌창',
      },
    ],
  },
  {
    id: 'LSDL-1761',
    categories: ['영혼묘'],
    name: '큰 영혼 묘 은방울 꽃 - 에인세르',
    x: 0.066915,
    y: 0.131873,
    loot: [
      {
        id: 'LSDL-1761-1',
        name: '큰 영혼 묘 은방울 꽃 - 에인세르',
      },
    ],
  },
  {
    id: 'LSDL-1841',
    categories: ['색단석'],
    name: '색 잃은 단석 [7]',
    x: 0.717752,
    y: 0.175248,
    loot: [
      {
        id: 'LSDL-1841-1',
        name: '색 잃은 단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-1842',
    categories: ['영혼묘'],
    name: '영혼 꽃 채취자의 방울 [2]',
    x: 0.257889,
    y: 0.247785,
    loot: [
      {
        id: 'LSDL-1842-1',
        name: '영혼 꽃 채취자의 방울 [2]',
      },
    ],
  },
  {
    id: 'LSDL-1843',
    categories: ['영체'],
    name: '밤무녀와 검사 꼭두각시',
    x: 0.207046,
    y: 0.153533,
    loot: [
      {
        id: 'LSDL-1843-1',
        name: '밤무녀와 검사 꼭두각시',
      },
    ],
  },
  {
    id: 'LSDL-1847',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [9]',
    x: 0.00049,
    y: 0.090143,
    loot: [
      {
        id: 'LSDL-1847-1',
        name: '영혼 묘 은방울 꽃 [9]',
      },
    ],
  },
  {
    id: 'LSDL-2165',
    categories: ['색단석'],
    name: '색 잃은 단석 [7]',
    x: 0.090685,
    y: 0.660276,
    loot: [
      {
        id: 'LSDL-2165-1',
        name: '색 잃은 단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2166',
    categories: ['색단석'],
    name: '색 잃은 단석 [7]',
    x: 0.128027,
    y: 0.794691,
    loot: [
      {
        id: 'LSDL-2166-1',
        name: '색 잃은 단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2189',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.33475,
    y: 0.002139,
    loot: [
      {
        id: 'LSDL-2189-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2190',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [7]',
    x: 0.418807,
    y: 0.139657,
    loot: [
      {
        id: 'LSDL-2190-1',
        name: '영혼 묘 은방울 꽃 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2191',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [6]',
    x: 0.449923,
    y: 0.247819,
    loot: [
      {
        id: 'LSDL-2191-1',
        name: '영혼 묘 은방울 꽃 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2192',
    categories: ['무기'],
    name: '개미의 두갑',
    x: 0.296291,
    y: 0.266332,
    loot: [
      {
        id: 'LSDL-2192-1',
        name: '개미의 두갑',
      },
    ],
  },
  {
    id: 'LSDL-2193',
    categories: ['색단석'],
    name: '색 잃은 단석 [7]',
    x: 0.257904,
    y: 0.175167,
    loot: [
      {
        id: 'LSDL-2193-1',
        name: '색 잃은 단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2194',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [7]',
    x: 0.268294,
    y: 0.108731,
    loot: [
      {
        id: 'LSDL-2194-1',
        name: '영혼 묘 은방울 꽃 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2195',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [9]',
    x: 0.124025,
    y: 0.051542,
    loot: [
      {
        id: 'LSDL-2195-1',
        name: '영혼 묘 은방울 꽃 [9]',
      },
    ],
  },
  {
    id: 'LSDL-2196',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [8]',
    x: 0.170728,
    y: 0.083993,
    loot: [
      {
        id: 'LSDL-2196-1',
        name: '영혼 묘 은방울 꽃 [8]',
      },
    ],
  },
  {
    id: 'LSDL-2197',
    categories: ['색단석'],
    name: '색 잃은 단석 [7]',
    x: 0.059659,
    y: 0.074708,
    loot: [
      {
        id: 'LSDL-2197-1',
        name: '색 잃은 단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2201',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [6]',
    x: 0.760317,
    y: 0.139718,
    loot: [
      {
        id: 'LSDL-2201-1',
        name: '영혼 묘 은방울 꽃 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2202',
    categories: ['장소'],
    name: '우르의 왕조 유적',
    x: 0.765499,
    y: 0.173714,
  },
  {
    id: 'LSDL-2203',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [7]',
    x: 0.687641,
    y: 0.22314,
    loot: [
      {
        id: 'LSDL-2203-1',
        name: '영혼 묘 은방울 꽃 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2204',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃',
    x: 0.741606,
    y: 0.255593,
    loot: [
      {
        id: 'LSDL-2204-1',
        name: '영혼 묘 은방울 꽃 [6]',
      },
      {
        id: 'LSDL-2204-2',
        name: '영혼 묘 은방울 꽃 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2205',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [6]',
    x: 0.863065,
    y: 0.229351,
    loot: [
      {
        id: 'LSDL-2205-1',
        name: '영혼 묘 은방울 꽃 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2206',
    categories: ['영체'],
    name: '진흙인간의 뼛가루',
    x: 0.857861,
    y: 0.277248,
    loot: [
      {
        id: 'LSDL-2206-1',
        name: '진흙인간의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-2207',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.878519,
    y: 0.814906,
    loot: [
      {
        id: 'LSDL-2207-1',
        name: '단석 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2208',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.774704,
    y: 0.845798,
    loot: [
      {
        id: 'LSDL-2208-1',
        name: '단석 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2209',
    categories: ['중요아이템'],
    name: '룬의 호',
    x: 0.694765,
    y: 0.906032,
    loot: [
      {
        id: 'LSDL-2209-1',
        name: '룬의 호',
      },
    ],
  },
  {
    id: 'LSDL-2210',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.658448,
    y: 0.825685,
    loot: [
      {
        id: 'LSDL-2210-1',
        name: '단석 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2211',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [1]',
    x: 0.68026,
    y: 0.787066,
    loot: [
      {
        id: 'LSDL-2211-1',
        name: '영혼 묘 은방울 꽃 [1]',
      },
    ],
  },
  {
    id: 'LSDL-2212',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [1]',
    x: 0.613832,
    y: 0.757697,
    loot: [
      {
        id: 'LSDL-2212-1',
        name: '영혼 묘 은방울 꽃 [1]',
      },
    ],
  },
  {
    id: 'LSDL-2213',
    categories: ['장소'],
    name: '우르의 왕조 유적',
    x: 0.531821,
    y: 0.78086,
  },
  {
    id: 'LSDL-2214',
    categories: ['일반단석'],
    name: '단석',
    x: 0.544264,
    y: 0.8473,
    loot: [
      {
        id: 'LSDL-2214-1',
        name: '단석 [1]',
      },
      {
        id: 'LSDL-2214-2',
        name: '단석 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2215',
    categories: ['NPC'],
    name: '속세를 떠난 상인 [3]',
    x: 0.31078,
    y: 0.498081,
  },
  {
    id: 'LSDL-2216',
    categories: ['지도조각'],
    name: '지도 조각 (에인세르 강)',
    x: 0.343994,
    y: 0.513542,
    loot: [
      {
        id: 'LSDL-2216-1',
        name: '지도 조각 (에인세르 강)',
      },
    ],
  },
  {
    id: 'LSDL-2217',
    categories: ['무기'],
    name: '아스테르의 날개',
    x: 0.348137,
    y: 0.558346,
    loot: [
      {
        id: 'LSDL-2217-1',
        name: '아스테르의 날개',
      },
    ],
  },
  {
    id: 'LSDL-2218',
    categories: ['색단석'],
    name: '색 잃은 단석 [6]',
    x: 0.419776,
    y: 0.471838,
    loot: [
      {
        id: 'LSDL-2218-1',
        name: '색 잃은 단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2219',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [2]',
    x: 0.469594,
    y: 0.508927,
    loot: [
      {
        id: 'LSDL-2219-1',
        name: '영혼 묘 은방울 꽃 [2]',
      },
    ],
  },
  {
    id: 'LSDL-2220',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [1]',
    x: 0.520449,
    y: 0.546016,
    loot: [
      {
        id: 'LSDL-2220-1',
        name: '영혼 묘 은방울 꽃 [1]',
      },
    ],
  },
  {
    id: 'LSDL-2221',
    categories: ['일반단석'],
    name: '단석 [1]',
    x: 0.464385,
    y: 0.613987,
    loot: [
      {
        id: 'LSDL-2221-1',
        name: '단석 [1]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2222',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [1]',
    x: 0.319042,
    y: 0.706662,
    loot: [
      {
        id: 'LSDL-2222-1',
        name: '영혼 묘 은방울 꽃 [1]',
      },
    ],
  },
  {
    id: 'LSDL-2223',
    categories: ['일반단석'],
    name: '단석 [2]',
    x: 0.243257,
    y: 0.723646,
    loot: [
      {
        id: 'LSDL-2223-1',
        name: '단석 [2]',
      },
    ],
  },
  {
    id: 'LSDL-2224',
    categories: ['탈리스만'],
    name: '면역의 뿔 장식',
    x: 0.22458,
    y: 0.706645,
    loot: [
      {
        id: 'LSDL-2224-1',
        name: '면역의 뿔 장식',
      },
    ],
  },
  {
    id: 'LSDL-2225',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃',
    x: 0.233934,
    y: 0.640209,
    loot: [
      {
        id: 'LSDL-2225-1',
        name: '영혼 묘 은방울 꽃 [1]',
      },
      {
        id: 'LSDL-2225-2',
        name: '영혼 묘 은방울 꽃 [2]',
      },
    ],
  },
  {
    id: 'LSDL-2226',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [2]',
    x: 0.26409,
    y: 0.399192,
    loot: [
      {
        id: 'LSDL-2226-1',
        name: '영혼 묘 은방울 꽃 [2]',
      },
    ],
  },
  {
    id: 'LSDL-2227',
    categories: ['영체'],
    name: '궁병의 뼛가루',
    x: 0.229855,
    y: 0.27868,
    loot: [
      {
        id: 'LSDL-2227-1',
        name: '궁병의 뼛가루',
      },
    ],
  },
];

// LSDL base-game map, checked 2026-11-21; patch unspecified.
// Source, terrain alignment and description review: reference-data/maps/siofra-river/.
// Regenerate: node reference-data/maps/generate.mjs siofra-river.
const SIOFRA_RIVER_MARKERS = [
  {
    id: 'LSDL-961',
    categories: ['장소'],
    name: '영원한 도읍 노크론',
    x: 0.071046,
    y: 0.769769,
  },
  {
    id: 'LSDL-962',
    categories: ['축복'],
    name: '영원한 도읍 노크론',
    x: 0.032074,
    y: 0.792953,
  },
  {
    id: 'LSDL-963',
    categories: ['축복'],
    name: '시프라 강 우물 아래',
    x: 0.077699,
    y: 0.860895,
  },
  {
    id: 'LSDL-964',
    categories: ['축복'],
    name: '화신의 물방울',
    x: 0.354866,
    y: 0.87441,
  },
  {
    id: 'LSDL-965',
    categories: ['축복'],
    name: '밤의 성역',
    x: 0.298136,
    y: 0.713506,
  },
  {
    id: 'LSDL-966',
    categories: ['축복'],
    name: '시프라 강 강가',
    x: 0.437268,
    y: 0.767519,
  },
  {
    id: 'LSDL-967',
    categories: ['장소'],
    name: '각해의 영지',
    x: 0.576398,
    y: 0.832801,
  },
  {
    id: 'LSDL-968',
    categories: ['장소'],
    name: '밤의 성역',
    x: 0.357134,
    y: 0.613383,
  },
  {
    id: 'LSDL-969',
    categories: ['축복'],
    name: '선조령의 숲',
    x: 0.354897,
    y: 0.538027,
  },
  {
    id: 'LSDL-970',
    categories: ['장소'],
    name: '각해의 영지',
    x: 0.5141,
    y: 0.413138,
  },
  {
    id: 'LSDL-971',
    categories: ['축복'],
    name: '신봉자의 숲',
    x: 0.785706,
    y: 0.481775,
  },
  {
    id: 'LSDL-972',
    categories: ['축복'],
    name: '수도교를 향한 절벽',
    x: 0.517465,
    y: 0.234235,
  },
  {
    id: 'LSDL-973',
    categories: ['장소'],
    name: '시프라 수도교',
    x: 0.649944,
    y: 0.190353,
  },
  {
    id: 'LSDL-974',
    categories: ['축복'],
    name: '대폭포',
    x: 0.528627,
    y: 0.094721,
  },
  {
    id: 'LSDL-975',
    categories: ['축복'],
    name: '안쪽 우물 아래',
    x: 0.873687,
    y: 0.125126,
  },
  {
    id: 'LSDL-1004',
    categories: ['NPC'],
    name: '남겨진 상인',
    x: 0.62598,
    y: 0.485691,
  },
  {
    id: 'LSDL-1130',
    categories: ['보스'],
    name: '선조령',
    x: 0.617607,
    y: 0.887925,
  },
  {
    id: 'LSDL-1131',
    categories: ['보스'],
    name: '선조령의 왕',
    x: 0.535833,
    y: 0.368674,
    loot: [
      {
        id: 'LSDL-1131-1',
        name: '선조령의 왕의 추억',
      },
    ],
  },
  {
    id: 'LSDL-1140',
    categories: ['보스'],
    name: '영웅의 가고일 & 영웅의 가고일(쌍날검)',
    x: 0.607637,
    y: 0.071107,
    loot: [
      {
        id: 'LSDL-1140-1',
        name: '가고일의 대검',
      },
      {
        id: 'LSDL-1140-2',
        name: '가고일의 쌍날검',
      },
    ],
  },
  {
    id: 'LSDL-1163',
    categories: ['지도조각'],
    name: '지도 조각 (시오프라 강)',
    x: 0.508508,
    y: 0.791717,
    loot: [
      {
        id: 'LSDL-1163-1',
        name: '지도 조각 (시오프라 강)',
      },
    ],
  },
  {
    id: 'LSDL-1205',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.737855,
    y: 0.217901,
    loot: [
      {
        id: 'LSDL-1205-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1586',
    categories: [],
    name: '사종루 2번 탑 포탈 지점',
    x: 0.985497,
    y: 0.957143,
  },
  {
    id: 'LSDL-1587',
    categories: ['탈리스만'],
    name: '탈리스만 : 얼룩색 목걸이',
    x: 0.915366,
    y: 0.872206,
    loot: [
      {
        id: 'LSDL-1587-1',
        name: '얼룩색 목걸이',
      },
    ],
  },
  {
    id: 'LSDL-1695',
    categories: ['전회'],
    name: '검은 숫돌 칼날',
    x: 0.371592,
    y: 0.666273,
    loot: [
      {
        id: 'LSDL-1695-1',
        name: '검은 숫돌 칼날',
      },
    ],
  },
  {
    id: 'LSDL-1697',
    categories: ['영체'],
    name: '화신의 물방울의 뼛가루',
    x: 0.417221,
    y: 0.68651,
    loot: [
      {
        id: 'LSDL-1697-1',
        name: '화신의 물방울의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-1700',
    categories: [],
    name: '케일리드 투기장으로 올라가는 엘리베이터',
    x: 0.917648,
    y: 0.080664,
  },
  {
    id: 'LSDL-1706',
    categories: ['기타'],
    name: '오벨리스크 - 선조령',
    x: 0.482897,
    y: 0.788368,
  },
  {
    id: 'LSDL-1707',
    categories: ['기타'],
    name: '오벨리스크 - 선조령',
    x: 0.642105,
    y: 0.604396,
  },
  {
    id: 'LSDL-1708',
    categories: ['기타'],
    name: '오벨리스크 - 선조령',
    x: 0.839688,
    y: 0.694992,
  },
  {
    id: 'LSDL-1710',
    categories: ['기타'],
    name: '오벨리스크 - 선조령',
    x: 0.719487,
    y: 0.465462,
  },
  {
    id: 'LSDL-1711',
    categories: ['기타'],
    name: '오벨리스크 - 선조령',
    x: 0.790746,
    y: 0.289947,
  },
  {
    id: 'LSDL-1712',
    categories: ['기타'],
    name: '오벨리스크 - 선조령',
    x: 0.864766,
    y: 0.300644,
  },
  {
    id: 'LSDL-1713',
    categories: ['기타'],
    name: '오벨리스크 - 선조령',
    x: 0.413344,
    y: 0.622963,
  },
  {
    id: 'LSDL-1714',
    categories: ['기타'],
    name: '오벨리스크 - 선조령의 왕',
    x: 0.535249,
    y: 0.518882,
  },
  {
    id: 'LSDL-1716',
    categories: ['기타'],
    name: '오벨리스크 - 선조령의 왕',
    x: 0.414457,
    y: 0.52226,
  },
  {
    id: 'LSDL-1717',
    categories: ['기타'],
    name: '오벨리스크 - 선조령의 왕',
    x: 0.427826,
    y: 0.408633,
  },
  {
    id: 'LSDL-1718',
    categories: ['기타'],
    name: '오벨리스크 - 선조령의 왕',
    x: 0.298164,
    y: 0.413127,
  },
  {
    id: 'LSDL-1719',
    categories: ['기타'],
    name: '오벨리스크 - 선조령의 왕',
    x: 0.328775,
    y: 0.283731,
  },
  {
    id: 'LSDL-1721',
    categories: ['기타'],
    name: '오벨리스크 - 선조령',
    x: 0.804651,
    y: 0.541398,
  },
  {
    id: 'LSDL-1723',
    categories: ['NPC'],
    name: '반 늑대 블라이드',
    x: 0.707206,
    y: 0.762492,
  },
  {
    id: 'LSDL-1724',
    categories: [],
    name: '영기류',
    x: 0.727262,
    y: 0.753492,
  },
  {
    id: 'LSDL-1736',
    categories: ['중요아이템'],
    name: '이름 없는 마커',
    x: 0.426685,
    y: 0.804674,
    loot: [
      {
        id: 'LSDL-1736-1',
        name: '뒤집힌 매 히터 실드',
      },
      {
        id: 'LSDL-1736-2',
        name: '아르테리아의 잎',
      },
    ],
  },
  {
    id: 'LSDL-1737',
    categories: ['제작서'],
    name: '무구 장인의 제작서 [6]',
    x: 0.432832,
    y: 0.589768,
    loot: [
      {
        id: 'LSDL-1737-1',
        name: '무구 장인의 제작서 [6]',
      },
    ],
  },
  {
    id: 'LSDL-1739',
    categories: ['탈리스만'],
    name: '이성의 뿔 장식',
    x: 0.916541,
    y: 0.116667,
    loot: [
      {
        id: 'LSDL-1739-1',
        name: '이성의 뿔 장식',
      },
    ],
  },
  {
    id: 'LSDL-1747',
    categories: ['영혼묘'],
    name: '영혼 꽃 채취자의 방울 [1]',
    x: 0.074396,
    y: 0.750075,
    loot: [
      {
        id: 'LSDL-1747-1',
        name: '영혼 꽃 채취자의 방울 [1]',
      },
    ],
  },
  {
    id: 'LSDL-1749',
    categories: ['물방울 유생'],
    name: '물방울 유생',
    x: 0.226883,
    y: 0.829975,
    loot: [
      {
        id: 'LSDL-1749-1',
        name: '물방울 유생',
      },
    ],
  },
  {
    id: 'LSDL-1750',
    categories: ['물방울 유생'],
    name: '물방울 유생',
    x: 0.144491,
    y: 0.829971,
    loot: [
      {
        id: 'LSDL-1750-1',
        name: '물방울 유생',
      },
    ],
  },
  {
    id: 'LSDL-1751',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.402748,
    y: 0.799057,
    loot: [
      {
        id: 'LSDL-1751-1',
        name: '색 잃은 단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-1753',
    categories: ['중요아이템'],
    name: '별의 물방울',
    x: 0.323752,
    y: 0.668503,
    loot: [
      {
        id: 'LSDL-1753-1',
        name: '별의 물방울',
      },
    ],
  },
  {
    id: 'LSDL-1754',
    categories: ['물방울 유생'],
    name: '물방울 유생',
    x: 0.353244,
    y: 0.700044,
    loot: [
      {
        id: 'LSDL-1754-1',
        name: '물방울 유생',
      },
    ],
  },
  {
    id: 'LSDL-1755',
    categories: ['중요아이템'],
    name: '상자 (밤의 성역)',
    x: 0.368287,
    y: 0.579648,
    loot: [
      {
        id: 'LSDL-1755-1',
        name: '손가락 죽임의 칼날',
      },
      {
        id: 'LSDL-1755-2',
        name: '큰 영혼 묘 은방울 꽃',
      },
    ],
  },
  {
    id: 'LSDL-1756',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.528606,
    y: 0.329862,
    loot: [
      {
        id: 'LSDL-1756-1',
        name: '석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-1757',
    categories: ['제작서'],
    name: '선교사의 제작서 [5]',
    x: 0.560316,
    y: 0.252815,
    loot: [
      {
        id: 'LSDL-1757-1',
        name: '선교사의 제작서 [5]',
      },
    ],
  },
  {
    id: 'LSDL-1759',
    categories: ['탈리스만'],
    name: '얼룩색 목걸이 +1',
    x: 0.518021,
    y: 0.381059,
    loot: [
      {
        id: 'LSDL-1759-1',
        name: '얼룩색 목걸이 +1',
      },
    ],
  },
  {
    id: 'LSDL-1760',
    categories: ['중요아이템'],
    name: '어린 선조령의 머리',
    x: 0.168486,
    y: 0.212291,
    loot: [
      {
        id: 'LSDL-1760-1',
        name: '어린 선조령의 머리',
      },
    ],
  },
  {
    id: 'LSDL-1837',
    categories: ['무기'],
    name: '뿔 활',
    x: 0.553033,
    y: 0.807489,
    loot: [
      {
        id: 'LSDL-1837-1',
        name: '뿔 활',
      },
    ],
  },
  {
    id: 'LSDL-1911',
    categories: ['중요아이템'],
    name: '깃든 화살 *10',
    x: 0.733921,
    y: 0.771495,
    loot: [
      {
        id: 'LSDL-1911-1',
        name: '깃든 화살',
        quantity: 10,
      },
    ],
  },
  {
    id: 'LSDL-2279',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [4]',
    x: 0.416141,
    y: 0.420442,
    loot: [
      {
        id: 'LSDL-2279-1',
        name: '영혼 묘 은방울 꽃 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2296',
    categories: [],
    name: '선조령의 숲 파밍',
    x: 0.358821,
    y: 0.476137,
  },
  {
    id: 'LSDL-2731',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [3]',
    x: 0.028723,
    y: 0.819272,
    loot: [
      {
        id: 'LSDL-2731-1',
        name: '영혼 묘 은방울 꽃 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2732',
    categories: ['중요아이템'],
    name: '이성의 흰 육포',
    x: 0.025943,
    y: 0.83839,
    loot: [
      {
        id: 'LSDL-2732-1',
        name: '이성의 흰 육포',
      },
    ],
  },
  {
    id: 'LSDL-2733',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.023162,
    y: 0.862584,
    loot: [
      {
        id: 'LSDL-2733-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2734',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.012046,
    y: 0.88451,
    loot: [
      {
        id: 'LSDL-2734-1',
        name: '단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2735',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.001999,
    y: 0.910396,
    loot: [
      {
        id: 'LSDL-2735-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2736',
    categories: [],
    name: '유생나비',
    x: 0.012579,
    y: 0.900855,
    loot: [
      {
        id: 'LSDL-2736-1',
        name: '유생나비',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2737',
    categories: ['중요아이템'],
    name: '룬의 호',
    x: 0.008121,
    y: 0.966094,
    loot: [
      {
        id: 'LSDL-2737-1',
        name: '룬의 호',
      },
    ],
  },
  {
    id: 'LSDL-2739',
    categories: ['색단석'],
    name: '색 잃은 단석 [4]',
    x: 0.147849,
    y: 0.727036,
    loot: [
      {
        id: 'LSDL-2739-1',
        name: '색 잃은 단석 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2740',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃',
    x: 0.117774,
    y: 0.841779,
    loot: [
      {
        id: 'LSDL-2740-1',
        name: '영혼 묘 은방울꽃 [3]',
      },
      {
        id: 'LSDL-2740-2',
        name: '영혼 묘 은방울꽃 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2741',
    categories: [],
    name: '은색 반딧불 파밍 위치',
    x: 0.080481,
    y: 0.817582,
  },
  {
    id: 'LSDL-2742',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.057685,
    y: 0.799039,
    loot: [
      {
        id: 'LSDL-2742-1',
        name: '단석 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2743',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [3]',
    x: 0.167861,
    y: 0.801277,
    loot: [
      {
        id: 'LSDL-2743-1',
        name: '영혼 묘 은방울 꽃 [3]',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2744',
    categories: ['영체'],
    name: '대형 방패병의 뼛가루',
    x: 0.182358,
    y: 0.817047,
    loot: [
      {
        id: 'LSDL-2744-1',
        name: '대형 방패병의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-2745',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.175125,
    y: 0.830512,
    loot: [
      {
        id: 'LSDL-2745-1',
        name: '단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2746',
    categories: [],
    name: '황금의 룬 [7]',
    x: 0.189592,
    y: 0.787201,
    loot: [
      {
        id: 'LSDL-2746-1',
        name: '황금의 룬 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2747',
    categories: [],
    name: '황금의 룬 [7]',
    x: 0.239105,
    y: 0.793972,
    loot: [
      {
        id: 'LSDL-2747-1',
        name: '황금의 룬 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2748',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [3]',
    x: 0.224108,
    y: 0.791703,
    loot: [
      {
        id: 'LSDL-2748-1',
        name: '영혼 묘 은방울 꽃 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2749',
    categories: ['중요아이템'],
    name: '룬의 호',
    x: 0.257481,
    y: 0.837861,
    loot: [
      {
        id: 'LSDL-2749-1',
        name: '룬의 호',
      },
    ],
  },
  {
    id: 'LSDL-2750',
    categories: ['보스'],
    name: '화신의 물방울',
    x: 0.34653,
    y: 0.886795,
    loot: [
      {
        id: 'LSDL-2750-1',
        name: '물방울 유생',
        quantity: 2,
      },
      {
        id: 'LSDL-2750-2',
        name: '은 물방울 가면',
      },
    ],
  },
  {
    id: 'LSDL-2751',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [3]',
    x: 0.504069,
    y: 0.643778,
    loot: [
      {
        id: 'LSDL-2751-1',
        name: '영혼 묘 은방울 꽃 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2752',
    categories: [],
    name: '유생나비',
    x: 0.497377,
    y: 0.590348,
    loot: [
      {
        id: 'LSDL-2752-1',
        name: '유생나비',
      },
    ],
  },
  {
    id: 'LSDL-2753',
    categories: ['기타'],
    name: '오벨리스크 - 선조령의 왕',
    x: 0.455098,
    y: 0.56165,
  },
  {
    id: 'LSDL-2754',
    categories: [],
    name: '트리나의 수련',
    x: 0.400562,
    y: 0.555455,
    loot: [
      {
        id: 'LSDL-2754-1',
        name: '트리나의 수련',
      },
    ],
  },
  {
    id: 'LSDL-2756',
    categories: ['중요아이템'],
    name: '아이템들',
    x: 0.430631,
    y: 0.507644,
    loot: [
      {
        id: 'LSDL-2756-1',
        name: '황금의 룬 [4]',
      },
      {
        id: 'LSDL-2756-2',
        name: '영혼 묘 은방울 꽃 [4]',
      },
      {
        id: 'LSDL-2756-3',
        name: '항염의 말린 간',
      },
    ],
  },
  {
    id: 'LSDL-2757',
    categories: [],
    name: '트리나의 수련',
    x: 0.415596,
    y: 0.531837,
    loot: [
      {
        id: 'LSDL-2757-1',
        name: '트리나의 수련',
      },
    ],
  },
  {
    id: 'LSDL-2758',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.275325,
    y: 0.481749,
    loot: [
      {
        id: 'LSDL-2758-1',
        name: '색 잃은 단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2759',
    categories: [],
    name: '트리나의 수련',
    x: 0.239703,
    y: 0.481171,
    loot: [
      {
        id: 'LSDL-2759-1',
        name: '트리나의 수련',
      },
    ],
  },
  {
    id: 'LSDL-2760',
    categories: ['전회'],
    name: '전회 : 추적 사격',
    x: 0.35549,
    y: 0.287657,
    loot: [
      {
        id: 'LSDL-2760-1',
        name: '추적 사격',
      },
    ],
  },
  {
    id: 'LSDL-2761',
    categories: [],
    name: '황금의 룬 [12]',
    x: 0.259208,
    y: 0.267418,
    loot: [
      {
        id: 'LSDL-2761-1',
        name: '황금의 룬 [12]',
      },
    ],
  },
  {
    id: 'LSDL-2762',
    categories: [],
    name: '유생나비',
    x: 0.275344,
    y: 0.273611,
    loot: [
      {
        id: 'LSDL-2762-1',
        name: '유생나비',
        quantity: 8,
      },
    ],
  },
  {
    id: 'LSDL-2763',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [5]',
    x: 0.251975,
    y: 0.283151,
    loot: [
      {
        id: 'LSDL-2763-1',
        name: '영혼 묘 은방울 꽃 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2764',
    categories: ['무기'],
    name: '도가니의 뿔 방패',
    x: 0.600391,
    y: 0.236472,
    loot: [
      {
        id: 'LSDL-2764-1',
        name: '도가니의 뿔 방패',
      },
    ],
  },
  {
    id: 'LSDL-2765',
    categories: [],
    name: '황금 지네',
    x: 0.573672,
    y: 0.265165,
    loot: [
      {
        id: 'LSDL-2765-1',
        name: '황금 지네',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2766',
    categories: ['중요아이템'],
    name: '단석',
    x: 0.643815,
    y: 0.221856,
    loot: [
      {
        id: 'LSDL-2766-1',
        name: '단석 [5]',
      },
      {
        id: 'LSDL-2766-2',
        name: '색 잃은 단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2767',
    categories: ['기도'],
    name: '성률의 치료',
    x: 0.647158,
    y: 0.277014,
    loot: [
      {
        id: 'LSDL-2767-1',
        name: '성률의 치료',
      },
    ],
  },
  {
    id: 'LSDL-2768',
    categories: [],
    name: '황금 지네',
    x: 0.630986,
    y: 0.280362,
    loot: [
      {
        id: 'LSDL-2768-1',
        name: '황금 지네',
      },
    ],
  },
  {
    id: 'LSDL-2769',
    categories: [],
    name: '황금의 룬 [7]',
    x: 0.651609,
    y: 0.297825,
    loot: [
      {
        id: 'LSDL-2769-1',
        name: '황금의 룬 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2770',
    categories: [],
    name: '황금의 룬 [13]',
    x: 0.634336,
    y: 0.259012,
    loot: [
      {
        id: 'LSDL-2770-1',
        name: '황금의 룬 [13]',
      },
    ],
  },
  {
    id: 'LSDL-2771',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.666085,
    y: 0.142541,
    loot: [
      {
        id: 'LSDL-2771-1',
        name: '단석 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2772',
    categories: [],
    name: '황금 지네',
    x: 0.653298,
    y: 0.136348,
    loot: [
      {
        id: 'LSDL-2772-1',
        name: '황금 지네',
      },
    ],
  },
  {
    id: 'LSDL-2773',
    categories: ['중요아이템'],
    name: '폭포 왼쪽 방',
    x: 0.652725,
    y: 0.163927,
    loot: [
      {
        id: 'LSDL-2773-1',
        name: '룬의 호',
      },
      {
        id: 'LSDL-2773-2',
        name: '황금 지네',
      },
    ],
  },
  {
    id: 'LSDL-2774',
    categories: [],
    name: '황금 지네',
    x: 0.682223,
    y: 0.131849,
    loot: [
      {
        id: 'LSDL-2774-1',
        name: '황금 지네',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2775',
    categories: ['NPC'],
    name: '죽음을 본 자 D [1]',
    x: 0.701137,
    y: 0.13635,
  },
  {
    id: 'LSDL-2776',
    categories: [],
    name: '대폭포의 석관',
    x: 0.514703,
    y: 0.057601,
  },
  {
    id: 'LSDL-2882',
    categories: [],
    name: '황금의 룬 [7]',
    x: 0.339889,
    y: 0.665155,
    loot: [
      {
        id: 'LSDL-2882-1',
        name: '황금의 룬 [7]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2883',
    categories: [],
    name: '황금의 룬 [7]',
    x: 0.338751,
    y: 0.641501,
    loot: [
      {
        id: 'LSDL-2883-1',
        name: '황금의 룬 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2884',
    categories: [],
    name: '전송문',
    x: 0.353788,
    y: 0.59034,
  },
  {
    id: 'LSDL-2929',
    categories: ['제작서'],
    name: '무구 장인의 제작서 [6]',
    x: 0.394417,
    y: 0.752359,
    loot: [
      {
        id: 'LSDL-2929-1',
        name: '무구 장인의 제작서 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2989',
    categories: [],
    name: '시프라강가 전송문 전송 위치',
    x: 0.730607,
    y: 0.40584,
  },
  {
    id: 'LSDL-2990',
    categories: [],
    name: '전송문 중간층으로',
    x: 0.784022,
    y: 0.579669,
  },
  {
    id: 'LSDL-2991',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.57978,
    y: 0.476688,
    loot: [
      {
        id: 'LSDL-2991-1',
        name: '색 잃은 단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2992',
    categories: ['마술'],
    name: '마술: 신탁의 비눗방울',
    x: 0.587013,
    y: 0.458146,
    loot: [
      {
        id: 'LSDL-2992-1',
        name: '신탁의 비눗방울',
      },
    ],
  },
  {
    id: 'LSDL-2993',
    categories: [],
    name: '황금의 룬 [7]',
    x: 0.541914,
    y: 0.479494,
    loot: [
      {
        id: 'LSDL-2993-1',
        name: '황금의 룬 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2994',
    categories: ['보스'],
    name: '녹스텔라의 용인병',
    x: 0.56811,
    y: 0.321439,
    loot: [
      {
        id: 'LSDL-2994-1',
        name: '용 할버드',
      },
    ],
  },
  {
    id: 'LSDL-2995',
    categories: ['탈리스만'],
    name: '마리카의 각인',
    x: 0.632663,
    y: 0.242126,
    loot: [
      {
        id: 'LSDL-2995-1',
        name: '마리카의 각인',
      },
    ],
  },
  {
    id: 'LSDL-2996',
    categories: [],
    name: '황금의 룬 [7]',
    x: 0.634899,
    y: 0.338328,
    loot: [
      {
        id: 'LSDL-2996-1',
        name: '황금의 룬 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2997',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [4]',
    x: 0.696671,
    y: 0.285442,
    loot: [
      {
        id: 'LSDL-2997-1',
        name: '영혼 묘 은방울 꽃 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2998',
    categories: ['중요아이템'],
    name: '룬의 호',
    x: 0.666625,
    y: 0.086844,
    loot: [
      {
        id: 'LSDL-2998-1',
        name: '룬의 호',
      },
    ],
  },
  {
    id: 'LSDL-2999',
    categories: ['색단석'],
    name: '색 잃은 단석 [2]',
    x: 0.521875,
    y: 0.691051,
    loot: [
      {
        id: 'LSDL-2999-1',
        name: '색 잃은 단석 [2]',
      },
    ],
  },
  {
    id: 'LSDL-3000',
    categories: [],
    name: '전송문 : 선조령의 숲으로',
    x: 0.518525,
    y: 0.712978,
  },
  {
    id: 'LSDL-3001',
    categories: [],
    name: '전송문 : 시프라 강가로',
    x: 0.805201,
    y: 0.364764,
  },
  {
    id: 'LSDL-3002',
    categories: [],
    name: '트리나의 수련',
    x: 0.573112,
    y: 0.549847,
    loot: [
      {
        id: 'LSDL-3002-1',
        name: '트리나의 수련',
      },
    ],
  },
  {
    id: 'LSDL-3003',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.594811,
    y: 0.48965,
    loot: [
      {
        id: 'LSDL-3003-1',
        name: '단석 [4]',
      },
    ],
  },
  {
    id: 'LSDL-3004',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [2]',
    x: 0.645994,
    y: 0.532965,
    loot: [
      {
        id: 'LSDL-3004-1',
        name: '영혼 묘 은방울 꽃 [2]',
      },
    ],
  },
  {
    id: 'LSDL-3005',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.706691,
    y: 0.55097,
    loot: [
      {
        id: 'LSDL-3005-1',
        name: '황금의 룬 [3]',
      },
    ],
  },
  {
    id: 'LSDL-3011',
    categories: ['중요아이템'],
    name: '별의 물방울',
    x: 0.303708,
    y: 0.559374,
    loot: [
      {
        id: 'LSDL-3011-1',
        name: '별의 물방울',
      },
    ],
  },
];

// LSDL base-game map, checked 2026-11-21; patch unspecified.
// Source, terrain alignment and description review: reference-data/maps/caelid/.
// Regenerate: node reference-data/maps/generate.mjs caelid.
const CAELID_MARKERS = [
  {
    id: 'LSDL-325',
    categories: ['장소'],
    name: '작은 황금 나무',
    x: 0.162696,
    y: 0.188428,
  },
  {
    id: 'LSDL-328',
    categories: ['장소'],
    name: '렌의 마술사탑',
    x: 0.84656,
    y: 0.132951,
    loot: [
      {
        id: 'LSDL-328-1',
        name: '메모리 스톤',
      },
    ],
  },
  {
    id: 'LSDL-335',
    categories: ['장소'],
    name: '부패병의 교회',
    x: 0.572721,
    y: 0.48575,
    loot: [
      {
        id: 'LSDL-335-1',
        name: '성혈의 나무 싹',
        quantity: 16,
      },
    ],
  },
  {
    id: 'LSDL-339',
    categories: ['장소'],
    name: '현자 도시의 폐허',
    x: 0.320575,
    y: 0.489579,
  },
  {
    id: 'LSDL-342',
    categories: ['축복', '던전', '보스'],
    name: '영령들의 지하 묘지',
    x: 0.825958,
    y: 0.202324,
    loot: [
      {
        id: 'LSDL-342-1',
        name: '별 부수기',
      },
      {
        id: 'LSDL-342-2',
        name: '라단 병사의 뼛가루',
      },
      {
        id: 'LSDL-342-3',
        name: '황금 종자',
      },
      {
        id: 'LSDL-342-4',
        name: '적사자 기사 오우가',
      },
    ],
  },
  {
    id: 'LSDL-345',
    categories: ['장소'],
    name: '하이트 요새',
    x: 0.067829,
    y: 0.844183,
    loot: [
      {
        id: 'LSDL-345-1',
        name: '피의 참격',
      },
      {
        id: 'LSDL-345-2',
        name: '피의 장미',
        quantity: 9,
      },
      {
        id: 'LSDL-345-3',
        name: '단석 [1]',
      },
      {
        id: 'LSDL-345-4',
        name: '덱타스의 부절(좌)',
      },
      {
        id: 'LSDL-345-5',
        name: '방랑 전사의 제작서 [6]',
      },
    ],
  },
  {
    id: 'LSDL-346',
    categories: ['축복', '던전', '보스'],
    name: '게르 갱도',
    x: 0.108067,
    y: 0.383674,
    loot: [
      {
        id: 'LSDL-346-1',
        name: '색 잃은 단석 [1]',
      },
      {
        id: 'LSDL-346-2',
        name: '십문자치도',
      },
      {
        id: 'LSDL-346-3',
        name: '색 잃은 단석 [2]',
      },
      {
        id: 'LSDL-346-4',
        name: '색 잃은 단석 [4]',
      },
      {
        id: 'LSDL-346-5',
        name: '단석 [4]',
        quantity: 7,
      },
      {
        id: 'LSDL-346-6',
        name: '명도 월',
      },
      {
        id: 'LSDL-346-7',
        name: '용의 심장',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-349',
    categories: ['장소'],
    name: '썩어가는 자의 오두막',
    x: 0.112767,
    y: 0.305704,
    loot: [
      {
        id: 'LSDL-349-1',
        name: '유생나비',
        quantity: 2,
      },
      {
        id: 'LSDL-349-2',
        name: '황금의 룬 [3]',
        quantity: 1,
      },
      {
        id: 'LSDL-349-3',
        name: '부패 이끼약',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-350',
    categories: ['장소'],
    name: '버려진 폐허',
    x: 0.165211,
    y: 0.333535,
    loot: [
      {
        id: 'LSDL-350-1',
        name: '단석 [4]',
      },
      {
        id: 'LSDL-350-2',
        name: '트리나의 수련',
        quantity: 6,
      },
      {
        id: 'LSDL-350-3',
        name: '황금의 룬 [5]',
      },
      {
        id: 'LSDL-350-4',
        name: '트리나의 검',
      },
    ],
  },
  {
    id: 'LSDL-353',
    categories: ['장소'],
    name: '키렘 폐허',
    x: 0.261191,
    y: 0.330202,
    loot: [
      {
        id: 'LSDL-353-1',
        name: '안면방패',
      },
    ],
  },
  {
    id: 'LSDL-358',
    categories: ['장소'],
    name: '케일리드 역참터',
    x: 0.22485,
    y: 0.610488,
    loot: [
      {
        id: 'LSDL-358-1',
        name: '큰 잠자리 머리',
        quantity: 5,
      },
      {
        id: 'LSDL-358-2',
        name: '부패기름',
        quantity: 3,
      },
      {
        id: 'LSDL-358-3',
        name: '독꽃',
      },
      {
        id: 'LSDL-358-4',
        name: '운철도',
      },
    ],
  },
  {
    id: 'LSDL-363',
    categories: ['장소'],
    name: '사리아 관문',
    x: 0.507325,
    y: 0.582267,
  },
  {
    id: 'LSDL-364',
    categories: ['장소'],
    name: '고리의 오두막',
    x: 0.526525,
    y: 0.539242,
  },
  {
    id: 'LSDL-365',
    categories: ['장소'],
    name: '늪 감시탑',
    x: 0.476176,
    y: 0.51139,
    loot: [
      {
        id: 'LSDL-365-1',
        name: '영원한 암흑',
      },
    ],
  },
  {
    id: 'LSDL-373',
    categories: ['장소'],
    name: '작은 황금 나무',
    x: 0.70056,
    y: 0.237722,
  },
  {
    id: 'LSDL-374',
    categories: ['장소'],
    name: '시프라강 안쪽 우물',
    x: 0.379321,
    y: 0.278795,
  },
  {
    id: 'LSDL-377',
    categories: ['장소'],
    name: '제 3 마리카 교회',
    x: 0.028646,
    y: 0.507205,
    loot: [
      {
        id: 'LSDL-377-1',
        name: '붉은 결정 물방울',
      },
      {
        id: 'LSDL-377-2',
        name: '영약의 성배병',
      },
    ],
  },
  {
    id: 'LSDL-580',
    categories: ['축복'],
    name: '하이트 요새 서쪽',
    x: 0.017535,
    y: 0.862494,
  },
  {
    id: 'LSDL-684',
    categories: ['축복'],
    name: '은둔 상인의 오두막',
    x: 0.285636,
    y: 0.168203,
  },
  {
    id: 'LSDL-685',
    categories: ['축복'],
    name: '용총 서쪽',
    x: 0.382053,
    y: 0.222424,
  },
  {
    id: 'LSDL-687',
    categories: ['축복', '던전', '보스'],
    name: '사리아의 결정 갱도',
    x: 0.453278,
    y: 0.342729,
    loot: [
      {
        id: 'LSDL-687-1',
        name: '신도의 서포',
      },
      {
        id: 'LSDL-687-2',
        name: '암반 발파',
      },
      {
        id: 'LSDL-687-3',
        name: '단석 [5]',
        quantity: 7,
      },
      {
        id: 'LSDL-687-4',
        name: '색 잃은 단석 [4]',
        quantity: 3,
      },
      {
        id: 'LSDL-687-5',
        name: '망가진 결정',
      },
      {
        id: 'LSDL-687-6',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-687-7',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-687-8',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-687-9',
        name: '부패기름',
        quantity: 1,
      },
      {
        id: 'LSDL-687-10',
        name: '용상기름',
        quantity: 1,
      },
      {
        id: 'LSDL-687-11',
        name: '중력석 파편',
        quantity: 6,
      },
      {
        id: 'LSDL-687-12',
        name: '중력석 덩어리',
        quantity: 3,
      },
      {
        id: 'LSDL-687-13',
        name: '부스러기 휘석',
        quantity: 6,
      },
      {
        id: 'LSDL-687-14',
        name: '뻐꾸기의 휘석',
        quantity: 5,
      },
      {
        id: 'LSDL-687-15',
        name: '색 잃은 단석 [6]',
        quantity: 1,
      },
      {
        id: 'LSDL-687-16',
        name: '단석 [7]',
        quantity: 5,
      },
      {
        id: 'LSDL-687-17',
        name: '중력석 파편',
        quantity: 7,
      },
      {
        id: 'LSDL-687-18',
        name: '중력석 덩어리',
        quantity: 3,
      },
      {
        id: 'LSDL-687-19',
        name: '색 잃은 채석꾼 방울 [1]',
      },
    ],
  },
  {
    id: 'LSDL-688',
    categories: ['축복'],
    name: '그을림의 벽',
    x: 0.280518,
    y: 0.40656,
  },
  {
    id: 'LSDL-690',
    categories: ['축복'],
    name: '사리아의 의자묘',
    x: 0.493171,
    y: 0.367035,
  },
  {
    id: 'LSDL-691',
    categories: ['축복'],
    name: '사리아 거리 뒤쪽',
    x: 0.511296,
    y: 0.383261,
  },
  {
    id: 'LSDL-692',
    categories: ['축복'],
    name: '사리아 거리 계단',
    x: 0.496359,
    y: 0.423019,
  },
  {
    id: 'LSDL-695',
    categories: ['축복'],
    name: '파로스 요새',
    x: 0.644181,
    y: 0.330563,
  },
  {
    id: 'LSDL-697',
    categories: ['축복', '던전', '보스'],
    name: '사리아의 은신 동굴',
    x: 0.629663,
    y: 0.372621,
    loot: [
      {
        id: 'LSDL-697-1',
        name: '영혼 묘 은방울꽃 [4]',
      },
      {
        id: 'LSDL-697-2',
        name: '상실의 전회',
      },
      {
        id: 'LSDL-697-3',
        name: '색 잃은 단석 [4]',
      },
      {
        id: 'LSDL-697-4',
        name: '결정인의 뼛가루',
      },
      {
        id: 'LSDL-697-5',
        name: '결정창',
      },
      {
        id: 'LSDL-697-6',
        name: '쏘아지는 결정',
      },
    ],
  },
  {
    id: 'LSDL-698',
    categories: ['축복'],
    name: '용총의 갈림길',
    x: 0.604288,
    y: 0.198609,
  },
  {
    id: 'LSDL-700',
    categories: ['축복'],
    name: '렌의 마술사탑',
    x: 0.82461,
    y: 0.115522,
  },
  {
    id: 'LSDL-704',
    categories: ['축복'],
    name: '별 부수는 라단',
    x: 0.793043,
    y: 0.591956,
  },
  {
    id: 'LSDL-706',
    categories: ['축복'],
    name: '적사자성 광장',
    x: 0.729069,
    y: 0.821438,
  },
  {
    id: 'LSDL-707',
    categories: ['축복'],
    name: '광장 앞 방',
    x: 0.730982,
    y: 0.858166,
  },
  {
    id: 'LSDL-708',
    categories: ['축복'],
    name: '불락 대교',
    x: 0.538384,
    y: 0.886794,
  },
  {
    id: 'LSDL-709',
    categories: ['축복'],
    name: '대용찬 교회',
    x: 0.332307,
    y: 0.783704,
  },
  {
    id: 'LSDL-710',
    categories: ['축복', '던전', '보스'],
    name: '케일리드 지하묘지',
    x: 0.358155,
    y: 0.800682,
    loot: [
      {
        id: 'LSDL-710-1',
        name: '작은 미란다의 뼛가루',
      },
      {
        id: 'LSDL-710-2',
        name: '묘 은방울 꽃 [3]',
        quantity: 2,
      },
      {
        id: 'LSDL-710-3',
        name: '묘 은방울 꽃 [4]',
        quantity: 3,
      },
      {
        id: 'LSDL-710-4',
        name: '묘 은방울 꽃 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-710-5',
        name: '영혼 묘 은방울 꽃 [3]',
        quantity: 1,
      },
      {
        id: 'LSDL-710-6',
        name: '영혼 묘 은방울 꽃 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-710-7',
        name: '묘의 보라',
      },
      {
        id: 'LSDL-710-8',
        name: '뿌리기름',
      },
      {
        id: 'LSDL-710-9',
        name: '부패 권속의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-711',
    categories: ['축복'],
    name: '케일리드 가도 남쪽',
    x: 0.271356,
    y: 0.665934,
  },
  {
    id: 'LSDL-712',
    categories: ['축복'],
    name: '케일리드 북쪽 변두리',
    x: 0.270918,
    y: 0.524588,
  },
  {
    id: 'LSDL-713',
    categories: ['축복'],
    name: '에오니아 늪가',
    x: 0.326805,
    y: 0.56815,
  },
  {
    id: 'LSDL-714',
    categories: ['축복'],
    name: '에오니아 중심',
    x: 0.436429,
    y: 0.52738,
  },
  {
    id: 'LSDL-715',
    categories: ['축복'],
    name: '에오니아 늪 심부',
    x: 0.418723,
    y: 0.490652,
  },
  {
    id: 'LSDL-716',
    categories: ['축복'],
    name: '에오니아 늪 남쪽',
    x: 0.446885,
    y: 0.660108,
  },
  {
    id: 'LSDL-717',
    categories: ['축복'],
    name: '케일리드 신수탑 중턱',
    x: 0.47439,
    y: 0.126165,
  },
  {
    id: 'LSDL-718',
    categories: ['축복'],
    name: '케일리드 신수탑 지하',
    x: 0.489108,
    y: 0.142626,
  },
  {
    id: 'LSDL-836',
    categories: ['축복'],
    name: '부패병의 교회',
    x: 0.572083,
    y: 0.486589,
  },
  {
    id: 'LSDL-838',
    categories: ['축복', '던전', '보스'],
    name: '용총 동굴',
    x: 0.686916,
    y: 0.21406,
    loot: [
      {
        id: 'LSDL-838-1',
        name: '큰 산양 탈리스만',
      },
      {
        id: 'LSDL-838-2',
        name: '황금의 룬 [8]',
      },
      {
        id: 'LSDL-838-3',
        name: '황금의 룬 [12]',
      },
      {
        id: 'LSDL-838-4',
        name: '따스함의 돌',
      },
      {
        id: 'LSDL-838-5',
        name: '결정의 나무 싹',
      },
      {
        id: 'LSDL-838-6',
        name: '동굴 이끼',
      },
      {
        id: 'LSDL-838-7',
        name: '동굴이끼 꽃눈',
      },
      {
        id: 'LSDL-838-8',
        name: '동굴이끼 결정',
      },
      {
        id: 'LSDL-838-9',
        name: '은색 반딧불',
      },
      {
        id: 'LSDL-838-10',
        name: '로어열매',
      },
      {
        id: 'LSDL-838-11',
        name: '낙엽 꽃',
      },
      {
        id: 'LSDL-838-12',
        name: '염룡 표식의 탈리스만 +2',
      },
    ],
  },
  {
    id: 'LSDL-848',
    categories: ['축복'],
    name: '게르 갱도 뒷문',
    x: 0.066243,
    y: 0.353802,
  },
  {
    id: 'LSDL-851',
    categories: ['축복'],
    name: '부패를 향한 노대',
    x: 0.140036,
    y: 0.288984,
  },
  {
    id: 'LSDL-855',
    categories: ['축복'],
    name: '키렘 폐허',
    x: 0.262429,
    y: 0.330503,
  },
  {
    id: 'LSDL-862',
    categories: ['축복', '던전', '보스'],
    name: '감옥 동굴',
    x: 0.169802,
    y: 0.542126,
    loot: [
      {
        id: 'LSDL-862-1',
        name: '멍에 방패',
      },
      {
        id: 'LSDL-862-2',
        name: '협차',
      },
      {
        id: 'LSDL-862-3',
        name: '색 잃은 단석 [5]',
      },
      {
        id: 'LSDL-862-4',
        name: '석검 열쇠',
      },
      {
        id: 'LSDL-862-5',
        name: '룬의 호',
      },
      {
        id: 'LSDL-862-6',
        name: '황금의 룬 [2]',
        quantity: 3,
      },
      {
        id: 'LSDL-862-7',
        name: '황금의 룬 [4]',
        quantity: 3,
      },
      {
        id: 'LSDL-862-8',
        name: '황금의 룬 [5]',
      },
      {
        id: 'LSDL-862-9',
        name: '거북 목 고기',
        quantity: 2,
      },
      {
        id: 'LSDL-862-10',
        name: '옛 엄니',
        quantity: 5,
      },
      {
        id: 'LSDL-862-11',
        name: '무지개석',
        quantity: 1,
      },
      {
        id: 'LSDL-862-12',
        name: '부패한 망자의 뼛가루',
      },
      {
        id: 'LSDL-862-13',
        name: '에오히드의 보검',
      },
    ],
  },
  {
    id: 'LSDL-875',
    categories: ['축복'],
    name: '시프라강 안쪽 우물',
    x: 0.37974,
    y: 0.278902,
  },
  {
    id: 'LSDL-876',
    categories: ['축복'],
    name: '게르 요새 북쪽',
    x: 0.139162,
    y: 0.45152,
  },
  {
    id: 'LSDL-878',
    categories: ['축복'],
    name: '제3 마리카 교회',
    x: 0.029921,
    y: 0.507871,
  },
  {
    id: 'LSDL-935',
    categories: ['장소'],
    name: '이름 없는 마커',
    x: 0.037662,
    y: 0.256534,
  },
  {
    id: 'LSDL-936',
    categories: ['축복'],
    name: '그을림 교회',
    x: 0.037662,
    y: 0.256534,
    loot: [
      {
        id: 'LSDL-936-1',
        name: '방랑 전사의 제작서 [14]',
      },
      {
        id: 'LSDL-936-2',
        name: '선교사의 제작서 [3]',
      },
    ],
  },
  {
    id: 'LSDL-1000',
    categories: ['NPC'],
    name: '알렉산더[2]',
    x: 0.074094,
    y: 0.359626,
  },
  {
    id: 'LSDL-1001',
    categories: ['NPC'],
    name: '알렉산더, 반 늑대 블라이드, 손가락 무녀 사로리나',
    x: 0.723331,
    y: 0.813959,
  },
  {
    id: 'LSDL-1002',
    categories: ['NPC'],
    name: '알렉산더[4]',
    x: 0.803882,
    y: 0.60844,
  },
  {
    id: 'LSDL-1030',
    categories: ['장소'],
    name: '케일리드 신수탑',
    x: 0.481968,
    y: 0.138006,
    loot: [
      {
        id: 'LSDL-1030-1',
        name: '석검 열쇠',
        quantity: 1,
      },
      {
        id: 'LSDL-1030-2',
        name: '황금의 룬 [12]',
        quantity: 1,
      },
      {
        id: 'LSDL-1030-3',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-1030-4',
        name: '신의 살갗의 사도 후드',
      },
      {
        id: 'LSDL-1030-5',
        name: '신의 살갗의 사도 로브',
      },
      {
        id: 'LSDL-1030-6',
        name: '사도의 팔찌',
      },
      {
        id: 'LSDL-1030-7',
        name: '사도의 바지',
      },
      {
        id: 'LSDL-1030-8',
        name: '신 사냥의 검',
      },
    ],
  },
  {
    id: 'LSDL-1031',
    categories: ['장소'],
    name: '이름 없는 마커',
    x: 0.290973,
    y: 0.169235,
  },
  {
    id: 'LSDL-1032',
    categories: ['축복', '던전', '보스'],
    name: '작은 황금 나무 지하 묘지',
    x: 0.178271,
    y: 0.222963,
    loot: [
      {
        id: 'LSDL-1032-1',
        name: '임프머리(늑대)',
      },
      {
        id: 'LSDL-1032-2',
        name: '호박 광병의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-1033',
    categories: ['장소'],
    name: '마술도시 사리아',
    x: 0.536325,
    y: 0.435183,
  },
  {
    id: 'LSDL-1034',
    categories: ['장소'],
    name: '대용찬 교회',
    x: 0.340796,
    y: 0.777364,
  },
  {
    id: 'LSDL-1035',
    categories: ['장소'],
    name: '파로스 요새',
    x: 0.655293,
    y: 0.32302,
    loot: [
      {
        id: 'LSDL-1035-1',
        name: '덱타스의 부절(우)',
      },
      {
        id: 'LSDL-1035-2',
        name: '라다곤의 문드러진 각인',
      },
      {
        id: 'LSDL-1035-3',
        name: '황금의 룬 [4]',
        quantity: 3,
      },
      {
        id: 'LSDL-1035-4',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-1035-5',
        name: '황금의 룬 [9]',
        quantity: 3,
      },
      {
        id: 'LSDL-1035-6',
        name: '황금의 룬 [12]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1053',
    categories: ['NPC'],
    name: '케네스 하이트[2]',
    x: 0.080927,
    y: 0.830085,
  },
  {
    id: 'LSDL-1069',
    categories: ['무기'],
    name: '그레이트 소드',
    x: 0.226088,
    y: 0.259218,
    loot: [
      {
        id: 'LSDL-1069-1',
        name: '그레이트 소드',
      },
    ],
  },
  {
    id: 'LSDL-1070',
    categories: ['기도'],
    name: '기도 : 불이여 회오리쳐라',
    x: 0.210714,
    y: 0.246796,
    loot: [
      {
        id: 'LSDL-1070-1',
        name: '불이여 회오리쳐라',
      },
    ],
  },
  {
    id: 'LSDL-1073',
    categories: ['색단석'],
    name: '색 잃은 단석 [8]',
    x: 0.443824,
    y: 0.193733,
    loot: [
      {
        id: 'LSDL-1073-1',
        name: '색 잃은 단석 [8]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1074',
    categories: ['중요아이템'],
    name: '의자에 앉은 시체들 (케일리드 신수 탑 앞)',
    x: 0.466302,
    y: 0.15176,
    loot: [
      {
        id: 'LSDL-1074-1',
        name: '색 잃은 단석 [9]',
        quantity: 1,
      },
      {
        id: 'LSDL-1074-2',
        name: '아르테리아의 잎',
        quantity: 2,
      },
      {
        id: 'LSDL-1074-3',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-1074-4',
        name: '용상 기름',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1076',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.522663,
    y: 0.406299,
    loot: [
      {
        id: 'LSDL-1076-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1079',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.4259,
    y: 0.748802,
    loot: [
      {
        id: 'LSDL-1079-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1106',
    categories: ['기도'],
    name: '기도 : 독 칼날',
    x: 0.455482,
    y: 0.413349,
    loot: [
      {
        id: 'LSDL-1106-1',
        name: '독 칼날',
      },
    ],
  },
  {
    id: 'LSDL-1107',
    categories: ['영체'],
    name: '썩은 들개의 뼛가루',
    x: 0.49421,
    y: 0.415691,
    loot: [
      {
        id: 'LSDL-1107-1',
        name: '썩은 들개의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-1137',
    categories: ['보스'],
    name: '별 부수는 라단',
    x: 0.811842,
    y: 0.566812,
    loot: [
      {
        id: 'LSDL-1137-1',
        name: '라단의 거대한 룬',
      },
      {
        id: 'LSDL-1137-2',
        name: '별부수기의 추억',
      },
    ],
  },
  {
    id: 'LSDL-1151',
    categories: ['지도조각'],
    name: '지도 조각 (케일리드)',
    x: 0.39885,
    y: 0.701801,
    loot: [
      {
        id: 'LSDL-1151-1',
        name: '지도 조각 (케일리드)',
      },
    ],
  },
  {
    id: 'LSDL-1152',
    categories: ['지도조각'],
    name: '지도 조각 (용총)',
    x: 0.42732,
    y: 0.226979,
    loot: [
      {
        id: 'LSDL-1152-1',
        name: '지도 조각 (용총)',
      },
    ],
  },
  {
    id: 'LSDL-1188',
    categories: ['성배병'],
    name: '성배의 물방울',
    x: 0.029976,
    y: 0.523151,
    loot: [
      {
        id: 'LSDL-1188-1',
        name: '성배의 물방울',
      },
    ],
  },
  {
    id: 'LSDL-1195',
    categories: ['성배병'],
    name: '성배의 물방울',
    x: 0.572757,
    y: 0.502041,
    loot: [
      {
        id: 'LSDL-1195-1',
        name: '성배의 물방울',
      },
    ],
  },
  {
    id: 'LSDL-1240',
    categories: [],
    name: '전송문 : 짐승의 신전',
    x: 0.049813,
    y: 0.473808,
  },
  {
    id: 'LSDL-1244',
    categories: ['암령'],
    name: '빛바랜 자를 먹는 아나스타시아[1]',
    x: 0.038701,
    y: 0.276349,
    loot: [
      {
        id: 'LSDL-1244-1',
        name: '신성한 전갈',
      },
    ],
  },
  {
    id: 'LSDL-1257',
    categories: ['전회'],
    name: '전회 : 신성한 칼날',
    x: 0.033109,
    y: 0.471444,
    loot: [
      {
        id: 'LSDL-1257-1',
        name: '신성한 칼날',
      },
    ],
  },
  {
    id: 'LSDL-1261',
    categories: ['장소'],
    name: '시프라 강 우물',
    x: 0.003508,
    y: 0.685688,
  },
  {
    id: 'LSDL-1267',
    categories: ['NPC'],
    name: '은둔 상인 [3]',
    x: 0.284434,
    y: 0.160832,
  },
  {
    id: 'LSDL-1268',
    categories: ['기도'],
    name: '대노룡 그레이오르',
    x: 0.596656,
    y: 0.320334,
    loot: [
      {
        id: 'LSDL-1268-1',
        name: '용의 심장',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-1313',
    categories: [],
    name: '영기류',
    x: 0.036898,
    y: 0.442001,
  },
  {
    id: 'LSDL-1314',
    categories: [],
    name: '영기류',
    x: 0.036041,
    y: 0.395666,
  },
  {
    id: 'LSDL-1320',
    categories: ['암령'],
    name: '큰 항아리 기사의 붉은 소환 사인',
    x: 0.199037,
    y: 0.054732,
  },
  {
    id: 'LSDL-1358',
    categories: [],
    name: '트리나의 수련',
    x: 0.043073,
    y: 0.398589,
    loot: [
      {
        id: 'LSDL-1358-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1433',
    categories: ['전회'],
    name: '전회: 적사자의 화염',
    x: 0.169164,
    y: 0.437529,
    loot: [
      {
        id: 'LSDL-1433-1',
        name: '적사자의 화염',
      },
    ],
  },
  {
    id: 'LSDL-1435',
    categories: ['기도'],
    name: '기도: 불이여, 힘을!',
    x: 0.153225,
    y: 0.569828,
    loot: [
      {
        id: 'LSDL-1435-1',
        name: '불이여, 힘을!',
      },
    ],
  },
  {
    id: 'LSDL-1438',
    categories: ['장소'],
    name: '게르 요새',
    x: 0.143552,
    y: 0.557406,
    loot: [
      {
        id: 'LSDL-1438-1',
        name: '사자베기',
      },
      {
        id: 'LSDL-1438-2',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-1438-3',
        name: '따스함의 돌',
        quantity: 2,
      },
      {
        id: 'LSDL-1438-4',
        name: '별 부수기의 전승',
      },
      {
        id: 'LSDL-1438-5',
        name: '버섯',
        quantity: 10,
      },
      {
        id: 'LSDL-1438-6',
        name: '카타르',
      },
    ],
  },
  {
    id: 'LSDL-1439',
    categories: [],
    name: '전송문 : 적사자성',
    x: 0.142696,
    y: 0.581261,
  },
  {
    id: 'LSDL-1442',
    categories: ['축복', '던전', '보스'],
    name: '폐기 동굴',
    x: 0.38832,
    y: 0.380447,
    loot: [
      {
        id: 'LSDL-1442-1',
        name: '뱀 활',
      },
      {
        id: 'LSDL-1442-2',
        name: '독사의 이빨',
      },
      {
        id: 'LSDL-1442-3',
        name: '에오니아 나비',
        quantity: 15,
      },
      {
        id: 'LSDL-1442-4',
        name: '불기름',
        quantity: 1,
      },
      {
        id: 'LSDL-1442-5',
        name: '용상기름',
        quantity: 1,
      },
      {
        id: 'LSDL-1442-6',
        name: '독화살',
        quantity: 5,
      },
      {
        id: 'LSDL-1442-7',
        name: '금 스카라베',
      },
    ],
  },
  {
    id: 'LSDL-1443',
    categories: ['기타'],
    name: '나무 줄기',
    x: 0.371816,
    y: 0.397231,
  },
  {
    id: 'LSDL-1444',
    categories: [],
    name: '영기류',
    x: 0.688027,
    y: 0.25283,
  },
  {
    id: 'LSDL-1446',
    categories: [],
    name: '영기류',
    x: 0.8386,
    y: 0.150424,
  },
  {
    id: 'LSDL-1456',
    categories: ['NPC'],
    name: '밀리센트 [1]',
    x: 0.561937,
    y: 0.492929,
  },
  {
    id: 'LSDL-1457',
    categories: ['NPC'],
    name: '고리',
    x: 0.514976,
    y: 0.542638,
  },
  {
    id: 'LSDL-1458',
    categories: ['보스'],
    name: '비룡 그레일',
    x: 0.756336,
    y: 0.040606,
    loot: [
      {
        id: 'LSDL-1458-1',
        name: '용의 심장',
      },
    ],
  },
  {
    id: 'LSDL-1571',
    categories: ['보스'],
    name: '방울 사냥꾼 - 용총',
    x: 0.278459,
    y: 0.171255,
    loot: [
      {
        id: 'LSDL-1571-1',
        name: '중력 장사꾼의 방울',
      },
    ],
  },
  {
    id: 'LSDL-1576',
    categories: ['장소'],
    name: '케일리드 콜로세움 마리카 동상',
    x: 0.199328,
    y: 0.033563,
  },
  {
    id: 'LSDL-1672',
    categories: ['보스'],
    name: '혼종 기사 & 도가니의 기사(검)',
    x: 0.727594,
    y: 0.83343,
    loot: [
      {
        id: 'LSDL-1672-1',
        name: '유적의 대검',
      },
    ],
  },
  {
    id: 'LSDL-1674',
    categories: ['그릇'],
    name: '금 간 항아리 - 케일리드 서쪽 작은 황금 나무',
    x: 0.14581,
    y: 0.174931,
    loot: [
      {
        id: 'LSDL-1674-1',
        name: '금 간 항아리 - 케일리드 서쪽 작은 황금 나무',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1677',
    categories: ['NPC'],
    name: '방랑 민족 상인 [10]',
    x: 0.417922,
    y: 0.700447,
  },
  {
    id: 'LSDL-1679',
    categories: [],
    name: '영기류',
    x: 0.577875,
    y: 0.36467,
  },
  {
    id: 'LSDL-1694',
    categories: ['중요아이템'],
    name: '불탄 숫돌 칼날',
    x: 0.694295,
    y: 0.844175,
    loot: [
      {
        id: 'LSDL-1694-1',
        name: '불탄 숫돌 칼날',
      },
    ],
  },
  {
    id: 'LSDL-1696',
    categories: ['장소'],
    name: '적사자성',
    x: 0.664967,
    y: 0.782045,
  },
  {
    id: 'LSDL-1703',
    categories: ['NPC'],
    name: '방랑 민족 상인 [9]',
    x: 0.308917,
    y: 0.527854,
  },
  {
    id: 'LSDL-1704',
    categories: ['전회'],
    name: '전회 : 명탈권',
    x: 0.263377,
    y: 0.511414,
    loot: [
      {
        id: 'LSDL-1704-1',
        name: '명탈권',
      },
    ],
  },
  {
    id: 'LSDL-1705',
    categories: ['전회'],
    name: '스카라베',
    x: 0.505013,
    y: 0.882131,
    loot: [
      {
        id: 'LSDL-1705-1',
        name: '암석검',
      },
    ],
  },
  {
    id: 'LSDL-1725',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.71364,
    y: 0.77534,
    loot: [
      {
        id: 'LSDL-1725-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-1734',
    categories: ['중요아이템'],
    name: '룬의 호',
    x: 0.1259,
    y: 0.206502,
    loot: [
      {
        id: 'LSDL-1734-1',
        name: '룬의 호',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1735',
    categories: ['보스'],
    name: '부패한 화신',
    x: 0.148105,
    y: 0.201473,
    loot: [
      {
        id: 'LSDL-1735-1',
        name: '샘솟는 초록 결정 물방울',
      },
      {
        id: 'LSDL-1735-2',
        name: '불꽃 두른 깨진 물방울',
      },
    ],
  },
  {
    id: 'LSDL-1740',
    categories: ['무기'],
    name: '압정 벽 방패',
    x: 0.269351,
    y: 0.213893,
    loot: [
      {
        id: 'LSDL-1740-1',
        name: '압정 벽 방패',
      },
    ],
  },
  {
    id: 'LSDL-1741',
    categories: ['전회'],
    name: '전회 : 염격',
    x: 0.713932,
    y: 0.92107,
    loot: [
      {
        id: 'LSDL-1741-1',
        name: '염격',
      },
    ],
  },
  {
    id: 'LSDL-1743',
    categories: ['제작서'],
    name: '무구 장인의 제작서 [4]',
    x: 0.685187,
    y: 0.863324,
    loot: [
      {
        id: 'LSDL-1743-1',
        name: '무구 장인의 제작서 [4]',
      },
    ],
  },
  {
    id: 'LSDL-1744',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.729871,
    y: 0.782045,
    loot: [
      {
        id: 'LSDL-1744-1',
        name: '색 잃은 단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-1745',
    categories: ['전회'],
    name: '전회 : 허공에 쏘기',
    x: 0.266509,
    y: 0.169557,
    loot: [
      {
        id: 'LSDL-1745-1',
        name: '허공에 쏘기',
      },
    ],
  },
  {
    id: 'LSDL-1746',
    categories: ['암령'],
    name: '밀리센트 침입',
    x: 0.370396,
    y: 0.514099,
    loot: [
      {
        id: 'LSDL-1746-1',
        name: '성혈 나무의 싹',
        quantity: 5,
      },
      {
        id: 'LSDL-1746-2',
        name: '황금의 룬 [3]',
        quantity: 1,
      },
      {
        id: 'LSDL-1746-3',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-1746-4',
        name: '황금의 룬 [10]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1771',
    categories: ['색단석'],
    name: '색 잃은 단석 [4]',
    x: 0.697993,
    y: 0.86399,
    loot: [
      {
        id: 'LSDL-1771-1',
        name: '색 잃은 단석 [4]',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1865',
    categories: ['보스'],
    name: '노장 오닐',
    x: 0.451785,
    y: 0.546657,
    loot: [
      {
        id: 'LSDL-1865-1',
        name: '무구한 금의 침',
      },
      {
        id: 'LSDL-1865-2',
        name: '노장의 군기',
      },
    ],
  },
  {
    id: 'LSDL-1866',
    categories: ['NPC'],
    name: '소환 : 수양딸 폴리아나',
    x: 0.448378,
    y: 0.533892,
  },
  {
    id: 'LSDL-1867',
    categories: ['중요아이템'],
    name: '휘석검 열쇠',
    x: 0.528638,
    y: 0.42577,
    loot: [
      {
        id: 'LSDL-1867-1',
        name: '휘석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-1868',
    categories: ['마술'],
    name: '마술 :  밤의 혜성',
    x: 0.508709,
    y: 0.433829,
    loot: [
      {
        id: 'LSDL-1868-1',
        name: '밤의 혜성',
      },
    ],
  },
  {
    id: 'LSDL-1869',
    categories: ['전회'],
    name: '전회 : 2연속 베기',
    x: 0.488799,
    y: 0.431487,
    loot: [
      {
        id: 'LSDL-1869-1',
        name: '2연속 베기',
      },
    ],
  },
  {
    id: 'LSDL-1870',
    categories: ['무기'],
    name: '상실의 지팡이',
    x: 0.504155,
    y: 0.409652,
    loot: [
      {
        id: 'LSDL-1870-1',
        name: '상실의 지팡이',
      },
    ],
  },
  {
    id: 'LSDL-1871',
    categories: ['보스'],
    name: '녹스의 검사 & 녹스의 승려',
    x: 0.491914,
    y: 0.351218,
    loot: [
      {
        id: 'LSDL-1871-1',
        name: '녹스의 유체검',
      },
    ],
  },
  {
    id: 'LSDL-1872',
    categories: ['무기'],
    name: '루사트의 휘석 지팡이',
    x: 0.492206,
    y: 0.34318,
    loot: [
      {
        id: 'LSDL-1872-1',
        name: '루사트의 휘석 지팡이',
      },
    ],
  },
  {
    id: 'LSDL-1873',
    categories: ['기타'],
    name: '그림 : 붉은 사자',
    x: 0.512426,
    y: 0.451301,
  },
  {
    id: 'LSDL-1874',
    categories: ['전회'],
    name: '전회 : 애로우 레인',
    x: 0.708811,
    y: 0.25384,
    loot: [
      {
        id: 'LSDL-1874-1',
        name: '애로우 레인',
      },
    ],
  },
  {
    id: 'LSDL-1875',
    categories: ['보스'],
    name: '부패한 화신',
    x: 0.68034,
    y: 0.233703,
    loot: [
      {
        id: 'LSDL-1875-1',
        name: '진주색 굳은 물방울',
      },
      {
        id: 'LSDL-1875-2',
        name: '바위 가시 깨진 물방울',
      },
    ],
  },
  {
    id: 'LSDL-1930',
    categories: [],
    name: '석관 묘지 ( 렌의 마술사탑 )',
    x: 0.813262,
    y: 0.145051,
    loot: [
      {
        id: 'LSDL-1930-1',
        name: '황금의 룬 [1]',
      },
      {
        id: 'LSDL-1930-2',
        name: '황금의 룬 [3]',
      },
      {
        id: 'LSDL-1930-3',
        name: '황금의 룬 [6]',
      },
      {
        id: 'LSDL-1930-4',
        name: '황금의 룬 [8]',
      },
    ],
  },
  {
    id: 'LSDL-1932',
    categories: [],
    name: '석관 묘지 ( 게르 갱도 )',
    x: 0.105972,
    y: 0.334116,
    loot: [
      {
        id: 'LSDL-1932-1',
        name: '황금의 룬 [1]',
      },
      {
        id: 'LSDL-1932-2',
        name: '황금의 룬 [2]',
      },
      {
        id: 'LSDL-1932-3',
        name: '황금의 룬 [3]',
      },
    ],
  },
  {
    id: 'LSDL-1935',
    categories: ['보스'],
    name: '밤 기병 - 렌의 마술사탑',
    x: 0.813553,
    y: 0.044968,
    loot: [
      {
        id: 'LSDL-1935-1',
        name: '사냥개의 스텝',
      },
    ],
  },
  {
    id: 'LSDL-1936',
    categories: ['기도'],
    name: '기도 : 짐승의 강건',
    x: 0.751218,
    y: 0.113826,
    loot: [
      {
        id: 'LSDL-1936-1',
        name: '짐승의 강건',
      },
    ],
  },
  {
    id: 'LSDL-1938',
    categories: ['NPC'],
    name: '반 늑대 블라이드',
    x: 0.789637,
    y: 0.582586,
  },
  {
    id: 'LSDL-1939',
    categories: ['보스'],
    name: '밤 기병 - 케일리드 남쪽',
    x: 0.377792,
    y: 0.697095,
    loot: [
      {
        id: 'LSDL-1939-1',
        name: '독나방은 두 번 춤춘다',
      },
    ],
  },
  {
    id: 'LSDL-2042',
    categories: ['중요아이템'],
    name: '별빛 조각',
    x: 0.602649,
    y: 0.471781,
    loot: [
      {
        id: 'LSDL-2042-1',
        name: '별빛 조각',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2230',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.054167,
    y: 0.859635,
    loot: [
      {
        id: 'LSDL-2230-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-2246',
    categories: ['보스'],
    name: '죽음 의례의 새 - 사리아 남쪽',
    x: 0.503027,
    y: 0.657142,
    loot: [
      {
        id: 'LSDL-2246-1',
        name: '죽음부지깽이',
      },
    ],
  },
  {
    id: 'LSDL-2247',
    categories: ['색단석'],
    name: '색 잃은 단석 [4]',
    x: 0.39231,
    y: 0.81061,
    loot: [
      {
        id: 'LSDL-2247-1',
        name: '색 잃은 단석 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2248',
    categories: ['제작서'],
    name: '고룡 신도의 제작서 [3]',
    x: 0.332817,
    y: 0.772314,
    loot: [
      {
        id: 'LSDL-2248-1',
        name: '고룡 신도의 제작서 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2249',
    categories: ['물방울 유생'],
    name: '물방울 유생',
    x: 0.251136,
    y: 0.746139,
    loot: [
      {
        id: 'LSDL-2249-1',
        name: '물방울 유생',
      },
    ],
  },
  {
    id: 'LSDL-2250',
    categories: ['보스'],
    name: '썩어가는 엑디키스',
    x: 0.314036,
    y: 0.712548,
    loot: [
      {
        id: 'LSDL-2250-1',
        name: '용의 심장',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2251',
    categories: ['중요아이템'],
    name: '별빛 조각',
    x: 0.233194,
    y: 0.688371,
    loot: [
      {
        id: 'LSDL-2251-1',
        name: '별빛 조각',
      },
    ],
  },
  {
    id: 'LSDL-2252',
    categories: ['탈리스만'],
    name: '튼튼한 화살의 탈리스만',
    x: 0.528074,
    y: 0.886815,
    loot: [
      {
        id: 'LSDL-2252-1',
        name: '튼튼한 화살의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-2253',
    categories: ['성배병'],
    name: '바람 결정 물방울',
    x: 0.445537,
    y: 0.715576,
    loot: [
      {
        id: 'LSDL-2253-1',
        name: '바람 결정 물방울',
      },
    ],
  },
  {
    id: 'LSDL-2254',
    categories: ['색단석'],
    name: '사자',
    x: 0.490494,
    y: 0.756538,
    loot: [
      {
        id: 'LSDL-2254-1',
        name: '색 잃은 단석 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2254-2',
        name: '짐승 피',
        quantity: 1,
      },
      {
        id: 'LSDL-2254-3',
        name: '옛 엄니',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2256',
    categories: ['중요아이템'],
    name: '거대 해골 위',
    x: 0.564778,
    y: 0.354913,
    loot: [
      {
        id: 'LSDL-2256-1',
        name: '단석 [7]',
        quantity: 2,
      },
      {
        id: 'LSDL-2256-2',
        name: '단석 [8]',
        quantity: 1,
      },
      {
        id: 'LSDL-2256-3',
        name: '석검 열쇠',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2265',
    categories: [],
    name: '잠알 *2',
    x: 0.244578,
    y: 0.45197,
    loot: [
      {
        id: 'LSDL-2265-1',
        name: '잠알',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2285',
    categories: ['전회'],
    name: '전회 : 성스러운 빛고리',
    x: 0.461184,
    y: 0.529206,
    loot: [
      {
        id: 'LSDL-2285-1',
        name: '성스러운 빛고리',
      },
    ],
  },
  {
    id: 'LSDL-2286',
    categories: [],
    name: '큰 잠자리 머리 파밍 위치 1',
    x: 0.454353,
    y: 0.513088,
  },
  {
    id: 'LSDL-2421',
    categories: [],
    name: '황금의 룬 [9]',
    x: 0.708249,
    y: 0.930139,
    loot: [
      {
        id: 'LSDL-2421-1',
        name: '황금의 룬 [9]',
      },
    ],
  },
  {
    id: 'LSDL-2422',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.698558,
    y: 0.915031,
    loot: [
      {
        id: 'LSDL-2422-1',
        name: '단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2423',
    categories: ['무기'],
    name: '플랑베르주',
    x: 0.734716,
    y: 0.902265,
    loot: [
      {
        id: 'LSDL-2423-1',
        name: '플랑베르주',
      },
    ],
  },
  {
    id: 'LSDL-2424',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.743533,
    y: 0.904951,
    loot: [
      {
        id: 'LSDL-2424-1',
        name: '단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2425',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.727885,
    y: 0.899579,
    loot: [
      {
        id: 'LSDL-2425-1',
        name: '단석 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2426',
    categories: [],
    name: '적사자성 전송문 출발지',
    x: 0.612323,
    y: 0.876069,
  },
  {
    id: 'LSDL-2427',
    categories: [],
    name: '적사자성 전송문 도착지',
    x: 0.723896,
    y: 0.892186,
  },
  {
    id: 'LSDL-2428',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.719342,
    y: 0.883461,
    loot: [
      {
        id: 'LSDL-2428-1',
        name: '단석 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2429',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.735846,
    y: 0.851568,
    loot: [
      {
        id: 'LSDL-2429-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2430',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.661269,
    y: 0.870696,
    loot: [
      {
        id: 'LSDL-2430-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2431',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.668683,
    y: 0.863647,
    loot: [
      {
        id: 'LSDL-2431-1',
        name: '단석 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2432',
    categories: ['제작서'],
    name: '무구 장인의 제작서 [5]',
    x: 0.697428,
    y: 0.906972,
    loot: [
      {
        id: 'LSDL-2432-1',
        name: '무구 장인의 제작서 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2433',
    categories: [],
    name: '별 부수는 라단에게 가는 전송문',
    x: 0.727593,
    y: 0.725308,
  },
  {
    id: 'LSDL-2434',
    categories: [],
    name: '황금의 룬',
    x: 0.258532,
    y: 0.746805,
    loot: [
      {
        id: 'LSDL-2434-1',
        name: '황금의 룬 [1]',
        quantity: 2,
      },
      {
        id: 'LSDL-2434-2',
        name: '황금의 룬 [2]',
      },
      {
        id: 'LSDL-2434-3',
        name: '황금의 룬 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2435',
    categories: [],
    name: '황금의 룬 [3], [4]',
    x: 0.33482,
    y: 0.632966,
    loot: [
      {
        id: 'LSDL-2435-1',
        name: '황금의 룬 [3]',
      },
      {
        id: 'LSDL-2435-2',
        name: '황금의 룬 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2436',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.62542,
    y: 0.838137,
    loot: [
      {
        id: 'LSDL-2436-1',
        name: '아르테리아의 잎',
      },
    ],
  },
  {
    id: 'LSDL-2489',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.370669,
    y: 0.342172,
    loot: [
      {
        id: 'LSDL-2489-1',
        name: '색 잃은 단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2490',
    categories: [],
    name: '휘석 반딧불',
    x: 0.367535,
    y: 0.335445,
    loot: [
      {
        id: 'LSDL-2490-1',
        name: '휘석 반딧불',
      },
    ],
  },
  {
    id: 'LSDL-2491',
    categories: [],
    name: '조약돌',
    x: 0.275034,
    y: 0.225649,
    loot: [
      {
        id: 'LSDL-2491-1',
        name: '조약돌',
        quantity: 12,
      },
    ],
  },
  {
    id: 'LSDL-2896',
    categories: [],
    name: '미켈라의 수련',
    x: 0.657861,
    y: 0.226977,
    loot: [
      {
        id: 'LSDL-2896-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2897',
    categories: [],
    name: '미켈라의 수련',
    x: 0.64562,
    y: 0.240752,
    loot: [
      {
        id: 'LSDL-2897-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2898',
    categories: [],
    name: '미켈라의 수련',
    x: 0.639937,
    y: 0.22429,
    loot: [
      {
        id: 'LSDL-2898-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2899',
    categories: [],
    name: '미켈라의 수련',
    x: 0.613178,
    y: 0.232027,
    loot: [
      {
        id: 'LSDL-2899-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2900',
    categories: [],
    name: '조약돌',
    x: 0.461184,
    y: 0.255519,
    loot: [
      {
        id: 'LSDL-2900-1',
        name: '조약돌',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2901',
    categories: [],
    name: '황금의 룬 [9]',
    x: 0.475137,
    y: 0.255863,
    loot: [
      {
        id: 'LSDL-2901-1',
        name: '황금의 룬 [9]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2902',
    categories: ['중요아이템'],
    name: '룬의 호',
    x: 0.228638,
    y: 0.211207,
    loot: [
      {
        id: 'LSDL-2902-1',
        name: '룬의 호',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2903',
    categories: [],
    name: '연기 나비',
    x: 0.251991,
    y: 0.319328,
    loot: [
      {
        id: 'LSDL-2903-1',
        name: '연기 나비',
      },
    ],
  },
  {
    id: 'LSDL-2904',
    categories: ['색단석'],
    name: '색 잃은 단석 [4]',
    x: 0.210715,
    y: 0.48857,
    loot: [
      {
        id: 'LSDL-2904-1',
        name: '색 잃은 단석 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2905',
    categories: [],
    name: '미켈라의 수련',
    x: 0.218402,
    y: 0.477158,
    loot: [
      {
        id: 'LSDL-2905-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2906',
    categories: [],
    name: '에오니아 나비',
    x: 0.230351,
    y: 0.49261,
    loot: [
      {
        id: 'LSDL-2906-1',
        name: '에오니아 나비',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2907',
    categories: [],
    name: '에오니아나비',
    x: 0.18993,
    y: 0.55674,
    loot: [
      {
        id: 'LSDL-2907-1',
        name: '에오니아나비',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2908',
    categories: [],
    name: '미켈라의 수련',
    x: 0.166887,
    y: 0.563466,
    loot: [
      {
        id: 'LSDL-2908-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2909',
    categories: ['무기'],
    name: '운철도',
    x: 0.202463,
    y: 0.592672,
    loot: [
      {
        id: 'LSDL-2909-1',
        name: '운철도',
      },
    ],
  },
  {
    id: 'LSDL-2910',
    categories: [],
    name: '큰 잠자리 머리',
    x: 0.226089,
    y: 0.590996,
    loot: [
      {
        id: 'LSDL-2910-1',
        name: '큰 잠자리 머리',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-2911',
    categories: ['중요아이템'],
    name: '부패 기름',
    x: 0.224941,
    y: 0.602407,
    loot: [
      {
        id: 'LSDL-2911-1',
        name: '부패 기름',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2912',
    categories: ['중요아이템'],
    name: '아이템',
    x: 0.318025,
    y: 0.512746,
    loot: [
      {
        id: 'LSDL-2912-1',
        name: '운석 지팡이',
      },
      {
        id: 'LSDL-2912-2',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2913',
    categories: ['마술'],
    name: '마술 : 암석탄',
    x: 0.336241,
    y: 0.468754,
    loot: [
      {
        id: 'LSDL-2913-1',
        name: '암석탄',
      },
    ],
  },
  {
    id: 'LSDL-2914',
    categories: ['중요아이템'],
    name: '아이템들',
    x: 0.342489,
    y: 0.493275,
    loot: [
      {
        id: 'LSDL-2914-1',
        name: '에오니아 나비',
        quantity: 1,
      },
      {
        id: 'LSDL-2914-2',
        name: '여행 모자',
      },
      {
        id: 'LSDL-2914-3',
        name: '조향사의 여행복',
      },
      {
        id: 'LSDL-2914-4',
        name: '여행 장갑',
      },
      {
        id: 'LSDL-2914-5',
        name: '여행 바지',
      },
      {
        id: 'LSDL-2914-6',
        name: '조향병',
      },
    ],
  },
  {
    id: 'LSDL-2915',
    categories: [],
    name: '에오니아나비',
    x: 0.364129,
    y: 0.467743,
    loot: [
      {
        id: 'LSDL-2915-1',
        name: '에오니아나비',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2916',
    categories: [],
    name: '에오니아나비',
    x: 0.386335,
    y: 0.486892,
    loot: [
      {
        id: 'LSDL-2916-1',
        name: '에오니아나비',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2917',
    categories: ['전회'],
    name: '전회 : 독 안개',
    x: 0.362709,
    y: 0.597699,
    loot: [
      {
        id: 'LSDL-2917-1',
        name: '독 안개',
      },
    ],
  },
  {
    id: 'LSDL-2918',
    categories: ['중요아이템'],
    name: '이름 없는 마커',
    x: 0.425317,
    y: 0.6202,
    loot: [
      {
        id: 'LSDL-2918-1',
        name: '단석 [4]',
        quantity: 3,
      },
      {
        id: 'LSDL-2918-2',
        name: '성혈의 나무 싹',
        quantity: 1,
      },
      {
        id: 'LSDL-2918-3',
        name: '룬의 호',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2919',
    categories: ['중요아이템'],
    name: '이름 없는 마커',
    x: 0.451512,
    y: 0.567138,
    loot: [
      {
        id: 'LSDL-2919-1',
        name: '색 잃은 단석 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2919-2',
        name: '에오니아 나비',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2922',
    categories: ['보스'],
    name: '전쟁마술사 유그',
    x: 0.406827,
    y: 0.399574,
    loot: [
      {
        id: 'LSDL-2922-1',
        name: '전쟁마술사 유그',
      },
    ],
  },
  {
    id: 'LSDL-2975',
    categories: ['NPC'],
    name: '성주 제렌 [1]',
    x: 0.72191,
    y: 0.804223,
  },
  {
    id: 'LSDL-2976',
    categories: ['NPC'],
    name: '성주 제렌 [2]',
    x: 0.720198,
    y: 0.787761,
  },
  {
    id: 'LSDL-3019',
    categories: ['암령'],
    name: '☆기사 레오티엘',
    x: 0.804154,
    y: 0.350226,
  },
  {
    id: 'LSDL-3020',
    categories: ['무기'],
    name: '☆갈대의 대형 도',
    x: 0.632814,
    y: 0.270303,
  },
];

// LSDL base-game map, checked 2026-11-21; patch unspecified.
// Source, terrain alignment and description review: reference-data/maps/deeproot-depths/.
// Regenerate: node reference-data/maps/generate.mjs deeproot-depths.
const DEEPROOT_DEPTHS_MARKERS = [
  {
    id: 'LSDL-271',
    categories: ['장소'],
    name: '항아리 마을',
    x: 0.647988,
    y: 0.360791,
    loot: [
      {
        id: 'LSDL-271-1',
        name: '아르테리아의 잎',
        quantity: 2,
      },
      {
        id: 'LSDL-271-2',
        name: '미켈라의 수련',
        quantity: 2,
      },
      {
        id: 'LSDL-271-3',
        name: '트리나의 수련',
        quantity: 2,
      },
      {
        id: 'LSDL-271-4',
        name: '이엘로의 눈동자',
        quantity: 2,
      },
      {
        id: 'LSDL-271-5',
        name: '산 항아리 파편',
        quantity: 1,
      },
      {
        id: 'LSDL-271-6',
        name: '단석 [3]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-272',
    categories: ['장소'],
    name: '리에니에 신수탑',
    x: 0.871921,
    y: 0.214499,
    loot: [
      {
        id: 'LSDL-272-1',
        name: '죽음의 주흔',
      },
      {
        id: 'LSDL-272-2',
        name: '별 보는 소녀의 전승',
      },
    ],
  },
  {
    id: 'LSDL-583',
    categories: ['축복'],
    name: '서원 입구',
    x: 0.582893,
    y: 0.218537,
  },
  {
    id: 'LSDL-584',
    categories: ['축복'],
    name: '리에니에 신수탑 교량',
    x: 0.626784,
    y: 0.280144,
  },
  {
    id: 'LSDL-586',
    categories: ['축복'],
    name: '리에니에 신수탑',
    x: 0.892821,
    y: 0.207995,
  },
  {
    id: 'LSDL-985',
    categories: ['축복'],
    name: '대폭포 정상',
    x: 0.552955,
    y: 0.717319,
  },
  {
    id: 'LSDL-986',
    categories: ['축복'],
    name: '깊은 뿌리 밑바닥',
    x: 0.264378,
    y: 0.699647,
  },
  {
    id: 'LSDL-988',
    categories: ['축복'],
    name: '뿌리 너머',
    x: 0.353443,
    y: 0.41212,
  },
  {
    id: 'LSDL-989',
    categories: ['축복'],
    name: '죽음의 왕자의 자리',
    x: 0.40902,
    y: 0.232802,
  },
  {
    id: 'LSDL-1142',
    categories: ['보스'],
    name: '사룡 포르삭스',
    x: 0.382657,
    y: 0.270804,
    loot: [
      {
        id: 'LSDL-1142-1',
        name: '사룡의 추억',
      },
    ],
  },
  {
    id: 'LSDL-1143',
    categories: ['보스'],
    name: '도가니의 기사 실루리아',
    x: 0.086955,
    y: 0.37887,
    loot: [
      {
        id: 'LSDL-1143-1',
        name: '실루리아의 나무창',
      },
    ],
  },
  {
    id: 'LSDL-1165',
    categories: ['지도조각'],
    name: '지도 조각 (깊은 뿌리 바닥)',
    x: 0.297866,
    y: 0.488123,
    loot: [
      {
        id: 'LSDL-1165-1',
        name: '지도 조각 (깊은 뿌리 바닥)',
      },
    ],
  },
  {
    id: 'LSDL-1390',
    categories: ['일반단석'],
    name: '단석 [3]',
    x: 0.574033,
    y: 0.392162,
    loot: [
      {
        id: 'LSDL-1390-1',
        name: '단석 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1394',
    categories: ['기도서'],
    name: '용 신앙의 기도서',
    x: 0.525023,
    y: 0.30319,
  },
  {
    id: 'LSDL-1395',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.524618,
    y: 0.133901,
    loot: [
      {
        id: 'LSDL-1395-1',
        name: '단석 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1405',
    categories: ['색단석'],
    name: '색 잃은 단석 [3]',
    x: 0.559285,
    y: 0.177025,
    loot: [
      {
        id: 'LSDL-1405-1',
        name: '색 잃은 단석 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1409',
    categories: ['축복'],
    name: '뿌리를 향한 절벽',
    x: 0.539417,
    y: 0.589064,
  },
  {
    id: 'LSDL-1475',
    categories: ['장소'],
    name: '카리아의 서원',
    x: 0.597937,
    y: 0.287245,
    loot: [
      {
        id: 'LSDL-1475-1',
        name: '카리아의 휘석 지팡이',
      },
      {
        id: 'LSDL-1475-2',
        name: '쏟아지는 마력',
      },
      {
        id: 'LSDL-1475-3',
        name: '푸른 종자의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-1624',
    categories: ['그릇'],
    name: '의식 항아리 - 항아리마을 1',
    x: 0.650934,
    y: 0.382845,
    loot: [
      {
        id: 'LSDL-1624-1',
        name: '의식 항아리 - 항아리마을 1',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1625',
    categories: ['그릇'],
    name: '금 간 항아리 - 항아리마을 3',
    x: 0.653722,
    y: 0.325734,
    loot: [
      {
        id: 'LSDL-1625-1',
        name: '금 간 항아리 - 항아리마을 3',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1626',
    categories: ['그릇'],
    name: '금 간 항아리 - 항아리마을 2',
    x: 0.631011,
    y: 0.323103,
    loot: [
      {
        id: 'LSDL-1626-1',
        name: '금 간 항아리 - 항아리마을 2',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1627',
    categories: ['그릇'],
    name: '의식 항아리 - 항아리마을 2',
    x: 0.625832,
    y: 0.338359,
    loot: [
      {
        id: 'LSDL-1627-1',
        name: '의식 항아리 - 항아리마을 2',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1764',
    categories: ['전회'],
    name: '전회 : 황금의 땅',
    x: 0.538705,
    y: 0.801633,
    loot: [
      {
        id: 'LSDL-1764-1',
        name: '황금의 땅',
      },
    ],
  },
  {
    id: 'LSDL-1765',
    categories: ['무기'],
    name: '화신의 의장',
    x: 0.535141,
    y: 0.761256,
    loot: [
      {
        id: 'LSDL-1765-1',
        name: '화신의 의장',
      },
    ],
  },
  {
    id: 'LSDL-1766',
    categories: ['기도'],
    name: '엘데의 유성',
    x: 0.426835,
    y: 0.621127,
    loot: [
      {
        id: 'LSDL-1766-1',
        name: '엘데의 유성',
      },
    ],
  },
  {
    id: 'LSDL-1770',
    categories: ['보스'],
    name: '피아의 영웅',
    x: 0.402251,
    y: 0.293365,
    loot: [
      {
        id: 'LSDL-1770-1',
        name: '피아의 안개',
      },
    ],
  },
  {
    id: 'LSDL-2122',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.514123,
    y: 0.710787,
    loot: [
      {
        id: 'LSDL-2122-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2123',
    categories: ['중요아이템'],
    name: '룬의 호',
    x: 0.531579,
    y: 0.644877,
    loot: [
      {
        id: 'LSDL-2123-1',
        name: '룬의 호',
      },
    ],
  },
  {
    id: 'LSDL-2124',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.538348,
    y: 0.608658,
    loot: [
      {
        id: 'LSDL-2124-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2125',
    categories: ['색단석'],
    name: '색 잃은 단석 [6]',
    x: 0.456405,
    y: 0.514248,
    loot: [
      {
        id: 'LSDL-2125-1',
        name: '색 잃은 단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2126',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울꽃 [7]',
    x: 0.392633,
    y: 0.599751,
    loot: [
      {
        id: 'LSDL-2126-1',
        name: '영혼 묘 은방울꽃 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2127',
    categories: ['탈리스만'],
    name: '죽음의 왕자의 업창',
    x: 0.368051,
    y: 0.513656,
    loot: [
      {
        id: 'LSDL-2127-1',
        name: '죽음의 왕자의 업창',
      },
    ],
  },
  {
    id: 'LSDL-2128',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.300361,
    y: 0.586687,
    loot: [
      {
        id: 'LSDL-2128-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2129',
    categories: ['색단석'],
    name: '색 잃은 단석 [7]',
    x: 0.379095,
    y: 0.479215,
    loot: [
      {
        id: 'LSDL-2129-1',
        name: '색 잃은 단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2130',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울꽃 [5]',
    x: 0.353088,
    y: 0.46734,
    loot: [
      {
        id: 'LSDL-2130-1',
        name: '영혼 묘 은방울꽃 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2131',
    categories: ['전회'],
    name: '전회 「진공베기」',
    x: 0.330287,
    y: 0.428153,
    loot: [
      {
        id: 'LSDL-2131-1',
        name: '진공베기',
      },
    ],
  },
  {
    id: 'LSDL-2132',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울꽃 [5]',
    x: 0.301072,
    y: 0.434089,
    loot: [
      {
        id: 'LSDL-2132-1',
        name: '영혼 묘 은방울꽃 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2133',
    categories: ['색단석'],
    name: '색 잃은 단석 [6]',
    x: 0.302497,
    y: 0.400838,
    loot: [
      {
        id: 'LSDL-2133-1',
        name: '색 잃은 단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2134',
    categories: ['일반단석'],
    name: '단석 [7]',
    x: 0.29644,
    y: 0.346211,
    loot: [
      {
        id: 'LSDL-2134-1',
        name: '단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2135',
    categories: ['무기'],
    name: '죽음의 왕자의 지팡이',
    x: 0.265089,
    y: 0.38718,
    loot: [
      {
        id: 'LSDL-2135-1',
        name: '죽음의 왕자의 지팡이',
      },
    ],
  },
  {
    id: 'LSDL-2136',
    categories: [],
    name: '영기류',
    x: 0.279695,
    y: 0.321867,
  },
  {
    id: 'LSDL-2137',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울꽃 [5]',
    x: 0.28967,
    y: 0.298709,
    loot: [
      {
        id: 'LSDL-2137-1',
        name: '영혼 묘 은방울꽃 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2138',
    categories: ['NPC'],
    name: '피아 마지막 이벤트',
    x: 0.40795,
    y: 0.21083,
  },
  {
    id: 'LSDL-2139',
    categories: ['NPC'],
    name: '죽음을 본 자 D [2]',
    x: 0.416145,
    y: 0.219737,
  },
  {
    id: 'LSDL-2140',
    categories: [],
    name: '도읍 로데일로 가는 전송문',
    x: 0.430396,
    y: 0.242302,
  },
  {
    id: 'LSDL-2141',
    categories: ['영체'],
    name: '영묘 병사의 뼛가루',
    x: 0.228035,
    y: 0.089109,
    loot: [
      {
        id: 'LSDL-2141-1',
        name: '영묘 병사의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-2142',
    categories: ['색단석'],
    name: '색 잃은 단석 [6]',
    x: 0.222335,
    y: 0.136611,
    loot: [
      {
        id: 'LSDL-2142-1',
        name: '색 잃은 단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2143',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.172458,
    y: 0.15858,
    loot: [
      {
        id: 'LSDL-2143-1',
        name: '단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2144',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.129707,
    y: 0.305242,
    loot: [
      {
        id: 'LSDL-2144-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2145',
    categories: ['색단석'],
    name: '색 잃은 단석 [7]',
    x: 0.161058,
    y: 0.281491,
    loot: [
      {
        id: 'LSDL-2145-1',
        name: '색 잃은 단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2146',
    categories: ['색단석'],
    name: '색 잃은 단석 [7]',
    x: 0.185998,
    y: 0.31296,
    loot: [
      {
        id: 'LSDL-2146-1',
        name: '색 잃은 단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2147',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.197041,
    y: 0.316525,
    loot: [
      {
        id: 'LSDL-2147-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2148',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울꽃 [6]',
    x: 0.122937,
    y: 0.333744,
    loot: [
      {
        id: 'LSDL-2148-1',
        name: '영혼 묘 은방울꽃 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2149',
    categories: ['축복'],
    name: '이름 없는 영원한 도읍',
    x: 0.212006,
    y: 0.469123,
  },
  {
    id: 'LSDL-2150',
    categories: ['색단석'],
    name: '영혼 묘 은방울꽃 [7]',
    x: 0.080899,
    y: 0.348587,
    loot: [
      {
        id: 'LSDL-2150-1',
        name: '영혼 묘 은방울꽃 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2151',
    categories: ['방어구'],
    name: '도가니의 기사 세트',
    x: 0.066648,
    y: 0.360463,
    loot: [
      {
        id: 'LSDL-2151-1',
        name: '도가니의 기사 세트',
      },
    ],
  },
  {
    id: 'LSDL-2152',
    categories: [],
    name: '영기류',
    x: 0.103345,
    y: 0.400839,
  },
  {
    id: 'LSDL-2153',
    categories: ['색단석'],
    name: '색 잃은 단석 [7]',
    x: 0.115812,
    y: 0.391931,
    loot: [
      {
        id: 'LSDL-2153-1',
        name: '색 잃은 단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2154',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.124007,
    y: 0.410339,
    loot: [
      {
        id: 'LSDL-2154-1',
        name: '석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-2155',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울꽃 [6]',
    x: 0.113676,
    y: 0.451312,
    loot: [
      {
        id: 'LSDL-2155-1',
        name: '영혼 묘 은방울꽃 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2156',
    categories: [],
    name: '전송문',
    x: 0.134339,
    y: 0.486935,
  },
  {
    id: 'LSDL-2157',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.185286,
    y: 0.491685,
    loot: [
      {
        id: 'LSDL-2157-1',
        name: '단석 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2158',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울꽃 [5]',
    x: 0.169966,
    y: 0.461998,
    loot: [
      {
        id: 'LSDL-2158-1',
        name: '영혼 묘 은방울꽃 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2159',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.228037,
    y: 0.425778,
    loot: [
      {
        id: 'LSDL-2159-1',
        name: '단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2160',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.240863,
    y: 0.403213,
    loot: [
      {
        id: 'LSDL-2160-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2161',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울꽃 [5]',
    x: 0.272215,
    y: 0.532064,
    loot: [
      {
        id: 'LSDL-2161-1',
        name: '영혼 묘 은방울꽃 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2162',
    categories: ['NPC'],
    name: '손가락 읽는 노파',
    x: 0.264378,
    y: 0.719692,
  },
  {
    id: 'LSDL-2163',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.330644,
    y: 0.696538,
    loot: [
      {
        id: 'LSDL-2163-1',
        name: '단석 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2164',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울꽃 [4]',
    x: 0.359146,
    y: 0.692973,
    loot: [
      {
        id: 'LSDL-2164-1',
        name: '영혼 묘 은방울꽃 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2487',
    categories: [],
    name: '큰 잠자리 머리',
    x: 0.547733,
    y: 0.263329,
    loot: [
      {
        id: 'LSDL-2487-1',
        name: '큰 잠자리 머리',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-2777',
    categories: [],
    name: '대폭포의 석관의 도착지',
    x: 0.556875,
    y: 0.683471,
  },
  {
    id: 'LSDL-2778',
    categories: [],
    name: '유생나비',
    x: 0.493103,
    y: 0.729191,
    loot: [
      {
        id: 'LSDL-2778-1',
        name: '유생나비',
      },
    ],
  },
  {
    id: 'LSDL-2779',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [4]',
    x: 0.551531,
    y: 0.7856,
    loot: [
      {
        id: 'LSDL-2779-1',
        name: '영혼 묘 은방울 꽃 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2885',
    categories: ['보스'],
    name: '신의 살갗의 귀인',
    x: 0.737794,
    y: 0.242054,
    loot: [
      {
        id: 'LSDL-2885-1',
        name: '신의 살갗의 귀인 후드',
      },
      {
        id: 'LSDL-2885-2',
        name: '신의 살갗의 귀인 로브',
      },
      {
        id: 'LSDL-2885-3',
        name: '귀인의 팔찌',
      },
      {
        id: 'LSDL-2885-4',
        name: '귀인의 바지',
      },
    ],
  },
  {
    id: 'LSDL-2961',
    categories: ['NPC'],
    name: '디아로스',
    x: 0.644557,
    y: 0.34235,
  },
  {
    id: 'LSDL-2963',
    categories: ['NPC'],
    name: '작은 항아리',
    x: 0.633404,
    y: 0.382167,
  },
  {
    id: 'LSDL-2972',
    categories: ['기타'],
    name: '항아리 마을 내려가기',
    x: 0.616668,
    y: 0.387481,
  },
  {
    id: 'LSDL-2985',
    categories: [],
    name: '걷는 영묘 [종]',
    x: 0.228036,
    y: 0.276148,
  },
];

// LSDL base-game map, checked 2026-11-21; patch unspecified.
// Source, terrain alignment and description review: reference-data/maps/altus-plateau/.
// Regenerate: node reference-data/maps/generate.mjs altus-plateau.
const ALTUS_PLATEAU_MARKERS = [
  {
    id: 'LSDL-108',
    categories: ['보스'],
    name: '왕가 묘지의 봉인감옥',
    x: 0.118763,
    y: 0.879887,
    loot: [
      {
        id: 'LSDL-108-1',
        name: '메테오라이트',
      },
    ],
  },
  {
    id: 'LSDL-128',
    categories: ['축복', '던전', '보스'],
    name: '끓는 강 동굴',
    x: 0.183783,
    y: 0.315749,
    loot: [
      {
        id: 'LSDL-128-1',
        name: '동굴 이끼',
      },
      {
        id: 'LSDL-128-2',
        name: '동굴 이끼결정',
      },
      {
        id: 'LSDL-128-3',
        name: '동굴 이끼꽃눈',
      },
      {
        id: 'LSDL-128-4',
        name: '독꽃',
      },
      {
        id: 'LSDL-128-5',
        name: '독곰팡이버섯',
      },
      {
        id: 'LSDL-128-6',
        name: '부패이끼약',
        quantity: 1,
      },
      {
        id: 'LSDL-128-7',
        name: '면역의 육포',
        quantity: 1,
      },
      {
        id: 'LSDL-128-8',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
      {
        id: 'LSDL-128-9',
        name: '황금의 룬 [7]',
        quantity: 1,
      },
      {
        id: 'LSDL-128-10',
        name: '버섯머리',
      },
      {
        id: 'LSDL-128-11',
        name: '버섯몸',
      },
      {
        id: 'LSDL-128-12',
        name: '버섯팔',
      },
      {
        id: 'LSDL-128-13',
        name: '버섯다리',
      },
      {
        id: 'LSDL-128-14',
        name: '부패 권속의 환의',
      },
    ],
  },
  {
    id: 'LSDL-141',
    categories: ['축복', '던전', '보스'],
    name: '화산 동굴',
    x: 0.15202,
    y: 0.115423,
    loot: [
      {
        id: 'LSDL-141-1',
        name: '똬리 방패',
      },
      {
        id: 'LSDL-141-2',
        name: '아르테리아의 잎',
        quantity: 3,
      },
      {
        id: 'LSDL-141-3',
        name: '동굴 이끼',
      },
      {
        id: 'LSDL-141-4',
        name: '동굴 이끼꽃눈',
      },
      {
        id: 'LSDL-141-5',
        name: '동굴 이끼결정',
      },
      {
        id: 'LSDL-141-6',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
      {
        id: 'LSDL-141-7',
        name: '대포 항아리',
      },
    ],
  },
  {
    id: 'LSDL-412',
    categories: ['장소'],
    name: '숲 백성의 폐허',
    x: 0.713723,
    y: 0.39184,
  },
  {
    id: 'LSDL-413',
    categories: ['장소'],
    name: '작은 황금 나무 ( 풍양의 숲 )',
    x: 0.668023,
    y: 0.398642,
  },
  {
    id: 'LSDL-414',
    categories: ['장소'],
    name: '가도 감시탑',
    x: 0.843655,
    y: 0.250696,
    loot: [
      {
        id: 'LSDL-414-1',
        name: '대궁',
      },
    ],
  },
  {
    id: 'LSDL-415',
    categories: ['장소'],
    name: '풍차 마을 도미눌라',
    x: 0.786015,
    y: 0.178355,
  },
  {
    id: 'LSDL-417',
    categories: ['장소'],
    name: '동쪽 풍차 목장',
    x: 0.644495,
    y: 0.045066,
  },
  {
    id: 'LSDL-418',
    categories: ['장소'],
    name: '서쪽 풍차 목장',
    x: 0.532485,
    y: 0.120453,
  },
  {
    id: 'LSDL-419',
    categories: ['축복', '던전', '보스'],
    name: '알터 갱도',
    x: 0.678195,
    y: 0.523875,
    loot: [
      {
        id: 'LSDL-419-1',
        name: '단석 [5]',
        quantity: 6,
      },
      {
        id: 'LSDL-419-2',
        name: '색 잃은 단석 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-419-3',
        name: '황금의 룬 [7]',
      },
      {
        id: 'LSDL-419-4',
        name: '룬의 호',
      },
      {
        id: 'LSDL-419-5',
        name: '아르테리아의 잎',
        quantity: 2,
      },
      {
        id: 'LSDL-419-6',
        name: '망가진 결정',
      },
      {
        id: 'LSDL-419-7',
        name: '무구덩어리 부적 +1',
      },
      {
        id: 'LSDL-419-8',
        name: '색 잃은 채석꾼의 방울 [2]',
      },
    ],
  },
  {
    id: 'LSDL-607',
    categories: ['축복'],
    name: '카리아 성관 뒤편',
    x: 0.018447,
    y: 0.84055,
  },
  {
    id: 'LSDL-609',
    categories: ['축복'],
    name: '용암 토룡 마카르',
    x: 0.152746,
    y: 0.807363,
  },
  {
    id: 'LSDL-610',
    categories: ['축복'],
    name: '버려진 관',
    x: 0.161317,
    y: 0.754848,
  },
  {
    id: 'LSDL-611',
    categories: ['축복'],
    name: '옛 유적 절벽 맞은편',
    x: 0.206632,
    y: 0.842262,
  },
  {
    id: 'LSDL-612',
    categories: ['축복'],
    name: '계곡에 숨은 마을',
    x: 0.249455,
    y: 0.828399,
  },
  {
    id: 'LSDL-613',
    categories: ['축복'],
    name: '계곡에 숨은 마을',
    x: 0.249455,
    y: 0.828399,
  },
  {
    id: 'LSDL-614',
    categories: ['축복'],
    name: '옛 유적 절벽',
    x: 0.26065,
    y: 0.813933,
  },
  {
    id: 'LSDL-615',
    categories: ['축복'],
    name: '황금 나무를 향한 언덕',
    x: 0.304213,
    y: 0.689558,
  },
  {
    id: 'LSDL-616',
    categories: ['축복'],
    name: '알터 고원',
    x: 0.347356,
    y: 0.832039,
  },
  {
    id: 'LSDL-618',
    categories: ['축복'],
    name: '알터 가도 세갈래 길',
    x: 0.492821,
    y: 0.718713,
  },
  {
    id: 'LSDL-620',
    categories: ['축복'],
    name: '풍양의 숲',
    x: 0.581495,
    y: 0.447106,
  },
  {
    id: 'LSDL-623',
    categories: ['축복'],
    name: '그늘성 성벽',
    x: 0.45798,
    y: 0.268723,
  },
  {
    id: 'LSDL-624',
    categories: ['축복'],
    name: '죄인교',
    x: 0.395642,
    y: 0.371701,
  },
  {
    id: 'LSDL-625',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [4]',
    x: 0.441081,
    y: 0.192891,
    loot: [
      {
        id: 'LSDL-625-1',
        name: '영혼 묘 은방울 꽃 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-626',
    categories: ['축복'],
    name: '그늘성 안쪽 문',
    x: 0.434924,
    y: 0.208919,
  },
  {
    id: 'LSDL-627',
    categories: ['축복'],
    name: '겔미어 화산 일부 능선',
    x: 0.328906,
    y: 0.315852,
  },
  {
    id: 'LSDL-630',
    categories: ['축복'],
    name: '원류의 마술사 아줄',
    x: 0.200005,
    y: 0.436168,
  },
  {
    id: 'LSDL-631',
    categories: ['축복'],
    name: '땅 밑 책문소',
    x: 0.149326,
    y: 0.420851,
    loot: [
      {
        id: 'LSDL-631-1',
        name: '단석 [4]',
      },
      {
        id: 'LSDL-631-2',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-632',
    categories: ['축복'],
    name: '알현의 길',
    x: 0.117712,
    y: 0.336279,
  },
  {
    id: 'LSDL-634',
    categories: ['축복'],
    name: '모독의 군주 라이커드',
    x: 0.114265,
    y: 0.400798,
  },
  {
    id: 'LSDL-635',
    categories: ['축복'],
    name: '에이그레이 성당',
    x: 0.100186,
    y: 0.470662,
    loot: [
      {
        id: 'LSDL-635-1',
        name: '황금의 룬 [9]',
      },
    ],
  },
  {
    id: 'LSDL-636',
    categories: ['축복'],
    name: '감옥 거리 교회',
    x: 0.036773,
    y: 0.406347,
  },
  {
    id: 'LSDL-637',
    categories: ['축복'],
    name: '끓는 강 종단',
    x: 0.000064,
    y: 0.350888,
  },
  {
    id: 'LSDL-638',
    categories: ['축복'],
    name: '영빈관',
    x: 0.002142,
    y: 0.46357,
  },
  {
    id: 'LSDL-639',
    categories: ['축복'],
    name: '죄인 이송용 길',
    x: 0.053589,
    y: 0.29034,
  },
  {
    id: 'LSDL-640',
    categories: ['축복'],
    name: '겔미어 화산 구부 능선',
    x: 0.123647,
    y: 0.224133,
  },
  {
    id: 'LSDL-642',
    categories: ['축복', '던전', '보스'],
    name: '추한 지하 묘지 (혼종)',
    x: 0.04147,
    y: 0.656371,
    loot: [
      {
        id: 'LSDL-642-1',
        name: '날개 혼종의 뼛가루',
      },
      {
        id: 'LSDL-642-2',
        name: '말하는 머리 "미안해"',
      },
      {
        id: 'LSDL-642-3',
        name: '묘 은방울 꽃 [4]',
        quantity: 3,
      },
      {
        id: 'LSDL-642-4',
        name: '묘 은방울 꽃 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-642-5',
        name: '영혼 묘 은방울 꽃 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-642-6',
        name: '룬의 호',
      },
      {
        id: 'LSDL-642-7',
        name: '묘의 보라',
      },
      {
        id: 'LSDL-642-8',
        name: '조향사 트리샤',
      },
    ],
  },
  {
    id: 'LSDL-643',
    categories: ['축복'],
    name: '강인의 오두막',
    x: 0.11188,
    y: 0.578246,
    loot: [
      {
        id: 'LSDL-643-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
      {
        id: 'LSDL-643-2',
        name: '도르래 석궁',
      },
    ],
  },
  {
    id: 'LSDL-644',
    categories: ['축복', '던전', '보스'],
    name: '현자의 동굴',
    x: 0.23433,
    y: 0.588525,
    loot: [
      {
        id: 'LSDL-644-1',
        name: '맹금의 발톱',
      },
      {
        id: 'LSDL-644-2',
        name: '뼈 가면',
      },
      {
        id: 'LSDL-644-3',
        name: '맹금의 검은 깃털',
      },
      {
        id: 'LSDL-644-4',
        name: '석검 열쇠',
      },
      {
        id: 'LSDL-644-5',
        name: '상실의 전회',
      },
      {
        id: 'LSDL-644-6',
        name: '죽음 이끼약',
        quantity: 5,
      },
      {
        id: 'LSDL-644-7',
        name: '황금의 룬 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-644-8',
        name: '동굴 이끼 꽃눈',
      },
      {
        id: 'LSDL-644-9',
        name: '동굴 이끼 결정',
      },
      {
        id: 'LSDL-644-10',
        name: '은색 반딧불',
      },
      {
        id: 'LSDL-644-11',
        name: '몸 가리는 베일',
      },
      {
        id: 'LSDL-644-12',
        name: '가족의 머리',
      },
    ],
  },
  {
    id: 'LSDL-645',
    categories: ['축복', '던전', '보스'],
    name: '구 알터 갱도',
    x: 0.368952,
    y: 0.473107,
    loot: [
      {
        id: 'LSDL-645-1',
        name: '트롤 해머',
      },
      {
        id: 'LSDL-645-2',
        name: '뇌룡 표식의 탈리스만',
      },
      {
        id: 'LSDL-645-3',
        name: '단석 [5]',
        quantity: 6,
      },
      {
        id: 'LSDL-645-4',
        name: '색 잃은 단석 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-645-5',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
      {
        id: 'LSDL-645-6',
        name: '출혈 이끼약',
        quantity: 1,
      },
      {
        id: 'LSDL-645-7',
        name: '망가진 결정',
      },
      {
        id: 'LSDL-645-8',
        name: '그레이트 클럽',
      },
    ],
  },
  {
    id: 'LSDL-646',
    categories: ['축복', '던전', '보스'],
    name: '윈덤 지하 묘지 (임프)',
    x: 0.255121,
    y: 0.48179,
    loot: [
      {
        id: 'LSDL-646-1',
        name: '벼락 전갈',
      },
      {
        id: 'LSDL-646-2',
        name: '묘 은방울 꽃 [4]',
        quantity: 2,
      },
      {
        id: 'LSDL-646-3',
        name: '묘 은방울 꽃 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-646-4',
        name: '영혼 묘 은방울 꽃 [6]',
        quantity: 1,
      },
      {
        id: 'LSDL-646-5',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-646-6',
        name: '묘의 보라',
      },
      {
        id: 'LSDL-646-7',
        name: '고룡 신도의 제작서 [1]',
      },
      {
        id: 'LSDL-646-8',
        name: '은방울꽃 채취자의 방울 [1]',
      },
    ],
  },
  {
    id: 'LSDL-647',
    categories: ['축복'],
    name: '납치하는 소녀 인형',
    x: 0.199343,
    y: 0.490774,
  },
  {
    id: 'LSDL-648',
    categories: ['축복'],
    name: '끓는 강',
    x: 0.224533,
    y: 0.525995,
  },
  {
    id: 'LSDL-649',
    categories: ['장소'],
    name: '윈덤 폐허',
    x: 0.298615,
    y: 0.558493,
  },
  {
    id: 'LSDL-650',
    categories: ['축복'],
    name: '죄인 이송용 길 옆',
    x: 0.606752,
    y: 0.173586,
  },
  {
    id: 'LSDL-652',
    categories: ['축복'],
    name: '속세를 떠난 상인의 오두막',
    x: 0.953499,
    y: 0.394471,
  },
  {
    id: 'LSDL-653',
    categories: ['축복'],
    name: '외곽 전장터',
    x: 0.933358,
    y: 0.447517,
  },
  {
    id: 'LSDL-681',
    categories: ['축복', '던전', '보스'],
    name: '봉인된 갱도',
    x: 0.928882,
    y: 0.851022,
    loot: [
      {
        id: 'LSDL-681-1',
        name: '단석 [5]',
        quantity: 4,
      },
      {
        id: 'LSDL-681-2',
        name: '단석 [6]',
        quantity: 3,
      },
      {
        id: 'LSDL-681-3',
        name: '색 잃은 단석 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-681-4',
        name: '석검 열쇠',
        quantity: 1,
      },
      {
        id: 'LSDL-681-5',
        name: '황금의 룬 [1]',
        quantity: 1,
      },
      {
        id: 'LSDL-681-6',
        name: '황금의 룬 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-681-7',
        name: '황금의 룬 [9]',
        quantity: 1,
      },
      {
        id: 'LSDL-681-8',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-681-9',
        name: '망가진 결정',
      },
      {
        id: 'LSDL-681-10',
        name: '단석 채석꾼의 방울 [2]',
      },
      {
        id: 'LSDL-681-11',
        name: '흑왕의 대검',
      },
    ],
  },
  {
    id: 'LSDL-940',
    categories: ['축복'],
    name: '외곽 환영 나무',
    x: 0.80666,
    y: 0.751407,
  },
  {
    id: 'LSDL-941',
    categories: ['NPC'],
    name: '손가락 읽는 노파',
    x: 0.900498,
    y: 0.601041,
  },
  {
    id: 'LSDL-1088',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.21552,
    y: 0.858544,
  },
  {
    id: 'LSDL-1089',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.203566,
    y: 0.408203,
    loot: [
      {
        id: 'LSDL-1089-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1090',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.00692,
    y: 0.209723,
    loot: [
      {
        id: 'LSDL-1090-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1092',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.503919,
    y: 0.673219,
    loot: [
      {
        id: 'LSDL-1092-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1126',
    categories: ['장소'],
    name: '작은 황금나무 교회',
    x: 0.905873,
    y: 0.923575,
    loot: [
      {
        id: 'LSDL-1126-1',
        name: '황금 지네',
        quantity: 6,
      },
      {
        id: 'LSDL-1126-2',
        name: '황금률의 성인',
      },
    ],
  },
  {
    id: 'LSDL-1156',
    categories: ['지도조각'],
    name: '지도 조각 (겔미어 화산)',
    x: 0.035908,
    y: 0.311217,
    loot: [
      {
        id: 'LSDL-1156-1',
        name: '지도 조각 (겔미어 화산)',
      },
    ],
  },
  {
    id: 'LSDL-1157',
    categories: ['지도조각'],
    name: '지도 조각 (알터 고원)',
    x: 0.517665,
    y: 0.604051,
    loot: [
      {
        id: 'LSDL-1157-1',
        name: '지도 조각 (알터 고원)',
      },
    ],
  },
  {
    id: 'LSDL-1158',
    categories: ['지도조각'],
    name: '지도 조각 (도읍 로데일)',
    x: 0.821005,
    y: 0.744264,
    loot: [
      {
        id: 'LSDL-1158-1',
        name: '지도 조각 (도읍 로데일)',
      },
    ],
  },
  {
    id: 'LSDL-1159',
    categories: ['전회'],
    name: '전회 : 황금 패리',
    x: 0.941143,
    y: 0.602545,
    loot: [
      {
        id: 'LSDL-1159-1',
        name: '황금 패리',
      },
    ],
  },
  {
    id: 'LSDL-1168',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.818025,
    y: 0.764362,
    loot: [
      {
        id: 'LSDL-1168-1',
        name: '황금 종자',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1169',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.901378,
    y: 0.583118,
    loot: [
      {
        id: 'LSDL-1169-1',
        name: '황금 종자',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1182',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.83236,
    y: 0.857037,
    loot: [
      {
        id: 'LSDL-1182-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1196',
    categories: ['장소'],
    name: '신기루의 마술사탑',
    x: 0.496746,
    y: 0.43474,
    loot: [
      {
        id: 'LSDL-1196-1',
        name: '보이지 않는 모습',
      },
      {
        id: 'LSDL-1196-2',
        name: '보이지 않는 칼날',
      },
      {
        id: 'LSDL-1196-3',
        name: '잠알',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-1199',
    categories: ['장소'],
    name: '벼락 부름의 교회',
    x: 0.588195,
    y: 0.658473,
    loot: [
      {
        id: 'LSDL-1199-1',
        name: '성배의 물방울',
      },
      {
        id: 'LSDL-1199-2',
        name: '용뢰의 가호',
      },
    ],
  },
  {
    id: 'LSDL-1213',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.321317,
    y: 0.667922,
    loot: [
      {
        id: 'LSDL-1213-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1214',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.645277,
    y: 0.317984,
    loot: [
      {
        id: 'LSDL-1214-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1215',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.809648,
    y: 0.30107,
    loot: [
      {
        id: 'LSDL-1215-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1299',
    categories: ['탈리스만'],
    name: '은혜의 물방울의 탈리스만',
    x: 0.987774,
    y: 0.832978,
    loot: [
      {
        id: 'LSDL-1299-1',
        name: '은혜의 물방울의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-1422',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.245108,
    y: 0.84689,
    loot: [
      {
        id: 'LSDL-1422-1',
        name: '단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1423',
    categories: ['전회'],
    name: '전회: 야만적인 포효',
    x: 0.248097,
    y: 0.804038,
  },
  {
    id: 'LSDL-1447',
    categories: ['NPC'],
    name: '밀리센트 [3]',
    x: 0.321913,
    y: 0.649914,
  },
  {
    id: 'LSDL-1448',
    categories: [],
    name: '트리나의 수련',
    x: 0.283063,
    y: 0.69991,
    loot: [
      {
        id: 'LSDL-1448-1',
        name: '트리나의 수련',
      },
    ],
  },
  {
    id: 'LSDL-1449',
    categories: ['장소'],
    name: '루크스의 폐허',
    x: 0.320718,
    y: 0.702917,
  },
  {
    id: 'LSDL-1451',
    categories: [],
    name: '미켈라의 수련',
    x: 0.343133,
    y: 0.738252,
    loot: [
      {
        id: 'LSDL-1451-1',
        name: '미켈라의 수련',
      },
    ],
  },
  {
    id: 'LSDL-1453',
    categories: [],
    name: '미켈라의 수련',
    x: 0.294717,
    y: 0.740884,
  },
  {
    id: 'LSDL-1454',
    categories: ['중요아이템'],
    name: '창문으로 진입',
    x: 0.120185,
    y: 0.449177,
    loot: [
      {
        id: 'LSDL-1454-1',
        name: '선교사의 제작서 [6]',
      },
      {
        id: 'LSDL-1454-2',
        name: '끈달린 불기름',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-1460',
    categories: ['NPC'],
    name: '재봉사 아인 보크[4]',
    x: 0.501528,
    y: 0.717575,
  },
  {
    id: 'LSDL-1542',
    categories: ['영체'],
    name: '백금의 사람의 뼛가루',
    x: 0.04069,
    y: 0.929595,
  },
  {
    id: 'LSDL-1543',
    categories: ['중요아이템'],
    name: '그림 : 재탄 보상',
    x: 0.05085,
    y: 0.93073,
    loot: [
      {
        id: 'LSDL-1543-1',
        name: '유년 학도의 모자',
      },
      {
        id: 'LSDL-1543-2',
        name: '유년 학도의 로브',
      },
      {
        id: 'LSDL-1543-3',
        name: '물방울 유생',
      },
    ],
  },
  {
    id: 'LSDL-1544',
    categories: [],
    name: '묘 은방울 꽃 [1]',
    x: 0.062506,
    y: 0.942759,
  },
  {
    id: 'LSDL-1545',
    categories: ['일반묘'],
    name: '묘 은방울 꽃 [1]',
    x: 0.067586,
    y: 0.861553,
    loot: [
      {
        id: 'LSDL-1545-1',
        name: '묘 은방울 꽃 [1]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1547',
    categories: [],
    name: '미켈라의 수련',
    x: 0.098667,
    y: 0.94988,
    loot: [
      {
        id: 'LSDL-1547-1',
        name: '미켈라의 수련',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-1572',
    categories: ['보스'],
    name: '방울 사냥꾼 - 로데일 외곽',
    x: 0.962067,
    y: 0.399177,
    loot: [
      {
        id: 'LSDL-1572-1',
        name: '약 장사꾼의 방울',
      },
    ],
  },
  {
    id: 'LSDL-1573',
    categories: ['NPC'],
    name: '속세를 떠난 상인 [1]',
    x: 0.960576,
    y: 0.388276,
  },
  {
    id: 'LSDL-1608',
    categories: [],
    name: '레아 루카리아 납치하는 소녀의 전송지',
    x: 0.055035,
    y: 0.420608,
  },
  {
    id: 'LSDL-1612',
    categories: ['장소'],
    name: '피가 꿈틀거리는 폐허',
    x: 0.548448,
    y: 0.35407,
    loot: [
      {
        id: 'LSDL-1612-1',
        name: '피의 장미',
      },
      {
        id: 'LSDL-1612-2',
        name: '피의 헬리케',
      },
    ],
  },
  {
    id: 'LSDL-1613',
    categories: ['암령'],
    name: '침입 사인 : 짐승 발톱 매그너스',
    x: 0.558549,
    y: 0.34813,
    loot: [
      {
        id: 'LSDL-1613-1',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-1613-2',
        name: '갈고리를 부르는 손가락 약',
        quantity: 1,
      },
      {
        id: 'LSDL-1613-3',
        name: '그레이트 스타즈',
      },
      {
        id: 'LSDL-1613-4',
        name: '색 잃은 단석 [6]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1614',
    categories: [],
    name: '그레이트스타즈',
    x: 0.563988,
    y: 0.244303,
    loot: [
      {
        id: 'LSDL-1614-1',
        name: '그레이트스타즈',
      },
    ],
  },
  {
    id: 'LSDL-1658',
    categories: ['NPC'],
    name: '콜린 [2]',
    x: 0.516768,
    y: 0.630741,
  },
  {
    id: 'LSDL-1681',
    categories: ['중요아이템'],
    name: '호박색 별빛',
    x: 0.580126,
    y: 0.604803,
    loot: [
      {
        id: 'LSDL-1681-1',
        name: '호박색 별빛',
      },
    ],
  },
  {
    id: 'LSDL-1699',
    categories: [],
    name: '전송문',
    x: 0.996132,
    y: 0.858165,
  },
  {
    id: 'LSDL-1772',
    categories: ['NPC'],
    name: '패치 [3]',
    x: 0.241522,
    y: 0.300691,
  },
  {
    id: 'LSDL-1773',
    categories: ['장소'],
    name: '시체 냄새가 나는 오두막',
    x: 0.281269,
    y: 0.221372,
  },
  {
    id: 'LSDL-1775',
    categories: ['기도'],
    name: '기도 : 황금 나무에 맹세코',
    x: 0.271109,
    y: 0.244305,
    loot: [
      {
        id: 'LSDL-1775-1',
        name: '황금 나무에 맹세코',
      },
    ],
  },
  {
    id: 'LSDL-1780',
    categories: ['보스'],
    name: '티비아의 배 - 윈덤 폐허',
    x: 0.277683,
    y: 0.596909,
    loot: [
      {
        id: 'LSDL-1780-1',
        name: '사근',
      },
      {
        id: 'LSDL-1780-2',
        name: '티비아의 부름',
      },
    ],
  },
  {
    id: 'LSDL-1781',
    categories: ['색단석'],
    name: '색 잃은 단석 [6]',
    x: 0.344328,
    y: 0.325126,
    loot: [
      {
        id: 'LSDL-1781-1',
        name: '색 잃은 단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-1783',
    categories: ['NPC'],
    name: '원류의 마술사 아줄',
    x: 0.199682,
    y: 0.452184,
    loot: [
      {
        id: 'LSDL-1783-1',
        name: '혜성 아줄',
      },
    ],
  },
  {
    id: 'LSDL-1785',
    categories: ['보스'],
    name: '내리는 별의 짐승 성체',
    x: 0.114508,
    y: 0.26949,
    loot: [
      {
        id: 'LSDL-1785-1',
        name: '성수의 턱',
      },
      {
        id: 'LSDL-1785-2',
        name: '색 잃은 단석 [6]',
      },
      {
        id: 'LSDL-1785-3',
        name: '단석 [6]',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-1786',
    categories: ['보스'],
    name: '문드러진 나무령',
    x: 0.183843,
    y: 0.292047,
    loot: [
      {
        id: 'LSDL-1786-1',
        name: '납빛 굳은 물방울',
      },
      {
        id: 'LSDL-1786-2',
        name: '푸른 숨겨진 물방울',
      },
    ],
  },
  {
    id: 'LSDL-1787',
    categories: ['중요아이템'],
    name: '전쟁 처녀의 의수',
    x: 0.39902,
    y: 0.201074,
    loot: [
      {
        id: 'LSDL-1787-1',
        name: '전쟁 처녀의 의수',
      },
    ],
  },
  {
    id: 'LSDL-1788',
    categories: ['그릇'],
    name: '조향병 - 그늘 성',
    x: 0.450721,
    y: 0.243176,
    loot: [
      {
        id: 'LSDL-1788-1',
        name: '조향병',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1789',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.464169,
    y: 0.257459,
    loot: [
      {
        id: 'LSDL-1789-1',
        name: '석검 열쇠',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-1790',
    categories: ['방어구'],
    name: '방어구 : 타락 조향사 세트',
    x: 0.449824,
    y: 0.230393,
    loot: [
      {
        id: 'LSDL-1790-1',
        name: '타락 조향사 세트',
      },
    ],
  },
  {
    id: 'LSDL-1791',
    categories: ['제작서'],
    name: '조향사의 제작서 [2] (사다리 위)',
    x: 0.428008,
    y: 0.18679,
    loot: [
      {
        id: 'LSDL-1791-1',
        name: '조향사의 제작서 [2] (사다리 위)',
      },
    ],
  },
  {
    id: 'LSDL-1792',
    categories: ['보스'],
    name: '철가시 엘레메르',
    x: 0.423525,
    y: 0.210848,
    loot: [
      {
        id: 'LSDL-1792-1',
        name: '마레가의 집행검',
      },
      {
        id: 'LSDL-1792-2',
        name: '철가시 방패',
      },
    ],
  },
  {
    id: 'LSDL-1793',
    categories: ['기타'],
    name: '그림 : 영웅의 노래',
    x: 0.467756,
    y: 0.235657,
  },
  {
    id: 'LSDL-1794',
    categories: ['축복'],
    name: '성벽을 따라난 샛길',
    x: 0.741508,
    y: 0.562323,
  },
  {
    id: 'LSDL-1795',
    categories: ['중요아이템'],
    name: '하프 보우',
    x: 0.726566,
    y: 0.570969,
    loot: [
      {
        id: 'LSDL-1795-1',
        name: '하프 보우',
      },
    ],
  },
  {
    id: 'LSDL-1797',
    categories: ['색단석'],
    name: '색 잃은 단석 [6]',
    x: 0.024851,
    y: 0.471733,
    loot: [
      {
        id: 'LSDL-1797-1',
        name: '색 잃은 단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-1798',
    categories: ['일반단석'],
    name: '단석 [6] ',
    x: 0.024551,
    y: 0.44542,
    loot: [
      {
        id: 'LSDL-1798-1',
        name: '단석 [6]',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1800',
    categories: ['중요아이템'],
    name: '뱀의 양막',
    x: 0.110024,
    y: 0.4785,
    loot: [
      {
        id: 'LSDL-1800-1',
        name: '뱀의 양막',
      },
    ],
  },
  {
    id: 'LSDL-1801',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.092093,
    y: 0.414218,
    loot: [
      {
        id: 'LSDL-1801-1',
        name: '색 잃은 단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-1802',
    categories: ['보스'],
    name: '모독의 군주 라이커드',
    x: 0.128853,
    y: 0.390535,
    loot: [
      {
        id: 'LSDL-1802-1',
        name: '라이커드의 거대한 룬',
      },
      {
        id: 'LSDL-1802-2',
        name: '모독의 군주의 추억',
      },
    ],
  },
  {
    id: 'LSDL-1877',
    categories: ['전회'],
    name: '전회 : 피의 칼날',
    x: 0.3778,
    y: 0.627357,
    loot: [
      {
        id: 'LSDL-1877-1',
        name: '피의 칼날',
      },
    ],
  },
  {
    id: 'LSDL-1878',
    categories: ['중요아이템'],
    name: '별빛 조각',
    x: 0.426214,
    y: 0.168369,
    loot: [
      {
        id: 'LSDL-1878-1',
        name: '별빛 조각',
      },
    ],
  },
  {
    id: 'LSDL-1879',
    categories: ['NPC'],
    name: '적대 npc : 그늘의 성주 멀레이 마레',
    x: 0.342236,
    y: 0.215357,
    loot: [
      {
        id: 'LSDL-1879-1',
        name: '개미 가시 레이피어',
      },
      {
        id: 'LSDL-1879-2',
        name: '마레 가의 가면',
      },
      {
        id: 'LSDL-1879-3',
        name: '마레 가의 로브',
      },
    ],
  },
  {
    id: 'LSDL-1880',
    categories: ['암령'],
    name: '화산관 암살 퀘스트 2 : 저물지 않는 라일리',
    x: 0.41964,
    y: 0.388279,
  },
  {
    id: 'LSDL-1881',
    categories: ['NPC'],
    name: '타니스',
    x: 0.10315,
    y: 0.372116,
  },
  {
    id: 'LSDL-1883',
    categories: ['NPC'],
    name: '패치',
    x: 0.072069,
    y: 0.347305,
  },
  {
    id: 'LSDL-1884',
    categories: ['암령'],
    name: '화산관 암살 퀘스트 (패치) : 큰 뿔의 트라고스',
    x: 0.208049,
    y: 0.831479,
  },
  {
    id: 'LSDL-1910',
    categories: ['보스'],
    name: '납치하는 소녀 인형 (진자 낫 & 수레바귀)',
    x: 0.215819,
    y: 0.488647,
    loot: [
      {
        id: 'LSDL-1910-1',
        name: '책문 촛대',
      },
    ],
  },
  {
    id: 'LSDL-2271',
    categories: ['기타'],
    name: '신기루의 마술사탑 봉인 3',
    x: 0.61569,
    y: 0.467593,
  },
  {
    id: 'LSDL-2272',
    categories: ['기타'],
    name: '신기루의 마술사 탑 봉인 2',
    x: 0.481204,
    y: 0.496541,
  },
  {
    id: 'LSDL-2325',
    categories: ['축복'],
    name: '숲 건너는 대교',
    x: 0.63392,
    y: 0.481504,
  },
  {
    id: 'LSDL-2326',
    categories: ['NPC'],
    name: '방랑 민족 상인 [7]',
    x: 0.631529,
    y: 0.485262,
  },
  {
    id: 'LSDL-2327',
    categories: ['NPC'],
    name: '방랑 민족 상인 [8]',
    x: 0.203865,
    y: 0.204457,
  },
  {
    id: 'LSDL-2412',
    categories: [],
    name: '납치당하는 구역',
    x: 0.09807,
    y: 0.397678,
    loot: [
      {
        id: 'LSDL-2412-1',
        name: '연기 나비',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-2439',
    categories: [],
    name: '풍양의 숲 북쪽으로 가는 전송문',
    x: 0.638105,
    y: 0.473954,
  },
  {
    id: 'LSDL-2440',
    categories: [],
    name: '풍양의 숲 남쪽 전송문의 도착지',
    x: 0.611088,
    y: 0.15807,
  },
  {
    id: 'LSDL-2494',
    categories: [],
    name: '석관 묘지 ( 겔미어 화산 일부능선 )',
    x: 0.336559,
    y: 0.325126,
    loot: [
      {
        id: 'LSDL-2494-1',
        name: '황금의 룬 [2]',
        quantity: 1,
      },
      {
        id: 'LSDL-2494-2',
        name: '황금의 룬 [3]',
        quantity: 2,
      },
      {
        id: 'LSDL-2494-3',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2494-4',
        name: '황금의 룬 [7]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2501',
    categories: [],
    name: '소재',
    x: 0.482998,
    y: 0.45519,
    loot: [
      {
        id: 'LSDL-2501-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
      {
        id: 'LSDL-2501-2',
        name: '유생 나비',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2502',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.512285,
    y: 0.477369,
    loot: [
      {
        id: 'LSDL-2502-1',
        name: '황금의 룬 [3]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2503',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.561597,
    y: 0.477744,
    loot: [
      {
        id: 'LSDL-2503-1',
        name: '색 잃은 단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2504',
    categories: ['기도'],
    name: '기도 : 황금의 분노',
    x: 0.710427,
    y: 0.475864,
    loot: [
      {
        id: 'LSDL-2504-1',
        name: '황금의 분노',
      },
    ],
  },
  {
    id: 'LSDL-2505',
    categories: ['중요아이템'],
    name: '강건의 흰 육포',
    x: 0.721785,
    y: 0.407447,
    loot: [
      {
        id: 'LSDL-2505-1',
        name: '강건의 흰 육포',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2506',
    categories: [],
    name: '조약돌',
    x: 0.719394,
    y: 0.325124,
    loot: [
      {
        id: 'LSDL-2506-1',
        name: '조약돌',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2507',
    categories: ['무기'],
    name: '신성화의 방패',
    x: 0.719095,
    y: 0.343543,
    loot: [
      {
        id: 'LSDL-2507-1',
        name: '신성화의 방패',
      },
    ],
  },
  {
    id: 'LSDL-2508',
    categories: [],
    name: '금색 반딧불',
    x: 0.616587,
    y: 0.240167,
    loot: [
      {
        id: 'LSDL-2508-1',
        name: '금색 반딧불',
        quantity: 8,
      },
    ],
  },
  {
    id: 'LSDL-2509',
    categories: [],
    name: '유생나비',
    x: 0.608219,
    y: 0.256332,
    loot: [
      {
        id: 'LSDL-2509-1',
        name: '유생나비',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2510',
    categories: ['보스'],
    name: '지렁이 얼굴',
    x: 0.663209,
    y: 0.37775,
    loot: [
      {
        id: 'LSDL-2510-1',
        name: '넘친 붉은 결정 물방울',
      },
      {
        id: 'LSDL-2510-2',
        name: '얼룩색 굳은 물방울',
      },
    ],
  },
  {
    id: 'LSDL-2511',
    categories: [],
    name: '트리나의 수련',
    x: 0.577735,
    y: 0.350684,
    loot: [
      {
        id: 'LSDL-2511-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2512',
    categories: [],
    name: '유생나비',
    x: 0.562793,
    y: 0.391661,
    loot: [
      {
        id: 'LSDL-2512-1',
        name: '유생나비',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2514',
    categories: ['장소'],
    name: '제2 마리카 교회',
    x: 0.465665,
    y: 0.512704,
    loot: [
      {
        id: 'LSDL-2514-1',
        name: '성배의 물방울',
      },
      {
        id: 'LSDL-2514-2',
        name: '피의 장미',
      },
    ],
  },
  {
    id: 'LSDL-2515',
    categories: ['암령'],
    name: '침입 : 보라색 피 손가락 엘레오노라',
    x: 0.471342,
    y: 0.532629,
    loot: [
      {
        id: 'LSDL-2515-1',
        name: '정혈의 결정 물방울',
      },
      {
        id: 'LSDL-2515-2',
        name: '엘레오노라의 쌍치도',
      },
    ],
  },
  {
    id: 'LSDL-2516',
    categories: ['NPC'],
    name: '유라',
    x: 0.461778,
    y: 0.53413,
  },
  {
    id: 'LSDL-2517',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.404398,
    y: 0.463084,
    loot: [
      {
        id: 'LSDL-2517-1',
        name: '황금의 룬 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2518',
    categories: ['탈리스만'],
    name: '희생의 가는 가지',
    x: 0.439962,
    y: 0.693142,
    loot: [
      {
        id: 'LSDL-2518-1',
        name: '희생의 가는 가지',
      },
    ],
  },
  {
    id: 'LSDL-2519',
    categories: ['무기'],
    name: '트롤의 황금 검',
    x: 0.39603,
    y: 0.729605,
    loot: [
      {
        id: 'LSDL-2519-1',
        name: '트롤의 황금 검',
      },
    ],
  },
  {
    id: 'LSDL-2520',
    categories: ['탈리스만'],
    name: '대형 방패의 탈리스만',
    x: 0.372422,
    y: 0.735997,
    loot: [
      {
        id: 'LSDL-2520-1',
        name: '대형 방패의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-2521',
    categories: [],
    name: '성혈의 나무 싹',
    x: 0.573552,
    y: 0.590893,
    loot: [
      {
        id: 'LSDL-2521-1',
        name: '성혈의 나무 싹',
        quantity: 10,
      },
    ],
  },
  {
    id: 'LSDL-2522',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.450122,
    y: 0.861175,
    loot: [
      {
        id: 'LSDL-2522-1',
        name: '석검 열쇠',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2523',
    categories: [],
    name: '미켈라의 수련',
    x: 0.385869,
    y: 0.954017,
    loot: [
      {
        id: 'LSDL-2523-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2524',
    categories: ['보스'],
    name: '황금 일족의 봉인감옥',
    x: 0.422031,
    y: 0.944995,
    loot: [
      {
        id: 'LSDL-2524-1',
        name: '고드프리의 초상',
      },
    ],
  },
  {
    id: 'LSDL-2525',
    categories: ['보스'],
    name: '밤 기병 - 알터 가도',
    x: 0.457595,
    y: 0.783361,
    loot: [
      {
        id: 'LSDL-2525-1',
        name: '성률 공유',
      },
    ],
  },
  {
    id: 'LSDL-2526',
    categories: ['보스'],
    name: '내리는 별의 짐승',
    x: 0.72806,
    y: 0.819071,
    loot: [
      {
        id: 'LSDL-2526-1',
        name: '색 잃은 단석 [5]',
      },
      {
        id: 'LSDL-2526-2',
        name: '단석 [6]',
      },
      {
        id: 'LSDL-2526-3',
        name: '중력석 파편',
      },
      {
        id: 'LSDL-2526-4',
        name: '중력석 덩어리',
      },
    ],
  },
  {
    id: 'LSDL-2527',
    categories: ['보스'],
    name: '트리가드 & 트리가드',
    x: 0.749279,
    y: 0.752535,
    loot: [
      {
        id: 'LSDL-2527-1',
        name: '황금 나무의 대형 방패',
      },
      {
        id: 'LSDL-2527-2',
        name: '영웅의 룬 [1]',
      },
    ],
  },
  {
    id: 'LSDL-2528',
    categories: [],
    name: '트리나의 수련',
    x: 0.795901,
    y: 0.89651,
    loot: [
      {
        id: 'LSDL-2528-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2529',
    categories: [],
    name: '거인 부수기',
    x: 0.832659,
    y: 0.869444,
    loot: [
      {
        id: 'LSDL-2529-1',
        name: '거인 부수기',
      },
    ],
  },
  {
    id: 'LSDL-2530',
    categories: ['제작서'],
    name: '선교사의 제작서 [4]',
    x: 0.904974,
    y: 0.900643,
    loot: [
      {
        id: 'LSDL-2530-1',
        name: '선교사의 제작서 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2531',
    categories: ['무기'],
    name: '가고일의 대형 도끼',
    x: 0.849994,
    y: 0.675849,
    loot: [
      {
        id: 'LSDL-2531-1',
        name: '가고일의 대형 도끼',
      },
    ],
  },
  {
    id: 'LSDL-2532',
    categories: ['전회'],
    name: '상실의 전회',
    x: 0.974022,
    y: 0.648405,
    loot: [
      {
        id: 'LSDL-2532-1',
        name: '상실의 전회',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2533',
    categories: [],
    name: '연기 나비 파밍 위치 - 로데일 외곽',
    x: 0.894224,
    y: 0.673216,
  },
  {
    id: 'LSDL-2534',
    categories: [],
    name: '황금의 룬 [10]',
    x: 0.846407,
    y: 0.539767,
    loot: [
      {
        id: 'LSDL-2534-1',
        name: '황금의 룬 [10]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2535',
    categories: [],
    name: '황금의 룬 [4]',
    x: 0.813832,
    y: 0.566833,
    loot: [
      {
        id: 'LSDL-2535-1',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2536',
    categories: ['탈리스만'],
    name: '녹색 호박 메달리온 +1',
    x: 0.915149,
    y: 0.510069,
    loot: [
      {
        id: 'LSDL-2536-1',
        name: '녹색 호박 메달리온 +1',
      },
    ],
  },
  {
    id: 'LSDL-2537',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.896022,
    y: 0.495411,
    loot: [
      {
        id: 'LSDL-2537-1',
        name: '아르테리아의 잎',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2538',
    categories: [],
    name: '황금의 룬 [7]',
    x: 0.953097,
    y: 0.445414,
    loot: [
      {
        id: 'LSDL-2538-1',
        name: '황금의 룬 [7]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2539',
    categories: [],
    name: '황금의 룬 [12]',
    x: 0.979702,
    y: 0.552171,
    loot: [
      {
        id: 'LSDL-2539-1',
        name: '황금의 룬 [12]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2545',
    categories: [],
    name: '영기류',
    x: 0.930393,
    y: 0.673216,
  },
  {
    id: 'LSDL-2546',
    categories: ['전회'],
    name: '전회 : 기도의 일격',
    x: 0.918439,
    y: 0.765314,
    loot: [
      {
        id: 'LSDL-2546-1',
        name: '기도의 일격',
      },
    ],
  },
  {
    id: 'LSDL-2550',
    categories: [],
    name: '트리나의 수련',
    x: 0.970139,
    y: 0.35181,
    loot: [
      {
        id: 'LSDL-2550-1',
        name: '트리나의 수련',
      },
    ],
  },
  {
    id: 'LSDL-2551',
    categories: ['전회'],
    name: '전회 : 뇌격참',
    x: 0.896022,
    y: 0.329256,
    loot: [
      {
        id: 'LSDL-2551-1',
        name: '뇌격참',
      },
    ],
  },
  {
    id: 'LSDL-2552',
    categories: [],
    name: '황금의 룬 [9]',
    x: 0.909163,
    y: 0.379254,
    loot: [
      {
        id: 'LSDL-2552-1',
        name: '황금의 룬 [9]',
      },
    ],
  },
  {
    id: 'LSDL-2553',
    categories: [],
    name: '네 발가락 새 다리',
    x: 0.777669,
    y: 0.319109,
    loot: [
      {
        id: 'LSDL-2553-1',
        name: '네 발가락 새 다리',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2554',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.762429,
    y: 0.400681,
    loot: [
      {
        id: 'LSDL-2554-1',
        name: '색 잃은 단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2555',
    categories: ['물방울 유생'],
    name: '물방울 유생',
    x: 0.792315,
    y: 0.425866,
    loot: [
      {
        id: 'LSDL-2555-1',
        name: '물방울 유생',
      },
    ],
  },
  {
    id: 'LSDL-2556',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.738222,
    y: 0.692765,
    loot: [
      {
        id: 'LSDL-2556-1',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2557',
    categories: [],
    name: '영기류',
    x: 0.705645,
    y: 0.69314,
  },
  {
    id: 'LSDL-2559',
    categories: ['보스'],
    name: '고룡 란삭스',
    x: 0.721785,
    y: 0.628861,
    loot: [
      {
        id: 'LSDL-2559-1',
        name: '란삭스의 치도',
      },
    ],
  },
  {
    id: 'LSDL-2560',
    categories: [],
    name: '벼락 꽃 & 양 파밍 위치',
    x: 0.721186,
    y: 0.613824,
  },
  {
    id: 'LSDL-2561',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.694887,
    y: 0.629236,
    loot: [
      {
        id: 'LSDL-2561-1',
        name: '석검 열쇠',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2562',
    categories: ['전회'],
    name: '전회 : 벼락 양',
    x: 0.640197,
    y: 0.623597,
    loot: [
      {
        id: 'LSDL-2562-1',
        name: '벼락 양',
      },
    ],
  },
  {
    id: 'LSDL-2563',
    categories: [],
    name: '석관 묘지 - 로데일 외곽',
    x: 0.61031,
    y: 0.614576,
    loot: [
      {
        id: 'LSDL-2563-1',
        name: '황금의 룬 [3]',
        quantity: 1,
      },
      {
        id: 'LSDL-2563-2',
        name: '황금의 룬 [4]',
        quantity: 2,
      },
      {
        id: 'LSDL-2563-3',
        name: '황금의 룬 [6]',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2564',
    categories: ['보스'],
    name: '검은 칼날의 자객',
    x: 0.615091,
    y: 0.559694,
    loot: [
      {
        id: 'LSDL-2564-1',
        name: '검은 칼날',
      },
    ],
  },
  {
    id: 'LSDL-2565',
    categories: ['축복', '던전', '보스'],
    name: '고귀한자의 영웅 묘지',
    x: 0.59746,
    y: 0.560444,
    loot: [
      {
        id: 'LSDL-2565-1',
        name: '묘 은방울 꽃 [3]',
        quantity: 3,
      },
      {
        id: 'LSDL-2565-2',
        name: '묘 은방울 꽃 [4]',
        quantity: 3,
      },
      {
        id: 'LSDL-2565-3',
        name: '묘 은방울 꽃 [5]',
        quantity: 3,
      },
      {
        id: 'LSDL-2565-4',
        name: '영혼 묘 은방울 꽃 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2565-5',
        name: '영혼 묘 은방울 꽃 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-2565-6',
        name: '묘의 보라',
      },
      {
        id: 'LSDL-2565-7',
        name: '로데일 병사의 뼛가루',
      },
      {
        id: 'LSDL-2565-8',
        name: '말하는 머리 "시작할까?"',
      },
      {
        id: 'LSDL-2565-9',
        name: '붉은 종자의 탈리스만',
      },
      {
        id: 'LSDL-2565-10',
        name: '용 표식 방패의 탈리스만 +1',
      },
      {
        id: 'LSDL-2565-11',
        name: '묘 은방울 꽃 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-2565-12',
        name: '고룡 기사 크리스토프',
      },
    ],
  },
  {
    id: 'LSDL-2566',
    categories: [],
    name: '유생나비',
    x: 0.747786,
    y: 0.731109,
    loot: [
      {
        id: 'LSDL-2566-1',
        name: '유생나비',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2567',
    categories: ['축복', '던전', '보스'],
    name: '조향사의 은신 동굴',
    x: 0.731646,
    y: 0.715695,
    loot: [
      {
        id: 'LSDL-2567-1',
        name: '조향병',
        quantity: 1,
      },
      {
        id: 'LSDL-2567-2',
        name: '황금의 룬 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-2567-3',
        name: '아르테리아의 잎',
        quantity: 3,
      },
      {
        id: 'LSDL-2567-4',
        name: '동굴 이끼 꽃눈',
      },
      {
        id: 'LSDL-2567-5',
        name: '동굴 이끼 결정',
      },
      {
        id: 'LSDL-2567-6',
        name: '은색 반딧불',
      },
      {
        id: 'LSDL-2567-7',
        name: '산항아리 파편',
      },
      {
        id: 'LSDL-2567-8',
        name: '흉조잡이의 큰 나대',
      },
    ],
  },
  {
    id: 'LSDL-2568',
    categories: ['기도'],
    name: '기도 : 황금나무의 수호',
    x: 0.637208,
    y: 0.219116,
    loot: [
      {
        id: 'LSDL-2568-1',
        name: '황금나무의 수호',
      },
    ],
  },
  {
    id: 'LSDL-2569',
    categories: ['축복'],
    name: '풍차마을 도미눌라',
    x: 0.745395,
    y: 0.194682,
  },
  {
    id: 'LSDL-2570',
    categories: ['무기'],
    name: '큰 축제의 두개',
    x: 0.786039,
    y: 0.150323,
    loot: [
      {
        id: 'LSDL-2570-1',
        name: '큰 축제의 두개',
      },
    ],
  },
  {
    id: 'LSDL-2571',
    categories: [],
    name: '황금의 룬 [5]',
    x: 0.770199,
    y: 0.177013,
    loot: [
      {
        id: 'LSDL-2571-1',
        name: '황금의 룬 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2572',
    categories: ['중요아이템'],
    name: '룬의 호',
    x: 0.784544,
    y: 0.203703,
    loot: [
      {
        id: 'LSDL-2572-1',
        name: '룬의 호',
      },
    ],
  },
  {
    id: 'LSDL-2573',
    categories: ['중요아이템'],
    name: '항성의 말린 간',
    x: 0.819211,
    y: 0.192049,
    loot: [
      {
        id: 'LSDL-2573-1',
        name: '항성의 말린 간',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2574',
    categories: ['보스'],
    name: '신의 살갗의 사도',
    x: 0.817121,
    y: 0.125513,
    loot: [
      {
        id: 'LSDL-2574-1',
        name: '신의 살갗 쌍날검',
      },
      {
        id: 'LSDL-2574-2',
        name: '쓸어버리는 흑염',
      },
    ],
  },
  {
    id: 'LSDL-2575',
    categories: ['축복'],
    name: '풍차 마을 고지대',
    x: 0.819211,
    y: 0.104085,
  },
  {
    id: 'LSDL-2576',
    categories: ['방어구'],
    name: '귀족 세트',
    x: 0.646173,
    y: 0.071005,
    loot: [
      {
        id: 'LSDL-2576-1',
        name: '진남색 후드',
      },
      {
        id: 'LSDL-2576-2',
        name: '귀족의 여행복',
      },
      {
        id: 'LSDL-2576-3',
        name: '귀족의 장갑',
      },
      {
        id: 'LSDL-2576-4',
        name: '귀족의 바지',
      },
    ],
  },
  {
    id: 'LSDL-2577',
    categories: ['무기'],
    name: '트윈 나이트소드',
    x: 0.639,
    y: 0.06988,
    loot: [
      {
        id: 'LSDL-2577-1',
        name: '트윈 나이트소드',
      },
    ],
  },
  {
    id: 'LSDL-2578',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.737922,
    y: 0.158216,
    loot: [
      {
        id: 'LSDL-2578-1',
        name: '아르테리아의 잎',
      },
    ],
  },
  {
    id: 'LSDL-2579',
    categories: ['장소'],
    name: '마을의 풍차 목장',
    x: 0.732544,
    y: 0.142054,
  },
  {
    id: 'LSDL-2580',
    categories: ['중요아이템'],
    name: '날고기 경단',
    x: 0.725968,
    y: 0.12965,
    loot: [
      {
        id: 'LSDL-2580-1',
        name: '날고기 경단',
        quantity: 10,
      },
    ],
  },
  {
    id: 'LSDL-2581',
    categories: ['방어구'],
    name: '하이마 세트',
    x: 0.60015,
    y: 0.128144,
    loot: [
      {
        id: 'LSDL-2581-1',
        name: '하이마의 휘석 머리',
      },
      {
        id: 'LSDL-2581-2',
        name: '전쟁마술사의 로브',
      },
      {
        id: 'LSDL-2581-3',
        name: '전쟁마술사의 팔 보호대',
      },
      {
        id: 'LSDL-2581-4',
        name: '전쟁마술사의 다리 보호대',
      },
    ],
  },
  {
    id: 'LSDL-2582',
    categories: ['영체'],
    name: '큰 쥐의 뼛가루',
    x: 0.539183,
    y: 0.142055,
    loot: [
      {
        id: 'LSDL-2582-1',
        name: '큰 쥐의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-2583',
    categories: [],
    name: '유생나비',
    x: 0.598356,
    y: 0.108599,
    loot: [
      {
        id: 'LSDL-2583-1',
        name: '유생나비',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2584',
    categories: [],
    name: '황금의 룬 [10]',
    x: 0.546057,
    y: 0.188668,
    loot: [
      {
        id: 'LSDL-2584-1',
        name: '황금의 룬 [10]',
      },
    ],
  },
  {
    id: 'LSDL-2585',
    categories: [],
    name: '영기류',
    x: 0.604633,
    y: 0.219869,
  },
  {
    id: 'LSDL-2586',
    categories: ['중요아이템'],
    name: '수면 이끼약',
    x: 0.607919,
    y: 0.267986,
    loot: [
      {
        id: 'LSDL-2586-1',
        name: '수면 이끼약',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2587',
    categories: [],
    name: '미켈라의 수련',
    x: 0.529619,
    y: 0.393915,
    loot: [
      {
        id: 'LSDL-2587-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2588',
    categories: [],
    name: '황금의 룬 [4]',
    x: 0.462974,
    y: 0.344295,
    loot: [
      {
        id: 'LSDL-2588-1',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2589',
    categories: [],
    name: '성혈 나무의 싹',
    x: 0.527827,
    y: 0.368353,
    loot: [
      {
        id: 'LSDL-2589-1',
        name: '성혈 나무의 싹',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2590',
    categories: [],
    name: '황금의 룬 [5]',
    x: 0.528126,
    y: 0.380758,
    loot: [
      {
        id: 'LSDL-2590-1',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2591',
    categories: [],
    name: '성혈 나무의 싹',
    x: 0.562194,
    y: 0.375121,
    loot: [
      {
        id: 'LSDL-2591-1',
        name: '성혈 나무의 싹',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2592',
    categories: [],
    name: '성혈 나무의 싹',
    x: 0.546057,
    y: 0.377375,
    loot: [
      {
        id: 'LSDL-2592-1',
        name: '성혈 나무의 싹',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-2593',
    categories: [],
    name: '성혈 나무의 싹',
    x: 0.558608,
    y: 0.335648,
    loot: [
      {
        id: 'LSDL-2593-1',
        name: '성혈 나무의 싹',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2594',
    categories: [],
    name: '조약돌',
    x: 0.520953,
    y: 0.2334,
    loot: [
      {
        id: 'LSDL-2594-1',
        name: '조약돌',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2596',
    categories: [],
    name: '미켈라의 수련',
    x: 0.287845,
    y: 0.725097,
    loot: [
      {
        id: 'LSDL-2596-1',
        name: '미켈라의 수련',
      },
    ],
  },
  {
    id: 'LSDL-2597',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.260051,
    y: 0.612699,
    loot: [
      {
        id: 'LSDL-2597-1',
        name: '단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2598',
    categories: [],
    name: '트리나의 수련',
    x: 0.279775,
    y: 0.587512,
    loot: [
      {
        id: 'LSDL-2598-1',
        name: '트리나의 수련',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2599',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.297108,
    y: 0.586761,
    loot: [
      {
        id: 'LSDL-2599-1',
        name: '황금의 룬 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2600',
    categories: [],
    name: '황금의 룬 [7]',
    x: 0.313545,
    y: 0.543906,
    loot: [
      {
        id: 'LSDL-2600-1',
        name: '황금의 룬 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2601',
    categories: [],
    name: '성혈 나무의 싹',
    x: 0.300097,
    y: 0.495789,
    loot: [
      {
        id: 'LSDL-2601-1',
        name: '성혈 나무의 싹',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-2602',
    categories: ['탈리스만'],
    name: '진주룡 표식의 탈리스만 +1',
    x: 0.296809,
    y: 0.512705,
    loot: [
      {
        id: 'LSDL-2602-1',
        name: '진주룡 표식의 탈리스만 +1',
      },
    ],
  },
  {
    id: 'LSDL-2603',
    categories: [],
    name: '유생나비',
    x: 0.274397,
    y: 0.76156,
  },
  {
    id: 'LSDL-2604',
    categories: ['방어구'],
    name: '영주 세트',
    x: 0.220302,
    y: 0.732991,
    loot: [
      {
        id: 'LSDL-2604-1',
        name: '영주의 가면',
      },
      {
        id: 'LSDL-2604-2',
        name: '영주의 로브',
      },
    ],
  },
  {
    id: 'LSDL-2605',
    categories: ['전회'],
    name: '전회 : 성률',
    x: 0.127357,
    y: 0.690136,
    loot: [
      {
        id: 'LSDL-2605-1',
        name: '성률',
      },
    ],
  },
  {
    id: 'LSDL-2606',
    categories: [],
    name: '미켈라의 수련',
    x: 0.073265,
    y: 0.696904,
    loot: [
      {
        id: 'LSDL-2606-1',
        name: '미켈라의 수련',
        quantity: 10,
      },
    ],
  },
  {
    id: 'LSDL-2607',
    categories: ['장소'],
    name: '조향사의 폐허',
    x: 0.056829,
    y: 0.639766,
    loot: [
      {
        id: 'LSDL-2607-1',
        name: '조향병',
        quantity: 2,
      },
      {
        id: 'LSDL-2607-2',
        name: '조향사의 제작서 [1]',
      },
      {
        id: 'LSDL-2607-3',
        name: '조향의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-2608',
    categories: [],
    name: '유생나비',
    x: 0.112714,
    y: 0.622472,
    loot: [
      {
        id: 'LSDL-2608-1',
        name: '유생나비',
      },
    ],
  },
  {
    id: 'LSDL-2609',
    categories: [],
    name: '트리나의 수련',
    x: 0.227773,
    y: 0.609314,
    loot: [
      {
        id: 'LSDL-2609-1',
        name: '트리나의 수련',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2611',
    categories: ['기도'],
    name: '불의 대죄',
    x: 0.842223,
    y: 0.194681,
    loot: [
      {
        id: 'LSDL-2611-1',
        name: '불의 대죄',
      },
    ],
  },
  {
    id: 'LSDL-2613',
    categories: ['보스'],
    name: '고룡 란삭스',
    x: 0.24182,
    y: 0.696903,
  },
  {
    id: 'LSDL-2614',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.045471,
    y: 0.689011,
    loot: [
      {
        id: 'LSDL-2614-1',
        name: '아르테리아의 잎',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2617',
    categories: ['일반묘'],
    name: '묘 은방울 꽃 [2]',
    x: 0.053241,
    y: 0.880725,
    loot: [
      {
        id: 'LSDL-2617-1',
        name: '묘 은방울 꽃 [2]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2618',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.093885,
    y: 0.934098,
  },
  {
    id: 'LSDL-2619',
    categories: [],
    name: '트리나의 수련',
    x: 0.048759,
    y: 0.992368,
    loot: [
      {
        id: 'LSDL-2619-1',
        name: '트리나의 수련',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-2621',
    categories: ['중요아이템'],
    name: '동굴 안',
    x: 0.272006,
    y: 0.835614,
    loot: [
      {
        id: 'LSDL-2621-1',
        name: '단석 [3]',
        quantity: 1,
      },
      {
        id: 'LSDL-2621-2',
        name: '단석 [4]',
        quantity: 4,
      },
      {
        id: 'LSDL-2621-3',
        name: '단석 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-2621-4',
        name: '색 잃은 단석 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2621-5',
        name: '망가진 결정',
      },
      {
        id: 'LSDL-2621-6',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-2621-7',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2622',
    categories: ['중요아이템'],
    name: '절벽 구간',
    x: 0.267522,
    y: 0.787497,
    loot: [
      {
        id: 'LSDL-2622-1',
        name: '단석 [3]',
        quantity: 2,
      },
      {
        id: 'LSDL-2622-2',
        name: '단석 [4]',
        quantity: 5,
      },
      {
        id: 'LSDL-2622-3',
        name: '색 잃은 단석 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2622-4',
        name: '망가진 결정',
      },
      {
        id: 'LSDL-2622-5',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-2622-6',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2622-7',
        name: '황금의 룬 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-2622-8',
        name: '황금의 룬 [6]',
        quantity: 3,
      },
      {
        id: 'LSDL-2622-9',
        name: '뱀신의 곡도',
      },
    ],
  },
  {
    id: 'LSDL-2623',
    categories: ['NPC'],
    name: '협력 NPC 소환',
    x: 0.19729,
    y: 0.834111,
  },
  {
    id: 'LSDL-2624',
    categories: ['보스'],
    name: '용암토룡 마카르',
    x: 0.165014,
    y: 0.817571,
    loot: [
      {
        id: 'LSDL-2624-1',
        name: '토룡의 비늘검',
      },
      {
        id: 'LSDL-2624-2',
        name: '용의 심장',
      },
    ],
  },
  {
    id: 'LSDL-2625',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.179956,
    y: 0.750282,
  },
  {
    id: 'LSDL-2626',
    categories: [],
    name: '트리나의 수련',
    x: 0.297108,
    y: 0.815691,
  },
  {
    id: 'LSDL-2627',
    categories: ['전회'],
    name: '전회 : 연속 사격',
    x: 0.225382,
    y: 0.509698,
    loot: [
      {
        id: 'LSDL-2627-1',
        name: '연속 사격',
      },
    ],
  },
  {
    id: 'LSDL-2628',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.211037,
    y: 0.36234,
    loot: [
      {
        id: 'LSDL-2628-1',
        name: '단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2629',
    categories: [],
    name: '화산석 파밍 위치 (끓는 강)',
    x: 0.202371,
    y: 0.353319,
  },
  {
    id: 'LSDL-2630',
    categories: ['중요아이템'],
    name: '죽음 이끼약',
    x: 0.213728,
    y: 0.317606,
    loot: [
      {
        id: 'LSDL-2630-1',
        name: '죽음 이끼약',
      },
    ],
  },
  {
    id: 'LSDL-2631',
    categories: [],
    name: '유생 나비',
    x: 0.211337,
    y: 0.301069,
    loot: [
      {
        id: 'LSDL-2631-1',
        name: '유생 나비',
      },
    ],
  },
  {
    id: 'LSDL-2632',
    categories: [],
    name: '미켈라의 수련',
    x: 0.191314,
    y: 0.331892,
    loot: [
      {
        id: 'LSDL-2632-1',
        name: '미켈라의 수련',
      },
    ],
  },
  {
    id: 'LSDL-2633',
    categories: ['중요아이템'],
    name: '항염의 말린 간',
    x: 0.080437,
    y: 0.312346,
    loot: [
      {
        id: 'LSDL-2633-1',
        name: '항염의 말린 간',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2634',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.024551,
    y: 0.330014,
    loot: [
      {
        id: 'LSDL-2634-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2643',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.376903,
    y: 0.308583,
    loot: [
      {
        id: 'LSDL-2643-1',
        name: '아르테리아의 잎',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2644',
    categories: [],
    name: '황금의 룬 [8]',
    x: 0.336857,
    y: 0.286407,
    loot: [
      {
        id: 'LSDL-2644-1',
        name: '황금의 룬 [8]',
      },
    ],
  },
  {
    id: 'LSDL-2645',
    categories: [],
    name: '성혈의 나무 싹',
    x: 0.300995,
    y: 0.241297,
    loot: [
      {
        id: 'LSDL-2645-1',
        name: '성혈의 나무 싹',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-2646',
    categories: ['암령'],
    name: '암령 : 빛바랜 자를 먹는 아나스타시아',
    x: 0.283063,
    y: 0.241298,
    loot: [
      {
        id: 'LSDL-2646-1',
        name: '신성한 해체 식칼',
      },
    ],
  },
  {
    id: 'LSDL-2647',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.234349,
    y: 0.255206,
    loot: [
      {
        id: 'LSDL-2647-1',
        name: '석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-2648',
    categories: [],
    name: '성혈 나무의 싹',
    x: 0.265132,
    y: 0.310465,
    loot: [
      {
        id: 'LSDL-2648-1',
        name: '성혈 나무의 싹',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2649',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.254671,
    y: 0.280768,
    loot: [
      {
        id: 'LSDL-2649-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2650',
    categories: ['무기'],
    name: '도르래 활',
    x: 0.267224,
    y: 0.297683,
    loot: [
      {
        id: 'LSDL-2650-1',
        name: '도르래 활',
      },
    ],
  },
  {
    id: 'LSDL-2651',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.222096,
    y: 0.408203,
    loot: [
      {
        id: 'LSDL-2651-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2652',
    categories: ['축복', '던전', '보스'],
    name: '겔미어 영웅묘지',
    x: 0.252579,
    y: 0.392789,
    loot: [
      {
        id: 'LSDL-2652-1',
        name: '당랑도',
      },
      {
        id: 'LSDL-2652-2',
        name: '사냥개 기사의 투구',
      },
      {
        id: 'LSDL-2652-3',
        name: '사냥개 기사의 갑옷',
      },
      {
        id: 'LSDL-2652-4',
        name: '사냥개 기사의 장갑',
      },
      {
        id: 'LSDL-2652-5',
        name: '사냥개 기사의 각반',
      },
      {
        id: 'LSDL-2652-6',
        name: '겔미어 기사의 투구',
      },
      {
        id: 'LSDL-2652-7',
        name: '겔미어 기사의 갑옷',
      },
      {
        id: 'LSDL-2652-8',
        name: '겔미어 기사의 장갑',
      },
      {
        id: 'LSDL-2652-9',
        name: '겔미어 기사의 각반',
      },
      {
        id: 'LSDL-2652-10',
        name: '반지 손가락',
      },
      {
        id: 'LSDL-2652-11',
        name: '석검 열쇠',
        quantity: 2,
      },
      {
        id: 'LSDL-2652-12',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
      {
        id: 'LSDL-2652-13',
        name: '묘 은방울 꽃 [6]',
        quantity: 2,
      },
      {
        id: 'LSDL-2652-14',
        name: '묘 은방울 꽃 [7]',
        quantity: 7,
      },
      {
        id: 'LSDL-2652-15',
        name: '영혼 묘 은방울 꽃 [7]',
        quantity: 1,
      },
      {
        id: 'LSDL-2652-16',
        name: '묘의 보라',
      },
      {
        id: 'LSDL-2652-17',
        name: '사냥개 기사 플로',
      },
      {
        id: 'LSDL-2652-18',
        name: '사근',
      },
    ],
  },
  {
    id: 'LSDL-2653',
    categories: ['무기'],
    name: '시체 뒤지는 자의 곡검',
    x: 0.232257,
    y: 0.207089,
    loot: [
      {
        id: 'LSDL-2653-1',
        name: '시체 뒤지는 자의 곡검',
      },
    ],
  },
  {
    id: 'LSDL-2654',
    categories: [],
    name: '트리나의 수련',
    x: 0.207453,
    y: 0.155965,
    loot: [
      {
        id: 'LSDL-2654-1',
        name: '트리나의 수련',
      },
    ],
  },
  {
    id: 'LSDL-2655',
    categories: [],
    name: '성혈 나무의 싹',
    x: 0.209543,
    y: 0.189046,
    loot: [
      {
        id: 'LSDL-2655-1',
        name: '성혈 나무의 싹',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-2656',
    categories: [],
    name: '이옐로의 눈동자',
    x: 0.180853,
    y: 0.189046,
    loot: [
      {
        id: 'LSDL-2656-1',
        name: '이옐로의 눈동자',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2657',
    categories: [],
    name: '노란 잔불',
    x: 0.186532,
    y: 0.204082,
    loot: [
      {
        id: 'LSDL-2657-1',
        name: '노란 잔불',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-2658',
    categories: [],
    name: '이옐로의 눈동자',
    x: 0.172784,
    y: 0.219494,
    loot: [
      {
        id: 'LSDL-2658-1',
        name: '이옐로의 눈동자',
      },
    ],
  },
  {
    id: 'LSDL-2659',
    categories: ['중요아이템'],
    name: '별빛 조각',
    x: 0.124071,
    y: 0.290166,
    loot: [
      {
        id: 'LSDL-2659-1',
        name: '별빛 조각',
      },
    ],
  },
  {
    id: 'LSDL-2660',
    categories: ['전회'],
    name: '전회 : 관통 사격',
    x: 0.012298,
    y: 0.249946,
    loot: [
      {
        id: 'LSDL-2660-1',
        name: '관통 사격',
      },
    ],
  },
  {
    id: 'LSDL-2662',
    categories: ['물방울 유생'],
    name: '물방울 유생',
    x: 0.096276,
    y: 0.290919,
    loot: [
      {
        id: 'LSDL-2662-1',
        name: '물방울 유생',
      },
    ],
  },
  {
    id: 'LSDL-2663',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.177866,
    y: 0.280393,
    loot: [
      {
        id: 'LSDL-2663-1',
        name: '황금의 룬 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2664',
    categories: [],
    name: '황금의 룬 [4]',
    x: 0.177866,
    y: 0.280393,
    loot: [
      {
        id: 'LSDL-2664-1',
        name: '황금의 룬 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2665',
    categories: ['장소'],
    name: '화산관',
    x: 0.096276,
    y: 0.324375,
  },
  {
    id: 'LSDL-2666',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.077149,
    y: 0.331142,
    loot: [
      {
        id: 'LSDL-2666-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2667',
    categories: ['암령'],
    name: '암령 침입 : 책문관 기자',
    x: 0.078645,
    y: 0.340915,
    loot: [
      {
        id: 'LSDL-2667-1',
        name: '기자의 수레바퀴',
      },
    ],
  },
  {
    id: 'LSDL-2668',
    categories: ['NPC'],
    name: '유령 npc',
    x: 0.07446,
    y: 0.36347,
  },
  {
    id: 'LSDL-2669',
    categories: ['축복'],
    name: '화산관',
    x: 0.095083,
    y: 0.372867,
  },
  {
    id: 'LSDL-2670',
    categories: ['중요아이템'],
    name: '화산관 비밀 통로 입구',
    x: 0.084322,
    y: 0.362717,
    loot: [
      {
        id: 'LSDL-2670-1',
        name: '조향병',
        quantity: 1,
      },
      {
        id: 'LSDL-2670-2',
        name: '사냥개의 발톱',
      },
      {
        id: 'LSDL-2670-3',
        name: '항염의 말린 간',
        quantity: 1,
      },
      {
        id: 'LSDL-2670-4',
        name: '방랑 전사의 제작서 [21]',
      },
      {
        id: 'LSDL-2670-5',
        name: '타락 조향상 카르만',
      },
    ],
  },
  {
    id: 'LSDL-2672',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.017678,
    y: 0.394296,
    loot: [
      {
        id: 'LSDL-2672-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2673',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.00931,
    y: 0.399558,
    loot: [
      {
        id: 'LSDL-2673-1',
        name: '색 잃은 단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2674',
    categories: [],
    name: '황금의 룬 [9]',
    x: 0.001839,
    y: 0.410834,
    loot: [
      {
        id: 'LSDL-2674-1',
        name: '황금의 룬 [9]',
      },
    ],
  },
  {
    id: 'LSDL-2676',
    categories: [],
    name: '황금의 룬 [5]',
    x: 0.018874,
    y: 0.420233,
    loot: [
      {
        id: 'LSDL-2676-1',
        name: '황금의 룬 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2678',
    categories: [],
    name: '황금의 룬 [10]',
    x: 0.007815,
    y: 0.477372,
    loot: [
      {
        id: 'LSDL-2678-1',
        name: '황금의 룬 [10]',
      },
    ],
  },
  {
    id: 'LSDL-2680',
    categories: ['중요아이템'],
    name: '항염의 말린 간',
    x: 0.01439,
    y: 0.487522,
    loot: [
      {
        id: 'LSDL-2680-1',
        name: '항염의 말린 간',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2681',
    categories: [],
    name: '황금의 룬 [9]',
    x: 0.025149,
    y: 0.459328,
    loot: [
      {
        id: 'LSDL-2681-1',
        name: '황금의 룬 [9]',
      },
    ],
  },
  {
    id: 'LSDL-2682',
    categories: ['중요아이템'],
    name: '용의 심장',
    x: 0.088208,
    y: 0.449928,
    loot: [
      {
        id: 'LSDL-2682-1',
        name: '용의 심장',
      },
    ],
  },
  {
    id: 'LSDL-2683',
    categories: ['일반단석'],
    name: '단석 [7]',
    x: 0.078645,
    y: 0.443163,
    loot: [
      {
        id: 'LSDL-2683-1',
        name: '단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2684',
    categories: ['중요아이템'],
    name: '용암지대 동굴 안',
    x: 0.016781,
    y: 0.384146,
    loot: [
      {
        id: 'LSDL-2684-1',
        name: '그을림의 방패',
      },
      {
        id: 'LSDL-2684-2',
        name: '황금의 룬 [9]',
        quantity: 1,
      },
      {
        id: 'LSDL-2684-3',
        name: '단석 [6]',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2685',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.007815,
    y: 0.431134,
    loot: [
      {
        id: 'LSDL-2685-1',
        name: '석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-2686',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.081036,
    y: 0.477747,
    loot: [
      {
        id: 'LSDL-2686-1',
        name: '색 잃은 단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2687',
    categories: ['보스'],
    name: '신의 살갗의 귀인',
    x: 0.093587,
    y: 0.465342,
    loot: [
      {
        id: 'LSDL-2687-1',
        name: '신의 살갗 대자검',
      },
      {
        id: 'LSDL-2687-2',
        name: '귀족의 배짱',
      },
    ],
  },
  {
    id: 'LSDL-2688',
    categories: [],
    name: '황금의 룬 [12]',
    x: 0.123473,
    y: 0.475115,
    loot: [
      {
        id: 'LSDL-2688-1',
        name: '황금의 룬 [12]',
      },
    ],
  },
  {
    id: 'LSDL-2689',
    categories: ['색단석'],
    name: '색 잃은 단석 [6]',
    x: 0.071473,
    y: 0.378881,
    loot: [
      {
        id: 'LSDL-2689-1',
        name: '색 잃은 단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2690',
    categories: ['방어구'],
    name: '시민의 모자',
    x: 0.085818,
    y: 0.398429,
    loot: [
      {
        id: 'LSDL-2690-1',
        name: '시민의 모자',
      },
    ],
  },
  {
    id: 'LSDL-2692',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.094484,
    y: 0.42963,
    loot: [
      {
        id: 'LSDL-2692-1',
        name: '석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-2693',
    categories: ['영체'],
    name: '뱀 인간의 뼛가루',
    x: 0.092093,
    y: 0.361215,
    loot: [
      {
        id: 'LSDL-2693-1',
        name: '뱀 인간의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-2694',
    categories: [],
    name: '라이커드 전송문',
    x: 0.109428,
    y: 0.359334,
  },
  {
    id: 'LSDL-2695',
    categories: ['중요아이템'],
    name: '석검 열쇠 필요 (1개)',
    x: 0.066691,
    y: 0.361591,
    loot: [
      {
        id: 'LSDL-2695-1',
        name: '단검의 탈리스만',
      },
      {
        id: 'LSDL-2695-2',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-2695-3',
        name: '모판의 저주',
        quantity: 1,
      },
      {
        id: 'LSDL-2695-4',
        name: '도읍 기사의 결의',
      },
      {
        id: 'LSDL-2695-5',
        name: '색 잃은 단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2697',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.011701,
    y: 0.567213,
    loot: [
      {
        id: 'LSDL-2697-1',
        name: '단석 [6]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2698',
    categories: ['장소'],
    name: '은자의 오두막',
    x: 0.006321,
    y: 0.545411,
    loot: [
      {
        id: 'LSDL-2698-1',
        name: '솟구치는 용암',
      },
    ],
  },
  {
    id: 'LSDL-2699',
    categories: [],
    name: '조약돌',
    x: 0.046667,
    y: 0.551426,
    loot: [
      {
        id: 'LSDL-2699-1',
        name: '조약돌',
      },
    ],
  },
  {
    id: 'LSDL-2700',
    categories: [],
    name: '산양 파밍 위치 (장인의 오두막)',
    x: 0.121382,
    y: 0.557065,
  },
  {
    id: 'LSDL-2701',
    categories: [],
    name: '성혈의 나무 싹',
    x: 0.169796,
    y: 0.534885,
    loot: [
      {
        id: 'LSDL-2701-1',
        name: '성혈의 나무 싹',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2702',
    categories: ['중요아이템'],
    name: '별빛 조각',
    x: 0.216417,
    y: 0.514587,
    loot: [
      {
        id: 'LSDL-2702-1',
        name: '별빛 조각',
      },
    ],
  },
  {
    id: 'LSDL-2703',
    categories: ['방어구'],
    name: '아로다스의 휘석 머리',
    x: 0.194301,
    y: 0.518345,
    loot: [
      {
        id: 'LSDL-2703-1',
        name: '아로다스의 휘석 머리',
      },
    ],
  },
  {
    id: 'LSDL-2704',
    categories: ['장소'],
    name: '은자의 마을',
    x: 0.174279,
    y: 0.499926,
  },
  {
    id: 'LSDL-2705',
    categories: [],
    name: '성혈의 나무 싹',
    x: 0.223888,
    y: 0.496543,
    loot: [
      {
        id: 'LSDL-2705-1',
        name: '성혈의 나무 싹',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-2706',
    categories: ['보스'],
    name: '아인 여왕 마기',
    x: 0.200579,
    y: 0.464964,
    loot: [
      {
        id: 'LSDL-2706-1',
        name: '메모리 스톤',
      },
    ],
  },
  {
    id: 'LSDL-2707',
    categories: ['중요아이템'],
    name: '저지대',
    x: 0.017378,
    y: 0.411587,
    loot: [
      {
        id: 'LSDL-2707-1',
        name: '황금의 룬 [6]',
      },
      {
        id: 'LSDL-2707-2',
        name: '황금 나무의 성인',
      },
    ],
  },
  {
    id: 'LSDL-2708',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.319224,
    y: 0.204081,
    loot: [
      {
        id: 'LSDL-2708-1',
        name: '단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2709',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.434584,
    y: 0.296932,
    loot: [
      {
        id: 'LSDL-2709-1',
        name: '황금의 룬 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2710',
    categories: [],
    name: '미켈라의 수련',
    x: 0.455503,
    y: 0.165361,
    loot: [
      {
        id: 'LSDL-2710-1',
        name: '미켈라의 수련',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2711',
    categories: [],
    name: '트리나의 수련',
    x: 0.462676,
    y: 0.175136,
    loot: [
      {
        id: 'LSDL-2711-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2712',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.446837,
    y: 0.279638,
    loot: [
      {
        id: 'LSDL-2712-1',
        name: '단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2713',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.434284,
    y: 0.28227,
    loot: [
      {
        id: 'LSDL-2713-1',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2714',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.442353,
    y: 0.293171,
    loot: [
      {
        id: 'LSDL-2714-1',
        name: '단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2715',
    categories: ['중요아이템'],
    name: '독 이끼 약',
    x: 0.399318,
    y: 0.255958,
    loot: [
      {
        id: 'LSDL-2715-1',
        name: '독 이끼 약',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2716',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.410675,
    y: 0.216485,
    loot: [
      {
        id: 'LSDL-2716-1',
        name: '단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2717',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.4041,
    y: 0.225132,
    loot: [
      {
        id: 'LSDL-2717-1',
        name: '색 잃은 단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2718',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [4]',
    x: 0.410974,
    y: 0.228515,
    loot: [
      {
        id: 'LSDL-2718-1',
        name: '영혼 묘 은방울 꽃 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2719',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.432491,
    y: 0.252198,
    loot: [
      {
        id: 'LSDL-2719-1',
        name: '단석 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2720',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.433088,
    y: 0.234529,
    loot: [
      {
        id: 'LSDL-2720-1',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2721',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.456698,
    y: 0.228139,
    loot: [
      {
        id: 'LSDL-2721-1',
        name: '단석 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2722',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.456698,
    y: 0.228139,
    loot: [
      {
        id: 'LSDL-2722-1',
        name: '단석 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2723',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.465665,
    y: 0.221371,
    loot: [
      {
        id: 'LSDL-2723-1',
        name: '단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2724',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.479411,
    y: 0.238664,
    loot: [
      {
        id: 'LSDL-2724-1',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2725',
    categories: [],
    name: '황금의 룬 [4]',
    x: 0.439065,
    y: 0.218742,
    loot: [
      {
        id: 'LSDL-2725-1',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2726',
    categories: [],
    name: '금색 반딧불',
    x: 0.462974,
    y: 0.18754,
    loot: [
      {
        id: 'LSDL-2726-1',
        name: '금색 반딧불',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2727',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.4564,
    y: 0.196938,
    loot: [
      {
        id: 'LSDL-2727-1',
        name: '단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2728',
    categories: ['축복'],
    name: '성주의 응접실',
    x: 0.425319,
    y: 0.202202,
  },
  {
    id: 'LSDL-2730',
    categories: [],
    name: '에오니아 나비',
    x: 0.474031,
    y: 0.2225,
    loot: [
      {
        id: 'LSDL-2730-1',
        name: '에오니아 나비',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2782',
    categories: ['NPC'],
    name: '화산관 NPC들',
    x: 0.080437,
    y: 0.380385,
  },
  {
    id: 'LSDL-2784',
    categories: ['무기'],
    name: '큰 뱀 사냥꾼',
    x: 0.123473,
    y: 0.362716,
    loot: [
      {
        id: 'LSDL-2784-1',
        name: '큰 뱀 사냥꾼',
      },
    ],
  },
  {
    id: 'LSDL-2785',
    categories: ['NPC'],
    name: '타니스',
    x: 0.125863,
    y: 0.402564,
  },
  {
    id: 'LSDL-2786',
    categories: ['방어구'],
    name: '눈동자 서코트',
    x: 0.105541,
    y: 0.405947,
    loot: [
      {
        id: 'LSDL-2786-1',
        name: '눈동자 서코트',
      },
    ],
  },
  {
    id: 'LSDL-2815',
    categories: ['색단석'],
    name: '색 잃은 단석 [3]',
    x: 0.274096,
    y: 0.882227,
  },
  {
    id: 'LSDL-2877',
    categories: [],
    name: '황금의 룬 [12]',
    x: 0.837441,
    y: 0.535634,
    loot: [
      {
        id: 'LSDL-2877-1',
        name: '황금의 룬 [12]',
      },
    ],
  },
  {
    id: 'LSDL-2920',
    categories: ['NPC'],
    name: '밀리센트 [4]',
    x: 0.815923,
    y: 0.113484,
  },
  {
    id: 'LSDL-2926',
    categories: [],
    name: '끈',
    x: 0.305177,
    y: 0.720584,
    loot: [
      {
        id: 'LSDL-2926-1',
        name: '끈',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2927',
    categories: ['전회'],
    name: '전회 : 돌격 강타',
    x: 0.303087,
    y: 0.703293,
    loot: [
      {
        id: 'LSDL-2927-1',
        name: '돌격 강타',
      },
    ],
  },
  {
    id: 'LSDL-2928',
    categories: ['보스'],
    name: '아인 여왕 기리카',
    x: 0.296511,
    y: 0.714194,
    loot: [
      {
        id: 'LSDL-2928-1',
        name: '봉투 검의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-2931',
    categories: ['그릇'],
    name: '조향병 - 알터가도 세갈래 북쪽',
    x: 0.491664,
    y: 0.649536,
    loot: [
      {
        id: 'LSDL-2931-1',
        name: '조향병',
      },
    ],
  },
  {
    id: 'LSDL-2938',
    categories: ['제작서'],
    name: '방랑 전사의 제작서 [19]',
    x: 0.67576,
    y: 0.349933,
    loot: [
      {
        id: 'LSDL-2938-1',
        name: '방랑 전사의 제작서 [19]',
      },
    ],
  },
  {
    id: 'LSDL-2960',
    categories: ['NPC'],
    name: '조라야스',
    x: 0.116899,
    y: 0.441284,
  },
  {
    id: 'LSDL-2965',
    categories: ['중요아이템'],
    name: '말하는 머리 "너는 아름다워"',
    x: 0.185635,
    y: 0.504812,
    loot: [
      {
        id: 'LSDL-2965-1',
        name: '말하는 머리 "너는 아름다워"',
      },
    ],
  },
  {
    id: 'LSDL-2967',
    categories: ['NPC'],
    name: '금 가면 경 & 콜린 [1]',
    x: 0.616289,
    y: 0.216109,
  },
  {
    id: 'LSDL-2968',
    categories: ['방어구'],
    name: '빛나는 금 가면',
    x: 0.609713,
    y: 0.295427,
    loot: [
      {
        id: 'LSDL-2968-1',
        name: '빛나는 금 가면',
      },
    ],
  },
  {
    id: 'LSDL-2983',
    categories: ['축복'],
    name: '덱타스 대승강기',
    x: 0.316234,
    y: 0.92245,
  },
  {
    id: 'LSDL-2986',
    categories: ['색단석'],
    name: '색 잃은 단석 [7]',
    x: 0.063105,
    y: 0.400686,
    loot: [
      {
        id: 'LSDL-2986-1',
        name: '색 잃은 단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2987',
    categories: ['색단석'],
    name: '색 잃은 단석 [2]',
    x: 0.10614,
    y: 0.429255,
    loot: [
      {
        id: 'LSDL-2987-1',
        name: '색 잃은 단석 [2]',
      },
    ],
  },
];

// LSDL base-game map, checked 2026-11-21; patch unspecified.
// Source, terrain alignment and description review: reference-data/maps/mt-gelmir/.
// Regenerate: node reference-data/maps/generate.mjs mt-gelmir.
const MT_GELMIR_MARKERS = [
  {
    id: 'LSDL-128',
    categories: ['축복', '던전', '보스'],
    name: '끓는 강 동굴',
    x: 0.555571,
    y: 0.413054,
    loot: [
      {
        id: 'LSDL-128-1',
        name: '동굴 이끼',
      },
      {
        id: 'LSDL-128-2',
        name: '동굴 이끼결정',
      },
      {
        id: 'LSDL-128-3',
        name: '동굴 이끼꽃눈',
      },
      {
        id: 'LSDL-128-4',
        name: '독꽃',
      },
      {
        id: 'LSDL-128-5',
        name: '독곰팡이버섯',
      },
      {
        id: 'LSDL-128-6',
        name: '부패이끼약',
        quantity: 1,
      },
      {
        id: 'LSDL-128-7',
        name: '면역의 육포',
        quantity: 1,
      },
      {
        id: 'LSDL-128-8',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
      {
        id: 'LSDL-128-9',
        name: '황금의 룬 [7]',
        quantity: 1,
      },
      {
        id: 'LSDL-128-10',
        name: '버섯머리',
      },
      {
        id: 'LSDL-128-11',
        name: '버섯몸',
      },
      {
        id: 'LSDL-128-12',
        name: '버섯팔',
      },
      {
        id: 'LSDL-128-13',
        name: '버섯다리',
      },
      {
        id: 'LSDL-128-14',
        name: '부패 권속의 환의',
      },
    ],
  },
  {
    id: 'LSDL-141',
    categories: ['축복', '던전', '보스'],
    name: '화산 동굴',
    x: 0.497294,
    y: 0.088027,
    loot: [
      {
        id: 'LSDL-141-1',
        name: '똬리 방패',
      },
      {
        id: 'LSDL-141-2',
        name: '아르테리아의 잎',
        quantity: 3,
      },
      {
        id: 'LSDL-141-3',
        name: '동굴 이끼',
      },
      {
        id: 'LSDL-141-4',
        name: '동굴 이끼꽃눈',
      },
      {
        id: 'LSDL-141-5',
        name: '동굴 이끼결정',
      },
      {
        id: 'LSDL-141-6',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
      {
        id: 'LSDL-141-7',
        name: '대포 항아리',
      },
    ],
  },
  {
    id: 'LSDL-624',
    categories: ['축복'],
    name: '죄인교',
    x: 0.944296,
    y: 0.503849,
  },
  {
    id: 'LSDL-627',
    categories: ['축복'],
    name: '겔미어 화산 일부 능선',
    x: 0.821849,
    y: 0.413231,
  },
  {
    id: 'LSDL-630',
    categories: ['축복'],
    name: '원류의 마술사 아줄',
    x: 0.585332,
    y: 0.608432,
  },
  {
    id: 'LSDL-631',
    categories: ['축복'],
    name: '땅 밑 책문소',
    x: 0.492345,
    y: 0.583575,
    loot: [
      {
        id: 'LSDL-631-1',
        name: '단석 [4]',
      },
      {
        id: 'LSDL-631-2',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-632',
    categories: ['축복'],
    name: '알현의 길',
    x: 0.434339,
    y: 0.446357,
  },
  {
    id: 'LSDL-634',
    categories: ['축복'],
    name: '모독의 군주 라이커드',
    x: 0.428013,
    y: 0.551038,
  },
  {
    id: 'LSDL-635',
    categories: ['축복'],
    name: '에이그레이 성당',
    x: 0.402178,
    y: 0.664388,
    loot: [
      {
        id: 'LSDL-635-1',
        name: '황금의 룬 [9]',
      },
    ],
  },
  {
    id: 'LSDL-636',
    categories: ['축복'],
    name: '감옥 거리 교회',
    x: 0.285827,
    y: 0.560034,
  },
  {
    id: 'LSDL-637',
    categories: ['축복'],
    name: '끓는 강 종단',
    x: 0.218474,
    y: 0.470051,
  },
  {
    id: 'LSDL-638',
    categories: ['축복'],
    name: '영빈관',
    x: 0.222283,
    y: 0.652874,
  },
  {
    id: 'LSDL-639',
    categories: ['축복'],
    name: '죄인 이송용 길',
    x: 0.316685,
    y: 0.371817,
  },
  {
    id: 'LSDL-640',
    categories: ['축복'],
    name: '겔미어 화산 구부 능선',
    x: 0.445232,
    y: 0.264404,
  },
  {
    id: 'LSDL-642',
    categories: ['축복', '던전', '보스'],
    name: '추한 지하 묘지 (혼종)',
    x: 0.29444,
    y: 0.965692,
    loot: [
      {
        id: 'LSDL-642-1',
        name: '날개 혼종의 뼛가루',
      },
      {
        id: 'LSDL-642-2',
        name: '말하는 머리 "미안해"',
      },
      {
        id: 'LSDL-642-3',
        name: '묘 은방울 꽃 [4]',
        quantity: 3,
      },
      {
        id: 'LSDL-642-4',
        name: '묘 은방울 꽃 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-642-5',
        name: '영혼 묘 은방울 꽃 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-642-6',
        name: '룬의 호',
      },
      {
        id: 'LSDL-642-7',
        name: '묘의 보라',
      },
      {
        id: 'LSDL-642-8',
        name: '조향사 트리샤',
      },
    ],
  },
  {
    id: 'LSDL-643',
    categories: ['축복'],
    name: '강인의 오두막',
    x: 0.423632,
    y: 0.838941,
    loot: [
      {
        id: 'LSDL-643-1',
        name: '미켈라의 수련',
        quantity: 1,
      },
      {
        id: 'LSDL-643-2',
        name: '도르래 석궁',
      },
    ],
  },
  {
    id: 'LSDL-644',
    categories: ['축복', '던전', '보스'],
    name: '현자의 동굴',
    x: 0.648309,
    y: 0.855629,
    loot: [
      {
        id: 'LSDL-644-1',
        name: '맹금의 발톱',
      },
      {
        id: 'LSDL-644-2',
        name: '뼈 가면',
      },
      {
        id: 'LSDL-644-3',
        name: '맹금의 검은 깃털',
      },
      {
        id: 'LSDL-644-4',
        name: '석검 열쇠',
      },
      {
        id: 'LSDL-644-5',
        name: '상실의 전회',
      },
      {
        id: 'LSDL-644-6',
        name: '죽음 이끼약',
        quantity: 5,
      },
      {
        id: 'LSDL-644-7',
        name: '황금의 룬 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-644-8',
        name: '동굴 이끼 꽃눈',
      },
      {
        id: 'LSDL-644-9',
        name: '동굴 이끼 결정',
      },
      {
        id: 'LSDL-644-10',
        name: '은색 반딧불',
      },
      {
        id: 'LSDL-644-11',
        name: '몸 가리는 베일',
      },
      {
        id: 'LSDL-644-12',
        name: '가족의 머리',
      },
    ],
  },
  {
    id: 'LSDL-645',
    categories: ['축복', '던전', '보스'],
    name: '구 알터 갱도',
    x: 0.895323,
    y: 0.668376,
    loot: [
      {
        id: 'LSDL-645-1',
        name: '트롤 해머',
      },
      {
        id: 'LSDL-645-2',
        name: '뇌룡 표식의 탈리스만',
      },
      {
        id: 'LSDL-645-3',
        name: '단석 [5]',
        quantity: 6,
      },
      {
        id: 'LSDL-645-4',
        name: '색 잃은 단석 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-645-5',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
      {
        id: 'LSDL-645-6',
        name: '출혈 이끼약',
        quantity: 1,
      },
      {
        id: 'LSDL-645-7',
        name: '망가진 결정',
      },
      {
        id: 'LSDL-645-8',
        name: '그레이트 클럽',
      },
    ],
  },
  {
    id: 'LSDL-646',
    categories: ['축복', '던전', '보스'],
    name: '윈덤 지하 묘지 (임프)',
    x: 0.68646,
    y: 0.682456,
    loot: [
      {
        id: 'LSDL-646-1',
        name: '벼락 전갈',
      },
      {
        id: 'LSDL-646-2',
        name: '묘 은방울 꽃 [4]',
        quantity: 2,
      },
      {
        id: 'LSDL-646-3',
        name: '묘 은방울 꽃 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-646-4',
        name: '영혼 묘 은방울 꽃 [6]',
        quantity: 1,
      },
      {
        id: 'LSDL-646-5',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-646-6',
        name: '묘의 보라',
      },
      {
        id: 'LSDL-646-7',
        name: '고룡 신도의 제작서 [1]',
      },
      {
        id: 'LSDL-646-8',
        name: '은방울꽃 채취자의 방울 [1]',
      },
    ],
  },
  {
    id: 'LSDL-647',
    categories: ['축복'],
    name: '납치하는 소녀 인형',
    x: 0.584116,
    y: 0.697027,
  },
  {
    id: 'LSDL-648',
    categories: ['축복'],
    name: '끓는 강',
    x: 0.630335,
    y: 0.754175,
  },
  {
    id: 'LSDL-649',
    categories: ['장소'],
    name: '윈덤 폐허',
    x: 0.766263,
    y: 0.806907,
  },
  {
    id: 'LSDL-1005',
    categories: ['NPC'],
    name: '알렉산더[6]',
    x: 0.157568,
    y: 0.647208,
  },
  {
    id: 'LSDL-1089',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.591867,
    y: 0.563059,
    loot: [
      {
        id: 'LSDL-1089-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1090',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.231056,
    y: 0.241015,
    loot: [
      {
        id: 'LSDL-1090-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1156',
    categories: ['지도조각'],
    name: '지도 조각 (겔미어 화산)',
    x: 0.284243,
    y: 0.40569,
    loot: [
      {
        id: 'LSDL-1156-1',
        name: '지도 조각 (겔미어 화산)',
      },
    ],
  },
  {
    id: 'LSDL-1213',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.807914,
    y: 0.984455,
    loot: [
      {
        id: 'LSDL-1213-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1447',
    categories: ['NPC'],
    name: '밀리센트 [3]',
    x: 0.80901,
    y: 0.955238,
  },
  {
    id: 'LSDL-1454',
    categories: ['중요아이템'],
    name: '창문으로 진입',
    x: 0.438874,
    y: 0.629532,
    loot: [
      {
        id: 'LSDL-1454-1',
        name: '선교사의 제작서 [6]',
      },
      {
        id: 'LSDL-1454-2',
        name: '끈달린 불기름',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-1608',
    categories: [],
    name: '레아 루카리아 납치하는 소녀의 전송지',
    x: 0.319335,
    y: 0.583175,
  },
  {
    id: 'LSDL-1772',
    categories: ['NPC'],
    name: '패치 [3]',
    x: 0.661512,
    y: 0.388626,
  },
  {
    id: 'LSDL-1773',
    categories: ['장소'],
    name: '시체 냄새가 나는 오두막',
    x: 0.734444,
    y: 0.259937,
  },
  {
    id: 'LSDL-1775',
    categories: ['기도'],
    name: '기도 : 황금 나무에 맹세코',
    x: 0.715801,
    y: 0.297144,
    loot: [
      {
        id: 'LSDL-1775-1',
        name: '황금 나무에 맹세코',
      },
    ],
  },
  {
    id: 'LSDL-1776',
    categories: ['장소'],
    name: '라이드 요새',
    x: 0.058868,
    y: 0.408734,
  },
  {
    id: 'LSDL-1780',
    categories: ['보스'],
    name: '티비아의 배 - 윈덤 폐허',
    x: 0.727854,
    y: 0.869235,
    loot: [
      {
        id: 'LSDL-1780-1',
        name: '사근',
      },
      {
        id: 'LSDL-1780-2',
        name: '티비아의 부름',
      },
    ],
  },
  {
    id: 'LSDL-1781',
    categories: ['색단석'],
    name: '색 잃은 단석 [6]',
    x: 0.850145,
    y: 0.42828,
    loot: [
      {
        id: 'LSDL-1781-1',
        name: '색 잃은 단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-1783',
    categories: ['NPC'],
    name: '원류의 마술사 아줄',
    x: 0.584738,
    y: 0.634417,
    loot: [
      {
        id: 'LSDL-1783-1',
        name: '혜성 아줄',
      },
    ],
  },
  {
    id: 'LSDL-1785',
    categories: ['보스'],
    name: '내리는 별의 짐승 성체',
    x: 0.428462,
    y: 0.337994,
    loot: [
      {
        id: 'LSDL-1785-1',
        name: '성수의 턱',
      },
      {
        id: 'LSDL-1785-2',
        name: '색 잃은 단석 [6]',
      },
      {
        id: 'LSDL-1785-3',
        name: '단석 [6]',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-1786',
    categories: ['보스'],
    name: '문드러진 나무령',
    x: 0.55568,
    y: 0.374597,
    loot: [
      {
        id: 'LSDL-1786-1',
        name: '납빛 굳은 물방울',
      },
      {
        id: 'LSDL-1786-2',
        name: '푸른 숨겨진 물방울',
      },
    ],
  },
  {
    id: 'LSDL-1787',
    categories: ['중요아이템'],
    name: '전쟁 처녀의 의수',
    x: 0.950498,
    y: 0.227012,
    loot: [
      {
        id: 'LSDL-1787-1',
        name: '전쟁 처녀의 의수',
      },
    ],
  },
  {
    id: 'LSDL-1792',
    categories: ['보스'],
    name: '철가시 엘레메르',
    x: 0.995462,
    y: 0.242873,
    loot: [
      {
        id: 'LSDL-1792-1',
        name: '마레가의 집행검',
      },
      {
        id: 'LSDL-1792-2',
        name: '철가시 방패',
      },
    ],
  },
  {
    id: 'LSDL-1796',
    categories: ['중요아이템'],
    name: '처형대 위의 시체',
    x: 0.213502,
    y: 0.670998,
    loot: [
      {
        id: 'LSDL-1796-1',
        name: '백금 지팡이',
      },
      {
        id: 'LSDL-1796-2',
        name: '백금의 복면',
      },
    ],
  },
  {
    id: 'LSDL-1797',
    categories: ['색단석'],
    name: '색 잃은 단석 [6]',
    x: 0.263951,
    y: 0.66612,
    loot: [
      {
        id: 'LSDL-1797-1',
        name: '색 잃은 단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-1798',
    categories: ['일반단석'],
    name: '단석 [6] ',
    x: 0.2634,
    y: 0.623429,
    loot: [
      {
        id: 'LSDL-1798-1',
        name: '단석 [6]',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1800',
    categories: ['중요아이템'],
    name: '뱀의 양막',
    x: 0.420231,
    y: 0.677106,
    loot: [
      {
        id: 'LSDL-1800-1',
        name: '뱀의 양막',
      },
    ],
  },
  {
    id: 'LSDL-1801',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.387331,
    y: 0.57281,
    loot: [
      {
        id: 'LSDL-1801-1',
        name: '색 잃은 단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-1802',
    categories: ['보스'],
    name: '모독의 군주 라이커드',
    x: 0.45478,
    y: 0.534387,
    loot: [
      {
        id: 'LSDL-1802-1',
        name: '라이커드의 거대한 룬',
      },
      {
        id: 'LSDL-1802-2',
        name: '모독의 군주의 추억',
      },
    ],
  },
  {
    id: 'LSDL-1877',
    categories: ['전회'],
    name: '전회 : 피의 칼날',
    x: 0.911554,
    y: 0.918643,
    loot: [
      {
        id: 'LSDL-1877-1',
        name: '피의 칼날',
      },
    ],
  },
  {
    id: 'LSDL-1879',
    categories: ['NPC'],
    name: '적대 npc : 그늘의 성주 멀레이 마레',
    x: 0.846309,
    y: 0.250183,
    loot: [
      {
        id: 'LSDL-1879-1',
        name: '개미 가시 레이피어',
      },
      {
        id: 'LSDL-1879-2',
        name: '마레 가의 가면',
      },
      {
        id: 'LSDL-1879-3',
        name: '마레 가의 로브',
      },
    ],
  },
  {
    id: 'LSDL-1880',
    categories: ['암령'],
    name: '화산관 암살 퀘스트 2 : 저물지 않는 라일리',
    x: 0.988329,
    y: 0.530749,
  },
  {
    id: 'LSDL-1881',
    categories: ['NPC'],
    name: '타니스',
    x: 0.40762,
    y: 0.504501,
  },
  {
    id: 'LSDL-1883',
    categories: ['NPC'],
    name: '패치',
    x: 0.350592,
    y: 0.464243,
  },
  {
    id: 'LSDL-1910',
    categories: ['보스'],
    name: '납치하는 소녀 인형 (진자 낫 & 수레바귀)',
    x: 0.614347,
    y: 0.693578,
    loot: [
      {
        id: 'LSDL-1910-1',
        name: '책문 촛대',
      },
    ],
  },
  {
    id: 'LSDL-2327',
    categories: ['NPC'],
    name: '방랑 민족 상인 [8]',
    x: 0.59242,
    y: 0.232487,
  },
  {
    id: 'LSDL-2412',
    categories: [],
    name: '납치당하는 구역',
    x: 0.398299,
    y: 0.545974,
    loot: [
      {
        id: 'LSDL-2412-1',
        name: '연기 나비',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-2494',
    categories: [],
    name: '석관 묘지 ( 겔미어 화산 일부능선 )',
    x: 0.83589,
    y: 0.428279,
    loot: [
      {
        id: 'LSDL-2494-1',
        name: '황금의 룬 [2]',
        quantity: 1,
      },
      {
        id: 'LSDL-2494-2',
        name: '황금의 룬 [3]',
        quantity: 2,
      },
      {
        id: 'LSDL-2494-3',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2494-4',
        name: '황금의 룬 [7]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2517',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.960361,
    y: 0.652117,
    loot: [
      {
        id: 'LSDL-2517-1',
        name: '황금의 룬 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2597',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.695504,
    y: 0.894852,
    loot: [
      {
        id: 'LSDL-2597-1',
        name: '단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2598',
    categories: [],
    name: '트리나의 수련',
    x: 0.731694,
    y: 0.853989,
    loot: [
      {
        id: 'LSDL-2598-1',
        name: '트리나의 수련',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2599',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.763497,
    y: 0.852772,
    loot: [
      {
        id: 'LSDL-2599-1',
        name: '황금의 룬 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2600',
    categories: [],
    name: '황금의 룬 [7]',
    x: 0.793658,
    y: 0.783242,
    loot: [
      {
        id: 'LSDL-2600-1',
        name: '황금의 룬 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2601',
    categories: [],
    name: '성혈 나무의 싹',
    x: 0.768984,
    y: 0.705173,
    loot: [
      {
        id: 'LSDL-2601-1',
        name: '성혈 나무의 싹',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-2602',
    categories: ['탈리스만'],
    name: '진주룡 표식의 탈리스만 +1',
    x: 0.762951,
    y: 0.732617,
    loot: [
      {
        id: 'LSDL-2602-1',
        name: '진주룡 표식의 탈리스만 +1',
      },
    ],
  },
  {
    id: 'LSDL-2607',
    categories: ['장소'],
    name: '조향사의 폐허',
    x: 0.322621,
    y: 0.938752,
    loot: [
      {
        id: 'LSDL-2607-1',
        name: '조향병',
        quantity: 2,
      },
      {
        id: 'LSDL-2607-2',
        name: '조향사의 제작서 [1]',
      },
      {
        id: 'LSDL-2607-3',
        name: '조향의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-2608',
    categories: [],
    name: '유생나비',
    x: 0.425162,
    y: 0.910698,
    loot: [
      {
        id: 'LSDL-2608-1',
        name: '유생나비',
      },
    ],
  },
  {
    id: 'LSDL-2609',
    categories: [],
    name: '트리나의 수련',
    x: 0.636278,
    y: 0.889358,
    loot: [
      {
        id: 'LSDL-2609-1',
        name: '트리나의 수련',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2627',
    categories: ['전회'],
    name: '전회 : 연속 사격',
    x: 0.631893,
    y: 0.727733,
    loot: [
      {
        id: 'LSDL-2627-1',
        name: '연속 사격',
      },
    ],
  },
  {
    id: 'LSDL-2628',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.605576,
    y: 0.488649,
    loot: [
      {
        id: 'LSDL-2628-1',
        name: '단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2629',
    categories: [],
    name: '화산석 파밍 위치 (끓는 강)',
    x: 0.589675,
    y: 0.47401,
  },
  {
    id: 'LSDL-2630',
    categories: ['중요아이템'],
    name: '죽음 이끼약',
    x: 0.610515,
    y: 0.416069,
    loot: [
      {
        id: 'LSDL-2630-1',
        name: '죽음 이끼약',
      },
    ],
  },
  {
    id: 'LSDL-2631',
    categories: [],
    name: '유생 나비',
    x: 0.606129,
    y: 0.389237,
    loot: [
      {
        id: 'LSDL-2631-1',
        name: '유생 나비',
      },
    ],
  },
  {
    id: 'LSDL-2632',
    categories: [],
    name: '미켈라의 수련',
    x: 0.569387,
    y: 0.439246,
    loot: [
      {
        id: 'LSDL-2632-1',
        name: '미켈라의 수련',
      },
    ],
  },
  {
    id: 'LSDL-2633',
    categories: ['중요아이템'],
    name: '항염의 말린 간',
    x: 0.365947,
    y: 0.407523,
    loot: [
      {
        id: 'LSDL-2633-1',
        name: '항염의 말린 간',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2634',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.263403,
    y: 0.436186,
    loot: [
      {
        id: 'LSDL-2634-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2635',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.148799,
    y: 0.335548,
    loot: [
      {
        id: 'LSDL-2635-1',
        name: '석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-2636',
    categories: ['무기'],
    name: '주교의 대형 화염 망치',
    x: 0.082995,
    y: 0.425808,
    loot: [
      {
        id: 'LSDL-2636-1',
        name: '주교의 대형 화염 망치',
      },
    ],
  },
  {
    id: 'LSDL-2637',
    categories: ['방어구'],
    name: '불 주교의 값옷 (경장)',
    x: 0.097254,
    y: 0.423982,
  },
  {
    id: 'LSDL-2638',
    categories: ['제작서'],
    name: '요새 1층',
    x: 0.093962,
    y: 0.467895,
    loot: [
      {
        id: 'LSDL-2638-1',
        name: '무구 장인의 제작서 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2639',
    categories: ['중요아이템'],
    name: '요새 2층',
    x: 0.105476,
    y: 0.474602,
    loot: [
      {
        id: 'LSDL-2639-1',
        name: '잠알',
        quantity: 3,
      },
      {
        id: 'LSDL-2639-2',
        name: '황금의 룬 [8]',
      },
      {
        id: 'LSDL-2639-3',
        name: '화염 전갈',
      },
    ],
  },
  {
    id: 'LSDL-2640',
    categories: ['보스'],
    name: '용암 토룡',
    x: 0.123572,
    y: 0.64111,
    loot: [
      {
        id: 'LSDL-2640-1',
        name: '용의 심장',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2642',
    categories: [],
    name: '황금의 룬 [5]',
    x: 0.142214,
    y: 0.649647,
    loot: [
      {
        id: 'LSDL-2642-1',
        name: '황금의 룬 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2643',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.909916,
    y: 0.401442,
    loot: [
      {
        id: 'LSDL-2643-1',
        name: '아르테리아의 잎',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2644',
    categories: [],
    name: '황금의 룬 [8]',
    x: 0.836438,
    y: 0.365458,
    loot: [
      {
        id: 'LSDL-2644-1',
        name: '황금의 룬 [8]',
      },
    ],
  },
  {
    id: 'LSDL-2645',
    categories: [],
    name: '성혈의 나무 싹',
    x: 0.770637,
    y: 0.292267,
    loot: [
      {
        id: 'LSDL-2645-1',
        name: '성혈의 나무 싹',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-2646',
    categories: ['암령'],
    name: '암령 : 빛바랜 자를 먹는 아나스타시아',
    x: 0.737736,
    y: 0.292265,
    loot: [
      {
        id: 'LSDL-2646-1',
        name: '신성한 해체 식칼',
      },
    ],
  },
  {
    id: 'LSDL-2647',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.648352,
    y: 0.314828,
    loot: [
      {
        id: 'LSDL-2647-1',
        name: '석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-2648',
    categories: [],
    name: '성혈 나무의 싹',
    x: 0.704832,
    y: 0.404487,
    loot: [
      {
        id: 'LSDL-2648-1',
        name: '성혈 나무의 싹',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2649',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.68564,
    y: 0.356303,
    loot: [
      {
        id: 'LSDL-2649-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2650',
    categories: ['무기'],
    name: '도르래 활',
    x: 0.708672,
    y: 0.383748,
    loot: [
      {
        id: 'LSDL-2650-1',
        name: '도르래 활',
      },
    ],
  },
  {
    id: 'LSDL-2651',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.625867,
    y: 0.56306,
    loot: [
      {
        id: 'LSDL-2651-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2652',
    categories: ['축복', '던전', '보스'],
    name: '겔미어 영웅묘지',
    x: 0.681798,
    y: 0.538053,
    loot: [
      {
        id: 'LSDL-2652-1',
        name: '당랑도',
      },
      {
        id: 'LSDL-2652-2',
        name: '사냥개 기사의 투구',
      },
      {
        id: 'LSDL-2652-3',
        name: '사냥개 기사의 갑옷',
      },
      {
        id: 'LSDL-2652-4',
        name: '사냥개 기사의 장갑',
      },
      {
        id: 'LSDL-2652-5',
        name: '사냥개 기사의 각반',
      },
      {
        id: 'LSDL-2652-6',
        name: '겔미어 기사의 투구',
      },
      {
        id: 'LSDL-2652-7',
        name: '겔미어 기사의 갑옷',
      },
      {
        id: 'LSDL-2652-8',
        name: '겔미어 기사의 장갑',
      },
      {
        id: 'LSDL-2652-9',
        name: '겔미어 기사의 각반',
      },
      {
        id: 'LSDL-2652-10',
        name: '반지 손가락',
      },
      {
        id: 'LSDL-2652-11',
        name: '석검 열쇠',
        quantity: 2,
      },
      {
        id: 'LSDL-2652-12',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
      {
        id: 'LSDL-2652-13',
        name: '묘 은방울 꽃 [6]',
        quantity: 2,
      },
      {
        id: 'LSDL-2652-14',
        name: '묘 은방울 꽃 [7]',
        quantity: 7,
      },
      {
        id: 'LSDL-2652-15',
        name: '영혼 묘 은방울 꽃 [7]',
        quantity: 1,
      },
      {
        id: 'LSDL-2652-16',
        name: '묘의 보라',
      },
      {
        id: 'LSDL-2652-17',
        name: '사냥개 기사 플로',
      },
      {
        id: 'LSDL-2652-18',
        name: '사근',
      },
    ],
  },
  {
    id: 'LSDL-2653',
    categories: ['무기'],
    name: '시체 뒤지는 자의 곡검',
    x: 0.644514,
    y: 0.236759,
    loot: [
      {
        id: 'LSDL-2653-1',
        name: '시체 뒤지는 자의 곡검',
      },
    ],
  },
  {
    id: 'LSDL-2654',
    categories: [],
    name: '트리나의 수련',
    x: 0.599005,
    y: 0.15381,
    loot: [
      {
        id: 'LSDL-2654-1',
        name: '트리나의 수련',
      },
    ],
  },
  {
    id: 'LSDL-2655',
    categories: [],
    name: '성혈 나무의 싹',
    x: 0.60284,
    y: 0.207482,
    loot: [
      {
        id: 'LSDL-2655-1',
        name: '성혈 나무의 싹',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-2656',
    categories: [],
    name: '이옐로의 눈동자',
    x: 0.550198,
    y: 0.207481,
    loot: [
      {
        id: 'LSDL-2656-1',
        name: '이옐로의 눈동자',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2657',
    categories: [],
    name: '노란 잔불',
    x: 0.560617,
    y: 0.231877,
    loot: [
      {
        id: 'LSDL-2657-1',
        name: '노란 잔불',
        quantity: 5,
      },
    ],
  },
  {
    id: 'LSDL-2658',
    categories: [],
    name: '이옐로의 눈동자',
    x: 0.53539,
    y: 0.256881,
    loot: [
      {
        id: 'LSDL-2658-1',
        name: '이옐로의 눈동자',
      },
    ],
  },
  {
    id: 'LSDL-2659',
    categories: ['중요아이템'],
    name: '별빛 조각',
    x: 0.446009,
    y: 0.371541,
    loot: [
      {
        id: 'LSDL-2659-1',
        name: '별빛 조각',
      },
    ],
  },
  {
    id: 'LSDL-2660',
    categories: ['전회'],
    name: '전회 : 관통 사격',
    x: 0.240923,
    y: 0.306276,
    loot: [
      {
        id: 'LSDL-2660-1',
        name: '관통 사격',
      },
    ],
  },
  {
    id: 'LSDL-2661',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.207474,
    y: 0.344696,
    loot: [
      {
        id: 'LSDL-2661-1',
        name: '황금의 룬 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2662',
    categories: ['물방울 유생'],
    name: '물방울 유생',
    x: 0.395009,
    y: 0.372761,
    loot: [
      {
        id: 'LSDL-2662-1',
        name: '물방울 유생',
      },
    ],
  },
  {
    id: 'LSDL-2663',
    categories: [],
    name: '황금의 룬 [3]',
    x: 0.544713,
    y: 0.355689,
    loot: [
      {
        id: 'LSDL-2663-1',
        name: '황금의 룬 [3]',
      },
    ],
  },
  {
    id: 'LSDL-2664',
    categories: [],
    name: '황금의 룬 [4]',
    x: 0.544713,
    y: 0.355689,
    loot: [
      {
        id: 'LSDL-2664-1',
        name: '황금의 룬 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2665',
    categories: ['장소'],
    name: '화산관',
    x: 0.395009,
    y: 0.427041,
  },
  {
    id: 'LSDL-2666',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.359914,
    y: 0.43802,
    loot: [
      {
        id: 'LSDL-2666-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2667',
    categories: ['암령'],
    name: '암령 침입 : 책문관 기자',
    x: 0.362658,
    y: 0.453876,
    loot: [
      {
        id: 'LSDL-2667-1',
        name: '기자의 수레바퀴',
      },
    ],
  },
  {
    id: 'LSDL-2668',
    categories: ['NPC'],
    name: '유령 npc',
    x: 0.354979,
    y: 0.49047,
  },
  {
    id: 'LSDL-2669',
    categories: ['축복'],
    name: '화산관',
    x: 0.392817,
    y: 0.505718,
  },
  {
    id: 'LSDL-2670',
    categories: ['중요아이템'],
    name: '화산관 비밀 통로 입구',
    x: 0.373073,
    y: 0.489249,
    loot: [
      {
        id: 'LSDL-2670-1',
        name: '조향병',
        quantity: 1,
      },
      {
        id: 'LSDL-2670-2',
        name: '사냥개의 발톱',
      },
      {
        id: 'LSDL-2670-3',
        name: '항염의 말린 간',
        quantity: 1,
      },
      {
        id: 'LSDL-2670-4',
        name: '방랑 전사의 제작서 [21]',
      },
      {
        id: 'LSDL-2670-5',
        name: '타락 조향상 카르만',
      },
    ],
  },
  {
    id: 'LSDL-2672',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.250792,
    y: 0.540481,
    loot: [
      {
        id: 'LSDL-2672-1',
        name: '단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2673',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.235438,
    y: 0.549017,
    loot: [
      {
        id: 'LSDL-2673-1',
        name: '색 잃은 단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2674',
    categories: [],
    name: '황금의 룬 [9]',
    x: 0.22173,
    y: 0.567312,
    loot: [
      {
        id: 'LSDL-2674-1',
        name: '황금의 룬 [9]',
      },
    ],
  },
  {
    id: 'LSDL-2675',
    categories: ['탈리스만'],
    name: '붉은 호박 메달리온 +1',
    x: 0.181149,
    y: 0.596586,
    loot: [
      {
        id: 'LSDL-2675-1',
        name: '붉은 호박 메달리온 +1',
      },
    ],
  },
  {
    id: 'LSDL-2676',
    categories: [],
    name: '황금의 룬 [5]',
    x: 0.252985,
    y: 0.582564,
    loot: [
      {
        id: 'LSDL-2676-1',
        name: '황금의 룬 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2677',
    categories: ['일반단석'],
    name: '단석 [4]',
    x: 0.197597,
    y: 0.669775,
    loot: [
      {
        id: 'LSDL-2677-1',
        name: '단석 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2678',
    categories: [],
    name: '황금의 룬 [10]',
    x: 0.232692,
    y: 0.675269,
    loot: [
      {
        id: 'LSDL-2678-1',
        name: '황금의 룬 [10]',
      },
    ],
  },
  {
    id: 'LSDL-2679',
    categories: [],
    name: '황금의 룬 [9]',
    x: 0.211308,
    y: 0.687466,
    loot: [
      {
        id: 'LSDL-2679-1',
        name: '황금의 룬 [9]',
      },
    ],
  },
  {
    id: 'LSDL-2680',
    categories: ['중요아이템'],
    name: '항염의 말린 간',
    x: 0.244757,
    y: 0.691738,
    loot: [
      {
        id: 'LSDL-2680-1',
        name: '항염의 말린 간',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2681',
    categories: [],
    name: '황금의 룬 [9]',
    x: 0.264498,
    y: 0.645994,
    loot: [
      {
        id: 'LSDL-2681-1',
        name: '황금의 룬 [9]',
      },
    ],
  },
  {
    id: 'LSDL-2682',
    categories: ['중요아이템'],
    name: '용의 심장',
    x: 0.380202,
    y: 0.630748,
    loot: [
      {
        id: 'LSDL-2682-1',
        name: '용의 심장',
      },
    ],
  },
  {
    id: 'LSDL-2683',
    categories: ['일반단석'],
    name: '단석 [7]',
    x: 0.362655,
    y: 0.619771,
    loot: [
      {
        id: 'LSDL-2683-1',
        name: '단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2684',
    categories: ['중요아이템'],
    name: '용암지대 동굴 안',
    x: 0.249146,
    y: 0.524012,
    loot: [
      {
        id: 'LSDL-2684-1',
        name: '그을림의 방패',
      },
      {
        id: 'LSDL-2684-2',
        name: '황금의 룬 [9]',
        quantity: 1,
      },
      {
        id: 'LSDL-2684-3',
        name: '단석 [6]',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2685',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.232693,
    y: 0.600249,
    loot: [
      {
        id: 'LSDL-2685-1',
        name: '석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-2686',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.367041,
    y: 0.675882,
    loot: [
      {
        id: 'LSDL-2686-1',
        name: '색 잃은 단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-2687',
    categories: ['보스'],
    name: '신의 살갗의 귀인',
    x: 0.390071,
    y: 0.655757,
    loot: [
      {
        id: 'LSDL-2687-1',
        name: '신의 살갗 대자검',
      },
      {
        id: 'LSDL-2687-2',
        name: '귀족의 배짱',
      },
    ],
  },
  {
    id: 'LSDL-2688',
    categories: [],
    name: '황금의 룬 [12]',
    x: 0.444906,
    y: 0.671615,
    loot: [
      {
        id: 'LSDL-2688-1',
        name: '황금의 룬 [12]',
      },
    ],
  },
  {
    id: 'LSDL-2689',
    categories: ['색단석'],
    name: '색 잃은 단석 [6]',
    x: 0.349496,
    y: 0.515475,
    loot: [
      {
        id: 'LSDL-2689-1',
        name: '색 잃은 단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2690',
    categories: ['방어구'],
    name: '시민의 모자',
    x: 0.375817,
    y: 0.547191,
    loot: [
      {
        id: 'LSDL-2690-1',
        name: '시민의 모자',
      },
    ],
  },
  {
    id: 'LSDL-2692',
    categories: ['중요아이템'],
    name: '석검 열쇠',
    x: 0.391718,
    y: 0.597815,
    loot: [
      {
        id: 'LSDL-2692-1',
        name: '석검 열쇠',
      },
    ],
  },
  {
    id: 'LSDL-2693',
    categories: ['영체'],
    name: '뱀 인간의 뼛가루',
    x: 0.387332,
    y: 0.486814,
    loot: [
      {
        id: 'LSDL-2693-1',
        name: '뱀 인간의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-2694',
    categories: [],
    name: '라이커드 전송문',
    x: 0.419139,
    y: 0.483763,
  },
  {
    id: 'LSDL-2695',
    categories: ['중요아이템'],
    name: '석검 열쇠 필요 (1개)',
    x: 0.340723,
    y: 0.487421,
    loot: [
      {
        id: 'LSDL-2695-1',
        name: '단검의 탈리스만',
      },
      {
        id: 'LSDL-2695-2',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-2695-3',
        name: '모판의 저주',
        quantity: 1,
      },
      {
        id: 'LSDL-2695-4',
        name: '도읍 기사의 결의',
      },
      {
        id: 'LSDL-2695-5',
        name: '색 잃은 단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2696',
    categories: [],
    name: '석관 묘지 (라이드 요새 뒷편)',
    x: 0.177858,
    y: 0.759432,
    loot: [
      {
        id: 'LSDL-2696-1',
        name: '황금의 룬 [2]',
        quantity: 2,
      },
      {
        id: 'LSDL-2696-2',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
      {
        id: 'LSDL-2696-3',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2697',
    categories: ['일반단석'],
    name: '단석 [6]',
    x: 0.23982,
    y: 0.821034,
    loot: [
      {
        id: 'LSDL-2697-1',
        name: '단석 [6]',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2698',
    categories: ['장소'],
    name: '은자의 오두막',
    x: 0.229949,
    y: 0.785661,
    loot: [
      {
        id: 'LSDL-2698-1',
        name: '솟구치는 용암',
      },
    ],
  },
  {
    id: 'LSDL-2699',
    categories: [],
    name: '조약돌',
    x: 0.303978,
    y: 0.795422,
    loot: [
      {
        id: 'LSDL-2699-1',
        name: '조약돌',
      },
    ],
  },
  {
    id: 'LSDL-2700',
    categories: [],
    name: '산양 파밍 위치 (장인의 오두막)',
    x: 0.441068,
    y: 0.804576,
  },
  {
    id: 'LSDL-2701',
    categories: [],
    name: '성혈의 나무 싹',
    x: 0.5299,
    y: 0.768594,
    loot: [
      {
        id: 'LSDL-2701-1',
        name: '성혈의 나무 싹',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2702',
    categories: ['중요아이템'],
    name: '별빛 조각',
    x: 0.615444,
    y: 0.735664,
    loot: [
      {
        id: 'LSDL-2702-1',
        name: '별빛 조각',
      },
    ],
  },
  {
    id: 'LSDL-2703',
    categories: ['방어구'],
    name: '아로다스의 휘석 머리',
    x: 0.574864,
    y: 0.74176,
    loot: [
      {
        id: 'LSDL-2703-1',
        name: '아로다스의 휘석 머리',
      },
    ],
  },
  {
    id: 'LSDL-2704',
    categories: ['장소'],
    name: '은자의 마을',
    x: 0.538128,
    y: 0.711874,
  },
  {
    id: 'LSDL-2705',
    categories: [],
    name: '성혈의 나무 싹',
    x: 0.629153,
    y: 0.706389,
    loot: [
      {
        id: 'LSDL-2705-1',
        name: '성혈의 나무 싹',
        quantity: 4,
      },
    ],
  },
  {
    id: 'LSDL-2706',
    categories: ['보스'],
    name: '아인 여왕 마기',
    x: 0.586384,
    y: 0.655152,
    loot: [
      {
        id: 'LSDL-2706-1',
        name: '메모리 스톤',
      },
    ],
  },
  {
    id: 'LSDL-2707',
    categories: ['중요아이템'],
    name: '저지대',
    x: 0.250241,
    y: 0.568535,
    loot: [
      {
        id: 'LSDL-2707-1',
        name: '황금의 룬 [6]',
      },
      {
        id: 'LSDL-2707-2',
        name: '황금 나무의 성인',
      },
    ],
  },
  {
    id: 'LSDL-2708',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.804087,
    y: 0.231886,
    loot: [
      {
        id: 'LSDL-2708-1',
        name: '단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2715',
    categories: ['중요아이템'],
    name: '독 이끼 약',
    x: 0.951045,
    y: 0.31606,
    loot: [
      {
        id: 'LSDL-2715-1',
        name: '독 이끼 약',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2716',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.971885,
    y: 0.252018,
    loot: [
      {
        id: 'LSDL-2716-1',
        name: '단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2717',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.959819,
    y: 0.266046,
    loot: [
      {
        id: 'LSDL-2717-1',
        name: '색 잃은 단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2718',
    categories: ['영혼묘'],
    name: '영혼 묘 은방울 꽃 [4]',
    x: 0.972432,
    y: 0.271535,
    loot: [
      {
        id: 'LSDL-2718-1',
        name: '영혼 묘 은방울 꽃 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2728',
    categories: ['축복'],
    name: '성주의 응접실',
    x: 0.998754,
    y: 0.228845,
  },
  {
    id: 'LSDL-2782',
    categories: ['NPC'],
    name: '화산관 NPC들',
    x: 0.365945,
    y: 0.517916,
  },
  {
    id: 'LSDL-2784',
    categories: ['무기'],
    name: '큰 뱀 사냥꾼',
    x: 0.444909,
    y: 0.489252,
    loot: [
      {
        id: 'LSDL-2784-1',
        name: '큰 뱀 사냥꾼',
      },
    ],
  },
  {
    id: 'LSDL-2785',
    categories: ['NPC'],
    name: '타니스',
    x: 0.449295,
    y: 0.553904,
  },
  {
    id: 'LSDL-2786',
    categories: ['방어구'],
    name: '눈동자 서코트',
    x: 0.412006,
    y: 0.559391,
    loot: [
      {
        id: 'LSDL-2786-1',
        name: '눈동자 서코트',
      },
    ],
  },
  {
    id: 'LSDL-2960',
    categories: ['NPC'],
    name: '조라야스',
    x: 0.432845,
    y: 0.616725,
  },
  {
    id: 'LSDL-2965',
    categories: ['중요아이템'],
    name: '말하는 머리 "너는 아름다워"',
    x: 0.558963,
    y: 0.719803,
    loot: [
      {
        id: 'LSDL-2965-1',
        name: '말하는 머리 "너는 아름다워"',
      },
    ],
  },
  {
    id: 'LSDL-2986',
    categories: ['색단석'],
    name: '색 잃은 단석 [7]',
    x: 0.334142,
    y: 0.550851,
    loot: [
      {
        id: 'LSDL-2986-1',
        name: '색 잃은 단석 [7]',
      },
    ],
  },
  {
    id: 'LSDL-2987',
    categories: ['색단석'],
    name: '색 잃은 단석 [2]',
    x: 0.413104,
    y: 0.597207,
    loot: [
      {
        id: 'LSDL-2987-1',
        name: '색 잃은 단석 [2]',
      },
    ],
  },
];

// LSDL base-game map, checked 2026-11-21; patch unspecified.
// Source, terrain alignment and description review: reference-data/maps/leyndell-royal-capital/.
// Regenerate: node reference-data/maps/generate.mjs leyndell-royal-capital.
const LEYNDELL_ROYAL_CAPITAL_MARKERS = [
  {
    id: 'LSDL-523',
    categories: ['축복', '던전', '보스'],
    name: '아우리자 영웅 묘지',
    x: 0.786619,
    y: 0.175492,
    loot: [
      {
        id: 'LSDL-523-1',
        name: '천한 병사의 뼛가루',
      },
      {
        id: 'LSDL-523-2',
        name: '도가니 날개의 탈리스만',
      },
      {
        id: 'LSDL-523-3',
        name: '트리가드 세트',
      },
      {
        id: 'LSDL-523-4',
        name: '성역',
      },
      {
        id: 'LSDL-523-5',
        name: '오르도비스의 대검',
      },
      {
        id: 'LSDL-523-6',
        name: '도가니 기사 세트(도끼)',
      },
    ],
  },
  {
    id: 'LSDL-524',
    categories: ['축복'],
    name: '미친 불의 봉인',
    x: 0.895253,
    y: 0.252781,
  },
  {
    id: 'LSDL-525',
    categories: ['축복'],
    name: '흉조가 버려진 대성당',
    x: 0.831417,
    y: 0.282515,
  },
  {
    id: 'LSDL-526',
    categories: ['축복'],
    name: '흉조가 버려진 밑바닥',
    x: 0.664582,
    y: 0.37388,
  },
  {
    id: 'LSDL-527',
    categories: ['축복'],
    name: '도읍 동쪽 성벽',
    x: 0.691459,
    y: 0.281656,
  },
  {
    id: 'LSDL-528',
    categories: ['축복'],
    name: '도읍 성벽 앞',
    x: 0.663833,
    y: 0.065627,
  },
  {
    id: 'LSDL-529',
    categories: ['축복'],
    name: '지하대로 옆',
    x: 0.546523,
    y: 0.400345,
  },
  {
    id: 'LSDL-530',
    categories: ['축복'],
    name: '여왕의 규방',
    x: 0.66567,
    y: 0.601007,
    loot: [
      {
        id: 'LSDL-530-1',
        name: '황금 나무의 은혜',
      },
    ],
  },
  {
    id: 'LSDL-531',
    categories: ['축복'],
    name: '엘데의 왕좌',
    x: 0.788834,
    y: 0.796385,
  },
  {
    id: 'LSDL-532',
    categories: ['축복'],
    name: '황금나무의 대성당',
    x: 0.569649,
    y: 0.715429,
  },
  {
    id: 'LSDL-534',
    categories: ['축복'],
    name: '로데일 지하 묘지',
    x: 0.556941,
    y: 0.508788,
  },
  {
    id: 'LSDL-535',
    categories: ['축복'],
    name: '도읍 하층 교회',
    x: 0.46284,
    y: 0.490448,
  },
  {
    id: 'LSDL-537',
    categories: ['축복'],
    name: '대로 옆 노대',
    x: 0.508412,
    y: 0.430232,
  },
  {
    id: 'LSDL-538',
    categories: ['축복'],
    name: '도읍 서쪽 성벽',
    x: 0.462072,
    y: 0.534402,
  },
  {
    id: 'LSDL-682',
    categories: ['축복'],
    name: '신수교',
    x: 0.191861,
    y: 0.58131,
  },
  {
    id: 'LSDL-683',
    categories: ['축복'],
    name: '성관 1층',
    x: 0.327613,
    y: 0.552976,
  },
  {
    id: 'LSDL-1128',
    categories: ['장소'],
    name: '흉조가 버려진 지하',
    x: 0.420256,
    y: 0.098928,
    loot: [
      {
        id: 'LSDL-1128-1',
        name: '모그의 구속구',
      },
      {
        id: 'LSDL-1128-2',
        name: '방랑 민족의 뼛가루',
      },
      {
        id: 'LSDL-1128-3',
        name: '성룡 표식의 탈리스만 +1',
      },
      {
        id: 'LSDL-1128-4',
        name: '피가 밴 팔띠',
      },
      {
        id: 'LSDL-1128-5',
        name: '피가 밴 복면',
      },
      {
        id: 'LSDL-1128-6',
        name: '그림자 보내기',
      },
      {
        id: 'LSDL-1128-7',
        name: '상실의 전회',
      },
      {
        id: 'LSDL-1128-8',
        name: '단석 [5]',
      },
      {
        id: 'LSDL-1128-9',
        name: '단석 [6]',
      },
      {
        id: 'LSDL-1128-10',
        name: '단석 [7]',
        quantity: 11,
      },
      {
        id: 'LSDL-1128-11',
        name: '단석 [8]',
        quantity: 1,
      },
      {
        id: 'LSDL-1128-12',
        name: '색 잃은 단석 [6]',
        quantity: 2,
      },
      {
        id: 'LSDL-1128-13',
        name: '색 잃은 단석 [7]',
        quantity: 2,
      },
      {
        id: 'LSDL-1128-14',
        name: '색 잃은 단석 [8]',
        quantity: 1,
      },
      {
        id: 'LSDL-1128-15',
        name: '영혼 묘 은방울 꽃 [6]',
        quantity: 1,
      },
      {
        id: 'LSDL-1128-16',
        name: '이엘로의 눈동자',
      },
      {
        id: 'LSDL-1128-17',
        name: '황금 지네',
        quantity: 2,
      },
      {
        id: 'LSDL-1128-18',
        name: '끈',
      },
      {
        id: 'LSDL-1128-19',
        name: '룬의 호',
        quantity: 2,
      },
      {
        id: 'LSDL-1128-20',
        name: '석검 열쇠',
      },
      {
        id: 'LSDL-1128-21',
        name: '황금의 룬 [1]',
      },
      {
        id: 'LSDL-1128-22',
        name: '황금의 룬 [8]',
      },
      {
        id: 'LSDL-1128-23',
        name: '황금의 룬 [10]',
      },
      {
        id: 'LSDL-1128-24',
        name: '황금의 룬 [11]',
        quantity: 2,
      },
      {
        id: 'LSDL-1128-25',
        name: '얼룩색 흰 육포',
      },
      {
        id: 'LSDL-1128-26',
        name: '의식 항아리',
        quantity: 1,
      },
      {
        id: 'LSDL-1128-27',
        name: '혈염의 발톱자국',
      },
      {
        id: 'LSDL-1128-28',
        name: '황금 나무의 은총+1',
      },
    ],
  },
  {
    id: 'LSDL-1159',
    categories: ['전회'],
    name: '전회 : 황금 패리',
    x: 0.017549,
    y: 0.081849,
    loot: [
      {
        id: 'LSDL-1159-1',
        name: '황금 패리',
      },
    ],
  },
  {
    id: 'LSDL-1170',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.480586,
    y: 0.367414,
    loot: [
      {
        id: 'LSDL-1170-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1171',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.473878,
    y: 0.632806,
    loot: [
      {
        id: 'LSDL-1171-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1299',
    categories: ['탈리스만'],
    name: '은혜의 물방울의 탈리스만',
    x: 0.134098,
    y: 0.605273,
    loot: [
      {
        id: 'LSDL-1299-1',
        name: '은혜의 물방울의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-1579',
    categories: ['장소'],
    name: '로데일 콜로세움 마리카 동상',
    x: 0.297669,
    y: 0.766655,
  },
  {
    id: 'LSDL-1603',
    categories: ['NPC'],
    name: '대변 먹는 자 [2]',
    x: 0.476284,
    y: 0.337161,
  },
  {
    id: 'LSDL-1606',
    categories: [],
    name: '흐느낌 반도 전송 함정 목적지',
    x: 0.235709,
    y: 0.567703,
  },
  {
    id: 'LSDL-1646',
    categories: ['중요아이템'],
    name: '모판의 저주',
    x: 0.376146,
    y: 0.557457,
    loot: [
      {
        id: 'LSDL-1646-1',
        name: '모판의 저주',
      },
    ],
  },
  {
    id: 'LSDL-1647',
    categories: ['암령'],
    name: '화산관 암살 퀘스트 (베르나르)',
    x: 0.398571,
    y: 0.565999,
  },
  {
    id: 'LSDL-1648',
    categories: ['방어구'],
    name: '알베리히 세트',
    x: 0.355965,
    y: 0.591612,
    loot: [
      {
        id: 'LSDL-1648-1',
        name: '알베리히의 뾰족모자',
      },
      {
        id: 'LSDL-1648-2',
        name: '알베리히의 옷',
      },
      {
        id: 'LSDL-1648-3',
        name: '알베리히의 장갑',
      },
      {
        id: 'LSDL-1648-4',
        name: '알베리히의 바지',
      },
    ],
  },
  {
    id: 'LSDL-1649',
    categories: ['무기'],
    name: '폭풍 매 도끼',
    x: 0.310399,
    y: 0.541232,
    loot: [
      {
        id: 'LSDL-1649-1',
        name: '폭풍 매 도끼',
      },
    ],
  },
  {
    id: 'LSDL-1650',
    categories: ['무기'],
    name: '가시 철구권',
    x: 0.377615,
    y: 0.805936,
    loot: [
      {
        id: 'LSDL-1650-1',
        name: '가시 철구권',
      },
    ],
  },
  {
    id: 'LSDL-1651',
    categories: ['보스'],
    name: '첫 왕 고드프리',
    x: 0.537517,
    y: 0.717134,
    loot: [
      {
        id: 'LSDL-1651-1',
        name: '부적 주머니',
      },
    ],
  },
  {
    id: 'LSDL-1653',
    categories: ['기도서'],
    name: '황금률 원론',
    x: 0.521068,
    y: 0.715429,
    loot: [
      {
        id: 'LSDL-1653-1',
        name: '황금률 원론',
      },
    ],
  },
  {
    id: 'LSDL-1654',
    categories: ['무기'],
    name: '황금 나무의 활',
    x: 0.537518,
    y: 0.688105,
    loot: [
      {
        id: 'LSDL-1654-1',
        name: '황금 나무의 활',
      },
    ],
  },
  {
    id: 'LSDL-1655',
    categories: ['기도서'],
    name: '두 손가락의 기도서',
    x: 0.354485,
    y: 0.564288,
    loot: [
      {
        id: 'LSDL-1655-1',
        name: '두 손가락의 기도서',
      },
    ],
  },
  {
    id: 'LSDL-1656',
    categories: ['무기'],
    name: '그랑삭스의 벼락',
    x: 0.586103,
    y: 0.620648,
    loot: [
      {
        id: 'LSDL-1656-1',
        name: '그랑삭스의 벼락',
      },
    ],
  },
  {
    id: 'LSDL-1657',
    categories: ['기도'],
    name: '기도 : 황금의 마력 방호',
    x: 0.615988,
    y: 0.628331,
    loot: [
      {
        id: 'LSDL-1657-1',
        name: '황금의 마력 방호',
      },
    ],
  },
  {
    id: 'LSDL-1661',
    categories: ['NPC'],
    name: '금가면 경 & 콜린 [2]',
    x: 0.406018,
    y: 0.793127,
  },
  {
    id: 'LSDL-1664',
    categories: ['기타'],
    name: '라다곤 석상',
    x: 0.587583,
    y: 0.65736,
  },
  {
    id: 'LSDL-1680',
    categories: ['그릇'],
    name: '금 간 항아리 - 로데일 대로 옆 노대',
    x: 0.473268,
    y: 0.407176,
    loot: [
      {
        id: 'LSDL-1680-1',
        name: '금 간 항아리 - 로데일 대로 옆 노대',
      },
    ],
  },
  {
    id: 'LSDL-1688',
    categories: ['장소'],
    name: '도읍 로데일',
    x: 0.425449,
    y: 0.468654,
  },
  {
    id: 'LSDL-1689',
    categories: ['전회'],
    name: '성스러운 숫돌 칼날',
    x: 0.383603,
    y: 0.604422,
    loot: [
      {
        id: 'LSDL-1689-1',
        name: '성스러운 숫돌 칼날',
      },
    ],
  },
  {
    id: 'LSDL-1699',
    categories: [],
    name: '전송문',
    x: 0.154991,
    y: 0.662484,
  },
  {
    id: 'LSDL-1701',
    categories: ['중요아이템'],
    name: '색 잃은 단석 [6]',
    x: 0.805021,
    y: 0.30386,
    loot: [
      {
        id: 'LSDL-1701-1',
        name: '색 잃은 단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-1702',
    categories: ['기타'],
    name: '모르고트의 봉인',
    x: 0.9761,
    y: 0.449875,
  },
  {
    id: 'LSDL-1804',
    categories: ['무기'],
    name: '조약돌의 성인',
    x: 0.375433,
    y: 0.466091,
    loot: [
      {
        id: 'LSDL-1804-1',
        name: '조약돌의 성인',
      },
    ],
  },
  {
    id: 'LSDL-1806',
    categories: ['축복', '던전', '보스'],
    name: '로데일 지하묘지',
    x: 0.384389,
    y: 0.18602,
    loot: [
      {
        id: 'LSDL-1806-1',
        name: '도가니 비늘의 탈리스만',
      },
      {
        id: 'LSDL-1806-2',
        name: '묘 은방울 꽃 [8]',
        quantity: 4,
      },
      {
        id: 'LSDL-1806-3',
        name: '묘 은방울 꽃 [9]',
        quantity: 2,
      },
      {
        id: 'LSDL-1806-4',
        name: '영혼 묘 은방울 꽃 [8]',
        quantity: 1,
      },
      {
        id: 'LSDL-1806-5',
        name: '성혈 나무의 싹',
        quantity: 2,
      },
      {
        id: 'LSDL-1806-6',
        name: '피의 군주 환희',
      },
    ],
  },
  {
    id: 'LSDL-1809',
    categories: ['전회'],
    name: '전회 : 낙뢰',
    x: 0.39858,
    y: 0.396076,
    loot: [
      {
        id: 'LSDL-1809-1',
        name: '낙뢰',
      },
    ],
  },
  {
    id: 'LSDL-1810',
    categories: ['던전'],
    name: '미친 불의 봉인',
    x: 0.484516,
    y: 0.189442,
    loot: [
      {
        id: 'LSDL-1810-1',
        name: '방랑 상인의 모자',
      },
      {
        id: 'LSDL-1810-2',
        name: '방랑 상인의 옷',
      },
      {
        id: 'LSDL-1810-3',
        name: '방랑 상인의 바지',
      },
      {
        id: 'LSDL-1810-4',
        name: '병자의 제작서 [2]',
      },
      {
        id: 'LSDL-1810-5',
        name: '문서 : 미켈라의 침',
      },
      {
        id: 'LSDL-1810-6',
        name: '이엘로의 눈동자',
        quantity: 5,
      },
      {
        id: 'LSDL-1810-7',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-1810-8',
        name: '황금의 룬 [11]',
        quantity: 1,
      },
      {
        id: 'LSDL-1810-9',
        name: '발광 전염',
      },
      {
        id: 'LSDL-1810-10',
        name: '지문석의 방패',
      },
    ],
  },
  {
    id: 'LSDL-2298',
    categories: [],
    name: '황금 지네 파밍 위치 2',
    x: 0.467274,
    y: 0.725669,
  },
  {
    id: 'LSDL-2442',
    categories: ['보스'],
    name: '흉조의 왕 모르고트',
    x: 0.765403,
    y: 0.810206,
    loot: [
      {
        id: 'LSDL-2442-1',
        name: '모르고트의 거대한 룬',
      },
      {
        id: 'LSDL-2442-2',
        name: '흉조의 왕의 추억',
      },
    ],
  },
  {
    id: 'LSDL-2447',
    categories: ['보스'],
    name: '스포일러',
    x: 0.932751,
    y: 0.975839,
    loot: [
      {
        id: 'LSDL-2447-1',
        name: '엘데의 추억',
      },
    ],
  },
  {
    id: 'LSDL-2532',
    categories: ['전회'],
    name: '상실의 전회',
    x: 0.09974,
    y: 0.186019,
    loot: [
      {
        id: 'LSDL-2532-1',
        name: '상실의 전회',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2610',
    categories: ['기타'],
    name: '그림 : 날지 못하는 새',
    x: 0.308151,
    y: 0.565998,
  },
  {
    id: 'LSDL-2612',
    categories: ['기타'],
    name: '그림 : 날지 못하는 새',
    x: 0.311163,
    y: 0.570266,
  },
  {
    id: 'LSDL-2932',
    categories: ['중요아이템'],
    name: '로데일 탑 사다리 위',
    x: 0.651092,
    y: 0.48488,
    loot: [
      {
        id: 'LSDL-2932-1',
        name: '조향병',
      },
      {
        id: 'LSDL-2932-2',
        name: '모판의 저주',
      },
    ],
  },
  {
    id: 'LSDL-2934',
    categories: ['그릇'],
    name: '조향병',
    x: 0.845368,
    y: 0.507079,
    loot: [
      {
        id: 'LSDL-2934-1',
        name: '조향병',
      },
    ],
  },
  {
    id: 'LSDL-2935',
    categories: [],
    name: '미켈라의 수련',
    x: 0.813236,
    y: 0.492565,
    loot: [
      {
        id: 'LSDL-2935-1',
        name: '미켈라의 수련',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2955',
    categories: ['색단석'],
    name: '고룡의 색 잃은 단석',
    x: 0.416503,
    y: 0.548063,
    loot: [
      {
        id: 'LSDL-2955-1',
        name: '고룡의 색 잃은 단석',
      },
    ],
  },
  {
    id: 'LSDL-2964',
    categories: ['NPC'],
    name: '아인 보크 [5]',
    x: 0.678022,
    y: 0.298739,
  },
  {
    id: 'LSDL-2969',
    categories: ['NPC'],
    name: '스포일러',
    x: 0.429929,
    y: 0.751288,
  },
  {
    id: 'LSDL-2970',
    categories: ['NPC'],
    name: '스포일러',
    x: 0.53456,
    y: 0.561726,
  },
  {
    id: 'LSDL-2980',
    categories: ['탈리스만'],
    name: '황금 나무의 은총 +2',
    x: 0.791572,
    y: 0.555754,
    loot: [
      {
        id: 'LSDL-2980-1',
        name: '황금 나무의 은총 +2',
      },
    ],
  },
  {
    id: 'LSDL-2988',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.556215,
    y: 0.680416,
    loot: [
      {
        id: 'LSDL-2988-1',
        name: '색 잃은 단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-3013',
    categories: ['중요아이템'],
    name: '봉투방패의 탈리스만',
    x: 0.304413,
    y: 0.718838,
    loot: [
      {
        id: 'LSDL-3013-1',
        name: '봉투방패의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-3015',
    categories: ['암령'],
    name: '☆파쇄된 가면 경',
    x: 0.541249,
    y: 0.658218,
  },
];

// LSDL base-game map, checked 2026-11-21; patch unspecified.
// Source, terrain alignment and description review: reference-data/maps/leyndell-outskirts/.
// Regenerate: node reference-data/maps/generate.mjs leyndell-outskirts.
const LEYNDELL_OUTSKIRTS_MARKERS = [
  {
    id: 'LSDL-523',
    categories: ['축복', '던전', '보스'],
    name: '아우리자 영웅 묘지',
    x: 0.871495,
    y: 0.518498,
    loot: [
      {
        id: 'LSDL-523-1',
        name: '천한 병사의 뼛가루',
      },
      {
        id: 'LSDL-523-2',
        name: '도가니 날개의 탈리스만',
      },
      {
        id: 'LSDL-523-3',
        name: '트리가드 세트',
      },
      {
        id: 'LSDL-523-4',
        name: '성역',
      },
      {
        id: 'LSDL-523-5',
        name: '오르도비스의 대검',
      },
      {
        id: 'LSDL-523-6',
        name: '도가니 기사 세트(도끼)',
      },
    ],
  },
  {
    id: 'LSDL-524',
    categories: ['축복'],
    name: '미친 불의 봉인',
    x: 0.94392,
    y: 0.567682,
  },
  {
    id: 'LSDL-525',
    categories: ['축복'],
    name: '흉조가 버려진 대성당',
    x: 0.901363,
    y: 0.586604,
  },
  {
    id: 'LSDL-526',
    categories: ['축복'],
    name: '흉조가 버려진 밑바닥',
    x: 0.790139,
    y: 0.644747,
  },
  {
    id: 'LSDL-527',
    categories: ['축복'],
    name: '도읍 동쪽 성벽',
    x: 0.808056,
    y: 0.586058,
  },
  {
    id: 'LSDL-528',
    categories: ['축복'],
    name: '도읍 성벽 앞',
    x: 0.789635,
    y: 0.448585,
  },
  {
    id: 'LSDL-529',
    categories: ['축복'],
    name: '지하대로 옆',
    x: 0.711433,
    y: 0.66159,
  },
  {
    id: 'LSDL-530',
    categories: ['축복'],
    name: '여왕의 규방',
    x: 0.790869,
    y: 0.789284,
    loot: [
      {
        id: 'LSDL-530-1',
        name: '황금 나무의 은혜',
      },
    ],
  },
  {
    id: 'LSDL-531',
    categories: ['축복'],
    name: '엘데의 왕좌',
    x: 0.872983,
    y: 0.913615,
  },
  {
    id: 'LSDL-532',
    categories: ['축복'],
    name: '황금나무의 대성당',
    x: 0.726856,
    y: 0.862099,
  },
  {
    id: 'LSDL-534',
    categories: ['축복'],
    name: '로데일 지하 묘지',
    x: 0.71838,
    y: 0.730599,
  },
  {
    id: 'LSDL-535',
    categories: ['축복'],
    name: '도읍 하층 교회',
    x: 0.655645,
    y: 0.718929,
  },
  {
    id: 'LSDL-537',
    categories: ['축복'],
    name: '대로 옆 노대',
    x: 0.686026,
    y: 0.680609,
  },
  {
    id: 'LSDL-538',
    categories: ['축복'],
    name: '도읍 서쪽 성벽',
    x: 0.655134,
    y: 0.746899,
  },
  {
    id: 'LSDL-652',
    categories: ['축복'],
    name: '속세를 떠난 상인의 오두막',
    x: 0.379375,
    y: 0.158143,
  },
  {
    id: 'LSDL-653',
    categories: ['축복'],
    name: '외곽 전장터',
    x: 0.345806,
    y: 0.234821,
  },
  {
    id: 'LSDL-681',
    categories: ['축복', '던전', '보스'],
    name: '봉인된 갱도',
    x: 0.338331,
    y: 0.818085,
    loot: [
      {
        id: 'LSDL-681-1',
        name: '단석 [5]',
        quantity: 4,
      },
      {
        id: 'LSDL-681-2',
        name: '단석 [6]',
        quantity: 3,
      },
      {
        id: 'LSDL-681-3',
        name: '색 잃은 단석 [5]',
        quantity: 1,
      },
      {
        id: 'LSDL-681-4',
        name: '석검 열쇠',
        quantity: 1,
      },
      {
        id: 'LSDL-681-5',
        name: '황금의 룬 [1]',
        quantity: 1,
      },
      {
        id: 'LSDL-681-6',
        name: '황금의 룬 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-681-7',
        name: '황금의 룬 [9]',
        quantity: 1,
      },
      {
        id: 'LSDL-681-8',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-681-9',
        name: '망가진 결정',
      },
      {
        id: 'LSDL-681-10',
        name: '단석 채석꾼의 방울 [2]',
      },
      {
        id: 'LSDL-681-11',
        name: '흑왕의 대검',
      },
    ],
  },
  {
    id: 'LSDL-682',
    categories: ['축복'],
    name: '신수교',
    x: 0.474992,
    y: 0.776752,
  },
  {
    id: 'LSDL-683',
    categories: ['축복'],
    name: '성관 1층',
    x: 0.565494,
    y: 0.75872,
  },
  {
    id: 'LSDL-940',
    categories: ['축복'],
    name: '외곽 환영 나무',
    x: 0.134633,
    y: 0.674092,
  },
  {
    id: 'LSDL-941',
    categories: ['NPC'],
    name: '손가락 읽는 노파',
    x: 0.291034,
    y: 0.456739,
  },
  {
    id: 'LSDL-1071',
    categories: ['보스'],
    name: '용의 트리가드',
    x: 0.841438,
    y: 0.36436,
    loot: [
      {
        id: 'LSDL-1071-1',
        name: '대룡조',
      },
      {
        id: 'LSDL-1071-2',
        name: '용 발톱의 방패',
      },
    ],
  },
  {
    id: 'LSDL-1126',
    categories: ['장소'],
    name: '작은 황금나무 교회',
    x: 0.299979,
    y: 0.92296,
    loot: [
      {
        id: 'LSDL-1126-1',
        name: '황금 지네',
        quantity: 6,
      },
      {
        id: 'LSDL-1126-2',
        name: '황금률의 성인',
      },
    ],
  },
  {
    id: 'LSDL-1128',
    categories: ['장소'],
    name: '흉조가 버려진 지하',
    x: 0.627249,
    y: 0.469778,
    loot: [
      {
        id: 'LSDL-1128-1',
        name: '모그의 구속구',
      },
      {
        id: 'LSDL-1128-2',
        name: '방랑 민족의 뼛가루',
      },
      {
        id: 'LSDL-1128-3',
        name: '성룡 표식의 탈리스만 +1',
      },
      {
        id: 'LSDL-1128-4',
        name: '피가 밴 팔띠',
      },
      {
        id: 'LSDL-1128-5',
        name: '피가 밴 복면',
      },
      {
        id: 'LSDL-1128-6',
        name: '그림자 보내기',
      },
      {
        id: 'LSDL-1128-7',
        name: '상실의 전회',
      },
      {
        id: 'LSDL-1128-8',
        name: '단석 [5]',
      },
      {
        id: 'LSDL-1128-9',
        name: '단석 [6]',
      },
      {
        id: 'LSDL-1128-10',
        name: '단석 [7]',
        quantity: 11,
      },
      {
        id: 'LSDL-1128-11',
        name: '단석 [8]',
        quantity: 1,
      },
      {
        id: 'LSDL-1128-12',
        name: '색 잃은 단석 [6]',
        quantity: 2,
      },
      {
        id: 'LSDL-1128-13',
        name: '색 잃은 단석 [7]',
        quantity: 2,
      },
      {
        id: 'LSDL-1128-14',
        name: '색 잃은 단석 [8]',
        quantity: 1,
      },
      {
        id: 'LSDL-1128-15',
        name: '영혼 묘 은방울 꽃 [6]',
        quantity: 1,
      },
      {
        id: 'LSDL-1128-16',
        name: '이엘로의 눈동자',
      },
      {
        id: 'LSDL-1128-17',
        name: '황금 지네',
        quantity: 2,
      },
      {
        id: 'LSDL-1128-18',
        name: '끈',
      },
      {
        id: 'LSDL-1128-19',
        name: '룬의 호',
        quantity: 2,
      },
      {
        id: 'LSDL-1128-20',
        name: '석검 열쇠',
      },
      {
        id: 'LSDL-1128-21',
        name: '황금의 룬 [1]',
      },
      {
        id: 'LSDL-1128-22',
        name: '황금의 룬 [8]',
      },
      {
        id: 'LSDL-1128-23',
        name: '황금의 룬 [10]',
      },
      {
        id: 'LSDL-1128-24',
        name: '황금의 룬 [11]',
        quantity: 2,
      },
      {
        id: 'LSDL-1128-25',
        name: '얼룩색 흰 육포',
      },
      {
        id: 'LSDL-1128-26',
        name: '의식 항아리',
        quantity: 1,
      },
      {
        id: 'LSDL-1128-27',
        name: '혈염의 발톱자국',
      },
      {
        id: 'LSDL-1128-28',
        name: '황금 나무의 은총+1',
      },
    ],
  },
  {
    id: 'LSDL-1158',
    categories: ['지도조각'],
    name: '지도 조각 (도읍 로데일)',
    x: 0.158541,
    y: 0.663766,
    loot: [
      {
        id: 'LSDL-1158-1',
        name: '지도 조각 (도읍 로데일)',
      },
    ],
  },
  {
    id: 'LSDL-1159',
    categories: ['전회'],
    name: '전회 : 황금 패리',
    x: 0.358774,
    y: 0.458912,
    loot: [
      {
        id: 'LSDL-1159-1',
        name: '황금 패리',
      },
    ],
  },
  {
    id: 'LSDL-1168',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.153574,
    y: 0.692818,
    loot: [
      {
        id: 'LSDL-1168-1',
        name: '황금 종자',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1169',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.292501,
    y: 0.430831,
    loot: [
      {
        id: 'LSDL-1169-1',
        name: '황금 종자',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-1170',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.667474,
    y: 0.640634,
    loot: [
      {
        id: 'LSDL-1170-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1171',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.663007,
    y: 0.809521,
    loot: [
      {
        id: 'LSDL-1171-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1182',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.177463,
    y: 0.82678,
    loot: [
      {
        id: 'LSDL-1182-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1215',
    categories: ['성배병'],
    name: '황금 종자',
    x: 0.139629,
    y: 0.023133,
    loot: [
      {
        id: 'LSDL-1215-1',
        name: '황금 종자',
      },
    ],
  },
  {
    id: 'LSDL-1299',
    categories: ['탈리스만'],
    name: '은혜의 물방울의 탈리스만',
    x: 0.436483,
    y: 0.792002,
    loot: [
      {
        id: 'LSDL-1299-1',
        name: '은혜의 물방울의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-1572',
    categories: ['보스'],
    name: '방울 사냥꾼 - 로데일 외곽',
    x: 0.393656,
    y: 0.164945,
    loot: [
      {
        id: 'LSDL-1572-1',
        name: '약 장사꾼의 방울',
      },
    ],
  },
  {
    id: 'LSDL-1573',
    categories: ['NPC'],
    name: '속세를 떠난 상인 [1]',
    x: 0.39117,
    y: 0.149188,
  },
  {
    id: 'LSDL-1579',
    categories: ['장소'],
    name: '로데일 콜로세움 마리카 동상',
    x: 0.545535,
    y: 0.894699,
  },
  {
    id: 'LSDL-1603',
    categories: ['NPC'],
    name: '대변 먹는 자 [2]',
    x: 0.664605,
    y: 0.621382,
  },
  {
    id: 'LSDL-1604',
    categories: ['암령'],
    name: '침입 npc : 대변먹는 자',
    x: 0.695501,
    y: 0.382837,
    loot: [
      {
        id: 'LSDL-1604-1',
        name: '미에로스의 검',
      },
    ],
  },
  {
    id: 'LSDL-1605',
    categories: ['NPC'],
    name: '불량배 [2]',
    x: 0.66509,
    y: 0.36708,
  },
  {
    id: 'LSDL-1606',
    categories: [],
    name: '흐느낌 반도 전송 함정 목적지',
    x: 0.504224,
    y: 0.768093,
  },
  {
    id: 'LSDL-1633',
    categories: ['축복', '던전', '보스'],
    name: '아우리자 부묘지',
    x: 0.894737,
    y: 0.39642,
    loot: [
      {
        id: 'LSDL-1633-1',
        name: '금 간 항아리',
      },
      {
        id: 'LSDL-1633-2',
        name: '의식 항아리',
        quantity: 2,
      },
      {
        id: 'LSDL-1633-3',
        name: '조향사의 제작서 [3]',
      },
      {
        id: 'LSDL-1633-4',
        name: '특공대의 뼛가루',
      },
    ],
  },
  {
    id: 'LSDL-1646',
    categories: ['중요아이템'],
    name: '모판의 저주',
    x: 0.59785,
    y: 0.761572,
    loot: [
      {
        id: 'LSDL-1646-1',
        name: '모판의 저주',
      },
    ],
  },
  {
    id: 'LSDL-1647',
    categories: ['암령'],
    name: '화산관 암살 퀘스트 (베르나르)',
    x: 0.6128,
    y: 0.767007,
  },
  {
    id: 'LSDL-1648',
    categories: ['방어구'],
    name: '알베리히 세트',
    x: 0.584397,
    y: 0.783307,
    loot: [
      {
        id: 'LSDL-1648-1',
        name: '알베리히의 뾰족모자',
      },
      {
        id: 'LSDL-1648-2',
        name: '알베리히의 옷',
      },
      {
        id: 'LSDL-1648-3',
        name: '알베리히의 장갑',
      },
      {
        id: 'LSDL-1648-4',
        name: '알베리히의 바지',
      },
    ],
  },
  {
    id: 'LSDL-1649',
    categories: ['무기'],
    name: '폭풍 매 도끼',
    x: 0.554018,
    y: 0.751247,
    loot: [
      {
        id: 'LSDL-1649-1',
        name: '폭풍 매 도끼',
      },
    ],
  },
  {
    id: 'LSDL-1650',
    categories: ['무기'],
    name: '가시 철구권',
    x: 0.598834,
    y: 0.919696,
    loot: [
      {
        id: 'LSDL-1650-1',
        name: '가시 철구권',
      },
    ],
  },
  {
    id: 'LSDL-1651',
    categories: ['보스'],
    name: '첫 왕 고드프리',
    x: 0.705435,
    y: 0.863184,
    loot: [
      {
        id: 'LSDL-1651-1',
        name: '부적 주머니',
      },
    ],
  },
  {
    id: 'LSDL-1653',
    categories: ['기도서'],
    name: '황금률 원론',
    x: 0.694469,
    y: 0.862099,
    loot: [
      {
        id: 'LSDL-1653-1',
        name: '황금률 원론',
      },
    ],
  },
  {
    id: 'LSDL-1654',
    categories: ['무기'],
    name: '황금 나무의 활',
    x: 0.705435,
    y: 0.844711,
    loot: [
      {
        id: 'LSDL-1654-1',
        name: '황금 나무의 활',
      },
    ],
  },
  {
    id: 'LSDL-1655',
    categories: ['기도서'],
    name: '두 손가락의 기도서',
    x: 0.583409,
    y: 0.765919,
    loot: [
      {
        id: 'LSDL-1655-1',
        name: '두 손가락의 기도서',
      },
    ],
  },
  {
    id: 'LSDL-1656',
    categories: ['무기'],
    name: '그랑삭스의 벼락',
    x: 0.737824,
    y: 0.801783,
    loot: [
      {
        id: 'LSDL-1656-1',
        name: '그랑삭스의 벼락',
      },
    ],
  },
  {
    id: 'LSDL-1657',
    categories: ['기도'],
    name: '기도 : 황금의 마력 방호',
    x: 0.757747,
    y: 0.806672,
    loot: [
      {
        id: 'LSDL-1657-1',
        name: '황금의 마력 방호',
      },
    ],
  },
  {
    id: 'LSDL-1661',
    categories: ['NPC'],
    name: '금가면 경 & 콜린 [2]',
    x: 0.617769,
    y: 0.911544,
  },
  {
    id: 'LSDL-1664',
    categories: ['기타'],
    name: '라다곤 석상',
    x: 0.738812,
    y: 0.825145,
  },
  {
    id: 'LSDL-1680',
    categories: ['그릇'],
    name: '금 간 항아리 - 로데일 대로 옆 노대',
    x: 0.662596,
    y: 0.665937,
    loot: [
      {
        id: 'LSDL-1680-1',
        name: '금 간 항아리 - 로데일 대로 옆 노대',
      },
    ],
  },
  {
    id: 'LSDL-1688',
    categories: ['장소'],
    name: '도읍 로데일',
    x: 0.630717,
    y: 0.70506,
  },
  {
    id: 'LSDL-1689',
    categories: ['전회'],
    name: '성스러운 숫돌 칼날',
    x: 0.602822,
    y: 0.791459,
    loot: [
      {
        id: 'LSDL-1689-1',
        name: '성스러운 숫돌 칼날',
      },
    ],
  },
  {
    id: 'LSDL-1699',
    categories: [],
    name: '전송문',
    x: 0.450413,
    y: 0.828409,
  },
  {
    id: 'LSDL-1701',
    categories: ['중요아이템'],
    name: '색 잃은 단석 [6]',
    x: 0.883766,
    y: 0.600188,
    loot: [
      {
        id: 'LSDL-1701-1',
        name: '색 잃은 단석 [6]',
      },
    ],
  },
  {
    id: 'LSDL-1702',
    categories: ['기타'],
    name: '모르고트의 봉인',
    x: 0.997822,
    y: 0.693106,
  },
  {
    id: 'LSDL-1794',
    categories: ['축복'],
    name: '성벽을 따라난 샛길',
    x: 0.026054,
    y: 0.400772,
  },
  {
    id: 'LSDL-1795',
    categories: ['중요아이템'],
    name: '하프 보우',
    x: 0.001151,
    y: 0.413271,
    loot: [
      {
        id: 'LSDL-1795-1',
        name: '하프 보우',
      },
    ],
  },
  {
    id: 'LSDL-1804',
    categories: ['무기'],
    name: '조약돌의 성인',
    x: 0.597373,
    y: 0.70343,
    loot: [
      {
        id: 'LSDL-1804-1',
        name: '조약돌의 성인',
      },
    ],
  },
  {
    id: 'LSDL-1806',
    categories: ['축복', '던전', '보스'],
    name: '로데일 지하묘지',
    x: 0.603339,
    y: 0.525201,
    loot: [
      {
        id: 'LSDL-1806-1',
        name: '도가니 비늘의 탈리스만',
      },
      {
        id: 'LSDL-1806-2',
        name: '묘 은방울 꽃 [8]',
        quantity: 4,
      },
      {
        id: 'LSDL-1806-3',
        name: '묘 은방울 꽃 [9]',
        quantity: 2,
      },
      {
        id: 'LSDL-1806-4',
        name: '영혼 묘 은방울 꽃 [8]',
        quantity: 1,
      },
      {
        id: 'LSDL-1806-5',
        name: '성혈 나무의 싹',
        quantity: 2,
      },
      {
        id: 'LSDL-1806-6',
        name: '피의 군주 환희',
      },
    ],
  },
  {
    id: 'LSDL-1807',
    categories: ['보스'],
    name: '죽음의 새 - 로데일 외곽',
    x: 0.556042,
    y: 0.125275,
    loot: [
      {
        id: 'LSDL-1807-1',
        name: '쌍조의 카이트 실드',
      },
    ],
  },
  {
    id: 'LSDL-1808',
    categories: ['성배병'],
    name: '날개 결정 물방울',
    x: 0.575967,
    y: 0.084524,
    loot: [
      {
        id: 'LSDL-1808-1',
        name: '날개 결정 물방울',
      },
    ],
  },
  {
    id: 'LSDL-1809',
    categories: ['전회'],
    name: '전회 : 낙뢰',
    x: 0.612803,
    y: 0.658874,
    loot: [
      {
        id: 'LSDL-1809-1',
        name: '낙뢰',
      },
    ],
  },
  {
    id: 'LSDL-1810',
    categories: ['던전'],
    name: '미친 불의 봉인',
    x: 0.670091,
    y: 0.527378,
    loot: [
      {
        id: 'LSDL-1810-1',
        name: '방랑 상인의 모자',
      },
      {
        id: 'LSDL-1810-2',
        name: '방랑 상인의 옷',
      },
      {
        id: 'LSDL-1810-3',
        name: '방랑 상인의 바지',
      },
      {
        id: 'LSDL-1810-4',
        name: '병자의 제작서 [2]',
      },
      {
        id: 'LSDL-1810-5',
        name: '문서 : 미켈라의 침',
      },
      {
        id: 'LSDL-1810-6',
        name: '이엘로의 눈동자',
        quantity: 5,
      },
      {
        id: 'LSDL-1810-7',
        name: '룬의 호',
        quantity: 1,
      },
      {
        id: 'LSDL-1810-8',
        name: '황금의 룬 [11]',
        quantity: 1,
      },
      {
        id: 'LSDL-1810-9',
        name: '발광 전염',
      },
      {
        id: 'LSDL-1810-10',
        name: '지문석의 방패',
      },
    ],
  },
  {
    id: 'LSDL-2298',
    categories: [],
    name: '황금 지네 파밍 위치 2',
    x: 0.658606,
    y: 0.868616,
  },
  {
    id: 'LSDL-2442',
    categories: ['보스'],
    name: '흉조의 왕 모르고트',
    x: 0.857362,
    y: 0.92241,
    loot: [
      {
        id: 'LSDL-2442-1',
        name: '모르고트의 거대한 룬',
      },
      {
        id: 'LSDL-2442-2',
        name: '흉조의 왕의 추억',
      },
    ],
  },
  {
    id: 'LSDL-2526',
    categories: ['보스'],
    name: '내리는 별의 짐승',
    x: 0.003631,
    y: 0.7719,
    loot: [
      {
        id: 'LSDL-2526-1',
        name: '색 잃은 단석 [5]',
      },
      {
        id: 'LSDL-2526-2',
        name: '단석 [6]',
      },
      {
        id: 'LSDL-2526-3',
        name: '중력석 파편',
      },
      {
        id: 'LSDL-2526-4',
        name: '중력석 덩어리',
      },
    ],
  },
  {
    id: 'LSDL-2527',
    categories: ['보스'],
    name: '트리가드 & 트리가드',
    x: 0.038999,
    y: 0.675723,
    loot: [
      {
        id: 'LSDL-2527-1',
        name: '황금 나무의 대형 방패',
      },
      {
        id: 'LSDL-2527-2',
        name: '영웅의 룬 [1]',
      },
    ],
  },
  {
    id: 'LSDL-2528',
    categories: [],
    name: '트리나의 수련',
    x: 0.116696,
    y: 0.883838,
    loot: [
      {
        id: 'LSDL-2528-1',
        name: '트리나의 수련',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2529',
    categories: [],
    name: '거인 부수기',
    x: 0.17796,
    y: 0.844714,
    loot: [
      {
        id: 'LSDL-2529-1',
        name: '거인 부수기',
      },
    ],
  },
  {
    id: 'LSDL-2530',
    categories: ['제작서'],
    name: '선교사의 제작서 [4]',
    x: 0.298482,
    y: 0.889811,
    loot: [
      {
        id: 'LSDL-2530-1',
        name: '선교사의 제작서 [4]',
      },
    ],
  },
  {
    id: 'LSDL-2531',
    categories: ['무기'],
    name: '가고일의 대형 도끼',
    x: 0.206858,
    y: 0.564873,
    loot: [
      {
        id: 'LSDL-2531-1',
        name: '가고일의 대형 도끼',
      },
    ],
  },
  {
    id: 'LSDL-2532',
    categories: ['전회'],
    name: '상실의 전회',
    x: 0.41357,
    y: 0.525202,
    loot: [
      {
        id: 'LSDL-2532-1',
        name: '상실의 전회',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2533',
    categories: [],
    name: '연기 나비 파밍 위치 - 로데일 외곽',
    x: 0.280575,
    y: 0.561068,
  },
  {
    id: 'LSDL-2534',
    categories: [],
    name: '황금의 룬 [10]',
    x: 0.200886,
    y: 0.368168,
    loot: [
      {
        id: 'LSDL-2534-1',
        name: '황금의 룬 [10]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2535',
    categories: [],
    name: '황금의 룬 [4]',
    x: 0.146594,
    y: 0.407292,
    loot: [
      {
        id: 'LSDL-2535-1',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2536',
    categories: ['탈리스만'],
    name: '녹색 호박 메달리온 +1',
    x: 0.315456,
    y: 0.32524,
    loot: [
      {
        id: 'LSDL-2536-1',
        name: '녹색 호박 메달리온 +1',
      },
    ],
  },
  {
    id: 'LSDL-2537',
    categories: [],
    name: '아르테리아의 잎',
    x: 0.283578,
    y: 0.304051,
    loot: [
      {
        id: 'LSDL-2537-1',
        name: '아르테리아의 잎',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2538',
    categories: [],
    name: '황금의 룬 [7]',
    x: 0.378704,
    y: 0.231782,
    loot: [
      {
        id: 'LSDL-2538-1',
        name: '황금의 룬 [7]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2539',
    categories: [],
    name: '황금의 룬 [12]',
    x: 0.423042,
    y: 0.386097,
    loot: [
      {
        id: 'LSDL-2539-1',
        name: '황금의 룬 [12]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2540',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.651669,
    y: 0.379033,
    loot: [
      {
        id: 'LSDL-2540-1',
        name: '황금의 룬 [6]',
      },
    ],
  },
  {
    id: 'LSDL-2541',
    categories: [],
    name: '황금의 룬 [2]',
    x: 0.564007,
    y: 0.321437,
    loot: [
      {
        id: 'LSDL-2541-1',
        name: '황금의 룬 [2]',
      },
    ],
  },
  {
    id: 'LSDL-2542',
    categories: [],
    name: '미켈라의 수련',
    x: 0.506722,
    y: 0.320892,
    loot: [
      {
        id: 'LSDL-2542-1',
        name: '미켈라의 수련',
      },
    ],
  },
  {
    id: 'LSDL-2543',
    categories: [],
    name: '황금의 룬 [4]',
    x: 0.560504,
    y: 0.181244,
    loot: [
      {
        id: 'LSDL-2543-1',
        name: '황금의 룬 [4]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2544',
    categories: [],
    name: '황금의 룬 [5]',
    x: 0.489769,
    y: 0.104086,
    loot: [
      {
        id: 'LSDL-2544-1',
        name: '황금의 룬 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2545',
    categories: [],
    name: '영기류',
    x: 0.340856,
    y: 0.561068,
  },
  {
    id: 'LSDL-2546',
    categories: ['전회'],
    name: '전회 : 기도의 일격',
    x: 0.320929,
    y: 0.694195,
    loot: [
      {
        id: 'LSDL-2546-1',
        name: '기도의 일격',
      },
    ],
  },
  {
    id: 'LSDL-2547',
    categories: ['성배병'],
    name: '작은 황금 나무 - 로데일 북쪽',
    x: 0.669112,
    y: 0.161682,
    loot: [
      {
        id: 'LSDL-2547-1',
        name: '가는 가지 깨진 물방울',
      },
      {
        id: 'LSDL-2547-2',
        name: '붉은 결정 물방울',
      },
    ],
  },
  {
    id: 'LSDL-2548',
    categories: ['NPC'],
    name: '협력 소환 : 큰 뿔의 트라고스',
    x: 0.844914,
    y: 0.318174,
  },
  {
    id: 'LSDL-2549',
    categories: ['일반단석'],
    name: '단석 [5]',
    x: 0.738316,
    y: 0.278508,
    loot: [
      {
        id: 'LSDL-2549-1',
        name: '단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2550',
    categories: [],
    name: '트리나의 수련',
    x: 0.40711,
    y: 0.096478,
    loot: [
      {
        id: 'LSDL-2550-1',
        name: '트리나의 수련',
      },
    ],
  },
  {
    id: 'LSDL-2551',
    categories: ['전회'],
    name: '전회 : 뇌격참',
    x: 0.283585,
    y: 0.063876,
    loot: [
      {
        id: 'LSDL-2551-1',
        name: '뇌격참',
      },
    ],
  },
  {
    id: 'LSDL-2552',
    categories: [],
    name: '황금의 룬 [9]',
    x: 0.305483,
    y: 0.136148,
    loot: [
      {
        id: 'LSDL-2552-1',
        name: '황금의 룬 [9]',
      },
    ],
  },
  {
    id: 'LSDL-2553',
    categories: [],
    name: '네 발가락 새 다리',
    x: 0.086332,
    y: 0.049208,
    loot: [
      {
        id: 'LSDL-2553-1',
        name: '네 발가락 새 다리',
        quantity: 3,
      },
    ],
  },
  {
    id: 'LSDL-2554',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.060928,
    y: 0.167121,
    loot: [
      {
        id: 'LSDL-2554-1',
        name: '색 잃은 단석 [5]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2555',
    categories: ['물방울 유생'],
    name: '물방울 유생',
    x: 0.110736,
    y: 0.203524,
    loot: [
      {
        id: 'LSDL-2555-1',
        name: '물방울 유생',
      },
    ],
  },
  {
    id: 'LSDL-2556',
    categories: [],
    name: '황금의 룬 [6]',
    x: 0.020573,
    y: 0.589325,
    loot: [
      {
        id: 'LSDL-2556-1',
        name: '황금의 룬 [6]',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2566',
    categories: [],
    name: '유생나비',
    x: 0.03651,
    y: 0.644751,
    loot: [
      {
        id: 'LSDL-2566-1',
        name: '유생나비',
        quantity: 1,
      },
    ],
  },
  {
    id: 'LSDL-2567',
    categories: ['축복', '던전', '보스'],
    name: '조향사의 은신 동굴',
    x: 0.009612,
    y: 0.622471,
    loot: [
      {
        id: 'LSDL-2567-1',
        name: '조향병',
        quantity: 1,
      },
      {
        id: 'LSDL-2567-2',
        name: '황금의 룬 [5]',
        quantity: 2,
      },
      {
        id: 'LSDL-2567-3',
        name: '아르테리아의 잎',
        quantity: 3,
      },
      {
        id: 'LSDL-2567-4',
        name: '동굴 이끼 꽃눈',
      },
      {
        id: 'LSDL-2567-5',
        name: '동굴 이끼 결정',
      },
      {
        id: 'LSDL-2567-6',
        name: '은색 반딧불',
      },
      {
        id: 'LSDL-2567-7',
        name: '산항아리 파편',
      },
      {
        id: 'LSDL-2567-8',
        name: '흉조잡이의 큰 나대',
      },
    ],
  },
  {
    id: 'LSDL-2610',
    categories: ['기타'],
    name: '그림 : 날지 못하는 새',
    x: 0.552519,
    y: 0.767008,
  },
  {
    id: 'LSDL-2612',
    categories: ['기타'],
    name: '그림 : 날지 못하는 새',
    x: 0.554527,
    y: 0.769724,
  },
  {
    id: 'LSDL-2877',
    categories: [],
    name: '황금의 룬 [12]',
    x: 0.185942,
    y: 0.362194,
    loot: [
      {
        id: 'LSDL-2877-1',
        name: '황금의 룬 [12]',
      },
    ],
  },
  {
    id: 'LSDL-2932',
    categories: ['중요아이템'],
    name: '로데일 탑 사다리 위',
    x: 0.781148,
    y: 0.715384,
    loot: [
      {
        id: 'LSDL-2932-1',
        name: '조향병',
      },
      {
        id: 'LSDL-2932-2',
        name: '모판의 저주',
      },
    ],
  },
  {
    id: 'LSDL-2934',
    categories: ['그릇'],
    name: '조향병',
    x: 0.910667,
    y: 0.72951,
    loot: [
      {
        id: 'LSDL-2934-1',
        name: '조향병',
      },
    ],
  },
  {
    id: 'LSDL-2935',
    categories: [],
    name: '미켈라의 수련',
    x: 0.889246,
    y: 0.720273,
    loot: [
      {
        id: 'LSDL-2935-1',
        name: '미켈라의 수련',
        quantity: 2,
      },
    ],
  },
  {
    id: 'LSDL-2955',
    categories: ['색단석'],
    name: '고룡의 색 잃은 단석',
    x: 0.624755,
    y: 0.755594,
    loot: [
      {
        id: 'LSDL-2955-1',
        name: '고룡의 색 잃은 단석',
      },
    ],
  },
  {
    id: 'LSDL-2964',
    categories: ['NPC'],
    name: '아인 보크 [5]',
    x: 0.799098,
    y: 0.59693,
  },
  {
    id: 'LSDL-2969',
    categories: ['NPC'],
    name: '스포일러',
    x: 0.633709,
    y: 0.884919,
  },
  {
    id: 'LSDL-2970',
    categories: ['NPC'],
    name: '스포일러',
    x: 0.703461,
    y: 0.764287,
  },
  {
    id: 'LSDL-2980',
    categories: ['탈리스만'],
    name: '황금 나무의 은총 +2',
    x: 0.874804,
    y: 0.760485,
    loot: [
      {
        id: 'LSDL-2980-1',
        name: '황금 나무의 은총 +2',
      },
    ],
  },
  {
    id: 'LSDL-2988',
    categories: ['색단석'],
    name: '색 잃은 단석 [5]',
    x: 0.717899,
    y: 0.839818,
    loot: [
      {
        id: 'LSDL-2988-1',
        name: '색 잃은 단석 [5]',
      },
    ],
  },
  {
    id: 'LSDL-3013',
    categories: ['중요아이템'],
    name: '봉투방패의 탈리스만',
    x: 0.55003,
    y: 0.86427,
    loot: [
      {
        id: 'LSDL-3013-1',
        name: '봉투방패의 탈리스만',
      },
    ],
  },
  {
    id: 'LSDL-3014',
    categories: ['영마의 복장'],
    name: '☆영마의 복장 「장송의 밤빛 말」',
    x: 0.533117,
    y: 0.325238,
  },
  {
    id: 'LSDL-3015',
    categories: ['암령'],
    name: '☆파쇄된 가면 경',
    x: 0.707922,
    y: 0.825692,
  },
];

type TMapMarkerSample = {
  id: string;
  categories: string[];
  name: string;
  x: number;
  y: number;
  isLabelPriority?: boolean;
  loot?: { id: string; name: string; quantity?: number }[];
};

export function getMapMarkerSamples(regionId: string): TMapMarkerSample[] {
  if (regionId === '1') return LIMGRAVE_MARKERS;
  if (regionId === '2') return WEEPING_PENINSULA_MARKERS;
  if (regionId === '3') return STORMVEIL_CASTLE_MARKERS;
  if (regionId === '4') return LIURNIA_EAST_WEST_MARKERS;
  if (regionId === '5') return LIURNIA_NORTH_MARKERS;
  if (regionId === '6') return AINSEL_RIVER_MARKERS;
  if (regionId === '7') return SIOFRA_RIVER_MARKERS;
  if (regionId === '8') return CAELID_MARKERS;
  if (regionId === '10') return DEEPROOT_DEPTHS_MARKERS;
  if (regionId === '11') return ALTUS_PLATEAU_MARKERS;
  if (regionId === '12') return MT_GELMIR_MARKERS;
  if (regionId === '13') return LEYNDELL_OUTSKIRTS_MARKERS;
  if (regionId === '14') return LEYNDELL_ROYAL_CAPITAL_MARKERS;
  return [];
}
