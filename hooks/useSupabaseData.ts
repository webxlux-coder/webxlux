import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../LanguageContext';
import { FAQItem, Project } from '../types';

export function useServices() {
    const { language } = useLanguage();
    const [services, setServices] = useState<any[]>([]);

    useEffect(() => {
        async function fetchServices() {
            const { data, error } = await supabase
                .from('services')
                .select(`title_${language}, description_${language}, icon, "order"`)
                .order('"order"', { ascending: true });

            if (error) {
                console.error('Error fetching services:', error);
                return;
            }

            if (data) {
                setServices(data.map((item: any) => ({
                    title: item[`title_${language}`],
                    desc: item[`description_${language}`],
                    icon: item.icon
                })));
            }
        }
        fetchServices();
    }, [language]);

    return services;
}

export function useProcessSteps() {
    const { language } = useLanguage();
    const [steps, setSteps] = useState<any[]>([]);

    useEffect(() => {
        async function fetchSteps() {
            const { data, error } = await supabase
                .from('process_steps')
                .select(`step_number, title_${language}, description_${language}, "order"`)
                .order('"order"', { ascending: true });

            if (error) {
                console.error('Error fetching process steps:', error);
                return;
            }

            if (data) {
                setSteps(data.map((item: any) => ({
                    number: item.step_number,
                    title: item[`title_${language}`],
                    desc: item[`description_${language}`]
                })));
            }
        }
        fetchSteps();
    }, [language]);

    return steps;
}

export function useFAQs() {
    const { language } = useLanguage();
    const [faqs, setFaqs] = useState<FAQItem[]>([]);

    useEffect(() => {
        async function fetchFaqs() {
            const { data, error } = await supabase
                .from('faq_items')
                .select(`question_${language}, answer_${language}, "order"`)
                .order('"order"', { ascending: true });

            if (error) {
                console.error('Error fetching FAQs:', error);
                return;
            }

            if (data) {
                setFaqs(data.map((item: any) => ({
                    question: item[`question_${language}`],
                    answer: item[`answer_${language}`]
                })));
            }
        }
        fetchFaqs();
    }, [language]);

    return faqs;
}

export function useProjects() {
    const { language } = useLanguage();
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        async function fetchProjects() {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('id', { ascending: true });

            if (error) {
                console.error('Error fetching projects:', error);
                return;
            }

            if (data) {
                setProjects(data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    description: item[`description_${language}`],
                    fullDescription: item[`full_description_${language}`],
                    challenge: item[`challenge_${language}`],
                    result: item[`result_${language}`],
                    role: item[`role_${language}`],
                    focus: item[`focus_${language}`],
                    tech: item[`tech_${language}`],
                    impact: item[`impact_${language}`],
                    metrics: item.metrics,
                    image: item.image_url,
                    gallery: item.gallery_urls
                })));
            }
        }
        fetchProjects();
    }, [language]);

    return projects;
}
