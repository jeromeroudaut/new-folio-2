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

PrevNext.moveIndexNext = function() {
        if (PrevNext.items.length === 0) {
            return;
        }
        if (PrevNext.index + 1 === PrevNext.limit) {
            return PrevNext.limit;
        } else {
            return ++PrevNext.index;
        }
        // PrevNext.getCurrentItem()
    }

PrevNext.moveIndexPrevious = function() {
        if (PrevNext.items.length === 0) {
            return;
        }
        if (PrevNext.index - 1 === -1) {
            return PrevNext.index = -1;
        } 
        else {
            return --PrevNext.index;
        }
        // PrevNext.getCurrentItem()
    }

PrevNext.getCurrentItem = function() {
        return PrevNext.items[PrevNext.index];
    }

export default PrevNext