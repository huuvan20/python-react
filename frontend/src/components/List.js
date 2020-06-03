import React from "react";

export default function List(props) {
    return (
        <div>
            <h1>A list of hotel packages</h1>
            <table>
                <thead>
                    <tr>
                        <th>Hotel Name</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Validity Duration</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.packages.map(hotelPackage => {
                        return (
                            <tr key={hotelPackage.id}>
                                <td>
                                    {hotelPackage.hotel_name}
                                    <input name="hotel_name" value=""/>
                                </td>
                                <td>
                                    {hotelPackage.price}
                                    <input name="price" value=""/>
                                </td>
                                <td>
                                    {hotelPackage.duration}
                                    <input name="duration" value=""/>
                                </td>
                                <td>
                                    {hotelPackage.validity_duration}
                                    <input name="validity_duration" value=""/>
                                </td>
                                <td>
                                    {hotelPackage.description}
                                    <input name="description" value=""/>
                                </td>
                                <td>
                                    <button onClick={() => props.deletePackage(hotelPackage.id)}>Delete</button>
                                    <button onClick={() => props.EditPackage(hotelPackage.id)}>Edit</button>
                                    <button onClick={() => props.SavePackage(hotelPackage.id)}>Save</button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}
