export const SETTING_TYPE = [
    "stayInChannel",
    "DJMode",
    "announceWhenPlay",
    "volume",
]

export type PaymentCompleteWebhook = {
    id: string
    type: string
    date: string
    subject: {
        transaction_id: string
        status: {
            id: number
            description: string
        }
        payment_sequence: string
        created_at: string
        price: {
            amount: number
            currency: string
        }
        price_paid: {
            amount: number
            currency: string
        }
        payment_method: {
            name: string
            refundable: boolean
        }
        fees: {
            tax: {
                amount: number
                currency: string
            }
            gateway: {
                amount: number
                currency: string
            }
        }
        customer: {
            first_name: string
            last_name: string
            email: string
            ip: string
            username: {
                id: string
                username: string
            }
            marketing_consent: boolean
            country: string
            postal_code: string
        }
        products: Array<{
            id: number
            name: string
            quantity: number
            base_price: {
                amount: number
                currency: string
            }
            paid_price: {
                amount: number
                currency: string
            }
            variables: Array<any>
            expires_at: any
            custom: any
            username: {
                id: string
                username: string
            }
        }>
        coupons: Array<any>
        gift_cards: Array<any>
        recurring_payment_reference: string
        custom: {}
        revenue_share: Array<any>
        decline_reason: any
    }
}

export type RecurringEndWebhook = {
    id: string
    type: string
    date: string
    subject: {
        reference: string
        created_at: string
        paused_at: any
        paused_until: any
        next_payment_at: string
        status: {
            id: number
            description: string
        }
        initial_payment: {
            transaction_id: string
            status: {
                id: number
                description: string
            }
            payment_sequence: string
            created_at: string
            price: {
                amount: number
                currency: string
            }
            price_paid: {
                amount: number
                currency: string
            }
            payment_method: {
                name: string
                refundable: boolean
            }
            fees: {
                tax: {
                    amount: number
                    currency: string
                }
                gateway: {
                    amount: number
                    currency: string
                }
            }
            customer: {
                first_name: string
                last_name: string
                email: string
                ip: string
                username: {
                    id: string
                    username: string
                }
                marketing_consent: boolean
                country: string
                postal_code: string
            }
            products: Array<{
                id: number
                name: string
                quantity: number
                base_price: {
                    amount: number
                    currency: string
                }
                paid_price: {
                    amount: number
                    currency: string
                }
                variables: Array<any>
                expires_at: any
                custom: any
                username: {
                    id: string
                    username: string
                }
            }>
            coupons: Array<any>
            gift_cards: Array<any>
            recurring_payment_reference: string
            custom: {}
            revenue_share: Array<any>
            decline_reason: any
        }
        last_payment: {
            transaction_id: string
            status: {
                id: number
                description: string
            }
            payment_sequence: string
            created_at: string
            price: {
                amount: number
                currency: string
            }
            price_paid: {
                amount: number
                currency: string
            }
            payment_method: {
                name: string
                refundable: boolean
            }
            fees: {
                tax: {
                    amount: number
                    currency: string
                }
                gateway: {
                    amount: number
                    currency: string
                }
            }
            customer: {
                first_name: string
                last_name: string
                email: string
                ip: string
                username: {
                    id: string
                    username: string
                }
                marketing_consent: boolean
                country: string
                postal_code: string
            }
            products: Array<{
                id: number
                name: string
                quantity: number
                base_price: {
                    amount: number
                    currency: string
                }
                paid_price: {
                    amount: number
                    currency: string
                }
                variables: Array<any>
                expires_at: any
                custom: any
                username: {
                    id: string
                    username: string
                }
            }>
            coupons: Array<any>
            gift_cards: Array<any>
            recurring_payment_reference: string
            custom: {}
            revenue_share: Array<any>
            decline_reason: any
        }
        fail_count: number
        price: {
            amount: number
            currency: string
        }
        cancelled_at: any
        cancel_reason: any
    }
}
