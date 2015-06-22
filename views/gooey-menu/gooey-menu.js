var menuContainerElem = document.querySelector('.menu'),
    menuToggleElem = menuContainerElem.querySelector('.button_menu-item__toggle'),
    menuToggleElemIcon = menuToggleElem.querySelector('.ic_menu-toggle'),
    menuItemOptionButtons = menuContainerElem.querySelectorAll('.button_menu-item__option'),
    menuItemBounceButtons = menuContainerElem.querySelectorAll('.button_menu-item__bounce'),
    menuItems = menuContainerElem.querySelectorAll('.list-item_menu'),
    NUM_MENU_ITEMS = menuItems.length,

    isMenuOpen = false,

    ANIMATION_DURATION_MULTIPLIER = 1,
    DURATION_MENU_TOGGLE = ANIMATION_DURATION_MULTIPLIER * 1.1,

    totalAngleSpan = 150,
    EXPANSION_RADIUS = 90,
    startingAngle = 180 + (-totalAngleSpan/2),  // starting angle at which to rotate our buttons
    angleSlice = totalAngleSpan/(NUM_MENU_ITEMS-1);

//TweenMax.globalTimeScale(0.8);

menuToggleElem.addEventListener('mousedown', function () {
    TweenMax.to(
        menuToggleElemIcon,
        ANIMATION_DURATION_MULTIPLIER * 0.3,
        {
            scale: 0.65,
            ease: Power4.easeInOut
        }
    );
});

menuToggleElem.addEventListener('mouseup', toggleMenu);




//////////////// Rotate the origin of each list item (<li>) element ///////////////////
var currentAngle,
    menuItem,
    menuItemIcon;
for (var i = 0, l = menuItems.length; i < l; i++) {

    menuItem = menuItems[i];
    menuItemIcon = menuItem.querySelector('.ic_menu-item');
    currentAngle =  startingAngle + (angleSlice * i);

    menuItem.style.transform = 'rotate(' + (currentAngle) + 'deg)';
    menuItemIcon.style.transform = 'rotate(' + (-currentAngle) + 'deg)';  // invert the rotation so that the icons still appear straight
}



setFilter('url("/svg/filters/gooey-effects.svg#goo")', menuContainerElem);



function toggleMenu () {

    // return icon back to size (since this is called on mouseup)
    TweenMax.to(menuToggleElemIcon, ANIMATION_DURATION_MULTIPLIER * 0.3, { scale: 1 });

    // Trigger open or close animation
    !!isMenuOpen ?
        ( menuToggleElem.classList.remove('open'), collapseMenu() ) :
        ( menuToggleElem.classList.add('open'), expandMenu() );
}

function collapseMenu() {

    // queue the goo
    TweenMax.staggerFromTo(
        menuItemBounceButtons,
        DURATION_MENU_TOGGLE * 0.20,
        {
            transformOrigin: '50% 50%'
        },
        {
            scaleX: 1,
            scaleY: 0.8,
            force3D: true,
            ease: Power3.easeInOut,
            onComplete: function () {
                TweenMax.staggerTo(
                    menuItemBounceButtons,
                    DURATION_MENU_TOGGLE * 0.15,
                    {
                        //scaleX: 1.2
                        scaleY: 1.2,
                        force3D: true,
                        ease: Power3.easeInOut,
                        onComplete: function () {
                            TweenMax.staggerTo(
                                menuItemBounceButtons,
                                DURATION_MENU_TOGGLE * 0.65,
                                {
                                    scaleY: 1,
                                    force3D: true,
                                    ease: Elastic.easeOut.config(1.1, 0.12)
                                },
                                0.2
                            )
                        }
                    },
                    0.2

                )
            }
        },
        0.2 // stagger duration
    );


    // Close the actual buttons
    TweenMax.staggerTo(
        menuItemOptionButtons,
        DURATION_MENU_TOGGLE * 0.3,
        {
            y: 0,
            force3D: true,
            ease: Power4.easeIn
        },
        0.2
    );

    isMenuOpen = false;
}


function expandMenu() {

    // Queue the goo
    TweenMax.staggerFromTo(
        menuItemBounceButtons,
        DURATION_MENU_TOGGLE * 0.20,
        {
            transformOrigin: '50% 50%'
        },
        {
            scaleX: 0.8,
            scaleY: 1.2,
            force3D: true,
            ease: Power4.easeInOut,
            onComplete: function () {
                TweenMax.staggerTo(
                    menuItemBounceButtons,
                    DURATION_MENU_TOGGLE * 0.15,
                    {
                        scaleY: 0.7,
                        force3D: true,
                        ease: Power3.easeInOut,
                        onComplete: function () {
                            TweenMax.staggerTo(
                                menuItemBounceButtons,
                                DURATION_MENU_TOGGLE * 0.65,
                                {
                                    scaleY: 0.8,
                                    force3D: true,
                                    ease: Elastic.easeOut.config(1.1, 0.12)
                                },
                                0.2 // stagger period
                            )
                        }
                    },
                    0.2 // stagger period
                )
            }
        },
        0.2  // stagger period
    );

    // Open up the actual buttons
    TweenMax.staggerTo(
        menuItemOptionButtons,
        DURATION_MENU_TOGGLE * 0.3,
        {
            y: EXPANSION_RADIUS,
            force3D: true,
            ease: Power4.easeInOut
        },
        0.2
    );

    isMenuOpen = true;
}




