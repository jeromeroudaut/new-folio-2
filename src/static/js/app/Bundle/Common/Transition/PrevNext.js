// class CircularListWithIndex {
    // constructor(items) {
    //     this.items = items;
    //     this.index = 0;
    // }
import S from 'skylake'

const PrevNext = {}
// PrevNext.items = 0
PrevNext.index = 0

PrevNext.moveIndexNext = function() {
        if (PrevNext.items.length === 0) {
            return;
        }
        if (PrevNext.index + 1 === PrevNext.items.length) {
            return PrevNext.index = 0;
        } else {
            return PrevNext.index++;
        }
        // PrevNext.getCurrentItem()
    }

PrevNext.moveIndexPrevious = function() {
        if (PrevNext.items.length === 0) {
            return;
        }
        if (PrevNext.index - 1 === -1) {
            return PrevNext.index = PrevNext.items.length - 1;
        } else {
            return PrevNext.index--;
        }
        // PrevNext.getCurrentItem()
    }

PrevNext.getCurrentItem = function() {
        return PrevNext.items[PrevNext.index];
    }

export default PrevNext