const setFocus = (target) => {};

class FocusManager {
    constructor() {
        this._focusRoute = [];
        this.pageStack = [];
    }

    appendItemsToTree(treeItems) {
        if (this.pageStack.length) {
            this._focusTree.items.push(...treeItems);
        } else {
            throw new Error("Page stack is empty");
        }
    }

    pushPage(focusTree) {
        this._focusTree = focusTree;
        this._focusRoute = [];

        this.pageStack.push({focusTree, focusRoute: this._focusRoute});
        this._focusFirstFocusableElement(focusTree);
    }

    exitPage() {
        this.pageStack.pop();
        if (this.pageStack.length) {
            this._focusTree = this.pageStack.at(-1).focusTree;
            this._focusRoute = this.pageStack.at(-1).focusRoute;
        }
    }

    // {
    //     element: itemNode,
    //     focusElement: {
    //       direction: "row|column",
    //       loop: 0, // 0 - no loop | 1 - loop from max to zero | 2 - loop from zero to max | 3 - loop any direction
    //       focus: function () {},
    //       focusLost: function () {},
    //       items: [],
    //     },
    //   };
    _focusFirstFocusableElement(focusNode) {
        if (!focusNode) {
            return;
        }

        focusNode?.focus();
        this._focusRoute.push(focusNode);
        if (focusNode.items) {
            const nextFocusNode = focusNode.items[focusNode.focusIndex];
            this._focusFirstFocusableElement(nextFocusNode);
        }
    }

    getNavigationRoute(navDirection, increase) {
        let curFocusLevel = this._focusRoute.length - 1;

        const navRoute = [];

        while (curFocusLevel >= 0) {
            let curFocusNode = this._focusRoute[curFocusLevel];

            if (curFocusNode.direction === navDirection &&
                curFocusNode.items?.length > 0) {
                let nextFocusedIndex = -1;
                if (increase) {
                    if (curFocusNode.focusIndex + 1 < curFocusNode.items.length) {
                        nextFocusedIndex = curFocusNode.focusIndex + 1;
                    } else if (curFocusNode.loop & 1) {
                        nextFocusedIndex = 0;
                    }
                } else {
                    if (curFocusNode.focusIndex > 0) {
                        nextFocusedIndex = curFocusNode.focusIndex - 1;
                    } else if (curFocusNode.loop & 2) {
                        nextFocusedIndex = curFocusNode.items.length - 1;
                    }
                }

                if (nextFocusedIndex !== -1) {
                    navRoute.push({
                        element: curFocusNode,
                        action: "focus",
                    });
                    curFocusNode.focusIndex = nextFocusedIndex;
                    curFocusNode = curFocusNode.items[nextFocusedIndex];
                    while (curFocusNode) {
                        navRoute.push({
                            element: curFocusNode,
                            action: "focus",
                        });
                        curFocusNode = curFocusNode.items
                            ? curFocusNode.items[curFocusNode.focusIndex]
                            : null;
                    }
                    navRoute.forEach(({ element, action }) => {
                        if (action === "focus") {
                            element.focus();
                            this._focusRoute.push(element);
                        } else {
                            element.focusLost();
                            this._focusRoute.pop();
                        }
                    });
                    return true;
                }
            }

            navRoute.push({
                element: curFocusNode,
                action: "unfocus",
            });
            curFocusLevel--;
        }
        return false;
    }
    navigateLeft() {
        this.getNavigationRoute("row", false);
    }
    navigateRight() {
        this.getNavigationRoute("row", true);
    }
    navigateUp() {
        this.getNavigationRoute("column", false);
    }
    navigateDown() {
        this.getNavigationRoute("column", true);
    }
}








