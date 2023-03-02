let startTime = Date.now();
const log = (msg) => {
  const now = Date.now();
  console.log(`${msg} - ${now - startTime}ms`);
  startTime = now;
};

const users = [
  { id: "1", name: "tim", role: "ADMIN" },
  { id: "2", name: "adam", role: "USER" },
  { id: "3", name: "mickey", role: "USER" },
  { id: "4", name: "sandra", role: "USER" },
];

const sleep = (time) => new Promise((res) => setTimeout(res, time));

const getUserName = async (id) => {
  await sleep(1000);
  const user = users.find((user) => user.id === id);
  return user.name;
};

const oldFashionedWay = () => {
  getUserName("1").then((tim) => {
    getUserName("2").then((adam) => {
      log([tim, adam]);
    });
  });
};

const slowWay = async () => {
  const tim = await getUserName("1");
  // will wait until this is done, then do the next line after, taking twice as long
  const adam = await getUserName("2");
  log([tim, adam]);
};

const forLoop = async () => {
  const ids = ["1", "2", "3"];

  const usernames = ids.map((id) => getUserName(id));

  for await (const username of usernames) {
    log(username);
  }
};

const myPreferredWay = async () => {
  const ids = ["1", "2", "3"];

  const usernames = await Promise.all(ids.map((id) => getUserName(id)));
  log(usernames);
};

const ifStatement = async () => {
  if ((await getUserName("1")) === "tim") {
    log("you are the teacher");
  } else {
    log("you are the brother");
  }
};

myPreferredWay();
