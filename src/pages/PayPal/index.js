import { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

function PapalCheckoutButton(props) {
    const { product } = props;

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderID) => {
        //Call API

        //If response is successful
        setPaidFor(true);

        //If response is error
        //alert(error)
    };

    if (paidFor) {
        alert('Da thanh cong!');
    }

    if (error) {
        alert(error);
    }
    return (
        <PayPalButtons
            style={{ layout: 'horizontal', tagline: false }}
            onClick={(data, actions) => {
                const hasAlreadyBougntCourse = false;

                if (hasAlreadyBougntCourse) {
                    setError('YOU NGU !!!');
                    return actions.reject();
                } else {
                    return actions.resolve();
                }
            }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            description: product.description,
                            amount: {
                                value: product.price,
                            },
                        },
                    ],
                });
            }}
            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log('odder: ', order);

                handleApprove(data.orderID);
            }}
            onCancel={() => {}}
            onError={(err) => {
                setError(err);
                console.error('Error: ', err);
            }}
        />
    );
}
export default PapalCheckoutButton;
