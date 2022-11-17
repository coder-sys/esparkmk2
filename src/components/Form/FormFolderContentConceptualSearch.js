import React, { useState,useReducer } from 'react';
import {
	FormColumn,
	FormWrapper,
	FormInput,
	FormSection,
	FormRow,
	FormLabel,
	FormInputRow,
	FormMessage,
	FormButton,
	
} from './FormStyles';


import { Container } from '../../globalStyles';
import validateForm from './validateForm';

const FormFolderContentConceptualSearch = (props) => {

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	
	const handleSubmit = (e) => {
		e.preventDefault();
        const resultError = 0
        try{        
            let y = props.conceptsearch
             resultError = validateForm({ y });
        }catch(err){
            console.log(err)
        }

		if (resultError !== null) {
			setError(resultError);
			return;
		}

	};

	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const formData = [
		{ label: 'Search for a topic', value: props.conceptsearch, onChange: (e) => props.setConceptSearch(e.target.value), type: 'text' },
		
		
	];
	props.setConsent(false)
	return (
		<FormSection>
			<Container>
				<FormRow>
					<FormColumn small>
						<div style={{'fontSize':'9px'}}>This specific search is made for exploring deep into broad topics or concepts in any field</div>
						<FormWrapper onSubmit={handleSubmit}>
							{formData.map((el, index) => (
								<FormInputRow key={index}>
									<FormLabel>{el.label}</FormLabel>
									<FormInput
										type={el.type}
										placeholder={`${el.label.toLocaleLowerCase()}`}
										value={el.value}
										onChange={el.onChange}
									/>
								</FormInputRow>
							))}

							<FormButton onClick={async()=>{
                                    try{
                                        props.setUpdated(props.updated+1)
			                            props.setue(props.update_effect+1)
                                        let emailandlastname = await fetch(`http://localhost:8000/get_last_name_and_email/${props.name}`)
                                        emailandlastname = await emailandlastname.json()
                                        let api = await fetch(`http://localhost:8000/get_results_on_conceptual_search/${props.conceptsearch}/${props.name+emailandlastname['lastname']+emailandlastname['email']}/${props.foldername}`)
                                        api = await api.json()
                                        props.setCsResultData(api['data'])
                                    }catch(err){
                                        console.log(err)
										alert('The educational search you made was too specific,use the google search feature for your search')
										return(
											<a href='/#googlesearch'><FormButton>Go to Google Search</FormButton></a>
										)
                                    }

                                            }} type="submit">Search Topic</FormButton>
                           
						</FormWrapper>
						{error && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
								error
							>
							{'------'}							
						</FormMessage>
						)}
						{success && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
							>
							</FormMessage>
						)}
					</FormColumn>
				
				</FormRow>
				
			</Container>
		</FormSection>
	);
};

export default FormFolderContentConceptualSearch;
