import React, { useState } from "react";
import { Bin, ToPublicUTF8 } from "./util";

/**
 * Redirect the user to the thank you page
 */
function RedirectToThankYou(): void {
    window.location.href = "thank-you";
}

/**
 * Send a message on discord to indicate that someone has registered.
 * If it fails, nothing will happen.
 * @param {Event} event
 */
async function NotifyDiscord(event, whurl: string, form: FormData) {
    const d = new Date();
    event.preventDefault();

    let field_values = [];

    form.forEach((value, key, parent) => {
        field_values.push({name: key, value: value.toString()});
    });

    const webhookBody = {
        username: "Bounder Bot",
        content: "",
        embeds: [{
            title: 'Form submission occured on : ' + "dd/mm/yyyy : " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " at " + d.getHours() + ":" + d.getMinutes(),
            fields: field_values
        }],
    };
    const response = await fetch(whurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookBody),
    });
}

/**
 * 
 * 
 * @param e event
 * @param url url of the webapp url script
 * @param form the html form
 */
function SubmitMUForm(e: React.FormEvent<HTMLFormElement>, url: string, wh: string = "", form: any): void {
    e.preventDefault();

    const form_data = new FormData(form);
    const entries = new Map(form_data.entries());

    console.log(form_data)
    // fetch(url, { method: "POST", body: form_data })
    // TODO: temporary measures
    fetch(url + '?' + new URLSearchParams({
        'entry.1257158707': entries.get('Guardian Full Name').toString(),
        'entry.869250773': entries.get('Student Full Name').toString(),
        'entry.52178484': entries.get('Email').toString(),
        'entry.1659315314': entries.get('Age').toString(),
        'entry.1533136250': entries.get('Phone Number').toString(),
        'entry.21704316': entries.get('Preferred Instrument').toString(),
        'entry.642161727': entries.get('Experience').toString(),
        'entry.50315882': entries.get('Guardian Full Name').toString(),
    }), { method: "POST", mode: 'no-cors'})
        .then(response => {
            // console.log(response)
            // if (!response.ok) {
            //     throw new Error("Error failed when calling " + JSON.stringify(form_data))
            // }
            RedirectToThankYou()
        })
        // .catch(reason => alert("Failed, internal error. Please email us at support@musicunbounded.org with details."));
        .catch(reason => alert(reason));

    if (wh != "") {
        NotifyDiscord(e, wh, form_data);
    }
}

/**
 * 
 * @param props children...
 */
export default function MUForm(props: { children?: React.ReactNode, apps_script_url: string, whurl: string, className?: string }) {
    const [submit_disabled, SetSubmitDisabled] = useState(false);
    const [submit_button_name, SetSubmitButtonName] = useState("Submit");

    function AttemptSubmission(e: React.FormEvent<HTMLFormElement>, url: string, whurl: string): void {
        e.preventDefault();
        if (submit_disabled) {
            return;
        }
        SetSubmitDisabled(true);
        SetSubmitButtonName("Submitting...")
        // SubmitMUForm(e, url, whurl, document.forms["main_form"]);
        //TODO: remove url
        SubmitMUForm(e, 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfLZGN7k3nEpawKAFZ0nxfGvifVYvOCWnjQJjghRdeD50-wWA/formResponse', whurl, document.forms["main_form"]);
    }

    return (
        
        <Bin>
            <div className={props.className}>
                <form name="main_form" method='post' onSubmit={e => AttemptSubmission(e, ToPublicUTF8(props.apps_script_url), ToPublicUTF8(props.whurl))}>
                    {props.children}
                    <button disabled={submit_disabled} className='bg-blue-600 text-white p-3 rounded-md' type="submit">{submit_button_name}</button>
                </form>
            </div>
        </Bin>
    )
}

/**
 * 
 * @param props children->label, name->content_label
 * @returns field for an mu form
 */
export function Field(props: { children: string, name: string, required?: boolean, type?: string }) {
    const input_class: string = "w-full p-3 border-b-2";

    return (
        <div className='mb-5 text-lg'>
            <div className='pb-2'><label htmlFor={props.name}>{props.children}</label></div>
            <div>{props.required ? <input placeholder={props.children} className={"rounded-md " + input_class} type={props.type} id={props.name} name={props.name} required /> : <input placeholder={props.children} className={input_class + " rounded-md"} type={props.type} id={props.name} name={props.name} />}</div>
        </div>
    )
}

export function LargeField(props: { children: string, label: string }) {
    return (
        <div className='text-lg'>
            <label className='mb-2' htmlFor={props.children}>{props.children}</label>
            <textarea name={props.label} required rows={5} placeholder="Write your thoughts here..." id={props.children} className='p-3 text-lg w-full border-b-2 mb-5' />
        </div>
    )
}

export function Dropdown(props: { children: string, label: string, options: string[] }) {
    return (
        <div className='text-lg'>
            <div className='pb-2'><label htmlFor={props.label}>{props.children}</label></div>
            <select defaultValue={''} id={props.label} name={props.label} className='w-full p-3 mb-5 border-b-2' required>
                <option value='' disabled>Select an option</option>
                {props.options.map(s => {
                    return (
                        <option key={s} value={s}>{s}</option>
                    )
                })}
            </select>
        </div>
    )
}

/**
 * 
 * @returns Phone number field
 */
export function PhoneField() {
    return (
        <Field name="Phone Number" type='tel' required={false}>Phone Number (Optional)</Field>
    )
}

/**
 * Email field
 */
export function EmailField() {
    return (
        <Field name='Email' type='email' required={true}>Email</Field>
    )
}