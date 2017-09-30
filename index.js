const login = require("facebook-chat-api")
const credentials = {email: "prahi2017hackatom@gmail.com", password: "iamrobot"}

// var gamemode = 0; ---> usr_game[usr.indexOf(threadID)]
// var question = 0; ---> usr_tmp[usr.indexOf(threadID)]
// var iMode = 0; ---> usr_ingame[usr.indexOf(threadID)]
const bell = ["กี่ลูก","มีกี่ลูก","ทั้งหมดกี่ลูก","มีกระดิ่งกี่ลูก"]
const red = ["เสื้อ","ทรัมป์","กล่อง","กระดาษชำระ","ขวด","ป้าย","พัดลมไฟฟ้า","ลาบ","แก้ว","หมา"]
const white = ["กางเกง","เก้าอี้","นกเขา","กูเกิล","พิซซ่าฮาวายเอี้ยน","ซีเว่นอีเลเว่น","เฟสบุ๊ค","ทิชชู","ปลาหยุดจันทร์อังคาร","แนปแลบ"]
const green = ["กรุงเทพมหานคร","กางเกงใน","ทวิตเตอร์","คอมพิวเตอร์","Stupid Hackathon","เอสเปรสโซ","ช็อกโกแลต","ปาทังกี้ปาทังก้า","คิมจองอึน","ถังขยะ"]
const things = red.concat(white,green)

const usr = [];
const usr_ingame = [];
const usr_game = [];
const usr_tmp = [];

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
      if(messageRec.match(/^@game/g)){
        usr_game[usr.indexOf(threadID)] = mRnd(0,3);
        switch(usr_game[usr.indexOf(threadID)]){
          case 0:
            usr_tmp[usr.indexOf(threadID)] = mRnd(0,3)
            const messageSend = "กุ๊ง".repeat(mRnd(1,5)) + "ๆ".repeat(mRnd(1,5)) + "กิ๊ง".repeat(mRnd(1,5)) + "ๆ".repeat(mRnd(1,5)) + " " + bell[usr_tmp[usr.indexOf(threadID)]] + "\n(ออกพิมพ์ @)"
            sendMessage(api, messageSend, threadID)
            usr_ingame[usr.indexOf(threadID)] = 1
            break;
          case 1:
            sendMessage(api, "เริ่มจาก"+things[mRnd(0,29)], threadID)
            for(var i=0;i<mRnd(2,5);i++){
              const messageSend = "ต่อไปคือ "+things[mRnd(0,29)]
              setTimeout(function(){sendMessage(api, messageSend, threadID)},1000*(i+1))
            }
            setTimeout(function(){sendMessage(api, "ต่อไปคืออะไร? (ออกพิมพ์ @)", threadID)},1000*(i+1))
            usr_ingame[usr.indexOf(threadID)] = 1
            break;
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
								msg = white[mRnd(0,9)]
								break;
							case 2:
								msg = green[mRnd(0,9)]
								break;
						}
						setTimeout(function(){sendMessage(api, msg + " สีอะไร :D???\n(ออกพิมพ์ @)", threadID)},1000*3)
						usr_ingame[usr.indexOf(threadID)] = 1
						break;
          case 3:
            sendMessage(api, "จอห์นนี่เป็นคนอังกฤษ", threadID)
            setTimeout(function(){sendMessage(api, "จอห์นนี่ทำจอห์นนี่ผิด จอห์นนี่ไม่ทำจอห์นนี่ไม่ผิด", threadID)},1000)
            usr_tmp[usr.indexOf(threadID)] = mRnd(0,1)
            var msg = ""
            if(usr_tmp[usr.indexOf(threadID)] == 1){
              msg = "ดูนะ "
            }
            setTimeout(function(){sendMessage(api, msg + "จอห์นนี่".repeat(mRnd(2,5)), threadID)},1000*2)
            setTimeout(function(){sendMessage(api, "จอห์นนี่ *ผิด* หรือ *ไม่ผิด*???\n(ออกพิมพ์ @)", threadID)},1000*3)
            usr_ingame[usr.indexOf(threadID)] = 1
            break;
        }
      }else{
        sendMessage(api, "*ยินดีต้อนรับเข้าสู่บอทเกมปาหี่*\nพิมพ์ _@game_ เพื่อเริ่มเล่น\n_dev by mumu.universe_ <3", threadID)
      }
    }else{
      switch(usr_game[usr.indexOf(threadID)]){
        case 0:
          if(messageRec.match(/^\d$/g)){
            if(messageRec == usr_tmp[usr.indexOf(threadID)]+2){
              sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
							usr_ingame[usr.indexOf(threadID)] = 0
            }else{
              sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ", threadID)
            }
          }else if(messageRec.match(/^@$/g)){
            sendMessage(api, "ออกจากเกมเรียบร้อยแล้วจ้า :)", threadID)
            usr_ingame[usr.indexOf(threadID)] = 0
          }else{
            sendMessage(api, "*ตอบเป็นตัวเลขน้า*\n(ออกพิมพ์ @)", threadID)
          }
          break;
        case 1:
          if(messageRec.match(/^ต่อไปคือ[ ]?.+/g)){
            sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
            usr_ingame[usr.indexOf(threadID)] = 0
          }else if(messageRec.match(/^@$/g)){
            sendMessage(api, "ออกจากเกมเรียบร้อยแล้วจ้า :)", threadID)
            usr_ingame[usr.indexOf(threadID)] = 0
          }else{
            sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ออกพิมพ์ @)", threadID)
          }
          break;
				case 2:
					if(messageRec.match(/^(สี)?((แดง)|(ขาว)|(เขียว))$/g)){
						switch(usr_tmp[usr.indexOf(threadID)]){
							case 0:
								if(messageRec.match(/^(สี)?แดง$/g)){
                  sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
    							usr_ingame[usr.indexOf(threadID)] = 0
								}else{
                  sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ", threadID)
                }
								break;
							case 1:
								if(messageRec.match(/^(สี)?ขาว$/g)){
                  sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
    							usr_ingame[usr.indexOf(threadID)] = 0
								}else{
                  sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ", threadID)
                }
								break;
							case 2:
								if(messageRec.match(/^(สี)?เขียว$/g)){
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
					}else{
						sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ออกพิมพ์ @)", threadID)
					}
					break;
        case 3:
          if(messageRec.match(/^((ผิด)|(ไม่ผิด))$/g)){
            if(usr_tmp[usr.indexOf(threadID)] == 1 && messageRec.match(/^ผิด$/g)){
              sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
              usr_ingame[usr.indexOf(threadID)] = 0
            }else if (usr_tmp[usr.indexOf(threadID)] == 0 && messageRec.match(/^ไม่ผิด$/g)) {
              sendMessage(api, "*ถูกต้องงงงง* <3\nเล่นอีกพิมพ์ _@game_ น้า", threadID)
              usr_ingame[usr.indexOf(threadID)] = 0
            }else{
              sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ออกพิมพ์ @)", threadID)
            }
          }else if(messageRec.match(/^@$/g)){
            sendMessage(api, "ออกจากเกมเรียบร้อยแล้วจ้า :)", threadID)
            usr_ingame[usr.indexOf(threadID)] = 0
          }else{
            sendMessage(api, "*ผิดดด* :(\nลองใหม่นะ (ออกพิมพ์ @)", threadID)
          }
          break;
      }
    }
  })
})
