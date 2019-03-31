class Options {
    constructor(height = '400px', width = 'auto', bg = 'green', fontSize = '32px', textAlign = 'center'){
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }
    createDiv(text = 'Вы ничего не вписали'){
        let element = document.createElement('div');
        element.textContent = text;
        element.style.cssText = `height:${this.height};width:${this.width};background-color:${this.bg};font-size:${this.fontSize};text-align:${this.textAlign}`;
        document.body.appendChild(element);
    }
}