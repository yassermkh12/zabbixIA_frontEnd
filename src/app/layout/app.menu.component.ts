import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                items: [
                    {
                        label: 'Chat',
                        icon: 'pi pi-fw pi-comments',
                        routerLink: ['/apps/chat']
                    },
                    // {
                    //     label: 'Table',
                    //     icon: 'pi pi-fw pi-table',
                    //     routerLink: ['/uikit/table']
                    // },
                    {
                        label: 'Problem',
                        icon: 'pi pi-fw pi-wrench',
                        routerLink: ['/problem']
                    },
                    {
                        label: 'Host',
                        icon: 'pi pi-fw pi-server',
                        routerLink: ['/host']
                    },
                    {
                        label: 'administration',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'user',
                                icon: 'pi pi-fw pi-user',
                                routerLink: ['/user']
                            },
                            {
                                label: 'role',
                                icon: 'pi pi-fw pi-sitemap',
                                routerLink: ['/role']
                            },
                            {
                                label: 'conversation',
                                icon: 'pi pi-fw pi-comments',
                                routerLink: ['/conversation']
                            },
                        ]
                    },
                    // {
                    //     label: 'Auth',
                    //     icon: 'pi pi-fw pi-user',
                    //     items: [
                    //         {
                    //             label: 'Login',
                    //             icon: 'pi pi-fw pi-sign-in',
                    //             routerLink: ['/auth/login']
                    //         },
                    //         {
                    //             label: 'Error',
                    //             icon: 'pi pi-fw pi-times-circle',
                    //             routerLink: ['/auth/error']
                    //         },
                    //         {
                    //             label: 'Access Denied',
                    //             icon: 'pi pi-fw pi-lock',
                    //             routerLink: ['/auth/access']
                    //         },
                    //         {
                    //             label: 'Register',
                    //             icon: 'pi pi-fw pi-user-plus',
                    //             routerLink: ['/auth/register']
                    //         },
                    //         {
                    //             label: 'Forgot Password',
                    //             icon: 'pi pi-fw pi-question',
                    //             routerLink: ['/auth/forgotpassword']
                    //         },
                    //         {
                    //             label: 'New Password',
                    //             icon: 'pi pi-fw pi-cog',
                    //             routerLink: ['/auth/newpassword']
                    //         },
                    //         {
                    //             label: 'Verification',
                    //             icon: 'pi pi-fw pi-envelope',
                    //             routerLink: ['/auth/verification']
                    //         },
                    //         {
                    //             label: 'Lock Screen',
                    //             icon: 'pi pi-fw pi-eye-slash',
                    //             routerLink: ['/auth/lockscreen']
                    //         }
                    //     ]
                    // },
                ]
            }
        ];
    }
}
