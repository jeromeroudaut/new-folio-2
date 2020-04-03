// class CircularListWithIndex {
    // constructor(items) {
    //     this.items = items;
    //     this.index = 0;
    // }
import S from 'skylake'

const PrevNext = {}
// PrevNext.items = 0
PrevNext.index = 0
PrevNext.limit = 7

// scroll index
PrevNext.next = () => {
    this.current = this.current < this.bgArray.length - 1 ? this.current + 1 : 0;
    return this.getCurrentIndex();
}

PrevNext.prev = () => {
    this.current = this.current > 0 ? this.current - 1 : this.bgArray.length - 1;
    return this.getCurrentIndex();
}

PrevNext.getCurrentIndex = () => {
    console.log(this.current);
    return this.bgArray[this.current];
}

export default PrevNext