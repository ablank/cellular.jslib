!function($) {
    ///// 
    Drupal.behaviors.cellular = {
        attach: function() {
            ///// 
            var cellular = {};
            cellular.opts = {
                cclass: "cellular",
                tclass: "title",
                bclass: "body",
                wrapper: "<div />",
                speed: 300,
                breakpoint: 650
            }, ///// 
            cellular.activate = function() {
                return this.each(function() {
                    var $t = jQuery(this);
                    $t.hasClass("active") || $t.addClass("active").siblings().removeClass("active");
                });
            }, //
            cellular.deactivate = function() {
                return this.each(function() {
                    var $t = jQuery(this);
                    $t.hasClass("active") && $t.removeClass("active");
                });
            }, cellular.kidWrap = function() {
                // Wrap element's children with index gt 0
                return this.each(function() {
                    var $t = jQuery(this);
                    $t.children().length > 1 && $t.children(":gt(0)").wrapAll("<div>");
                });
            }, cellular.classify = function($array) {
                // Add array of classes to element
                return this.each(function() {
                    var $t = jQuery(this), classes = $array.join(" ");
                    $t.addClass(classes);
                });
            }, /*
 cellular.yPos = function() {
 return this.each(function() {
 var $t = jQuery(this);

 $t.offset();
 });
 };

 cellular.loop = function($obj, fn) {
 if ($obj.next().length === 0) {
 $obj.next = $obj.siblings(0);
 }
 };
 */
            ///// 
            cellular.jAccordion = function(opts) {
                var o = jQuery.extend({
                    active: 0,
                    // Index value of initial content to display.
                    duration: 500,
                    // Duration of transition.
                    easing: "swing",
                    // Type of easing.
                    single: !1
                }, opts), fn = {};
                return fn.showContent = function($li) {
                    o.single === !0 ? $li.siblings(".active").deactivate().find(".panel").slideUp(o.duration, o.easing) : $li.activate().find(".panel").slideToggle(o.duration, o.easing);
                }, this.each(function() {
                    var $obj = jQuery(this), li = $obj.find("li");
                    //fn.style($obj);
                    //Add classes/functions to each pane    
                    $obj.once("jAccordion", function() {
                        $obj.addClass(cellular.opts.cclass), li.each(function() {
                            var $t = jQuery(this);
                            $t.kidWrap(), $t.children().eq(0).addClass("title"), $t.children().eq(1).classify([ cellular.opts.cclass, "panel" ]), 
                            $t.find(".panel").hide(), $t.find(".title").click(function(e) {
                                e.preventDefault(), fn.showContent($t);
                            });
                        });
                    }), //Set default content
                    fn.showContent($obj.children().eq(o.active));
                });
            }, ///// 
            /////
            cellular.jBlocklink = function(opts) {
                var o = jQuery.extend({
                    cclass: "jBlocklink-link"
                }, opts);
                return this.each(function() {
                    var $obj = jQuery(this);
                    $obj.once(o.cclass, function() {
                        var a = $obj.find("a").eq(0), ahref = a.attr("href");
                        if (void 0 !== ahref) {
                            var bl = jQuery('<a href="' + ahref + '" />');
                            bl.classify([ cellular.opts.cclass, o.cclass, a.attr("class") ? a.attr("class") : null ]), 
                            // .data(a.data());
                            $obj.wrap(bl).find("h2, h3").addClass("title");
                        }
                    }), $obj.live("mouseenter touchstart", function() {
                        jQuery(this).activate();
                    }).live("mouseleave touchend", function() {
                        jQuery(this).deactivate();
                    });
                });
            }, ///// 
            cellular.jFormal = function(opts) {
                var o = jQuery.extend({
                    inputs: [ 'input[type="text"]', 'input[type="email"]', 'input[type="password"]', "textarea" ]
                }, opts);
                return this.each(function() {
                    var inputs = (jQuery(this), o.inputs.join(","));
                    // get/set value of inputs
                    $(inputs).each(function() {
                        var $t = jQuery(this), $v = $t.val();
                        $t.live("focus", function() {
                            // clear the default value of an input on focus
                            $t.val() === $v && $t.val("");
                        }).live("blur", function() {
                            // reset to default value if no changes were made
                            "" === $t.val() && $t.val($v);
                        });
                    });
                });
            }, ///// 
            /////
            cellular.jMmenu = function(opts) {
                var o = jQuery.extend({
                    breakpoint: cellular.opts.breakpoint,
                    // Window breakpoint trigger
                    cclass: "jMmenu",
                    direction: "right",
                    type: "slide"
                }, opts), fn = {};
                return fn.mediaQuery = function($obj) {
                    // var li = $obj.children();
                    window.innerWidth <= o.breakpoint ? $obj.addClass("mini") : $obj.hasClass("mini") && $obj.removeClass("mini");
                }, this.each(function() {
                    var $obj = jQuery(this);
                    $obj.once(o.cclass, function() {
                        $obj.addClass(cellular.opts.cclass + " " + o.cclass + " " + o.type + " " + o.direction);
                    }).click(function() {
                        $obj.toggleClass("active");
                    }), fn.mediaQuery($obj), jQuery(window).resize(function() {
                        fn.mediaQuery($obj);
                    });
                });
            }, ///// 
            /////
            cellular.jScrolli = function(opts) {
                o = $.extend({
                    active: 0,
                    speed: 500,
                    // Duration of cycle
                    pause: 3e3
                }, opts);
                //fn.style = function(){};
                return this.each(function() {
                    var $obj = jQuery(this), $i = $obj.find(jQuery($obj.children())), active = o.active ? o.active : $i[0], maxHeight = 0;
                    $i.each(function() {
                        $t = jQuery(this), $t.height() > maxHeight && (maxHeight = $t.height()), $t.hide();
                    }), $obj.addClass(cellular.opts.cclass).height(maxHeight), jQuery(active).addClass("active").fadeIn(o.speed, function() {
                        var $t = jQuery(this), next = $t.next();
                        0 === next.length && (next = $i[0]), $t.delay(o.pause).fadeOut(o.speed, function() {
                            $t.removeClass(""), $obj.jScrolli({
                                active: next,
                                speed: o.speed,
                                pause: o.pause
                            });
                        });
                    });
                });
            }, ///// 
            /////
            cellular.jTabs = function(opts) {
                var o = jQuery.extend({
                    active: 0,
                    // Array index of initially active tab
                    orient: "horizontal"
                }, opts), fn = {};
                return fn.showContent = function(li) {
                    //Content
                    var c = li.find(".content"), pan = li.parent().find(".panel-content");
                    li.activate(), pan.fadeOut("normal", function() {
                        jQuery(this).html(c.html()).fadeIn("normal");
                    });
                }, this.each(function() {
                    var $obj = jQuery(this), tab = $obj.find("> li"), maxHeight = 0;
                    $obj.addClass(cellular.opts.cclass).height(maxHeight), $obj.once("jTabs", function() {
                        $obj.addClass(cellular.opts.cclass + " " + o.orient).append('<div class="' + cellular.opts.cclass + ' panel" />'), 
                        $obj.find(".panel").append('<div class="panel-content" />'), tab.each(function() {
                            var li = jQuery(this);
                            li.addClass("tab").kidWrap(), //Set 1st child as title
                            li.children().eq(0).addClass("title"), //Set 2nd child as content
                            li.children().eq(1).addClass("content").hide();
                        });
                    }), //Add classes/functions to each panel
                    tab.each(function() {
                        var li = jQuery(this);
                        li.click(function(e) {
                            e.preventDefault(), fn.showContent(li);
                        });
                    }), //Set default content
                    fn.showContent(tab.eq([ o.active ]));
                });
            }, ///// 
            jQuery.fn.extend(cellular);
        }
    };
}(jQuery);