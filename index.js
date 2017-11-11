const login = require("facebook-chat-api")
// EDIT YOUR EMAIL & PWD HERE!
const credentials = {email: "email", password: "password"}

// กรุ๊งกริ๊ง
const bell = ["กี่ลูก","มีกี่ลูก","ทั้งหมดกี่ลูก","มีกระดิ่งกี่ลูก"]

// บ้านสีแดง
const red = ["เสื้อ","ทรัมป์","กล่อง","กระดาษชำระ","ขวด","ป้าย","พัดลมไฟฟ้า","ลาบ","แก้ว","หมา"]
const white = ["กางเกง","เก้าอี้","นกเขา","กูเกิล","พิซซ่าฮาวายเอี้ยน","ซีเว่นอีเลเว่น","เฟสบุ๊ค","ทิชชู","ปลาหยุดจันทร์อังคาร","แนปแลบ"]
const green = ["กรุงเทพมหานคร","กางเกงใน","ทวิตเตอร์","คอมพิวเตอร์","Stupid Hackathon","เซ็นทรัลเวิลด์","ช็อกโกแลต","ปาทังกี้ปาทังก้า","คิมจองอึน","ถังขยะ"]

// ปลา 10 บาท
const ten =["นก","หมอน","หยก","ถนน","สยามพารากอน","ยะลา","ขนมหวาน","จรวด","นมสด","บอนชอน"]
const twenty =["ยุง","ปู","นกยูง","รถบรรทุก","ขูดหวย","หนูนา","ถุง","ประตู","สูตรเลข","กระดูก"]
const thirty =["ไก่","พ่อ","โปรแกรมเมอร์","บ้าน","เป็ด","น้ำ","ลาเต้","เรือดำน้ำ","รถถัง","คิมจองอึน"]
const forety = ["ถุงผ้า","บิงซู","ฟองดูว์","น้ำพุ","ภูเก็ต","ขีปนาวุธ","ตุ๊กตุ๊ก","ลุงตู่","ตู้เย็น","ประดู่"]

// ต่อไปคือ (เอาของมารวมกัน)
const things = red.concat(white,green,ten,twenty,thirty,forety)

// กบกระโดด
const word = ['กบกระโดด','กบกระโดดข้ามรั้ว','กระโดด','กระโดดข้ามรั้ว']
const frog = ["ดูนะ","ตอนเช้าตรู่","อ่านดีๆ นะ","มีกบโง่ๆ","กาลครั้งหนึ่งนานมากแล้ว","นี่!"]
const nfrog = [2,3,4,4,7,1]

// หินมีชีวิต
const shape = ["กลมๆ","เล็กๆ","เหลี่ยมๆ"]

// usr arr
const usr = [];
const usr_ingame = [];
const usr_game = [];
const usr_tmp = [];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function mRnd(min=0,max=1){
  var n = Math.round(Math.random() * max) + min
  return n;
}

function sendMessage(api, message, threadID){
	api.sendMessage(message, threadID, (sendErr, messageInfo) => {
			if(sendErr) return console.error(sendErr)
	});
}

login(credentials, (loginErr, api) => {
  if(loginErr) return console.error(loginErr)
  api.listen((err, message) => {
    const messageRec = message.body
    const threadID = message.threadID
		if(usr.indexOf(threadID)==-1){
			usr.push(threadID);
			usr_ingame.push(0)
			usr_game.push(0)
			usr_tmp.push("")
		}
    if(usr_ingame[usr.indexOf(threadID)]==0){
      if(messageRec.match(/^(@game)|(๑เฟทำ)/g)){
        usr_game[usr.indexOf(threadID)] = mRnd(0,6);
        switch(usr_game[usr.indexOf(threadID)]){
          // --- BELL ---
          case 0:
            usr_tmp[usr.indexOf(threadID)] = mRnd(0,3)
            const messageSend = "กรุ๊ง".repeat(mRnd(1,5)) + "ๆ".repeat(mRnd(1,5)) + "กริ๊ง".repeat(mRnd(1,5)) + "ๆ".repeat(mRnd(1,5)) + " " + bell[usr_tmp[usr.indexOf(threadID)]] + "\n(ออกพิมพ์ _@_)"
            sendMessage(api, messageSend, threadID)
            usr_ingame[usr.indexOf(threadID)] = 1
            break;
          // --- WHAT NEXT ---
          case 1:
            sendMessage(api, "เริ่มจาก"+things[mRnd(0,things.length-1)], threadID)
            for(var i=0;i<mRnd(2,5);i++){
              const messageSend = "ต่อไปคือ "+things[mRnd(0,things.length-1)]
              setTimeout(function(){sendMessage(api, messageSend, threadID)},1000*(i+1))
            }
            setTimeout(function(){sendMessage(api, "ต่อไปคืออะไร? (ออกพิมพ์ _@_)", threadID)},1000*(i+1))
            usr_ingame[usr.indexOf(threadID)] = 1
            break;
          // --- RED HOUSE ---
					case 2:
						sendMessage(api, "บ้านสีแดง", threadID)
						setTimeout(function(){sendMessage(api, "กำแพงสีขาว", threadID)},1000)
						setTimeout(function(){sendMessage(api, "ศาลพระภูมิสีเขียว", threadID)},1000*2)
						usr_tmp[usr.indexOf(threadID)] = mRnd(0,2)
            var msg = ""
						switch(usr_tmp[usr.indexOf(threadID)]){
							case 0:
								msg = red[mRnd(0,9)]
								break;
							case 1:
								msg =  white[mRnd(0,9)]
								break;
							case 2:
								msg = green[mRnd(0,9)]
								break;
						}
						setTimeout(function(){sendMessage(api, msg + " สีอะไร :D???\n(ออกพิมพ์ _@_)", threadID)},1000*3)
						usr_ingame[usr.indexOf(threadID)] = 1
						break;
          // --- JOHNNY ---
          case 3:
            sendMessage(api, "จอห์นนี่เป็นคนอังกฤษ", threadID)
            setTimeout(function(){sendMessage(api, "จอห์นนี่ทำจอห์นนี่ผิด จอห์นนี่ไม่ทำจอห์นนี่ไม่ผิด", threadID)},1000)
            usr_tmp[usr.indexOf(threadID)] = mRnd(0,1)
            var msg = ""
            if(usr_tmp[usr.indexOf(threadID)] == 1){
              msg = "ดูนะ "
            }
            setTimeout(function(){sendMessage(api, msg + "จอห์นนี่".repeat(mRnd(2,5)), threadID)},1000*2)
            setTimeout(function(){sendMessage(api, "จอห์นนี่ *ผิด* หรือ *ไม่ผิด*???\n(ออกพิมพ์ _@_)", threadID)},1000*3)
            usr_ingame[usr.indexOf(threadID)] = 1
            break;
            // --- HOW MUCH ---
			case 4:
						sendMessage(api, "ปลา 10 บาท หมู 20 บาท หมึก 30 บาท กุ้ง 40 บาท", threadID)
						usr_tmp[usr.indexOf(threadID)] = mRnd(0,3)
						switch(usr_tmp[usr.indexOf(threadID)]){
							case 0:
								msg = ten[mRnd(0,9)]
								break;
							case 1:
								msg = twenty[mRnd(0,9)]
								break;
							case 2:
								msg = thirty[mRnd(0,9)]
								break;
							case 3:
								msg = forety[mRnd(0,9)]
								break;
						}
						setTimeout(function(){sendMessage(api, msg + " กี่บาท???\n(ออกพิมพ์ _@_)", threadID)},1000)
						usr_ingame[usr.indexOf(threadID)] = 1
						break;
            // --- FROG ---
            case 5:
            var sentence = [], whole = "", num=0;
            for(var i=0;i<mRnd(4,6);i++){
            sentence.push(word[mRnd(0,3)]);
            }
            sentence = shuffle(sentence);
            whole = sentence.join("");
            usr_tmp[usr.indexOf(threadID)] = mRnd(0,5);
            sendMessage(api, frog[usr_tmp[usr.indexOf(threadID)]]+" กบกระโดด"+whole+" มีกบกี่ตัว???\n(ออกพิมพ์ _@_)", threadID)
              usr_ingame[usr.indexOf(threadID)] = 1
  						break;
            // --- ROCK ---
            case 6:
            default:
            usr_tmp[usr.indexOf(threadID)] = mRnd(0,1)
            var msg = ""
            if(usr_tmp[usr.indexOf(threadID)] == 1){
              msg = "มี"
            }
            msg += "ก้อนหินก้อนหนึ่ง"+shape[mRnd(0,2)]+" มีขา "+mRnd(1,8)+" ขา มีแขน "+mRnd(1,8)+" แขน มีหน้า "+mRnd(1,8)+" หน้า มีชิวิตหรือไม่มีชีวิต?"
            sendMessage(api, msg, threadID)
              usr_ingame[usr.indexOf(threadID)] = 1
  						break;
        }
      }else if(messageRec.match(/^@help$/g)){
        sendMessage(api, "*ช่วยเหลือ*\n- พิมพ์ _@game_ เพื่อเริ่มเล่น\n- พิมพ์ _@select_ เพื่อเลือกเกม\n- ขณะเล่นเกม พิมพ์ _@_ เพื่อออก\n- ขณะเล่นเกม พิมพ์ _?_ เพื่อดูเฉลย\n_dev by mumu.universe_ <3", threadID)
      }else if(messageRec.match(/^@select$/g)){
        sendMessage(api, "*เลือกเกมปาหี่*\n1. กรุ๊งกริ๊ง\n2. ต่อไปคือ...\n3. บ้านสีแดง\n4. จอห์นนี่\n5. กี่บาท\n6. กบกระโดด\n7. หินมีชีวิต\n(พิมพ์ _@_ เพื่อออก)", threadID)
        usr_game[usr.indexOf(threadID)] = -1
        usr_ingame[usr.indexOf(threadID)] = 1
      }else{
        sendMessage(api, "*ยินดีต้อนรับเข้าสู่บอทเกมปาหี่*\nพิมพ์ _@game_ เพื่อเริ่มเล่น\nพิมพ์ _@help_ เพื่อช่วยเหลือ", threadID)
      }
    }else{ // in playing
      switch(usr_game[usr.indexOf(threadID)]){
        // --- MENU ---
        case -1:
          switch(messageRec){
            case "@":
              sendMessage(api, "ออกเมนูเกมแล้วจ้า :)", threadID)
              usr_ingame[usr.indexOf(threadID)] = 0
              break;
            case "1":
              usr_tmp[usr.indexOf(threadID)] = mRnd(0,3)
              const messageSend = "กรุ๊ง".repeat(mRnd(1,5)) + "ๆ".repeat(mRnd(1,5)) + "กริ๊ง".repeat(mRnd(1,5)) + "ๆ".repeat(mRnd(1,5)) + " " + bell[usr_tmp[usr.indexOf(threadID)]] + "\n(ออกพิมพ์ _@_)"
              sendMessage(api, messageSend, threadID)
              usr_game[usr.indexOf(threadID)] = 0
              break;
            case "2":
              sendMessage(api, "เริ่มจาก"+things[mRnd(0,things.length-1)], threadID)
              for(var i=0;i<mRnd(2,5);i++){
                const messageSend = "ต่อไปคือ "+things[mRnd(0,things.length-1)]
                setTimeout(function(){sendMessage(api, messageSend, threadID)},1000*(i+1))
              }
              setTimeout(function(){sendMessage(api, "ต่อไปคืออะไร? (ออกพิมพ์ _@_)", threadID)},1000*(i+1))
              usr_game[usr.indexOf(threadID)] = 1
              break;
  					case "3":
  						sendMessage(api, "บ้านสีแดง", threadID)
  						setTimeout(function(){sendMessage(api, "กำแพงสีขาว", threadID)},1000)
  						setTimeout(function(){sendMessage(api, "ศาลพระภูมิสีเขียว", threadID)},1000*2)
  						usr_tmp[usr.indexOf(threadID)] = mRnd(0,2)
              var msg = ""
  						switch(usr_tmp[usr.indexOf(threadID)]){
  							case 0:
  								msg = red[mRnd(0,9)]
  								break;
  							case 1:
  								msg = white[mRnd(0,9)]
  								break;
  							case 2:
  								msg = green[mRnd(0,9)]
  								break;
  						}
  						setTimeout(function(){sendMessage(api, msg + " สีอะไร :D???\n(ออกพิมพ์ _@_)", threadID)},1000*3)
  						usr_game[usr.indexOf(threadID)] = 2
  						break;
            case "4":
              sendMessage(api, "จอห์นนี่เป็นคนอังกฤษ", threadID)
              setTimeout(function(){sendMessage(api, "จอห์นนี่ทำจอห์นนี่ผิด จอห์นนี่ไม่ทำจอห์นนี่ไม่ผิด", threadID)},1000)
              usr_tmp[usr.indexOf(threadID)] = mRnd(0,1)
              var msg = ""
              if(usr_tmp[usr.indexOf(threadID)] == 1){
                msg = "ดูนะ "
              }
              setTimeout(function(){sendMessage(api, msg + "จอห์นนี่".repeat(mRnd(2,5)), threadID)},1000*2)
              setTimeout(function(){sendMessage(api, "จอห์นนี่ *ผิด* หรือ *ไม่ผิด*???\n(ออกพิมพ์ _@_)", threadID)},1000*3)
              usr_game[usr.indexOf(threadID)] = 3
              break;
            case "5":
              sendMessage(api, "ปลา 10 บาท หมู 20 บาท หมึก 30 บาท กุ้ง 40 บาท", threadID)
  						usr_tmp[usr.indexOf(threadID)] = mRnd(0,3)
  						switch(usr_tmp[usr.indexOf(threadID)]){
  							case 0:
  								msg = ten[mRnd(0,9)]
  								break;
  							case 1:
  								msg = twenty[mRnd(0,9)]
  								break;
  							case 2:
  								msg = thirty[mRnd(0,9)]
  								break;
  							case 3:
  								msg = forety[mRnd(0,9)]
  								break;
  						}
  						setTimeout(function(){sendMessage(api, msg + " กี่บาท???\n(ออกพิมพ์ _@_)", threadID)},1000)
              usr_game[usr.indexOf(threadID)] = 4
              break;
            case "6":
              var sentence = [], whole = "", num=0;
              for(var i=0;i<mRnd(4,8);i++){
              sentence.push(word[mRnd(0,3)]);
              }
              sentence = shuffle(sentence);
              whole = sentence.join("");
              usr_tmp[usr.indexOf(threadID)] = mRnd(0,5);
              sendMessage(api, frog[usr_tmp[usr.indexOf(threadID)]]+" กบกระโดด"+whole+" มีกบกี่ตัว???\n(ออกพิมพ์ _@_)", threadID)
              usr_game[usr.indexOf(threadID)] = 5
              break;
            case "7":
              usr_tmp[usr.indexOf(threadID)] = mRnd(0,1)
              var msg = ""
              if(usr_tmp[usr.indexOf(threadID)] == 1){
                msg = "มี"
              }
              msg += "ก้อนหินก้อนหนึ่ง"+shape[mRnd(0,2)]+" มีขา "+mRnd(1,8)+" ขา มีแขน "+mRnd(1,8)+" แขน มีหน้า "+mRnd(1,8)+" หน้า มีชิวิตหรือไม่มีชีวิต?"
              sendMessage(api, msg, threadID)
              usr_game[usr.indexOf(threadID)] = 6
              break;
            default:
              sendMessage(api, "ลองใหม่นะ\n(ออกพิมพ์ _@_)", threadID)
          }
          break;
        // --- BELL ---
        case 0:
          if(messageRec.match(/^\d$/g)){
            if(messageRec == usr_tmp[usr.indexOf(threadID)]+2){
              sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
							usr_ingame[usr.indexOf(threadID)] = 0
            }else{
              sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ยอมพิมพ์ _?_)", threadID)
            }
          }else if(messageRec.match(/^@$/g)){
            sendMessage(api, "ออกจากเกมเรียบร้อยแล้วจ้า :)", threadID)
            usr_ingame[usr.indexOf(threadID)] = 0
          }else if(messageRec.match(/^\?$/g)){
            var soln = usr_tmp[usr.indexOf(threadID)]+2;
            sendMessage(api, "*เฉลย* " + soln + " ลูก :D\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
            usr_ingame[usr.indexOf(threadID)] = 0
          }else{
            sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ออกพิมพ์ _@_)\n_(ตอบเป็นตัวเลข)_", threadID)
          }
          break;
        // --- NEXT ---
        case 1:
          if(messageRec.match(/^ต่อไปคือ[ ]?.+/g)){
            sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
            usr_ingame[usr.indexOf(threadID)] = 0
          }else if(messageRec.match(/^@$/g)){
            sendMessage(api, "ออกจากเกมเรียบร้อยแล้วจ้า :)", threadID)
            usr_ingame[usr.indexOf(threadID)] = 0
          }else if(messageRec.match(/^\?$/g)){
            sendMessage(api, "*เฉลย* ต่อไปคือ " + things[mRnd(0,things.length-1)] + " :D\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
            usr_ingame[usr.indexOf(threadID)] = 0
          }else{
            sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ยอมพิมพ์ _?_)\n_(ตอบเป็นข้อความ)_", threadID)
          }
          break;
        // --- RED HOUSE ---
				case 2:
					if(messageRec.match(/^(สี)?((แดง)|(ขาว)|(เขียว))$/g)){
						switch(usr_tmp[usr.indexOf(threadID)]){
							case 0:
								if(messageRec.match(/^(สี)?แดง$/g)){
                  sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
    							usr_ingame[usr.indexOf(threadID)] = 0
								}else{
                  sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ยอมพิมพ์ _?_)", threadID)
                }
								break;
							case 1:
								if(messageRec.match(/^(สี)?ขาว$/g)){
                  sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
    							usr_ingame[usr.indexOf(threadID)] = 0
								}else{
                  sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ยอมพิมพ์ _?_)", threadID)
                }
								break;
							case 2:
								if(messageRec.match(/^(สี)?เขียว$/g)){
                  sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
    							usr_ingame[usr.indexOf(threadID)] = 0
								}else{
                  sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ยอมพิมพ์ _?_)", threadID)
                }
								break;
						}
					}else if(messageRec.match(/^@$/g)){
						sendMessage(api, "ออกจากเกมเรียบร้อยแล้วจ้า :)", threadID)
						usr_ingame[usr.indexOf(threadID)] = 0
					}else if(messageRec.match(/^\?$/g)){
            switch(usr_tmp[usr.indexOf(threadID)]){
							case 0:
								sendMessage(api, "*เฉลย* สีแดง :D\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
								break;
							case 1:
								sendMessage(api, "*เฉลย* สีขาว :D\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
								break;
							case 2:
								sendMessage(api, "*เฉลย* สีเขียว :D\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
								break;
						}
            usr_ingame[usr.indexOf(threadID)] = 0
          }else{
						sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ยอมพิมพ์ _?_)\n_(ตอบสีแดง/ขาว/เขียว)_", threadID)
					}
					break;
        // --- JOHNNY ---
        case 3:
          if(messageRec.match(/^((ผิด)|(ไม่ผิด))$/g)){
            if(usr_tmp[usr.indexOf(threadID)] == 1 && messageRec.match(/^ผิด$/g)){
              sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
              usr_ingame[usr.indexOf(threadID)] = 0
            }else if (usr_tmp[usr.indexOf(threadID)] == 0 && messageRec.match(/^ไม่ผิด$/g)) {
              sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
              usr_ingame[usr.indexOf(threadID)] = 0
            }else{
              sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ยอมพิมพ์ _?_)", threadID)
            }
          }else if(messageRec.match(/^@$/g)){
            sendMessage(api, "ออกจากเกมเรียบร้อยแล้วจ้า :)", threadID)
            usr_ingame[usr.indexOf(threadID)] = 0
          }else if(messageRec.match(/^\?$/g)){
            var msg = usr_tmp[usr.indexOf(threadID)] == 1? " *ผิด* ":" *ไม่ผิด* "
            sendMessage(api, "*เฉลย* จอห์นนี่" + msg + ":D\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
            usr_ingame[usr.indexOf(threadID)] = 0
          }else{
            sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ยอมพิมพ์ _?_)\n_(ตอบว่า ผิด/ไม่ผิด)_", threadID)
          }
          break;
        // --- HOW MUCH ---
		  case 4:
					if(messageRec.match(/^((10)|(20)|(30)|(40))[ ]?(บาท)?$/g)){
						switch(usr_tmp[usr.indexOf(threadID)]){
							case 0:
													if(messageRec.match(/^10[ ]?(บาท)?$/g)){
									  sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
													usr_ingame[usr.indexOf(threadID)] = 0
													}else{
									  sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ", threadID)
									}
								break;
							case 1:
													if(messageRec.match(/^20[ ]?(บาท)?$/g)){
									  sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
													usr_ingame[usr.indexOf(threadID)] = 0
                        }else{
									  sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ", threadID)
									}
								break;
							case 2:
													if(messageRec.match(/^30[ ]?(บาท)?$/g)){
									  sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
													usr_ingame[usr.indexOf(threadID)] = 0
													}else{
									  sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ", threadID)
									}
								break;
							case 3:
												if(messageRec.match(/^40[ ]?(บาท)?$/g)){
								  sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
												usr_ingame[usr.indexOf(threadID)] = 0
												}else{
								  sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ", threadID)
								}
								break;
						}
					}else if(messageRec.match(/^@$/g)){
						sendMessage(api, "ออกจากเกมเรียบร้อยแล้วจ้า :)", threadID)
						usr_ingame[usr.indexOf(threadID)] = 0
					}else if(messageRec.match(/^\?$/g)){
            switch(usr_tmp[usr.indexOf(threadID)]){
							case 0:
								sendMessage(api, "*เฉลย* 10 บาท :D\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
								break;
							case 1:
							  sendMessage(api, "*เฉลย* 20 บาท :D\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
								break;
							case 2:
								sendMessage(api, "*เฉลย* 30 บาท :D\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
								break;
							case 3:
							  sendMessage(api, "*เฉลย* 40 บาท :D\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
								break;
						}
						usr_ingame[usr.indexOf(threadID)] = 0
					}else{
						sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ออกพิมพ์ _@_)\n_(ตอบเป็นตัวเลข)_", threadID)
					}
					break;
          // --- FROG ---
          case 5:
          if(messageRec.match(/^\d$/g)){
            if(messageRec == nfrog[usr_tmp[usr.indexOf(threadID)]]){
              sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
              usr_ingame[usr.indexOf(threadID)] = 0
            }else{
              sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ", threadID)
            }
          }else if(messageRec.match(/^@$/g)){
            sendMessage(api, "ออกจากเกมเรียบร้อยแล้วจ้า :)", threadID)
            usr_ingame[usr.indexOf(threadID)] = 0
          }else if(messageRec.match(/^\?$/g)){
            sendMessage(api, "*เฉลย* " + nfrog[usr_tmp[usr.indexOf(threadID)]] + " ตัว :D\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
            usr_ingame[usr.indexOf(threadID)] = 0
          }else{
            sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ\n_(ตอบเป็นตัวเลข)_", threadID)
          }
          break;
          // --- ROCK ---
          case 6:
            if(messageRec.match(/^((มี)|(ไม่มี))/g)){
              if(usr_tmp[usr.indexOf(threadID)] == 1 && messageRec.match(/^มี/g)){
                sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
                usr_ingame[usr.indexOf(threadID)] = 0
              }else if (usr_tmp[usr.indexOf(threadID)] == 0 && messageRec.match(/^ไม่มี/g)) {
                sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
                usr_ingame[usr.indexOf(threadID)] = 0
              }else{
                sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ยอมพิมพ์ _?_)", threadID)
              }
            }else if(messageRec.match(/^@$/g)){
              sendMessage(api, "ออกจากเกมเรียบร้อยแล้วจ้า :)", threadID)
              usr_ingame[usr.indexOf(threadID)] = 0
            }else if(messageRec.match(/^\?$/g)){
              var msg = usr_tmp[usr.indexOf(threadID)] == 1? " มี ":" ไม่มี "
              sendMessage(api, "*เฉลย*" + msg + ":D\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
              usr_ingame[usr.indexOf(threadID)] = 0
            }else{
              sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ยอมพิมพ์ _?_)\n_(ตอบว่า มี/ไม่มี)_", threadID)
            }
          break;
      }
    }
  })
})
