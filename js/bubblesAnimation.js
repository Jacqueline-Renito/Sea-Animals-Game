
(function () {
    this.Bubble = function () {
        class Bubble {
            constructor(x, y, r, createdAt) {
                this.x = x;
                this.y = y;
                this.r = r;
                this.createdAt = createdAt;
            }
            velocity() {
                return (this.r / 20) * Bubble.MAX_V;
            }
            grow(now) {
                if (!this.rising && this.r <= Bubble.MAX_R) {
                    return (this.r += Bubble.GROWTH_RATE * (now - this.createdAt));
                }
            }
            move(now) {
                if (this.rising) {
                    return (this.y -=
                        (now - this.startedRisingAt) * this.velocity());
                }
            }
            rise() {
                if (!this.rising && this.r > 2) {
                    this.rising = Math.random() < 0.15 * (this.r / Bubble.MAX_R);
                    if (this.rising) {
                        return (this.startedRisingAt = new Date().getTime());
                    }
                }
            }
        }
        Bubble.MAX_R = 20;
        Bubble.MAX_V = 0.02;
        Bubble.GROWTH_RATE = 0.00005;
        return Bubble;
    }.call(this);
    this.RisingBubbles = function () {
        var rand, randInt;
        class RisingBubbles {
            constructor(id, maxBubbles) {
                var elem, i, j, ref;
                this.maxBubbles = maxBubbles;
                this.canvas = document.getElementById(id);
                elem = $("#" + id);
                elem.click(() => {
                    var b, j, len, ref, results, ts;
                    ts = new Date().getTime();
                    ref = this.bubbles;
                    results = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                        b = ref[j];
                        if (!b.rising) {
                            b.rising = true;
                            results.push((b.startedRisingAt = ts));
                        } else {
                            results.push(void 0);
                        }
                    }
                    return results;
                });
                this.canvas.width = this.canvas.clientWidth;
                this.canvas.height = this.canvas.clientHeight;
                this.ctx = this.canvas.getContext("2d");
                this.ctx.fillStyle = "rgba(11, 109, 255, 0.595)";
                this.bubbles = [];
                this.lastFrame = new Date().getTime();
                for (
                    i = j = 1, ref = randInt(0, this.maxBubbles);
                    1 <= ref ? j <= ref : j >= ref;
                    i = 1 <= ref ? ++j : --j
                ) {
                    this.bubbles.push(
                        new Bubble(
                            randInt(0, this.canvas.width),
                            randInt(0, this.canvas.height),
                            rand(0, Bubble.MAX_R),
                            new Date().getTime()
                        )
                    );
                }
            }
            draw() {
                return this.run(new Date().getTime());
            }
            run(now) {
                var bubble, j, len, ref;
                this.update(now);
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                ref = this.bubbles;
                for (j = 0, len = ref.length; j < len; j++) {
                    bubble = ref[j];
                    this.ctx.moveTo(bubble.x, bubble.y);
                    this.ctx.beginPath();
                    this.ctx.arc(bubble.x, bubble.y, bubble.r, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
                return requestAnimationFrame(() => {
                    return this.run(new Date().getTime());
                });
            }
            update(now) {
                var b, i, j, k, len, ref, ref1, results;
                ref = this.bubbles;
                for (j = 0, len = ref.length; j < len; j++) {
                    b = ref[j];
                    b.grow(now);
                    b.rise();
                    b.move(now);
                }
                this.bubbles = function () {
                    var k, len1, ref1, results;
                    ref1 = this.bubbles;
                    results = [];
                    for (k = 0, len1 = ref1.length; k < len1; k++) {
                        b = ref1[k];
                        if (b.y + b.r >= 0) {
                            results.push(b);
                        }
                    }
                    return results;
                }.call(this);
                if (this.maxBubbles - this.bubbles.length > 0) {
                    results = [];
                    for (
                        i = k = 1,
                        ref1 = randInt(0, this.maxBubbles - this.bubbles.length);
                        1 <= ref1 ? k <= ref1 : k >= ref1;
                        i = 1 <= ref1 ? ++k : --k
                    ) {
                        results.push(
                            this.bubbles.push(
                                new Bubble(
                                    randInt(0, this.canvas.width),
                                    randInt(0, this.canvas.height),
                                    1,
                                    new Date().getTime()
                                )
                            )
                        );
                    }
                    return results;
                }
            }
        }
        randInt = function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        };
        rand = function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        };
        return RisingBubbles;
    }.call(this);
    $(function () {
        var canvas
        canvas = new RisingBubbles("canvas", 500);
        return canvas.draw();
    });
}.call(this));

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);
