/**
 * 显示声明 this 所指向的对象
 */
interface Card {
  value: number
}

interface Obj {
  cards: number[]
  createCardValue(this: Obj): () => Card
}

const obj: Obj = {
  cards: [1, 2, 3, 5],
  createCardValue(this: Obj) {
    return () => { // 这里使用了箭头函数来绑定 this
      return {
        value: this.cards[Math.floor(Math.random() * this.cards.length)]
      }
    }
  }
}

const create = obj.createCardValue()
const card = create()

console.log(card)
