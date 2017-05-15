(function() {
    function _useAnimation(els) {
        //els 为class名
        this.elements = []
        for (let i = 0; i < els.length; i++) {
            let elements = els[i]
            typeof elements === 'string' ? this.elements.push(document.getElementsByClassName(elements)) : ''
        }
    }
    _useAnimation.prototype = {
        animationType: function(aniType, options) {
            options === '' ? { duration: 650 } : options
            if (typeof aniType === 'object') {
                aniType === '' ? {} : aniType
            } else if (typeof aniType === 'string') {
                aniType === '' ? 'transition.swoopIn' : aniType
            }
            this.options = options
            this.aniType = aniType
            for (let i = 0; i < this.elements.length; i++) {
                Velocity(this.elements[i], this.aniType, this.options)
            }
            return this
        },
        runAniInSequence: function(aniObj) {
            this.aniObj = aniObj
            Velocity.RunSequence(this.aniObj)
            return this
        },
        //do a test
        runFunWithCallBack: function(callback) {
            console.log(111)
                // callback.call(this, '我进行了回调')
                // callback()
        }
    }
    window.useVelocity = function() {
        // return arguments.length > 0 ? new _useAnimation(arguments) : new _useAniWithoutArg()
        return new _useAnimation(arguments)
    }
})()