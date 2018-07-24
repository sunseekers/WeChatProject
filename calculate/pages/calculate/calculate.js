Page({
  data:{
    value: null,// 上次计算后的结果，null表示没有上次计算的结果,
    displayValue:'0',
    operator:null,
    waitingForOperand:false
  },
  onLoad(options){
    this.calculatorOperations = {
      'key-divide':(prev,next)=>prev / next,
      'key-multiply':(prev,next) => prev * next,
      'key-add':(prev,next) => prev +  next,
      'key-subtract':(prev,next) => prev - next,
      'key-equals':(prev,next) => next
    }
  },
  /**清楚所有操作 */
  clearAll(){
    this.setData({
      value:null,
      displayValue:'0',
      oprator:null,
      waitingForOperand:false
    })
  },
  clearDisplay(){
    this.setData({
      displayValue:'0'
    })
  },
  onTapFunction(event){
    const key = event.target.dataset.key
    switch(key){
      case 'key-clear':
      if (this.data.displayValue!=='0') {
        this.clearDisplay()
      } else {
        this.clearAll()
      }
      break;
      case 'key-sign':
      var newValue = parseFloat(this.data.displayValue) * -1
      this.setData({
        displayValue:String(newValue)
      })
      break;
      case 'key-percent':
      const fixedDigits = this.data.displayValue.repalace(/^-?\d*\.?/,"")
      console.log(fixedDigits)
      this.setData({
        displayValue: String(newValue.toFixed(fixedDigits.length+2))
      })
      break;
      default:
      break;
    }
  },
  onTapOperator(event){
    const nextOperator = event.target.dataset.key;
    const inputValue = parseFloat(this.data.displayValue)
    if (this.data.value == null) {
      this.setData({
        value:inputValue
      })
    } else if (this.data.operator) {
      console.log(this.data.operator)
      const currentValue = this.data.value || 0
      const newValue = this.calculatorOperations[this.data.operator](currentValue,inputValue);
      this.setData({
        value:newValue,
        displayValue:String(newValue),
      })
    }
    this.setData({
      waitingForOperand: true,
      operator: nextOperator
    });
  },
  onTapDigit: function (event) {
    const key = event.target.dataset.key; // 根据data-key标记按键

    if (key == 'key-dot') {
      // 按下点号
      if (!(/\./).test(this.data.displayValue)) {
        this.setData({
          displayValue: this.data.displayValue + '.',
          waitingForOperand: false
        })
      }
    } else {
      // 按下数字键
      const digit = key[key.length - 1];

      if (this.data.waitingForOperand) {
        this.setData({
          displayValue: String(digit),
          waitingForOperand: false
        })
      } else {
        this.setData({
          displayValue: this.data.displayValue === '0' ? String(digit) : this.data.displayValue + digit
        })
      }
    }
  }
})