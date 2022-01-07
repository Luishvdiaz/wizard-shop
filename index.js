const data = require('./items.json');
let money = 220;
let discountPercentage = 0.1;
const userData = [];

const input = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function userInput(question) {
  return new Promise((resolve, reject) => {
    input.question(question, response => {
      resolve(response);
    })
  });
}

async function init() {
  console.log('Welcome to my store, How can I help you?');
  let loop = true;
  while (loop) {
    console.log('----------Inventory----------');
    console.log(data);
    console.log('------');
    console.log(userData);
    console.log('-----------------------------');
  const option = await userInput(`
    options:
    1. Buy something.
    2. Sell your stuff to me.
    3. Know your finances.
    4. Have a nice conversation.

    0. Exit.
  `);

    switch (Number(option)) {
          case 0:
            loop = false;
            break;
      case 1:
        console.log(`
          Ok this is what I have:
          1. Dragon tears
          2. Red potion
          3. Black oak stick

          0. Go back
        `);

        const secondOption = await userInput('Do you wanna something? \n');
          switch (Number(secondOption)) {
            case 0:
              break;
            case 1:
              const selected = data.find((a) => a.name === 'Dragon tears');
              console.log(selected.description, '\n');
              console.log('The unit price is ', selected.unitPrice);
              console.log('\n');
              const answer = await userInput('Want some? tell my how many do you want');
                if (Number(answer) > selected.onStock) {
                  console.log("Sorry, I don't have enough of this.");
                } else if ((Number(answer) * selected.unitPrice) > money) {
                  console.log("Are you stupid? you don't have enough money");
                } else {
                  console.log(`you buy ${answer} pieces. you are welcome.`);
                  selected.onStock -= Number(answer);
                  money -= (Number(answer) * selected.unitPrice);
                  const some = userData.some((userSome) => userSome.name === 'Dragon tears');
                  if (some) {
                    for (let i = 0; i < userData.length; i++) {
                      if (userData[i].name === 'Dragon tears') {
                        userData[i].onStock += Number(answer);
                      }
                    }
                  } else {
                    userData.push({...selected, onStock: Number(answer) });
                  }
                }
              break;
            case 2:
              const selected2 = data.find((a) => a.name === 'Red potion');
              console.log(selected2.description, '\n');
              console.log('The unit price is ', selected2.unitPrice);
              console.log('\n');
              const answer2 = await userInput('Want some? tell my how many do you want');
                if (Number(answer2) > selected2.onStock) {
                  console.log("Sorry, I don't have enough of this.");
                } else if ((Number(answer2) * selected2.unitPrice) > money) {
                  console.log("Are you stupid? you don't have enough money");
                } else {
                  console.log(`you buy ${answer2} pieces. you are welcome.`);
                  selected2.onStock -= Number(answer2);
                  money -= (Number(answer2) * selected2.unitPrice);
                  const some2 = userData.some((userSome2) => userSome2.name === 'Red potion');
                  if (some2) {
                    for (let i = 0; i < userData.length; i++) {
                      if (userData[i].name === 'Red potion') {
                        userData[i].onStock += Number(answer2);
                      }
                    }
                  } else {
                    userData.push({...selected2, onStock: Number(answer2) });
                  }
                }
              break;
            case 3:
              const selected3 = data.find((a) => a.name === 'Black oak stick');
              console.log(selected3.description, '\n');
              console.log('The unit price is ', selected3.unitPrice);
              console.log('\n');
              const answer3 = await userInput('Want some? tell my how many do you want');
                if (Number(answer3) > selected3.onStock) {
                  console.log("Sorry, I don't have enough of this.");
                } else if ((Number(answer3) * selected3.unitPrice) > money) {
                  console.log("Are you stupid? you don't have enough money");
                } else {
                  console.log(`you buy ${answer3} pieces. you are welcome.`);
                  selected3.onStock -= Number(answer3);
                  money -= (Number(answer3) * selected3.unitPrice);
                  const some3 = userData.some((userSome3) => userSome3.name === 'Black oak stick');
                  if (some3) {
                    for (let i = 0; i < userData.length; i++) {
                      if (userData[i].name === 'Black oak stick') {
                        userData[i].onStock += Number(answer3);
                      }
                    }
                  } else {
                    userData.push({...selected3, onStock: Number(answer3) });
                  }
                }
              break;
            default:
              break;
          }
        break;
      case 2:
        console.log(`
          Ok I accept this items:
          1. Dragon tears
          2. Red potion
          3. Black oak stick

          0. Go back
        `);

        const otherOption = await userInput('Do you wanna sell something? \n');
          switch (Number(otherOption)) {
            case 0:
              break;
            case 1:
              const selectedUser = userData.find((a) => a.name === 'Dragon tears');
              if (!selectedUser) {
                console.log('You dont have dragon tears');
                break;
              }
              console.log(`I will pay ${selectedUser.unitPrice - (selectedUser.unitPrice * discountPercentage)} for each one.`);
              console.log('\n');
              const answerUser = await userInput('How many will you sell to me?');
                if (Number(answerUser) > selectedUser.onStock) {
                  console.log("Sorry, you don't have enough of Dragon tears.");
                } else {
                  console.log(`you sell to me ${answerUser} pieces. you are welcome.`);
                  selectedUser.onStock -= Number(answerUser);
                  money += (Number(answerUser) * selectedUser.unitPrice);
                    for (let i = 0; i < data.length; i++) {
                      if (data[i].name === 'Dragon tears') {
                        data[i].onStock += Number(answerUser);
                      }
                    }
                }
              break;
            case 2:
              const selectedUser2 = userData.find((a) => a.name === 'Red potion');
              if (!selectedUser2) {
                console.log('You dont have Red potion');
                break;
              }
              console.log(`I will pay ${selectedUser2.unitPrice - (selectedUser2.unitPrice * discountPercentage)} for each one.`);
              console.log('\n');
              const answerUser2 = await userInput('How many will you sell to me?');
                if (Number(answerUser2) > selectedUser2.onStock) {
                  console.log("Sorry, you don't have enough of Red potion.");
                } else {
                  console.log(`you sell to me ${answerUser2} pieces. you are welcome.`);
                  selectedUser2.onStock -= Number(answerUser2);
                  money += (Number(answerUser2) * selectedUser2.unitPrice);
                    for (let i = 0; i < data.length; i++) {
                      if (data[i].name === 'Red potion') {
                        data[i].onStock += Number(answerUser2);
                      }
                    }
                }
              break;
            case 3:
              const selectedUser3 = userData.find((a) => a.name === 'Red potion');
              if (!selectedUser3) {
                console.log('You dont have Red potion');
                break;
              }
              console.log(`I will pay ${selectedUser3.unitPrice - (selectedUser3.unitPrice * discountPercentage)} for each one.`);
              console.log('\n');
              const answerUser3 = await userInput('How many will you sell to me?');
                if (Number(answerUser3) > selectedUser3.onStock) {
                  console.log("Sorry, you don't have enough of Red potion.");
                } else {
                  console.log(`you sell to me ${answerUser3} pieces. you are welcome.`);
                  selectedUser3.onStock -= Number(answerUser3);
                  money += (Number(answerUser3) * selectedUser3.unitPrice);
                    for (let i = 0; i < data.length; i++) {
                      if (data[i].name === 'Red potion') {
                        data[i].onStock += Number(answerUser3);
                      }
                    }
                }
              break;
            default:
              break;
          }
        break;
      case 3:
        console.log(`Really?! Can\'t you see your own pockets? you have $${money} \n`);
        console.log('And your items are', JSON.stringify(userData));
        console.log('\n');
        break;
      case 4:
        console.log('I don\'t have time for that shit, let\'s make business or you can go the hell out of here.');
        break;
      default:
        init();
        break;
    }
  }

  console.log('Thanks for nothing');
  process.exit();
}

init();
